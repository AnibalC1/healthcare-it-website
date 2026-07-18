# Deployment Guide - Healthcare IT Website

## Prerequisites

1. **Supabase Project Setup**
   - Create account at https://supabase.com
   - Create new project
   - Run the SQL schema from `lib/supabase-schema.sql` in SQL Editor
   - Get API keys from Settings → API

2. **DeepSeek API Key**
   - Sign up at https://platform.deepseek.com
   - Generate API key
   - Expected cost: ~$0.28/month for 500 chat interactions

3. **Cal.com Account**
   - Sign up at https://cal.com
   - Create event type: "Free IT Security Assessment" (60 minutes)
   - Set your availability
   - Get your Cal.com username

4. **Vercel Account**
   - Sign up at https://vercel.com
   - Link GitHub repository

## Environment Variables

Create `.env.local` for local development and add these variables to Vercel:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# DeepSeek API
DEEPSEEK_API_KEY=sk-your-deepseek-api-key

# Cal.com
NEXT_PUBLIC_CALCOM_USERNAME=your-calcom-username

# Environment
NODE_ENV=production
```

## Supabase Setup Steps

1. Create new Supabase project
2. Go to SQL Editor
3. Paste contents of `lib/supabase-schema.sql`
4. Execute the SQL script
5. Verify tables created:
   - contact_submissions
   - assessment_bookings
   - chat_interactions
   - audit_log
6. Go to Settings → API
7. Copy Project URL and anon key
8. Copy service_role key (keep this secret!)

## Vercel Deployment

### Option 1: Deploy via GitHub (Recommended)

1. Push code to GitHub (already done)
2. Go to https://vercel.com/new
3. Import your GitHub repository: `AnibalC1/healthcare-it-website`
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add all environment variables from above
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add DEEPSEEK_API_KEY
vercel env add NEXT_PUBLIC_CALCOM_USERNAME

# Deploy to production
vercel --prod
```

## Custom Domain Setup

1. In Vercel dashboard → Domains
2. Add your domain (e.g., healthcareitsolutions.com)
3. Follow DNS configuration instructions
4. SSL certificate automatically provisioned

## Post-Deployment Checklist

### Verify Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Cal.com booking widget displays
- [ ] AI chat widget opens and responds
- [ ] All pages are mobile-responsive

### Security Verification
- [ ] SSL/TLS enabled (https://)
- [ ] Security headers present (check with https://securityheaders.com)
- [ ] CSP headers configured correctly
- [ ] HSTS enabled
- [ ] No console errors

### HIPAA Compliance
- [ ] Contact form has PHI disclaimer
- [ ] Chat widget warns against PHI
- [ ] Privacy Policy live at /privacy
- [ ] Terms of Service live at /terms
- [ ] Supabase encryption at rest enabled
- [ ] All API routes use HTTPS only

### Analytics Setup (Optional)
- [ ] Add Plausible Analytics script to layout.tsx
- [ ] Verify tracking in Plausible dashboard

### SEO Configuration
- [ ] Add Google Search Console verification code to metadata
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Verify Open Graph tags (test with https://www.opengraph.xyz)

## Monitoring & Maintenance

### Supabase Maintenance
- Review contact_submissions weekly
- Verify chat_interactions auto-delete after 7 days
- Monitor audit_log for security events

### Vercel Monitoring
- Check deployment logs in Vercel dashboard
- Monitor API route errors
- Review performance metrics

### Cost Monitoring
- Supabase: Free tier supports ~50k rows, 500MB database
- DeepSeek: ~$0.28/month for 500 chats
- Vercel: Free tier supports hobby projects, upgrade to Pro if needed ($20/month)

## Backup & Disaster Recovery

### Database Backups
1. Go to Supabase → Database → Backups
2. Enable automatic daily backups
3. Test restore procedure quarterly

### Code Backups
- GitHub is your source of truth
- Vercel maintains deployment history
- Keep local git repository updated

## Troubleshooting

### Contact Form Not Submitting
1. Check browser console for errors
2. Verify Supabase API keys in environment variables
3. Check Supabase logs: Dashboard → Logs → API
4. Verify RLS policies allow service_role access

### Chat Widget Not Responding
1. Verify DeepSeek API key is valid
2. Check API route logs: Vercel → Functions → chat
3. Verify network requests in browser DevTools
4. Check DeepSeek dashboard for quota/billing

### Cal.com Widget Not Loading
1. Verify username is correct in environment variables
2. Check Cal.com account is active
3. Verify event type is published
4. Check browser console for script loading errors

## Support Contacts

- **Supabase Support:** https://supabase.com/support
- **DeepSeek Support:** https://platform.deepseek.com/support
- **Cal.com Support:** https://cal.com/support
- **Vercel Support:** https://vercel.com/support

## Security Incident Response

If PHI exposure suspected:
1. Immediately disable affected API routes (comment out in code, redeploy)
2. Review audit_log table for affected records
3. Delete affected chat_interactions records
4. Document incident with timestamp and scope
5. Notify affected parties if PHI confirmed exposed (legal requirement)

For general security issues:
1. Check Supabase audit_log for unauthorized access
2. Rotate API keys if compromise suspected
3. Review Vercel deployment logs
4. Update passwords and API keys
