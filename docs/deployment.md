# Deployment Guide

## Prerequisites

- GitHub account: github.com/AlbertL97
- Vercel account (free): vercel.com — sign in with GitHub
- Supabase account (free): supabase.com

---

## Step 1: Set Up Supabase

1. Log into [supabase.com](https://supabase.com) → **New project**
2. Name: `albert-lukasik-site` | Region: nearest to you | Set a strong DB password
3. Wait ~2 minutes for provisioning

### Run the database schema
1. In Supabase dashboard → **SQL Editor** → New query
2. Copy the entire contents of `docs/schema.sql`
3. Paste and click **Run**
4. You should see: "Success. No rows returned."

### Create the media storage bucket
1. In Supabase dashboard → **Storage** → **New bucket**
2. Name: `media`
3. Check **Public bucket** → Save
4. Go to **Policies** → Add policy for the `media` bucket:
   - Allow public SELECT: `true` (so images are publicly readable)

### Get your API keys
Go to **Settings → API**:
- Copy `Project URL` → this is `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role` key → this is `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

## Step 2: Prepare Environment Variables

Generate the values you'll need:

```bash
# Generate admin password hash (run in the project directory)
node -e "const b=require('bcryptjs'); b.hash('YourChosenPassword',12).then(console.log)"
# Copy the output — it starts with $2b$12$...

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the 64-char hex string
```

You'll need these values:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — from Supabase
- `ADMIN_EMAIL` — your email address
- `ADMIN_PASSWORD_HASH` — bcrypt hash from the command above
- `AUTH_SECRET` — hex string from the command above
- `NEXT_PUBLIC_SITE_URL` — `https://albert-lukasik.vercel.app`

---

## Step 3: Push to GitHub

```bash
cd "C:\Users\lukas\Desktop\Agents_workflow\Claude\Website\site"

git init
git add .
git commit -m "Initial website build"
git branch -M main
git remote add origin https://github.com/AlbertL97/personal-website.git
git push -u origin main
```

(Create the repo `personal-website` on GitHub first if it doesn't exist)

---

## Step 4: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository** → select `AlbertL97/personal-website`
3. Framework preset: **Next.js** (detected automatically)
4. In **Environment Variables**, add each variable:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `ADMIN_EMAIL` | Your email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash |
| `AUTH_SECRET` | Random hex secret |
| `NEXT_PUBLIC_SITE_URL` | `https://albert-lukasik.vercel.app` |

5. Click **Deploy**

The build takes ~2 minutes. Your site is live at `https://albert-lukasik.vercel.app`.

---

## Step 5: Verify Production

1. Open `https://albert-lukasik.vercel.app` — public site should load
2. Open `https://albert-lukasik.vercel.app/admin/login` — login with your email/password
3. Try creating a test project in the admin panel
4. Confirm it appears on the public Research page after publishing

---

## Keeping Supabase Active (Free Tier)

Supabase free tier pauses after 7 days of inactivity. Fix for free:

1. Go to [cron-job.org](https://cron-job.org) → Create free account
2. New cronjob → URL: `https://albert-lukasik.vercel.app/api/health` (or just the site URL)
3. Schedule: every 3 days
4. Save

This ping keeps the Supabase connection warm.

Alternatively, add a simple health check route:
```ts
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({ ok: true })
}
```

---

## Updates and Redeployment

Every `git push` to `main` triggers an automatic Vercel redeploy:
```bash
git add .
git commit -m "Update content or fix"
git push
```

Vercel builds and deploys in ~1–2 minutes. Zero downtime.

---

## Custom Domain (Optional)

If you get a custom domain (e.g., `albertlukasik.com`):
1. In Vercel → Project → **Settings → Domains**
2. Add your domain
3. Follow DNS instructions (add CNAME record at your domain registrar)
4. Update `NEXT_PUBLIC_SITE_URL` to your domain
5. Redeploy
