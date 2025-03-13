# Learn Platform Helm Chart

This Helm chart deploys the Learn Platform application on Kubernetes.

## Prerequisites

- Kubernetes cluster (K3s)
- Helm 3.x
- kubectl configured to access your cluster
- NGINX Ingress Controller installed
- CloudNativePG operator (installed automatically by this chart)

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
  --from-literal=DATABASE_URL=postgresql://your_database_user:your_secure_password@learn-platform-db-rw.learn-platform.svc.cluster.local:5432/your_database_name \
  --from-literal=JWT_SECRET=your_jwt_secret \
  --from-literal=API_URL=https://your-api-domain.com \
  --from-literal=CLIENT_URL=https://your-client-domain.com \
  --from-literal=PORT=9999 \
  --from-literal=BETTER_AUTH_SECRET=your_auth_secret \
  --from-literal=BETTER_AUTH_URL=https://your-domain.com \
  --from-literal=PUBLIC_BETTER_AUTH_URL=https://your-domain.com \
  --from-literal=GITHUB_CLIENT_ID=your_github_client_id \
  --from-literal=GITHUB_CLIENT_SECRET=your_github_client_secret \
  --from-literal=GOOGLE_CLIENT_ID=your_google_client_id \
  --from-literal=GOOGLE_CLIENT_SECRET=your_google_client_secret \
  --from-literal=SMTP_HOST=your_smtp_host \
  --from-literal=SMTP_PORT=your_smtp_port \
  --from-literal=SMTP_USERNAME=your_smtp_username \
  --from-literal=SMTP_PASSWORD=your_smtp_password \
  --from-literal=SMTP_FROM=your_smtp_from_email \
  --from-literal=RESEND_KEY=your_resend_key
```

> **Important**: Note that both `BETTER_AUTH_URL` and `PUBLIC_BETTER_AUTH_URL` are included. The `BETTER_AUTH_URL` is used by the server, while `PUBLIC_BETTER_AUTH_URL` is used by the client-side code. Both should typically point to the same URL.

Add any other environment variables your application needs.

## Deployment

### Automatic Deployment with GitHub Actions

The application is deployed automatically via GitHub Actions when changes are pushed to the main branch.

### Manual Deployment

#### Option 1: Using the deploy script

The easiest way to deploy the chart is to use the provided deploy.sh script:

```bash
cd learn-platform-helm
./deploy.sh --image-repository ghcr.io/yourusername/learn-platform --image-tag latest --domain your-domain.com
```

The script accepts the following parameters:
- `--namespace`: The namespace to deploy to (default: learn-platform)
- `--release-name`: The Helm release name (default: learn-platform)
- `--image-repository`: The Docker image repository (default: ghcr.io/catalinpit/learn-platform)
- `--image-tag`: The Docker image tag (default: latest)
- `--domain`: The domain name for the ingress (default: sf.catalins.tech)

#### Option 2: Using Helm commands

To deploy manually using Helm commands:

1. Create the namespace if it doesn't exist:

```bash
kubectl create namespace learn-platform
```

2. Add the CloudNativePG Helm repository:

```bash
helm repo add cnpg https://cloudnative-pg.github.io/charts
helm repo update
```

3. Install the CloudNativePG operator:

```bash
helm upgrade --install cnpg \
  --namespace cnpg-system \
  --create-namespace \
  cnpg/cloudnative-pg
```

4. Build the Helm chart dependencies:

```bash
helm dependency build ./learn-platform-helm
```

5. Install or upgrade the Helm chart:

```bash
helm upgrade --install learn-platform ./learn-platform-helm \
  --namespace learn-platform \
  --set image.repository=ghcr.io/yourusername/learn-platform \
  --set image.tag=latest \
  --set ingress.hosts[0].host=your-domain.com
```

## CloudNativePG Integration

This Helm chart integrates with CloudNativePG to provide a robust PostgreSQL database for the Learn Platform application. CloudNativePG is a Kubernetes operator that manages PostgreSQL workloads on Kubernetes.

### How It Works

1. The chart automatically installs the CloudNativePG operator as a dependency.
2. A PostgreSQL cluster is created using the CloudNativePG custom resource definition.
3. The application connects to the PostgreSQL cluster using the service endpoints provided by CloudNativePG.

### PostgreSQL Cluster Configuration

The PostgreSQL cluster is configured with the following default settings:

- 1 PostgreSQL instance
- 10Gi of storage
- PostgreSQL version 15
- Resource requests: 500m CPU, 512Mi memory
- Resource limits: 1Gi memory

You can customize these settings in the `values.yaml` file under the `postgresql.cluster` section.

### Accessing the PostgreSQL Database

CloudNativePG creates the following service endpoints for accessing the PostgreSQL database:

- Read-Write endpoint: `learn-platform-db-rw.learn-platform.svc.cluster.local`
- Read-Only endpoint: `learn-platform-db-ro.learn-platform.svc.cluster.local`

The application is configured to use the Read-Write endpoint by default.

## Configuration

The following table lists the configurable parameters of the Learn Platform chart and their default values.

| Parameter               | Description              | Default                             |
| ----------------------- | ------------------------ | ----------------------------------- |
| `image.repository`      | Image repository         | `ghcr.io/catalinpit/learn-platform` |
| `image.tag`             | Image tag                | `latest`                            |
| `ingress.enabled`       | Enable ingress           | `true`                              |
| `ingress.hosts[0].host` | Hostname for the ingress | `sf.catalins.tech`                  |

See `values.yaml` for all configurable parameters.

## Accessing the Application

The application is exposed via an Ingress resource. By default, it will be accessible at the hostname specified in `ingress.hosts[0].host` (default: `sf.catalins.tech`).

### Setting up DNS

1. Get the external IP of your ingress controller:

```bash
kubectl get service -n ingress-nginx ingress-nginx-controller
```

2. Configure your DNS to point your domain to this IP address.

### Setting up HTTPS (Optional)

To enable HTTPS:

1. Install cert-manager:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml
```

2. Create a ClusterIssuer:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

3. Update your values.yaml or use --set to enable the cert-manager annotation:

```bash
helm upgrade --install learn-platform ./learn-platform-helm \
  --namespace learn-platform \
  --set ingress.annotations."cert-manager\.io/cluster-issuer"=letsencrypt-prod
```

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

### Troubleshooting CloudNativePG

To check the status of your PostgreSQL cluster:

```bash
kubectl get cluster -n learn-platform
kubectl describe cluster learn-platform-db -n learn-platform
```

To view PostgreSQL logs:

```bash
# Get the PostgreSQL pod name
POD_NAME=$(kubectl get pods -n learn-platform -l cnpg.io/cluster=learn-platform-db -o jsonpath='{.items[0].metadata.name}')

# View logs
kubectl logs -n learn-platform $POD_NAME
```

To connect to the PostgreSQL database for troubleshooting:

```bash
# Get the PostgreSQL pod name
POD_NAME=$(kubectl get pods -n learn-platform -l cnpg.io/cluster=learn-platform-db -o jsonpath='{.items[0].metadata.name}')

# Connect to the PostgreSQL database
kubectl exec -it $POD_NAME -n learn-platform -- psql -U learn_platform -d learn_platform
```

If your ingress is not working:

1. Check if the ingress controller is running:

```bash
kubectl get pods -n ingress-nginx
```

2. Verify DNS resolution:

```bash
nslookup your-domain.com
```

3. Check ingress controller logs:

```bash
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
```
