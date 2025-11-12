# Project Dashboard

Next.js App Router experience that surfaces public, read-only project metrics from Supabase views. It includes Tailwind-based UI, server components with ISR, and client-side filters synced to the URL for easy sharing.

## Getting started

```bash
npm install
npm run dev
# visit http://localhost:3000/projects
```

Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present in your `.env.local` before running locally.

## Deploy checklist

- [ ] **Supabase seeds** — run your seed script or SQL migrations and spot-check both `project_public` and `updates_public` views for the latest data.
- [ ] **Environment variables** — set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` (git-ignored) and in every Vercel environment.
- [ ] **Local smoke test URLs** — load `/projects`, filter/search combinations, and at least one `/projects/<id>` route to confirm data and routing behave correctly.
- [ ] **404 behavior** — navigate to a bogus `/projects/<id>` and ensure the custom not-found screen appears.
- [ ] **Loading states** — confirm the skeleton UIs render while `/projects` and `/projects/[id]` fetch data.
- [ ] **Vercel deploy steps** — follow `DEPLOY.md` to connect the repo, configure env vars, and run a production build.
