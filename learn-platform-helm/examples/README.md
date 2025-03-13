# Learn Platform Helm Chart Examples

This directory contains example files that can be used as references for manual operations or customizations.

## PostgreSQL Cluster Sample

The `postgresql-cluster-sample.yaml` file provides a sample CloudNativePG PostgreSQL cluster configuration that can be used as a reference for creating a PostgreSQL cluster manually.

### Prerequisites

1. CloudNativePG operator must be installed in your Kubernetes cluster:

```bash
helm repo add cnpg https://cloudnative-pg.github.io/charts
helm repo update
helm upgrade --install cnpg \
  --namespace cnpg-system \
  --create-namespace \
  cnpg/cloudnative-pg
```

2. Create a secret for PostgreSQL credentials:

```bash
kubectl create secret generic your-db-secret \
  --namespace your-workspace \
  --from-literal=username=your-name \
  --from-literal=password=your-secure-password
```

### Deploying the PostgreSQL Cluster

To deploy the PostgreSQL cluster using the sample file:

1. Customize the `postgresql-cluster-sample.yaml` file to match your requirements:
   - Update the `metadata.name` and `metadata.namespace` fields
   - Update the database name, owner, and secret name
   - Adjust resources and storage as needed

2. Apply the customized file:

```bash
kubectl apply -f postgresql-cluster-sample.yaml
```

### Connecting to the PostgreSQL Cluster

Once the cluster is deployed, you can connect to it using:

```bash
# Get the PostgreSQL pod name
POD_NAME=$(kubectl get pods -n your-workspace -l cnpg.io/cluster=yourdb-db -o jsonpath='{.items[0].metadata.name}')

# Connect to the PostgreSQL database
kubectl exec -it $POD_NAME -n your-workspace -- psql -U your-name -d yourdb
```

For applications running in the same Kubernetes cluster, you can connect using the following service endpoints:

- Read-Write endpoint: `yourdb-db-rw.your-workspace.svc.cluster.local`
- Read-Only endpoint: `yourdb-db-ro.your-workspace.svc.cluster.local`

The connection string format is:
```
postgresql://your-name:your-secure-password@yourdb-db-rw.your-workspace.svc.cluster.local:5432/yourdb
