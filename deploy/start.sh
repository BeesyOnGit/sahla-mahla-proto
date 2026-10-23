#!/usr/bin/env bash
# Container entrypoint: fills the front-end config from the environment, then runs MongoDB and the 3 servers.
# If any of them exits, the container stops and Docker restarts it.
set -euo pipefail
cd /app

# On stop (or if one process dies), stop the others cleanly so MongoDB flushes to disk
trap 'exit 0' TERM INT
trap 'kill $(jobs -p) 2>/dev/null; wait' EXIT

sed -i "s#__VITE_API_URL__#${VITE_API_URL}#g; s#__VITE_CDN_URL__#${VITE_CDN_URL}#g" ClientApp/dist/assets/*.js
mkdir -p /data/db "$MEDIA_SAVE_PATH" "$RESOURCES_SAVE_PATH"

# Only reachable from inside the container; the API connects to it on 127.0.0.1:27017
mongod --dbpath /data/db --bind_ip 127.0.0.1 --quiet &
PORT="$API_PORT" node Serveur/dist/App.js &
PORT="$CDN_PORT" node Cdn/dist/App.js &
PORT="$APP_PORT" node Serveur/web.js &

wait -n
exit 1
