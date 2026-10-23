#!/usr/bin/env bash
# Runs on the VPS (called by GitHub Actions, or by hand to roll back):
#   IMAGE=ghcr.io/<owner>/<repo>:<commit-sha> ./deploy.sh
# Backs up the database, pulls the image, restarts the stack and waits for the 3 servers to answer.
set -euo pipefail
cd "$(dirname "$0")"

: "${IMAGE:?IMAGE must be set, e.g. ghcr.io/<owner>/<repo>:latest}"
export IMAGE

if [ ! -f .env ]; then
    echo "ERROR: $(pwd)/.env is missing — create it from .env.production.example" >&2
    exit 1
fi

env_value() { grep -E "^$1=" .env | tail -n 1 | cut -d= -f2- | tr -d '"\r'; }

# Pin the image in docker-compose.override.yml (compose loads it on its own), so manual
# `docker compose exec/logs/ps` use the deployed image too. .env stays untouched (it may be root-owned).
cat > docker-compose.override.yml <<EOF
# Written by deploy.sh: the image currently deployed. Do not edit.
services:
  app:
    image: ${IMAGE}
EOF
PORTS=()
for name in API_PORT CDN_PORT APP_PORT; do
    port="$(env_value "$name")"
    : "${port:?$name must be set in .env}"
    PORTS+=("$port")
done

# ── Backup before deploying (keeps the 14 most recent) ───────────────────────
mkdir -p backups
if [ -n "$(docker compose ps --status running -q app 2>/dev/null)" ]; then
    backup="backups/mongo_$(date +%Y%m%d_%H%M%S).archive.gz"
    echo "Backing up database to $backup"
    docker compose exec -T app mongodump --archive --gzip --quiet > "$backup"
    ls -1t backups/*.archive.gz | tail -n +15 | xargs -r rm --
fi

# ── Deploy ───────────────────────────────────────────────────────────────────
echo "Deploying $IMAGE"
docker compose pull app
docker compose up -d --remove-orphans

# ── Health check: any HTTP answer (even a 404) means the server is up ────────
echo "Waiting for the app on ports ${PORTS[*]}"
for _ in $(seq 1 30); do
    up=0
    for port in "${PORTS[@]}"; do
        curl -sS -o /dev/null "http://127.0.0.1:${port}/" 2>/dev/null && up=$((up + 1))
    done
    if [ "$up" -eq "${#PORTS[@]}" ]; then
        echo "App is up — $IMAGE"
        echo "$IMAGE" > .deployed_image
        docker image prune -f > /dev/null
        exit 0
    fi
    sleep 2
done

echo "ERROR: the app did not answer within 60 s. Last logs:" >&2
docker compose logs --tail 80 app >&2
if [ -f .deployed_image ]; then
    echo "Roll back with: IMAGE=$(cat .deployed_image) ./deploy.sh" >&2
fi
exit 1
