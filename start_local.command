#!/bin/bash
set -e
cd "$(dirname "$0")"
PORT=8766
python3 -m http.server "$PORT" >/tmp/kards_lite_server.log 2>&1 &
SERVER_PID=$!
sleep 1
open "http://127.0.0.1:$PORT"
echo "Kards Lite 已打开：http://127.0.0.1:$PORT"
echo "关闭终端窗口或执行 kill $SERVER_PID 可停止服务。"
wait $SERVER_PID
