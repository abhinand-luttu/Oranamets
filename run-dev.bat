@echo off
echo ======================================================================
echo           ZIVARA - GUJARAT TRADITIONAL ORNAMENTS
echo           Shipped Directly from Gujarat to Your Doorstep
echo ======================================================================
echo.
echo Starting Backend (Django REST Framework on http://127.0.0.1:8001)...
start "Zivara Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe manage.py runserver 127.0.0.1:8001"

echo Starting Frontend (React + Vite on http://localhost:5174)...
start "Zivara Frontend" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"

echo.
echo Both servers are starting!
echo Frontend URL: http://localhost:5174
echo Backend URL:  http://127.0.0.1:8001
echo Admin Portal: http://127.0.0.1:8001/admin/
echo.
echo Default Admin Credentials:
echo   Username: admin
echo   Password: rajwadi@admin2026
echo ======================================================================
