# Job Tracker

Job Tracker is a full-stack TypeScript application that syncs job-related emails from Gmail, parses application details, stores them in PostgreSQL, and shows them in a dashboard.

## What It Does

- Google OAuth2 login and session-based authentication
- Gmail sync for job emails (LinkedIn + Indeed filters), with support for more platforms coming soon
- Rule-based parsing for company, role, location, platform, and status
- Bulk upsert into `applications` with dedupe via unique conflict keys
- Dashboard with date-range sync, applications table, KPIs, filters, and loading states

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js + Express
- TypeScript (`ts-node` in dev)
- PostgreSQL (`pg`)
- Google APIs (`googleapis`)
- Session persistence with `express-session` + `connect-pg-simple`

## Project Structure

```text
Job Tracker/
├── src/                          # Frontend
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom hooks (auth, etc.)
│   ├── pages/                    # Route-level pages
│   ├── types/                    # Frontend types
│   └── utils/                    # Frontend helper functions
├── server/                       # Backend
│   ├── src/
│   │   ├── configs/              # DB + Google OAuth config
│   │   ├── controllers/          # Route handlers
│   │   ├── middlewares/          # Session + CORS middleware
│   │   ├── routes/               # API route definitions
│   │   ├── types/                # Backend types
│   │   └── utils/                # Parsing/utility helpers
│   └── package.json
└── package.json
```

## Current Key Flows

### 1) Authentication

- `GET /auth/google` starts Google OAuth flow
- `GET /auth/google/callback` exchanges code and saves user/tokens
- Session is stored in PostgreSQL (survives server restarts)
- `GET /auth/health` checks login state for frontend bootstrapping
- `POST /auth/logout` ends session

### 2) Mail Sync

- `GET /mail/sync?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- Uses Gmail query to fetch relevant job emails
- Parses content with mail parser utilities
- Stores in `applications` using bulk insert + `ON CONFLICT DO NOTHING`

### 3) Applications Read

- `GET /applications?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- Returns applications for logged-in user in selected date range

## Environment Variables

Create `.env` in `server/`:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:5173
```

Create `.env` in project root for frontend:

```env
VITE_API_URL=http://localhost:3001
```

## Database Notes

Minimum required tables:
- `users`
- `oauth_tokens`
- `applications`
- `session` (auto-created by `connect-pg-simple` when enabled)

Recommended unique constraint for dedupe:

```sql
ALTER TABLE applications
ADD CONSTRAINT uniq_source_email UNIQUE (user_id, source_email_id);
```

## Run Locally

### 1) Install dependencies

```bash
# frontend deps (root)
npm install

# backend deps
cd server
npm install
```

### 2) Start backend

```bash
cd server
npm run dev
```

Runs on `http://localhost:3001`

### 3) Start frontend

```bash
# from project root
npm run dev
```

Runs on `http://localhost:5173`

## Scripts

### Root (frontend)
- `npm run dev` - start Vite dev server
- `npm run build` - type-check + build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build

### `server/` (backend)
- `npm run dev` - start server with nodemon + ts-node
- `npm run build` - compile TS
- `npm run start` - run compiled JS

## Frontend Functionality

- Protected routes (`/login`, `/dashboard`)
- Login page with Google sign-in
- Dashboard header with user profile + date range picker
- Manual Sync Mails trigger
- Table view for applications
- KPI cards derived from application data
- Loading spinner while sync/applications fetch is in progress

## Backend Functionality

- Session-based auth and health check
- Gmail read-only scope integration
- Job email filtering via Gmail search query
- Email body extraction (`text/plain` and `text/html`)
- Status detection (`applied`, `rejected`, `other`)
- Bulk database persistence with conflict-safe dedupe

## API Summary

- `GET /auth/google`
- `GET /auth/google/callback`
- `GET /auth/health`
- `POST /auth/logout`
- `GET /mail/sync?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /applications?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

## Notes

- Keep frontend and backend running in separate terminals.
- Ensure Google OAuth redirect URL matches backend callback:
  `http://localhost:3001/auth/google/callback`
- Use secure cookies/HTTPS and stricter CORS values in production.
