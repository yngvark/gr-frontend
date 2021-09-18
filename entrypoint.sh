#!/usr/bin/env bash

# Config
if [ -z $1 ]; then
  echo Missing argument: target directory
  exit 1
fi

TARGET_DIR=$1

# Convert to JSON
CONFIG_AS_JSON=$(jq --null-input --arg backendUrl $GAME_BACKEND_URL '{"backendUrl": $backendUrl }')
echo "window.Gridwalls = $CONFIG_AS_JSON" > $TARGET_DIR/config.js

# Display config
echo
echo Client config:
cat "$TARGET_DIR/config.js"
echo

# Run
node server/node_server.js