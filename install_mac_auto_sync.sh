#!/bin/bash
# install_mac_auto_sync.sh
# Instala el servicio en segundo plano de macOS para actualizar normativas automáticamente cada 2 horas

PLIST_NAME="com.normativas.sync.plist"
SOURCE_PLIST="/Users/joseantoniocorralesortega/Documents/Normativas y reglamentos/scripts/$PLIST_NAME"
TARGET_DIR="$HOME/Library/LaunchAgents"
TARGET_PLIST="$TARGET_DIR/$PLIST_NAME"

echo "=========================================================="
echo "🍷 INSTALADOR DE AUTO-SINCRONIZACIÓN VITIVINÍCOLA EN MACOS"
echo "=========================================================="

mkdir -p "$TARGET_DIR"

# Descargar si ya estaba cargado
launchctl unload "$TARGET_PLIST" 2>/dev/null

# Copiar el plist actualizado
cp "$SOURCE_PLIST" "$TARGET_PLIST"

# Cargar el servicio en macOS launchd
launchctl load "$TARGET_PLIST"

echo "✅ Servicio instalado con éxito en: $TARGET_PLIST"
echo "🕒 Frecuencia: Cada 2 horas automáticamente en segundo plano"
echo "📝 Registro de logs en: /Users/joseantoniocorralesortega/Documents/Normativas y reglamentos/logs/auto_sync.log"
echo "=========================================================="
