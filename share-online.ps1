# Zivara - Public Share Link Runner
Write-Host "======================================================================" -ForegroundColor Yellow
Write-Host "       ZIVARA - SHARE LIVE PUBLIC LINK WITH FRIENDS" -ForegroundColor Gold
Write-Host "======================================================================" -ForegroundColor Yellow
Write-Host ""

$rootDir = $PSScriptRoot

Write-Host "1. Starting Backend (Port 8001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; .\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8001"

Write-Host "2. Starting Frontend (Port 5174)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; npm.cmd run dev"

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "3. Generating secure public HTTPS link with Cloudflare Tunnel..." -ForegroundColor Yellow
Write-Host "Share the resulting https://....trycloudflare.com link with your friends!" -ForegroundColor Green
Write-Host ""

& "$rootDir\cloudflared.exe" tunnel --url http://localhost:5174
