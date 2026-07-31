# HCS Training Platform — Deployment Checklist

## Phase 2: Content Ingestion & Staging Deploy

### 1. Supabase Database Setup ✓

**Status:** Schema designed, ready to deploy

```bash
# In Supabase SQL Editor:
# 1. Go to https://app.supabase.com → SQL Editor
# 2. Create new query
# 3. Copy contents of lib/training-schema.sql
# 4. Execute all migrations
```

**Tables Created:**
- courses
- course_modules
- lessons
- lesson_content
- user_progress
- course_enrollments
- certificates
- quizzes (future)
- quiz_questions (future)
- quiz_attempts (future)

**RLS Policies Enabled:**
- Users can only access their own progress
- Public read access to course content
- Authenticated-only enrollment

### 2. Environment Variables ✓

**Required for Vercel & local dev:**

```bash
# In .env.local and Vercel dashboard:

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://...

# Next.js
NODE_ENV=production
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://your-domain.com

# Optional: CDN for videos
NEXT_PUBLIC_VIDEO_CDN_URL=https://your-cdn.com
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Content Ingestion ✓

**Current Status:** Script ready with PDF extraction

```bash
# Prerequisites:
npm install pdf-parse pdfjs-dist

# Load content into Supabase:
node scripts/ingest-hcs-content.js

# What it does:
# - Creates 3 courses (HCS IT Documents, Provider, Web Provider)
# - Creates 8 modules and 20+ lessons
# - Extracts PDF text and converts to HTML
# - Sets up video references
# - Populates database

# Expected output:
# ✓ Created course: HCS IT Documents (ID: 1)
# ✓ Created module: Hardware & Configuration
# ✓ Stored content for: Barcode Scanner Programming
# ✓ Ingestion complete!
```

**Post-Ingestion Verification:**

```sql
-- In Supabase SQL Editor, verify data loaded:

SELECT COUNT(*) as total_courses FROM courses;
-- Expected: 3

SELECT COUNT(*) as total_lessons FROM lessons;
-- Expected: 20+

SELECT COUNT(*) as total_content FROM lesson_content;
-- Expected: 18+ (PDFs converted to HTML)

