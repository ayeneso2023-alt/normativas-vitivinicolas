#!/bin/bash
# sync.sh - Ejecución directa e inmediata de la sincronización con el BOE
cd "$(dirname "$0")" || exit 1
node sync_boe_normativas.js
