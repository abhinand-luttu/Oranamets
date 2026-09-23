@echo off
echo ======================================================================
echo           ZIVARA - SHARE LIVE PUBLIC LINK WITH FRIENDS
echo ======================================================================
echo.
echo 1. Ensuring Backend is running on port 8001...
start "Zivara Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe manage.py runserver 127.0.0.1:8001"

echo 2. Ensuring Frontend is running on port 5174...
start "Zivara Frontend" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"

timeout /t 3 >nul

echo.
echo 3. Creating instant mobile-friendly public HTTPS link...
echo ======================================================================
echo Look for the 'https://....lhr.life' link below and share it with friends!
echo ======================================================================
ssh -R 80:localhost:5174 -o StrictHostKeyChecking=no nokey@localhost.run
pause
