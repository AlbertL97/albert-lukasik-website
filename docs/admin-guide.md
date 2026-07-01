# Admin Panel Guide

## Logging In

1. Go to `/admin/login` on your site
2. Enter your configured `ADMIN_EMAIL` and password
3. You're redirected to the dashboard on success
4. Session lasts 7 days — then you'll need to log in again

**Note:** The admin login URL is not linked from the public site. Bookmark it.

---

## Dashboard

The dashboard shows:
- Count of published/draft content across all sections
- Quick-action buttons to create new content
- Recently updated items

---

## Managing Research Projects

**To add a project:**
1. Admin → Research & Projects → **New Project**
2. Fill in:
   - **Title** — required
   - **Slug** — auto-generated from title, can be edited
   - **Summary** — 1–2 sentence preview (shown in project cards)
   - **Description** — full project description (HTML/markdown supported)
   - **Project type** — academic research, UX research, VR education, etc.
   - **Role** — your role in the project
   - **Methods** — comma-separated (e.g. "EEG, usability testing, A/B testing")
   - **Technologies** — comma-separated
   - **Dates** — start date, optional end date
   - **Status** — planned / ongoing / completed / archived
   - **Visibility** — Draft (hidden) or Published (public)
3. Click **Save**

**To edit:** Research list → click project title or Edit button  
**To publish:** Change status from Draft → Published  
**To hide temporarily:** Change to Private (not visible publicly but not deleted)  
**To archive:** Change status to Archived

---

## Managing Blog & Vlog Posts

**To write a post:**
1. Admin → Blog / Vlog → **New Post**
2. Fill in:
   - **Title** and **Slug**
   - **Post type** — article / vlog / note / resource list
   - **Excerpt** — short preview text
   - **Content** — full post content
   - **Video URL** — for vlog entries (YouTube embed URL)
   - **Cover image URL** — upload to gallery first, copy URL
   - **Tags** — comma-separated
   - **Status** — Draft keeps it hidden; Published makes it live
3. Setting status to Published automatically sets the publication date

**To edit:** Blog list → click post or Edit button  
**To unpublish:** Change status back to Draft

---

## Managing Teaching Entries

**To add a course:**
1. Admin → Teaching → **New Entry**
2. Fill in course title, description, institution, academic year, level, topics
3. Set status to Published

Teaching entries are listed by display_order (lower number = shown first). Edit the display_order field to reorder.

---

## Managing Workshops

Similar to projects. Each workshop has:
- **Workshop status**: Available (currently offered) / Planned / Past / Archived
- **Format**: Onsite / Online / Hybrid
- **Topics** and **Learning outcomes** (comma-separated)

---

## Managing Gallery Photos

**To upload a photo:**
1. Admin → Gallery → **Add Photo**
2. Choose a file (JPEG/PNG, max 5MB)
3. The file uploads to Supabase Storage
4. Fill in: title, alt text (important for accessibility), date, location, category
5. Categories: conference / project / workshop / teaching / fieldwork / behind the scenes
6. Set status to Published

**Note:** Photos remain in Supabase Storage even after deleting the gallery entry. To fully remove, also delete from Supabase Storage console.

---

## Managing External Resources

**To add a link:**
1. Admin → Resources → **New Resource**
2. Fill in: title, URL, description, platform, category, display order
3. Set Published

Categories: social / academic / project / other  
Display order: lower = shown first

---

## Managing External Links

**To reorder links:** Edit each link and change the `display_order` number.

---

## Site Settings

Admin → Site Settings allows editing:
- **Name** (displayed in header and footer)
- **Tagline** (shown on homepage hero)
- **Bio** (about page and homepage)
- **Location**
- **Email** (shown in contact page and footer)
- **Avatar URL** (upload to gallery, copy the image URL)

---

## Content Visibility States

| Status | Visible publicly? | Notes |
|--------|------------------|-------|
| Draft | No | Default when creating. Work in progress. |
| Published | Yes | Live on the public site. |
| Private | No | Hidden but preserved. Use to temporarily hide. |
| Archived | No | Long-term storage. Use for old content. |

---

## Uploading Images

1. Go to Gallery → Add Photo (or use Settings for avatar)
2. Select your image file
3. After saving, you'll see the image URL
4. Copy this URL to use in projects, posts, or workshops

Alternatively: upload directly in Supabase Storage dashboard → `media` bucket → copy the public URL.

---

## Security Notes

- Never share your admin password or JWT secret
- If you suspect your session is compromised, change `AUTH_SECRET` in Vercel environment variables and redeploy (this invalidates all sessions)
- To change your password: generate a new bcrypt hash and update `ADMIN_PASSWORD_HASH` in Vercel, then redeploy
