# Albert Łukasik — Personal Website

Personal academic portfolio for Albert Łukasik: PhD Researcher, VR Educator, and UX Researcher at the intersection of cognitive science, neuroscience, and human-computer interaction.

## Tech Stack

| Layer        | Technology                                  |
|-------------|---------------------------------------------|
| Framework   | Next.js 16 (App Router, React 19)           |
| Styling     | Tailwind CSS v4 + @tailwindcss/typography   |
| Database    | Supabase (PostgreSQL)                       |
| Storage     | Supabase Storage                            |
| Auth        | Custom JWT (bcryptjs + jose)                |
| Hosting     | Vercel (free tier, 24/7)                    |
| Language    | TypeScript                                  |

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 20.9+
- npm 11+
- A free [Supabase](https://supabase.com) account

### 2. Clone and install
```bash
git clone https://github.com/AlbertL97/personal-website
cd personal-website
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → New query
3. Paste the contents of `docs/schema.sql` and run it
4. Go to **Storage** → Create a bucket named `media` (set to Public)
5. Copy your project URL and keys from **Settings → API**

### 4. Configure environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local`:
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase settings
- Set `SUPABASE_SERVICE_ROLE_KEY` from Supabase settings (keep this secret — never share it)
- Set `ADMIN_EMAIL` to your email address
- Generate and set `ADMIN_PASSWORD_HASH`:
  ```bash
  node -e "const b=require('bcryptjs'); b.hash('your-password',12).then(console.log)"
  ```
- Generate and set `AUTH_SECRET`:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### 5. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Deployment (Vercel — free, 24/7)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/AlbertL97/personal-website
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository (`AlbertL97/personal-website`)
3. Add all environment variables from `.env.example` with real values
4. Deploy — done. Live at `albert-lukasik.vercel.app`

Every `git push` to `main` triggers an automatic redeploy.

### 3. Keep Supabase active (free tier)
Supabase free tier pauses after 1 week of inactivity. To prevent this:
- Set up a free ping at [cron-job.org](https://cron-job.org) to request your site URL every 3 days
- Or upgrade to Supabase Pro ($25/month) for always-on

## Admin Panel

Access at `/admin/login` with your configured email and password.

**What you can manage:**
- Research projects (create, edit, publish, archive)
- Teaching entries
- Workshops
- Blog posts and vlog entries (draft → publish workflow)
- Gallery photos (upload via Supabase Storage)
- External resource links
- Site settings (bio, tagline, contact info)

See `docs/admin-guide.md` for detailed instructions.

## Content Workflow

1. Log into admin panel at `/admin/login`
2. Create or edit content (saved as **draft** by default)
3. Change status to **Published** to make it live on the public site
4. To hide: change status to **Archived** or **Private**

## Project Structure

```
src/
  app/
    (public)/          # Public-facing pages (with header + footer)
      page.tsx         # Home
      about/
      research/[slug]/
      teaching/
      workshops/
      blog/[slug]/
      gallery/
      resources/
      contact/
    admin/
      login/           # Login page (no sidebar)
      (panel)/         # Protected admin pages (with sidebar)
        page.tsx       # Dashboard
        projects/
        posts/
        teaching/
        workshops/
        gallery/
        resources/
        settings/
    api/               # API routes
      auth/login|logout|me/
      projects/[id]/
      posts/[id]/
      teaching/[id]/
      workshops/[id]/
      gallery/[id]/
      resources/[id]/
      settings/
      upload/
  components/
    layout/            # Header, Footer, AdminLayout, PublicLayout
    ui/                # Badge, Button, SectionHeader
  lib/
    auth.ts            # JWT sign/verify, password hash
    utils.ts           # Utility functions
    supabase/
      client.ts        # Browser Supabase client
      server.ts        # Server Supabase client (createClient + createServiceClient)
      queries.ts       # Read query functions
  types/index.ts       # All TypeScript types
  proxy.ts             # Route protection (Next.js 16 uses proxy.ts, not middleware.ts)
docs/
  schema.sql           # Full database schema — run in Supabase SQL editor
  architecture.md      # Architecture decisions
  deployment.md        # Detailed deployment guide
  content-model.md     # Data models reference
  admin-guide.md       # Admin panel user guide
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (server-only) |
| `ADMIN_EMAIL` | ✅ | Your admin login email |
| `ADMIN_PASSWORD_HASH` | ✅ | bcrypt hash of your admin password |
| `AUTH_SECRET` | ✅ | Random 32+ char secret for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | Optional | Full site URL for metadata |
