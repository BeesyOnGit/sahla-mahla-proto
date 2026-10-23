# One container: MongoDB, the API (Serveur), the CDN and the built ClientApp, started by deploy/start.sh.
# All runtime config comes from the single .env on the VPS (see deploy/.env.production.example).

# ─── Build ───────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY Serveur/package*.json Serveur/
COPY Cdn/package*.json Cdn/
COPY ClientApp/package*.json ClientApp/
RUN npm ci --prefix Serveur && npm ci --prefix Cdn && npm ci --prefix ClientApp
COPY Serveur Serveur
COPY Cdn Cdn
COPY ClientApp ClientApp
# The front end is built with placeholders that start.sh replaces with the .env values
RUN npm run build --prefix Serveur \
    && npm run build --prefix Cdn \
    && VITE_API_URL=__VITE_API_URL__ VITE_CDN_URL=__VITE_CDN_URL__ npm run build --prefix ClientApp \
    && npm prune --omit=dev --prefix Serveur \
    && npm prune --omit=dev --prefix Cdn

# ─── Runtime ─────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim
# MongoDB runs in this container too (mongod + mongodump for the deploy backups)
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl gnupg \
    && curl -fsSL https://pgp.mongodb.com/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/mongodb.gpg] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" > /etc/apt/sources.list.d/mongodb.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends mongodb-org-server mongodb-database-tools \
    && apt-get purge -y gnupg && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/Serveur/dist Serveur/dist
COPY --from=build /app/Serveur/node_modules Serveur/node_modules
COPY --from=build /app/Cdn/dist Cdn/dist
COPY --from=build /app/Cdn/node_modules Cdn/node_modules
COPY --from=build --chown=node /app/ClientApp/dist ClientApp/dist
COPY deploy/web.js Serveur/web.js
COPY deploy/start.sh start.sh
# Database (/data/db) and CDN files (Media, Resources, watermark) live in a volume mounted here
RUN mkdir -p /data && chown node /data
USER node
CMD ["bash", "start.sh"]
