# Learn Platform Helm Chart

This Helm chart deploys the Learn Platform application on Kubernetes.

## Prerequisites

- Kubernetes cluster (K3s)
- Helm 3.x
- kubectl configured to access your cluster

## Required Secrets

Before deploying the application, you need to create the following secrets in your Kubernetes cluster:

### 1. PostgreSQL Credentials Secret

This secret contains the credentials for the PostgreSQL database.

```bash
kubectl create secret generic postgresql-credentials \
  --namespace learn-platform \
  --from-literal=POSTGRES_DB=your_database_name \
  --from-literal=POSTGRES_USER=your_database_user \
  --from-literal=POSTGRES_PASSWORD=your_secure_password
```

### 2. Application Environment Secret

This secret contains all the environment variables needed by the application.

```bash
kubectl create secret generic learn-platform-env \
  --namespace learn-platform \
  --from-literal=NODE_ENV=production \
  --from-literal=DATABASE_URL=postgresql://your_database_user:your_secure_password@learn-platform-postgresql:5432/your_database_name \
  --from-literal=JWT_SECRET=your_jwt_secret \
  --from-literal=API_URL=https://your-api-domain.com \
  --from-literal=CLIENT_URL=https://your-client-domain.com
```

Add any other environment variables your application needs.

## Deployment

The application is deployed automatically via GitHub Actions when changes are pushed to the main branch.

To deploy manually:

```bash
helm upgrade --install learn-platform ./learn-platform-helm \
  --namespace learn-platform \
  --set image.repository=ghcr.io/yourusername/learn-platform \
  --set image.tag=latest
```

## Configuration

See `values.yaml` for configurable parameters.

## Accessing the Application

The application is exposed via an Ingress resource. Configure your DNS to point to the Ingress controller's IP address.

## Troubleshooting

To check the status of your deployment:

```bash
kubectl get pods -n learn-platform
kubectl get services -n learn-platform
kubectl get ingress -n learn-platform
```

To view logs:

```bash
kubectl logs -n learn-platform deployment/learn-platform-server
```
