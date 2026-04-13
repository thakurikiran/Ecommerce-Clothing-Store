# Ecommerce Clothing Store

Production-focused ecommerce monorepo with three deployable services:

- Customer storefront (React + Vite + Nginx)
- Admin dashboard (React + Vite + Nginx)
- Backend API (Node.js + Express + MongoDB + Cloudinary)

This repository is structured for containerized deployment with Docker Compose and includes separate build contexts for each service.

## Architecture

| Service        | Directory   | Runtime                  | Container Port | Default Host Port |
| -------------- | ----------- | ------------------------ | -------------- | ----------------- |
| Backend API    | `Backend/`  | Node.js 20 (alpine)      | 4000           | 4000              |
| Frontend Store | `Frontend/` | Nginx serving Vite build | 80             | 80                |
| Admin Panel    | `admin/`    | Nginx serving Vite build | 80             | 8080              |

## Repository Layout

```text
.
|- Backend/      # Express API, models, controllers, middleware
|- Frontend/     # Customer-facing React app
|- admin/        # Admin React app
|- docker-compose.yml
`- README.md
```

## Prerequisites

- Docker 24+ and Docker Compose v2
- MongoDB connection string (Atlas or self-hosted)
- Cloudinary account for image uploads

## Environment Variables

Create a root `.env` file before running Docker Compose.

```env
# Backend service
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=replace-with-strong-password
CLOUDINARY_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET_KEY=your-cloudinary-secret

# Public host ports (optional overrides)
BACKEND_PUBLIC_PORT=4000
FRONTEND_PUBLIC_PORT=80
ADMIN_PUBLIC_PORT=8080

# Build-time API URLs for frontend/admin
FRONTEND_VITE_BACKEND_URL=http://localhost:4000
ADMIN_VITE_BACKEND_URL=http://localhost:4000
```

Notes:

- `MONGODB_URI` should point to your MongoDB server root URI; the backend appends `/e-commerce` automatically.
- Never commit real secrets. Use your deployment platform secret manager in production.

## Run With Docker Compose

```bash
docker compose --env-file .env up -d --build
docker compose ps
```

Service URLs:

- Storefront: `http://localhost:${FRONTEND_PUBLIC_PORT:-80}`
- Admin panel: `http://localhost:${ADMIN_PUBLIC_PORT:-8080}`
- Backend API: `http://localhost:${BACKEND_PUBLIC_PORT:-4000}`

Health checks:

- Frontend Nginx: `/health`
- Admin Nginx: `/health`
- Backend API: `/`

Stop services:

```bash
docker compose down
```

## Local Development (Without Docker)

### 1) Backend

```bash
cd Backend
npm ci
npm run server
```

### 2) Frontend

```bash
cd Frontend
npm ci
# PowerShell
$env:VITE_BACKEND_URL="http://localhost:4000"
npm run dev
```

### 3) Admin

```bash
cd admin
npm ci
# PowerShell
$env:VITE_BACKEND_URL="http://localhost:4000"
npm run dev
```

## API Surface (Current)

Base URL: `http://localhost:4000`

User routes:

- `POST /api/user/register`
- `POST /api/user/login`
- `POST /api/user/admin`

Product routes:

- `GET /api/product/list`
- `POST /api/product/list`
- `POST /api/product/add` (admin token required in `token` header)
- `POST /api/product/remove` (admin token required in `token` header)

## Production Deployment Guidance

### Security Baseline

- Set a strong `JWT_SECRET` (at least 32 random characters).
- Use secret injection from your platform (AWS Secrets Manager, GCP Secret Manager, Vault, etc.).
- Restrict CORS to trusted storefront/admin origins.
- Run behind TLS termination (Nginx, Traefik, cloud load balancer).
- Enforce least-privilege MongoDB and Cloudinary credentials.

### Operational Baseline

- Enable centralized logs for all three containers.
- Add container health checks and restart policies (already set to `unless-stopped`).
- Add uptime, latency, and error-rate monitoring on backend endpoints.
- Schedule MongoDB backups and verify restore drills.
- Pin and regularly patch base container images.

### Deployment Workflow (Recommended)

1. Build and tag immutable images per service.
2. Run vulnerability scan on images.
3. Deploy images with environment-specific secrets.
4. Run smoke checks (`/`, `/health`, login flow, product list).
5. Promote to production after validation.

## Troubleshooting

- Backend fails to start with MongoDB error:
  - Verify `MONGODB_URI` format and network access.
  - Confirm credentials and IP allowlist on MongoDB provider.
- Frontend/admin cannot reach API:
  - Ensure `FRONTEND_VITE_BACKEND_URL` and `ADMIN_VITE_BACKEND_URL` point to the reachable backend URL.
- Image upload failures:
  - Check Cloudinary environment variables and account limits.

## Notes About Current Scope

- The repository includes cart/order modules, but `server.js` currently mounts user and product routers only.
- If you enable additional routes, update this README and deployment smoke tests accordingly.

## License

No license file is currently defined in this repository.
