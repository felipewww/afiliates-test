FROM node:16-slim

WORKDIR /app

RUN npm install -g typescript

COPY _docker/entrypoint.sh /entrypoint.sh
RUN chmod 777 /entrypoint.sh
