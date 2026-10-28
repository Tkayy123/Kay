@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === Tao file nghe (mp3) cho Hoc tieng Viet ===
where py >nul 2>nul && (set PY=py) || (set PY=python)
%PY% -m pip install --quiet edge-tts
if errorlevel 1 (echo Chua cai Python. Tai tai https://www.python.org/downloads/ roi chay lai. & pause & exit /b 1)
%PY% tools\make_audio.py
echo.
echo Xong. Dua ca thu muc audio\ len web cung app.
pause
