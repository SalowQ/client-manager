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

# Copy index.html files for direct access
cp apps/auth/index.html apps/host/dist/auth/index.html
cp apps/clients/index.html apps/host/dist/clients/index.html

# Copy public files
cp -r apps/host/public/* apps/host/dist/

echo "Build completed successfully!"
