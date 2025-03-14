#!/bin/bash
set -e

# Default values
NAMESPACE="learn-platform"
RELEASE_NAME="learn-platform"
IMAGE_REPOSITORY="ghcr.io/catalinpit/learn-platform"
IMAGE_TAG="latest"
DOMAIN="sf.catalins.tech"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --namespace)
      NAMESPACE="$2"
      shift 2
      ;;
    --release-name)
      RELEASE_NAME="$2"
      shift 2
      ;;
    --image-repository)
      IMAGE_REPOSITORY="$2"
      shift 2
      ;;
    --image-tag)
      IMAGE_TAG="$2"
      shift 2
      ;;
    --domain)
      DOMAIN="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "Deploying Learn Platform to Kubernetes..."
echo "Namespace: $NAMESPACE"
echo "Release Name: $RELEASE_NAME"
echo "Image Repository: $IMAGE_REPOSITORY"
echo "Image Tag: $IMAGE_TAG"
echo "Domain: $DOMAIN"

# Create namespace if it doesn't exist
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Add CloudNativePG Helm repository
echo "Adding CloudNativePG Helm repository..."
helm repo add cnpg https://cloudnative-pg.github.io/charts
helm repo update

# Install CloudNativePG CRDs and operator
echo "Installing CloudNativePG CRDs and operator..."
# Install CloudNativePG CRDs first
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.22/config/crd/bases/postgresql.cnpg.io_clusters.yaml
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.22/config/crd/bases/postgresql.cnpg.io_poolers.yaml
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.22/config/crd/bases/postgresql.cnpg.io_scheduledbackups.yaml
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.22/config/crd/bases/postgresql.cnpg.io_backups.yaml

# Then install the operator
helm upgrade --install cnpg \
  --namespace cnpg-system \
  --create-namespace \
  cnpg/cloudnative-pg

# Wait for the operator to be ready
echo "Waiting for CloudNativePG operator to be ready..."
kubectl wait --for=condition=available --timeout=60s deployment/cnpg-controller-manager -n cnpg-system || true

# No need to build dependencies as CloudNativePG is installed separately

# Deploy Learn Platform
echo "Deploying Learn Platform..."
# Since this script is in the learn-platform-helm directory,
# we use "." to refer to the current directory
helm upgrade --install $RELEASE_NAME . \
  --namespace $NAMESPACE \
  --set image.repository=$IMAGE_REPOSITORY \
  --set image.tag=$IMAGE_TAG \
  --set ingress.hosts[0].host=$DOMAIN

echo "Deployment completed successfully!"
echo "The application should be available at: http://$DOMAIN"
