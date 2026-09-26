#!/bin/bash
# scripts/auto_sync_job.sh
# Ejecución periódica (cada 2 horas o programada) para sincronizar normativas con el BOE y subirlas a GitHub

PROJECT_DIR="/Users/joseantoniocorralesortega/Documents/Normativas y reglamentos"
cd "$PROJECT_DIR" || exit 1

LOG_FILE="$PROJECT_DIR/logs/auto_sync.log"
mkdir -p "$PROJECT_DIR/logs"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🔄 Iniciando auto-sync programado de normativas..." >> "$LOG_FILE"

NODE_BIN="$(command -v node)"
if [ -z "$NODE_BIN" ]; then
    NODE_BIN="/usr/local/bin/node"
fi
if [ ! -f "$NODE_BIN" ]; then
    NODE_BIN="/opt/homebrew/bin/node"
fi

GIT_BIN="/Library/Developer/CommandLineTools/usr/bin/git"
if [ ! -f "$GIT_BIN" ]; then
    GIT_BIN="$(command -v git)"
fi

"$NODE_BIN" sync_boe_normativas.js >> "$LOG_FILE" 2>&1

# Agregar datos y metadatos actualizados
"$GIT_BIN" add data/metadata.json data/radar_live_boe.json normativas_metadata.js

if ! "$GIT_BIN" diff --staged --quiet; then
    FECHA_HORA=$(date "+%d/%m/%Y %H:%M:%S")
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚀 Nuevas disposiciones detectadas. Realizando commit y push a GitHub..." >> "$LOG_FILE"
    "$GIT_BIN" commit -m "Auto-sync oficial BOE y metadatos actualizados ($FECHA_HORA)" >> "$LOG_FILE" 2>&1
    "$GIT_BIN" push origin main >> "$LOG_FILE" 2>&1
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Push a GitHub completado con éxito." >> "$LOG_FILE"
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ℹ️ No hay cambios en disposiciones en este ciclo. Todo al día." >> "$LOG_FILE"
fi
