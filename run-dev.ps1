# Zivara - PowerShell Development Runner
Write-Host "======================================================================" -ForegroundColor Yellow
Write-Host "          ZIVARA - GUJARAT TRADITIONAL ORNAMENTS" -ForegroundColor Gold
Write-Host "          Shipped Directly from Gujarat to Your Doorstep" -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Yellow
Write-Host ""

$rootDir = $PSScriptRoot

Write-Host "Starting Django Backend on http://127.0.0.1:8001 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; .\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8001"

Write-Host "Starting React Frontend on http://localhost:5174 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; npm.cmd run dev"

Write-Host ""
Write-Host "Servers launched in separate windows!" -ForegroundColor Green
Write-Host "Frontend URL:  http://localhost:5174" -ForegroundColor White
Write-Host "Backend URL:   http://127.0.0.1:8001" -ForegroundColor White
Write-Host "Admin Portal:  http://127.0.0.1:8001/admin/" -ForegroundColor White
Write-Host ""
Write-Host "Admin Credentials:" -ForegroundColor Yellow
Write-Host "  Username: admin" -ForegroundColor White
Write-Host "  Password: rajwadi@admin2026" -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Yellow
