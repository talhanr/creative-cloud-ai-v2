#!/usr/bin/env bash
# Visual QA helper: (re)start the production server on :3456. Usage: scripts/serve.sh [logfile]
LOG=${1:-/dev/null}
for p in $(ss -ltnp 2>/dev/null | grep ':3456 ' | grep -oE 'pid=[0-9]+' | cut -d= -f2 | sort -u); do kill "$p"; done
sleep 0.5
nohup npx next start -p 3456 > "$LOG" 2>&1 &
for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:3456/ && exit 0; sleep 0.5; done
echo "server did not start"; exit 1
