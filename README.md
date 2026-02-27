# Task Tracker Dashboard

A Kanban-style task management dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Neon PostgreSQL.

## Features

- **Kanban Board** — Tasks organized in three columns: To Do, In Progress, Done
- **CRUD Operations** — Create, view, edit, and delete tasks
- **Search & Filter** — Filter tasks by status, priority, or search by title
- **Responsive Design** — Works on desktop (3-column) and mobile (stacked)
- **Server Components** — Data fetched server-side for fast initial loads
- **Loading & Error States** — Skeleton loaders and error boundaries throughout

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Database:** Neon (serverless PostgreSQL)
- **ORM:** Drizzle ORM
- **Testing:** Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) account (free tier works)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a new project in the [Neon Console](https://console.neon.tech)
   - Copy your connection string

4. **Configure environment variables**
   Create a `.env.local` file in the project root:
   ```
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

5. **Push the database schema**
   ```bash
   npm run db:push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
npm run test
```

## Architecture Decisions

### Why Server Components for Data Fetching
The dashboard page is a Server Component that fetches tasks directly from the database. This avoids client-side loading waterfalls, provides instant data on page load, and keeps database credentials server-side. Interactive parts (TaskBoard, filters, modals) are Client Components.

### Why Drizzle ORM
Drizzle provides type-safe database queries with a minimal runtime footprint. Schema is defined in TypeScript, giving us inferred types (`InferSelectModel`) that stay in sync with the database. `drizzle-kit push` handles schema migrations without migration files.

### Why Neon
Neon's serverless PostgreSQL driver (`@neondatabase/serverless`) uses HTTP-based queries, which work well with serverless environments like Vercel. No connection pooling needed.

### Search & Filtering via URL Params
Filters use URL search params (`?status=todo&priority=high`) so filtered views are shareable and bookmarkable. The server reads these params and filters data before rendering.

## Trade-offs

- **No drag-and-drop:** Kept the Kanban board simple with click-to-edit status changes instead of drag-and-drop, to stay within scope.
- **No authentication:** Tasks are shared globally. Auth could be added with NextAuth.js.
- **Server-side filtering:** All tasks are fetched then filtered in-memory. For large datasets, filtering should happen at the database query level.
- **No optimistic updates:** Mutations wait for the server response before updating the UI. This is simpler and guarantees data consistency.

## Deployment

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `DATABASE_URL` as an environment variable in Vercel project settings
4. Deploy
