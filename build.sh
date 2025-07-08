#!/bin/bash

# Build all applications
npm run build:all

# Create output directory structure
mkdir -p apps/host/dist/auth
mkdir -p apps/host/dist/clients
mkdir -p apps/host/dist/ui

# Copy built files to the main output directory
cp -r apps/auth/dist/* apps/host/dist/auth/
cp -r apps/clients/dist/* apps/host/dist/clients/
cp -r libs/ui/dist/* apps/host/dist/ui/

echo "Build completed successfully!"
