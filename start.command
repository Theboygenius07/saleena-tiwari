#!/bin/bash
# Double-click this file in Finder to run the portfolio locally.
# It serves the site the way Vercel does: / is the passport, and pages have
# clean addresses (/projects, /craft, ...). Nothing is cached, so refreshes are current.

cd "$(dirname "$0")" || exit 1
PORT=8000
while lsof -i ":$PORT" >/dev/null 2>&1; do PORT=$((PORT + 1)); done
echo "Serving the portfolio at http://localhost:$PORT  (Ctrl+C to stop)"
( sleep 1; open "http://localhost:$PORT/" ) &
python3 serve.py "$PORT"
