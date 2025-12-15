#!/bin/bash

# KaryaSiddhi Setup Script
# Digital India Initiative - SIH 2025

set -e

echo "🇮🇳 KaryaSiddhi - AI-Enhanced Government Performance Platform"
echo "=================================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        print_success "Node.js installed: $NODE_VERSION"
    else
        print_error "Node.js not found. Please install Node.js 20 or higher."
        exit 1
    fi
    
    # Check Python
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version)
        print_success "Python installed: $PYTHON_VERSION"
    else
        print_error "Python not found. Please install Python 3.11 or higher."
        exit 1
    fi
    
    # Check PostgreSQL
    if command -v psql &> /dev/null; then
        print_success "PostgreSQL found"
    else
        print_error "PostgreSQL not found. Please install PostgreSQL 15 or higher."
        exit 1
    fi
    
    # Check Redis
    if command -v redis-cli &> /dev/null; then
        print_success "Redis found"
    else
        print_error "Redis not found. Please install Redis 7 or higher."
        exit 1
    fi
    
    echo ""
}

# Setup database
setup_database() {
    print_info "Setting up database..."
    
    # Create database
    if psql -lqt | cut -d \| -f 1 | grep -qw karyasiddhi; then
        print_info "Database 'karyasiddhi' already exists"
    else
        createdb karyasiddhi
        print_success "Database 'karyasiddhi' created"
    fi
    
    # Run init script
    psql -d karyasiddhi -f database/init.sql > /dev/null 2>&1
    print_success "Database initialized"
    
    echo ""
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    
    # Frontend
    print_info "Installing frontend dependencies..."
    cd frontend
    npm install > /dev/null 2>&1
    cd ..
    print_success "Frontend dependencies installed"
    
    # Backend
    print_info "Installing backend dependencies..."
    cd backend
    npm install > /dev/null 2>&1
    cd ..
    print_success "Backend dependencies installed"
    
    # AI Service
    print_info "Installing AI service dependencies..."
    cd ai-service
    pip3 install -r requirements.txt > /dev/null 2>&1
    cd ..
    print_success "AI service dependencies installed"
    
    echo ""
}

# Setup environment files
setup_env() {
    print_info "Setting up environment files..."
    
    # Backend
    if [ ! -f backend/.env ]; then
        cp backend/.env.example backend/.env
        print_success "Backend .env created"
    else
        print_info "Backend .env already exists"
    fi
    
    # AI Service
    if [ ! -f ai-service/.env ]; then
        cp ai-service/.env.example ai-service/.env
        print_success "AI service .env created"
    else
        print_info "AI service .env already exists"
    fi
    
    echo ""
}

# Build projects
build_projects() {
    print_info "Building projects..."
    
    # Frontend
    print_info "Building frontend..."
    cd frontend
    npm run build > /dev/null 2>&1
    cd ..
    print_success "Frontend built"
    
    # Backend
    print_info "Building backend..."
    cd backend
    npm run build > /dev/null 2>&1
    cd ..
    print_success "Backend built"
    
    echo ""
}

# Main execution
main() {
    echo "Starting KaryaSiddhi setup..."
    echo ""
    
    check_prerequisites
    setup_database
    install_dependencies
    setup_env
    
    print_success "Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Start PostgreSQL and Redis services"
    echo "2. Run 'npm run dev:backend' to start backend"
    echo "3. Run 'npm run dev:frontend' to start frontend"
    echo "4. Run 'npm run dev:ai' to start AI service"
    echo ""
    echo "Or use Docker Compose: docker-compose up"
    echo ""
    echo "Access the application at http://localhost:3000"
    echo "API documentation at http://localhost:3001/api/docs"
    echo ""
    echo "🇮🇳 Happy coding for Digital India! 🇮🇳"
}

# Run main function
main
