#!/usr/bin/env bash

GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e  "${GREEN} Composing Backend container ${NC} ${YELLOW} ${NC}"

npm install && npm run start:dev
