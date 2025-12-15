# KaryaSiddhi Deployment Guide

Complete guide for deploying KaryaSiddhi on various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Deployment](#local-deployment)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Production Checklist](#production-checklist)
- [Monitoring & Logging](#monitoring--logging)
- [Backup & Recovery](#backup--recovery)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js**: 20.x or higher
- **Python**: 3.11 or higher
- **PostgreSQL**: 15.x or higher
- **Redis**: 7.x or higher
- **Docker**: 24.x or higher (for containerized deployment)
- **Kubernetes**: 1.28 or higher (for K8s deployment)

### System Requirements

#### Minimum (Development)
- CPU: 4 cores
- RAM: 8 GB
- Storage: 20 GB
- Network: 10 Mbps

#### Recommended (Production)
- CPU: 16+ cores
- RAM: 32+ GB
- Storage: 200+ GB SSD
- Network: 1 Gbps

## Local Deployment

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/karyasiddhi.git
cd karyasiddhi
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm run setup

# Or manually
cd frontend && npm install
cd ../backend && npm install
cd ../ai-service && pip install -r requirements.txt
```

### 3. Setup Database

```bash
# Create PostgreSQL database
createdb karyasiddhi

# Run initialization script
psql -d karyasiddhi -f database/init.sql

# Start Redis
redis-server
```

### 4. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your settings

# Frontend
cd frontend
cp .env.example .env
# Edit .env with your settings

# AI Service
cd ai-service
cp .env.example .env
# Edit .env with your settings
```

### 5. Start Services

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run start:dev

# Terminal 3 - AI Service
cd ai-service
uvicorn main:app --reload

# Terminal 4 - Redis (if not running as service)
redis-server
```

### 6. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api/docs
- **AI Service**: http://localhost:8000
- **AI Docs**: http://localhost:8000/docs

## Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

### Individual Service Deployment

```bash
# Build images
docker build -t karyasiddhi/frontend:latest ./frontend
docker build -t karyasiddhi/backend:latest ./backend
docker build -t karyasiddhi/ai-service:latest ./ai-service

# Run containers
docker run -d -p 3000:80 karyasiddhi/frontend:latest
docker run -d -p 3001:3001 karyasiddhi/backend:latest
docker run -d -p 8000:8000 karyasiddhi/ai-service:latest
```

## Kubernetes Deployment

### 1. Apply Configurations

```bash
# Create namespace
kubectl create namespace karyasiddhi

# Apply all configurations
kubectl apply -f kubernetes/deployment.yml

# Or apply individually
kubectl apply -f kubernetes/namespace.yml
kubectl apply -f kubernetes/configmap.yml
kubectl apply -f kubernetes/secrets.yml
kubectl apply -f kubernetes/postgres.yml
kubectl apply -f kubernetes/redis.yml
kubectl apply -f kubernetes/backend.yml
kubectl apply -f kubernetes/ai-service.yml
kubectl apply -f kubernetes/frontend.yml
```

### 2. Verify Deployment

```bash
# Check pods
kubectl get pods -n karyasiddhi

# Check services
kubectl get services -n karyasiddhi

# Check deployments
kubectl get deployments -n karyasiddhi

# View logs
kubectl logs -f deployment/backend -n karyasiddhi
```

### 3. Configure Ingress

```bash
# Apply ingress configuration
kubectl apply -f kubernetes/ingress.yml

# Get ingress IP
kubectl get ingress -n karyasiddhi
```

### 4. Scale Services

```bash
# Scale backend
kubectl scale deployment backend --replicas=5 -n karyasiddhi

# Scale AI service
kubectl scale deployment ai-service --replicas=3 -n karyasiddhi

# Auto-scaling is configured via HPA in deployment.yml
```

## Cloud Deployment

### AWS Deployment

#### Using EKS (Elastic Kubernetes Service)

```bash
# Create EKS cluster
eksctl create cluster --name karyasiddhi --region ap-south-1

# Configure kubectl
aws eks update-kubeconfig --name karyasiddhi --region ap-south-1

# Deploy application
kubectl apply -f kubernetes/deployment.yml
```

#### Using RDS for PostgreSQL

```bash
# Update backend .env
DATABASE_URL=postgresql://user:pass@your-rds-endpoint:5432/karyasiddhi
```

#### Using ElastiCache for Redis

```bash
# Update .env files
REDIS_URL=redis://your-elasticache-endpoint:6379
```

### Azure Deployment

```bash
# Create AKS cluster
az aks create --resource-group karyasiddhi-rg --name karyasiddhi-cluster

# Get credentials
az aks get-credentials --resource-group karyasiddhi-rg --name karyasiddhi-cluster

# Deploy
kubectl apply -f kubernetes/deployment.yml
```

### MeitY Cloud Deployment (Government)

Follow MeitY Cloud specific guidelines and compliance requirements.

## Production Checklist

### Security

- [ ] SSL/TLS certificates configured
- [ ] Secrets in environment variables, not code
- [ ] Database credentials secured
- [ ] API rate limiting enabled
- [ ] CORS properly configured
- [ ] Security headers added
- [ ] Regular security audits scheduled

### Performance

- [ ] Database indexes optimized
- [ ] Redis caching configured
- [ ] CDN for static assets
- [ ] Gzip compression enabled
- [ ] Image optimization
- [ ] Code minification
- [ ] Lazy loading implemented

### Reliability

- [ ] Database backups automated
- [ ] Multi-region deployment
- [ ] Health checks configured
- [ ] Auto-scaling enabled
- [ ] Disaster recovery plan
- [ ] Monitoring alerts set up

### Compliance

- [ ] Data sovereignty verified (India)
- [ ] GDPR compliance checked
- [ ] Audit logging enabled
- [ ] Access controls configured
- [ ] Data encryption at rest
- [ ] Data encryption in transit

## Monitoring & Logging

### Prometheus + Grafana

```bash
# Install Prometheus
helm install prometheus prometheus-community/prometheus

# Install Grafana
helm install grafana grafana/grafana

# Access Grafana
kubectl port-forward service/grafana 3000:80
```

### ELK Stack (Elasticsearch, Logstash, Kibana)

```bash
# Deploy ELK stack
kubectl apply -f monitoring/elk-stack.yml
```

### Application Metrics

Key metrics to monitor:
- Request latency (p50, p95, p99)
- Error rates
- Database query performance
- Cache hit rates
- AI model prediction latency
- User active sessions
- Goal completion rates

## Backup & Recovery

### Database Backup

```bash
# Automated daily backup
0 2 * * * pg_dump karyasiddhi > /backups/karyasiddhi-$(date +\%Y\%m\%d).sql

# Restore from backup
psql -d karyasiddhi < /backups/karyasiddhi-20251004.sql
```

### Application State Backup

```bash
# Backup uploaded files and user data
tar -czf karyasiddhi-data-$(date +%Y%m%d).tar.gz /data

# Store in S3 or cloud storage
aws s3 cp karyasiddhi-data-20251004.tar.gz s3://backups/
```

### Disaster Recovery

1. **RTO (Recovery Time Objective)**: < 4 hours
2. **RPO (Recovery Point Objective)**: < 1 hour
3. **Multi-region replication** enabled
4. **Regular DR drills** scheduled quarterly

## Troubleshooting

### Common Issues

#### Database Connection Failed

```bash
# Check database is running
pg_isready -h localhost -p 5432

# Verify credentials
psql -h localhost -U karyasiddhi_user -d karyasiddhi

# Check connection from app
telnet localhost 5432
```

#### Redis Connection Failed

```bash
# Check Redis is running
redis-cli ping

# Should return: PONG

# Check from app container
telnet redis 6379
```

#### High Memory Usage

```bash
# Check container memory
docker stats

# In Kubernetes
kubectl top pods -n karyasiddhi

# Adjust memory limits in deployment
```

#### Slow API Responses

```bash
# Check database slow queries
SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;

# Enable query logging
ALTER SYSTEM SET log_min_duration_statement = 1000;

# Check Redis cache hit rate
redis-cli INFO stats | grep hits
```

### Health Check Endpoints

```bash
# Backend health
curl http://localhost:3001/api/health

# AI Service health
curl http://localhost:8000/health

# Database connection
curl http://localhost:3001/api/health/db
```

### Logs Location

```bash
# Docker logs
docker-compose logs -f [service-name]

# Kubernetes logs
kubectl logs -f deployment/backend -n karyasiddhi

# Application logs
tail -f /var/log/karyasiddhi/app.log
```

## Support

For deployment support:
- **Email**: devops@karyasiddhi.gov.in
- **Slack**: #karyasiddhi-deployment
- **Documentation**: https://docs.karyasiddhi.gov.in

---

**Remember**: Always test deployments in staging before production!
