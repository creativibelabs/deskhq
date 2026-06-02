@echo off
echo Starting DeskHQ Local Dev Environment...

echo [1/5] Starting Docker services...
docker compose up -d

echo [2/5] Starting Laravel...
start "Laravel API" cmd /k "cd backend && php artisan serve"

echo [3/5] Starting Next.js...
start "Next.js" cmd /k "cd frontend && npm run dev"

echo [4/5] Starting Node.js...
start "Node Services" cmd /k "cd node-services && npm run dev"

echo [5/5] Starting Python AI...
start "Deskee AI" cmd /k "cd python-ai && venv\Scripts\activate && python main.py"

echo.
echo All services starting up. Open:
echo   Frontend (Next.js):  http://localhost:3000 -- run 'npm run dev' in /frontend
echo   Laravel API:         http://localhost:8000
echo   Node.js:             http://localhost:3001
echo   Deskee AI:           http://localhost:8001
echo   pgAdmin:             http://localhost:5050
echo   MinIO Console:       http://localhost:9001
echo   Mailpit:             http://localhost:8025
pause