SELECT * FROM courses ORDER BY course_order;
```

### 4. Video Storage Setup

**Option A: Supabase Storage (Recommended)**

```bash
# 1. Create storage bucket in Supabase Console
# 2. Enable public access for videos
# 3. Upload videos from scripts/video-manifest.json
# 4. Update lesson video_url in database
```

**Option B: CDN (Cloudflare, AWS CloudFront)**

```bash
# 1. Upload videos to CDN
# 2. Set NEXT_PUBLIC_VIDEO_CDN_URL env var
# 3. Update video paths in database
```

**Option C: Vercel Static (Staging only)**

```bash
# For testing, copy videos to public/:
mkdir -p public/hcs-content/videos
cp /source/videos/* public/hcs-content/videos/

# Next.js serves from public/ automatically
# Video URLs: /hcs-content/videos/video-name.mp4
```

### 5. Build & Test Locally

```bash
# Install dependencies
npm install

# Build
npm run build

# Test
npm run dev
# Open http://localhost:3000/training

# Expected flow:
# 1. Redirect to /auth/login (not authenticated)
# 2. Register with email
# 3. See 3 courses on training dashboard
# 4. Click "Enroll" on any course
# 5. Navigate to module → lesson
# 6. View PDF content (HTML) or play video
# 7. Mark lesson complete
# 8. Check progress bar updates
```

### 6. Staging Deploy (Vercel)

```bash
# Prerequisites:
# - GitHub repo pushed (AnibalC1/healthcare-it-website) ✓
# - Vercel account connected
# - Supabase project created

# Deploy to staging:
vercel --prod

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables
# Add all vars from .env.local

# Trigger redeploy after env vars set:
vercel redeploy

# Verify:
# https://healthcare-it-website.vercel.app/training
```

**Vercel Environment Setup:**

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXTAUTH_SECRET`
   - `DATABASE_URL`

3. Set to Production environment

### 7. Security Review Checklist (@Scorpion)

- [ ] Supabase RLS policies verified (no data leakage)
- [ ] User authentication working (signup/login/logout)
- [ ] Session tokens properly managed
- [ ] No PHI in logs or error messages
- [ ] HTTPS enforced on all endpoints
- [ ] CORS headers correct for video/static assets
- [ ] Rate limiting on auth endpoints (if applicable)
- [ ] Database backups enabled

### 8. UX/Responsiveness Review (@Venom)

- [ ] Course listing page renders correctly
- [ ] Course navigation works on mobile (responsive)
- [ ] Lesson viewer works on tablet/phone
- [ ] Video player controls visible and functional
- [ ] Progress tracking UI clear and intuitive
- [ ] Navigation breadcrumbs working
- [ ] Enrollment flow smooth and clear
- [ ] No broken images or missing fonts

### 9. End-to-End Testing

**Happy Path:**
1. Create new user account
2. Enroll in "HCS Provider Training"
3. Open first module "Medication Management"
4. Click first lesson "Medication Reconciliation Process"
5. View PDF content (should display as HTML)
6. Click "Mark Complete"
7. Verify progress bar updates to 50% (1/2 lessons)
8. Go back to course
9. See progress reflected on dashboard

**Video Testing:**
1. Open lesson with video
2. Play video (should have controls)
3. Watch 90%+ and close
4. Verify auto-marked complete

**Error Cases:**
1. Try accessing lesson without enrollment
2. Check error message appears
3. Test with invalid course slug
4. Verify 404 page shown

### 10. Performance Baseline

**Target Metrics:**
- Course list load: < 2s
- Lesson render: < 2s
- Video start: < 3s
- Database query: < 500ms
- Lighthouse score: 85+

**Measure with:**
```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://staging-url.vercel.app/training --view

# Network timing
# Chrome DevTools → Network tab
# Set throttling to "Fast 3G"
```

### 11. Staging Sign-off

**Required before production:**

- [ ] Ace: All 3 courses loaded and navigable
- [ ] Ace: Videos play and progress tracked
- [ ] Venom: Mobile responsive, UX approved
- [ ] Scorpion: RLS policies tested, auth secure
- [ ] Lucy: Orchestrator approves deployment

### 12. Production Deployment

Once staging is approved:

```bash
# Merge to main
git push origin main

# Vercel auto-deploys to production
# Monitor: https://healthcare-it-website.vercel.app

# Post-deploy verification:
# 1. Check training page loads
# 2. Enroll in a course
# 3. View lesson
# 4. Check logs for errors
```

### Timeline

- **Now:** PDF extraction setup ✓
- **Phase 2 (2 hrs):** Content ingestion + staging deploy
- **Phase 3 (1 hr):** Security & UX sign-off
- **Phase 4 (30 min):** Production deployment

---

## Troubleshooting

**"Courses not showing"**
- Verify Supabase connection: `echo $NEXT_PUBLIC_SUPABASE_URL`
- Check database: `SELECT * FROM courses;` in Supabase SQL
- Run ingestion script again: `node scripts/ingest-hcs-content.js`

**"Videos won't play"**
- Verify video URLs in database: `SELECT video_url FROM lessons WHERE content_type='video';`
- Test video URL in browser directly
- Check CORS headers: DevTools → Network → video request
- Verify storage bucket is public (if using Supabase Storage)

**"Authentication failing"**
- Check Supabase auth enabled: Supabase Console → Authentication
- Verify providers configured (email)
- Check NEXTAUTH_URL matches deployment domain
- Test signup flow manually

**"Progress not saving"**
- Verify user_progress table exists
- Check RLS policies: `SELECT * FROM pg_policies WHERE tablename='user_progress';`
- Test API: `curl -H "Authorization: Bearer $JWT" https://api/training/progress`

---

## Contact

Questions? Escalate to:
- Ace (engineering): Implementation issues
- Scorpion (security): Auth/RLS/HIPAA questions
- Venom (UX): Design/responsive issues
- Lucy (orchestrator): Timeline & coordination
