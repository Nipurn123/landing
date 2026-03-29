#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-your-project-id}"
REGION="${GCP_REGION:-us-central1}"
CLUSTER_NAME="100xprompt-cluster"
FRONTEND_IMAGE="gcr.io/${PROJECT_ID}/100xprompt-frontend"
BACKEND_IMAGE="gcr.io/${PROJECT_ID}/100xprompt-backend"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  100X Prompt Kubernetes Deployment${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed${NC}"
    echo "Please install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl is not installed${NC}"
    echo "Please install from: https://kubernetes.io/docs/tasks/tools/"
    exit 1
fi

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: docker is not installed${NC}"
    echo "Please install from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Function to build and push images
build_and_push() {
    echo -e "${YELLOW}Building Docker images...${NC}"
    
    # Build frontend
    echo -e "${BLUE}Building frontend...${NC}"
    docker build \
        --build-arg VITE_CLERK_PUBLISHABLE_KEY="${VITE_CLERK_PUBLISHABLE_KEY}" \
        --build-arg VITE_API_URL="https://api.100xprompt.com" \
        --build-arg VITE_ADMIN_SECRET="${VITE_ADMIN_SECRET}" \
        --build-arg VITE_SUPABASE_URL="${VITE_SUPABASE_URL}" \
        --build-arg VITE_SUPABASE_ANON_KEY="${VITE_SUPABASE_ANON_KEY}" \
        -t "${FRONTEND_IMAGE}:latest" \
        -t "${FRONTEND_IMAGE}:${BUILD_NUMBER:-$(date +%s)}" \
        .
    
    # Build backend
    echo -e "${BLUE}Building backend...${NC}"
    docker build \
        -t "${BACKEND_IMAGE}:latest" \
        -t "${BACKEND_IMAGE}:${BUILD_NUMBER:-$(date +%s)}" \
        ./server
    
    # Push images
    echo -e "${YELLOW}Pushing images to GCR...${NC}"
    docker push "${FRONTEND_IMAGE}:latest"
    docker push "${BACKEND_IMAGE}:latest"
    
    echo -e "${GREEN}Images built and pushed successfully!${NC}"
}

# Function to create GKE cluster
create_cluster() {
    echo -e "${YELLOW}Creating GKE cluster...${NC}"
    
    gcloud container clusters create "${CLUSTER_NAME}" \
        --project="${PROJECT_ID}" \
        --region="${REGION}" \
        --num-nodes=2 \
        --machine-type="e2-medium" \
        --enable-autoscaling \
        --min-nodes=1 \
        --max-nodes=5 \
        --enable-horizontal-pod-autoscaling \
        --enable-legacy-authorization \
        --workload-pool="${PROJECT_ID}.svc.id.goog"
    
    echo -e "${GREEN}Cluster created successfully!${NC}"
}

# Function to get cluster credentials
get_credentials() {
    echo -e "${YELLOW}Getting cluster credentials...${NC}"
    gcloud container clusters get-credentials "${CLUSTER_NAME}" \
        --project="${PROJECT_ID}" \
        --region="${REGION}"
}

# Function to create static IP
create_static_ip() {
    echo -e "${YELLOW}Creating static IP...${NC}"
    
    if gcloud compute addresses describe 100xprompt-ip --global --project="${PROJECT_ID}" &> /dev/null; then
        echo -e "${GREEN}Static IP already exists${NC}"
    else
        gcloud compute addresses create 100xprompt-ip --global --project="${PROJECT_ID}"
        echo -e "${GREEN}Static IP created${NC}"
    fi
    
    IP=$(gcloud compute addresses describe 100xprompt-ip --global --project="${PROJECT_ID}" --format="value(address)")
    echo -e "${GREEN}Static IP: ${IP}${NC}"
    echo -e "${YELLOW}Update your DNS records:${NC}"
    echo -e "  100xprompt.com      A    ${IP}"
    echo -e "  www.100xprompt.com  A    ${IP}"
    echo -e "  api.100xprompt.com  A    ${IP}"
}

# Function to deploy to Kubernetes
deploy() {
    echo -e "${YELLOW}Deploying to Kubernetes...${NC}"
    
    # Update secrets with actual values
    echo -e "${BLUE}Updating secrets...${NC}"
    cat > k8s/secrets.yaml <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: 100xprompt
type: Opaque
stringData:
  VITE_CLERK_PUBLISHABLE_KEY: "${VITE_CLERK_PUBLISHABLE_KEY}"
  VITE_SUPABASE_ANON_KEY: "${VITE_SUPABASE_ANON_KEY}"
  VITE_ADMIN_SECRET: "${VITE_ADMIN_SECRET}"
  SUPABASE_URL: "${VITE_SUPABASE_URL}"
  SUPABASE_SERVICE_KEY: "${SUPABASE_SERVICE_KEY}"
  GMAIL_USER: "${GMAIL_USER}"
  GMAIL_APP_PASSWORD: "${GMAIL_APP_PASSWORD}"
  ADMIN_SECRET: "${VITE_ADMIN_SECRET}"
EOF
    
    # Update image names in deployments
    sed -i.bak "s|gcr.io/PROJECT_ID|gcr.io/${PROJECT_ID}|g" k8s/frontend-deployment.yaml
    sed -i.bak "s|gcr.io/PROJECT_ID|gcr.io/${PROJECT_ID}|g" k8s/backend-deployment.yaml
    
    # Apply Kubernetes manifests
    kubectl apply -k k8s/
    
    echo -e "${GREEN}Deployment complete!${NC}"
}

# Function to check deployment status
check_status() {
    echo -e "${YELLOW}Checking deployment status...${NC}"
    
    echo -e "${BLUE}Pods:${NC}"
    kubectl get pods -n 100xprompt
    
    echo -e "${BLUE}Services:${NC}"
    kubectl get services -n 100xprompt
    
    echo -e "${BLUE}Ingress:${NC}"
    kubectl get ingress -n 100xprompt
    
    echo -e "${BLUE}HPA:${NC}"
    kubectl get hpa -n 100xprompt
    
    echo -e "${BLUE}Certificate Status:${NC}"
    kubectl describe managedcertificate 100xprompt-cert -n 100xprompt | grep -A 5 "Status:"
}

# Function to view logs
logs() {
    local component="${1:-frontend}"
    kubectl logs -f -l "component=${component}" -n 100xprompt --all-containers=true
}

# Function to cleanup
cleanup() {
    echo -e "${YELLOW}Cleaning up...${NC}"
    
    # Restore original files
    if [ -f "k8s/frontend-deployment.yaml.bak" ]; then
        mv k8s/frontend-deployment.yaml.bak k8s/frontend-deployment.yaml
    fi
    if [ -f "k8s/backend-deployment.yaml.bak" ]; then
        mv k8s/backend-deployment.yaml.bak k8s/backend-deployment.yaml
    fi
    
    echo -e "${GREEN}Cleanup complete${NC}"
}

# Main script
case "${1:-help}" in
    build)
        build_and_push
        ;;
    cluster)
        create_cluster
        ;;
    credentials)
        get_credentials
        ;;
    ip)
        create_static_ip
        ;;
    deploy)
        deploy
        ;;
    status)
        check_status
        ;;
    logs)
        logs "${2}"
        ;;
    cleanup)
        cleanup
        ;;
    all)
        build_and_push
        get_credentials || create_cluster
        create_static_ip
        deploy
        check_status
        ;;
    *)
        echo "Usage: $0 {build|cluster|credentials|ip|deploy|status|logs|cleanup|all}"
        echo ""
        echo "Commands:"
        echo "  build       - Build and push Docker images to GCR"
        echo "  cluster     - Create GKE cluster"
        echo "  credentials - Get cluster credentials"
        echo "  ip          - Create/reserve static IP"
        echo "  deploy      - Deploy to Kubernetes"
        echo "  status      - Check deployment status"
        echo "  logs        - View logs (frontend|backend)"
        echo "  cleanup     - Restore original files"
        echo "  all         - Run complete deployment pipeline"
        echo ""
        echo "Required environment variables:"
        echo "  GCP_PROJECT_ID       - GCP project ID"
        echo "  VITE_CLERK_PUBLISHABLE_KEY"
        echo "  VITE_SUPABASE_URL"
        echo "  VITE_SUPABASE_ANON_KEY"
        echo "  VITE_ADMIN_SECRET"
        echo "  SUPABASE_SERVICE_KEY"
        echo "  GMAIL_USER"
        echo "  GMAIL_APP_PASSWORD"
        exit 1
        ;;
esac
