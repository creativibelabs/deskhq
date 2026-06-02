# DeskHQ — Local Development Setup

## Prerequisites

Install these before anything else:

| Tool | Version | Download |
|---|---|---|
| Git | Latest | https://git-scm.com |
| Node.js | 22.x LTS | https://nodejs.org |
| PHP | 8.3+ | https://windows.php.net |
| Composer | Latest | https://getcomposer.org |
| Python | 3.12+ | https://python.org |
| Docker Desktop | Latest | https://docker.com |

## Step 1 — Clone the repository

\`\`\`bash
git clone https://github.com/creativibelabs/deskhq.git
cd deskhq
\`\`\`

## One Click or steps below

Double Click on start-dev.bat

## Step 2 — Start Docker services

\`\`\`bash
docker compose up -d
\`\`\`

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- MinIO on port 9000 (UI: 9001)
- pgAdmin on port 5050
- Mailpit on port 8025

## Step 3 — Laravel setup

\`\`\`bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
php artisan serve
\`\`\`

## Step 4 — Next.js setup

\`\`\`bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
\`\`\`

## Step 5 — Node.js services setup

\`\`\`bash
cd node-services
npm install
cp .env.example .env
npm run dev
\`\`\`

## Step 6 — Python AI setup

\`\`\`bash
cd python-ai
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python main.py
\`\`\`

## Running Services

| Service | URL | Credentials |
|---|---|---|
| Frontend | http://localhost:3000 | — |
| Laravel API | http://localhost:8000 | — |
| Node.js | http://localhost:3001 | — |
| Deskee AI | http://localhost:8001 | — |
| pgAdmin | http://localhost:5050 | admin@deskhq.com / admin123 |
| MinIO Console | http://localhost:9001 | deskhq_minio / deskhq_minio_secret |
| Mailpit | http://localhost:8025 | — |

## Default Login

\`\`\`
Email: admin@creativibelabs.com
Password: Admin@DeskHQ#2026
Role: prod_admin
\`\`\`

## Branch Strategy

\`\`\`bash
# Always branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# When done
git push origin feature/your-feature-name
# Open PR to develop
\`\`\`