# DeskHQ — by CreatiVibe Labs

> All-in-one workspace platform for teams and organizations.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Core API | Laravel 13 |
| Realtime | Node.js + Socket.IO |
| AI Service | Python + FastAPI |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Storage | AWS S3 / MinIO (local) |
| Deployment | AWS ECS + CloudFront |

## Repository Structure

\`\`\`
deskhq/
├── backend/          Laravel Core API
├── frontend/         Next.js Frontend
├── node-services/    Node.js Realtime Services
├── python-ai/        Deskee AI Service
├── docker/           Docker configs
├── .github/          CI/CD Pipelines
└── docs/             Documentation
\`\`\`

## Quick Start

See [docs/local-setup.md](docs/local-setup.md) for full local development setup.

## Branches

| Branch | Purpose |
|---|---|
| `main` | Production |
| `develop` | Staging / Development |
| `feature/*` | Feature branches |
| `hotfix/*` | Emergency fixes |

## Modules

- Employee Management
- Client Management
- Chatting
- Task Management
- Project Management
- Payments & Invoicing
- CRM
- Revenue Management
- File Management & Sharing
- Source Code Management
- Deskee AI
- HR Management
- Asset Management