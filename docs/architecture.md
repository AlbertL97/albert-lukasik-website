# Architecture

## Overview

A Next.js 16 App Router application deployed on Vercel with Supabase as the data layer. The architecture is deliberately simple — no build-time CMS, no static site generation for dynamic content, no complex caching strategy. The goal is reliable 24/7 delivery with the lowest possible maintenance burden.

## Stack Decisions

### Next.js 16 (App Router)
Chosen because:
- Server Components eliminate client-side data fetching boilerplate
- Route groups enable clean separation of public and admin layouts
- `proxy.ts` (Next.js 16 renamed `middleware.ts`) provides edge-level route protection
- Vercel deployment is seamless with zero config
- Free tier covers all traffic a personal academic website will ever generate

### Tailwind CSS v4
CSS-first configuration with `@theme` block — no `tailwind.config.ts` needed. Dark academic design tokens are CSS custom properties that map directly to utility classes (`bg-da-bg`, `text-da-accent`, etc.).

### Supabase
Single-provider approach for database, file storage, and (optional) auth. Free tier provides:
- 500MB PostgreSQL
- 1GB file storage
- Unlimited API requests

Trade-off: free tier pauses after 1 week of inactivity. Mitigated with a simple cron ping service.

### Custom JWT Auth (not NextAuth, not Supabase Auth)
For a single-admin personal website, a custom credentials flow is more appropriate than a full OAuth/SSO library:
- No external auth provider dependency
- Admin credentials stored as env vars (email + bcrypt hash)
- Short-lived JWT signed with `jose`, stored in httpOnly cookie
- Route protection in `src/proxy.ts`
- No user table, no session table, no magic links

### Vercel (free tier)
- 24/7 availability — serverless functions run on demand
- Automatic HTTPS
- Git-based deploys: every push to `main` triggers a redeploy
- 100GB bandwidth/month on free tier (far more than a personal site needs)

## Data Flow

```
Public user
  → Vercel CDN / serverless
    → Next.js Server Component
      → Supabase anon key (read-only, RLS enforces published-only)
        → PostgreSQL
          → Server Component renders HTML
            → Response to browser

Admin user
  → Request hits proxy.ts
    → JWT cookie verified
      → If valid: proceed to /admin/* route
      → If invalid: redirect to /admin/login
  → Admin API routes use SUPABASE_SERVICE_ROLE_KEY (server-only)
    → Bypasses RLS, can read/write all content
```

## Auth Flow

```
1. Admin visits /admin/login
2. Submits email + password
3. POST /api/auth/login
4. Server: compare password against ADMIN_PASSWORD_HASH (bcrypt)
5. If match: sign JWT with jose, set as httpOnly cookie da_admin_token
6. Redirect to /admin (dashboard)
7. All subsequent /admin/* requests: proxy.ts reads cookie, verifies JWT
8. JWT expires after 7 days; login again to refresh
```

## Content Security

- **RLS policies**: anon key can only read rows where `status = 'published'`
- **Service role key**: never sent to the browser; only used in server-side API routes
- **Admin routes**: protected by `proxy.ts` at the network level
- **Draft content**: never accessible via anon key (RLS blocks it)
- **Image storage**: Supabase Storage `media` bucket is public (images are served directly)

## Directory Conventions

| Path | Purpose |
|------|---------|
| `src/app/(public)/` | Public pages — all get Header + Footer via layout |
| `src/app/admin/login/` | Login page — no sidebar |
| `src/app/admin/(panel)/` | Admin pages — all get AdminLayout sidebar |
| `src/app/api/` | API routes — server-only |
| `src/components/layout/` | Layout wrappers |
| `src/components/ui/` | Reusable UI components |
| `src/lib/supabase/` | Supabase client factories + query helpers |
| `src/lib/auth.ts` | JWT + password utilities |
| `src/types/index.ts` | Shared TypeScript types |
| `src/proxy.ts` | Route protection (Next.js 16) |
| `docs/schema.sql` | Database schema — run once in Supabase |
