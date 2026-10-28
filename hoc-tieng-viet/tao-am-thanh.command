#!/usr/bin/env bash
# Tạo file nghe (mp3). macOS: bấm đúp file này. Linux: chạy ./tao-am-thanh.command
cd "$(dirname "$0")"
PY=$(command -v python3 || command -v python) || { echo "Chưa cài Python 3: https://www.python.org/downloads/"; read -p "Enter để thoát"; exit 1; }
"$PY" -m pip install --quiet edge-tts 2>/dev/null || "$PY" -m pip install --quiet --break-system-packages edge-tts
"$PY" tools/make_audio.py
echo; echo "Xong. Đưa cả thư mục audio/ lên web cùng app."; read -p "Enter để đóng"
