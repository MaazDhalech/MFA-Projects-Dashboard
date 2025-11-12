# Deploying Project Dashboard

Follow these steps to ship the dashboard to Vercel with Supabase-backed data.

1. **Verify Supabase data**
   - Ensure the `project_public` and `updates_public` views exist and return rows.
   - Run your seed script or SQL to populate representative data before deploying.

2. **Connect the repository to Vercel**
   - Push your changes to the default branch.
   - Import the repo in Vercel and select the Next.js framework preset.

3. **Configure environment variables (all environments)**
   - `NEXT_PUBLIC_SUPABASE_URL` — copy from Supabase project settings.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the public anon key from Supabase.
   - Add them via `vercel env add` or the dashboard for Production, Preview, and Development targets.

4. **Optional: enable automatic revalidation**
   - The app already exports `revalidate = 60`, so no extra Cron task is needed.

5. **Trigger a build**
   - Run `npm install && npm run build` locally to confirm the bundle succeeds.
   - Deploy via `vercel --prod` or trigger a production deployment from the dashboard.

6. **Post-deploy smoke test**
   - Visit `/projects` and a couple of `/projects/<id>` pages.
   - Confirm loading states, filter URLs, and update feeds behave as expected.
