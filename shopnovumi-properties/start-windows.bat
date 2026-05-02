@echo off
cd /d "%~dp0"
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
  echo.
  echo npm install failed. Please install Node.js LTS from https://nodejs.org then try again.
  pause
  exit /b %errorlevel%
)
echo.
echo Starting Shopnovumi Properties website...
npm run dev
pause
