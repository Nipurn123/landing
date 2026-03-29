# Kubernetes Deployment for 100X Prompt

Production-ready Kubernetes manifests for deploying on Google Kubernetes Engine (GKE).

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Google Cloud Load Balancer               │
│                    (Global Static IP + SSL Certificate)         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Kubernetes Ingress                          │
│        Routes: /api/* → Backend, /* → Frontend                  │
└─────────────────────────────────────────────────────────────────┘
                    │                           │
                    ▼                           ▼
        ┌───────────────────┐       ┌───────────────────┐
        │   Frontend (2-10) │       │   Backend (2-10)  │
        │   Nginx + React   │       │   Node.js API     │
        │   Port: 80        │       │   Port: 3001      │
        └───────────────────┘       └───────────────────┘
                    │                           │
                    └───────────┬───────────────┘
                                ▼
                    ┌───────────────────┐
                    │    Supabase       │
                    │   (Managed DB)    │
                    └───────────────────┘
```

## Files

| File | Description |
|------|-------------|
| `namespace.yaml` | Creates isolated namespace |
| `configmap.yaml` | Non-sensitive configuration |
| `secrets.yaml` | Sensitive credentials (edit before deploy) |
| `frontend-deployment.yaml` | Frontend pods + service |
| `backend-deployment.yaml` | Backend pods + service |
| `ingress.yaml` | Load balancer routing rules |
| `managed-certificate.yaml` | Auto SSL certificate |
| `hpa.yaml` | Auto-scaling policies |
| `pdb.yaml` | Pod disruption budgets |
| `kustomization.yaml` | Kustomize configuration |

## Quick Start

### 1. Prerequisites

```bash
# Install tools
brew install gcloud kubectl docker

# Authenticate with GCP
gcloud auth login
gcloud auth configure-docker
```

### 2. Create GKE Cluster

```bash
# Set your project
export GCP_PROJECT_ID=your-project-id
export GCP_REGION=us-central1

# Create cluster
gcloud container clusters create 100xprompt-cluster \
  --project=$GCP_PROJECT_ID \
  --region=$GCP_REGION \
  --num-nodes=2 \
  --machine-type=e2-medium \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=5 \
  --enable-horizontal-pod-autoscaling

# Get credentials
gcloud container clusters get-credentials 100xprompt-cluster \
  --project=$GCP_PROJECT_ID \
  --region=$GCP_REGION
```

### 3. Reserve Static IP

```bash
# Create global static IP
gcloud compute addresses create 100xprompt-ip --global

# Get the IP
gcloud compute addresses describe 100xprompt-ip --global --format="value(address)"
```

### 4. Update DNS

Point these records to the static IP:
- `100xprompt.com` → A record
- `www.100xprompt.com` → A record
- `api.100xprompt.com` → A record

### 5. Update Secrets

Edit `k8s/secrets.yaml` with your actual values:
```bash
# Update all REPLACE_WITH_* placeholders
vim k8s/secrets.yaml
```

### 6. Deploy

```bash
# Option A: Using deploy script
export GCP_PROJECT_ID=your-project-id
export VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
export VITE_SUPABASE_URL=https://xxx.supabase.co
export VITE_SUPABASE_ANON_KEY=eyJ...
export VITE_ADMIN_SECRET=nipurn@123
export SUPABASE_SERVICE_KEY=eyJ...
export GMAIL_USER=your@email.com
export GMAIL_APP_PASSWORD=xxxx

./deploy.sh all

# Option B: Manual deployment
kubectl apply -k k8s/
```

### 7. Verify

```bash
# Check pods
kubectl get pods -n 100xprompt

# Check services
kubectl get services -n 100xprompt

# Check ingress
kubectl get ingress -n 100xprompt

# Check SSL certificate
kubectl describe managedcertificate 100xprompt-cert -n 100xprompt
```

## Auto-Scaling

HPA automatically scales pods based on:
- **CPU**: 70% utilization threshold
- **Memory**: 80% utilization threshold
- **Min replicas**: 2
- **Max replicas**: 10

## SSL Certificates

Google Managed Certificates automatically provisions and renews SSL for:
- `100xprompt.com`
- `www.100xprompt.com`
- `api.100xprompt.com`

Certificate provisioning takes 15-60 minutes after DNS is configured.

## Monitoring

```bash
# View logs
kubectl logs -f -l component=frontend -n 100xprompt
kubectl logs -f -l component=backend -n 100xprompt

# View HPA status
kubectl get hpa -n 100xprompt

# View events
kubectl get events -n 100xprompt --sort-by='.lastTimestamp'
```

## Troubleshooting

### Pods not starting
```bash
kubectl describe pod <pod-name> -n 100xprompt
kubectl logs <pod-name> -n 100xprompt
```

### Ingress not working
```bash
kubectl describe ingress 100xprompt-ingress -n 100xprompt
kubectl get events -n 100xprompt --field-selector involvedObject.kind=Ingress
```

### Certificate pending
```bash
# Check DNS propagation
nslookup 100xprompt.com
dig 100xprompt.com

# Check certificate status
kubectl describe managedcertificate 100xprompt-cert -n 100xprompt
```

### HPA not scaling
```bash
# Check metrics server
kubectl get pods -n kube-system | grep metrics

# View HPA details
kubectl describe hpa frontend-hpa -n 100xprompt
```

## Cleanup

```bash
# Delete all resources
kubectl delete -k k8s/

# Delete GKE cluster
gcloud container clusters delete 100xprompt-cluster --region=$GCP_REGION

# Release static IP
gcloud compute addresses delete 100xprompt-ip --global
```
