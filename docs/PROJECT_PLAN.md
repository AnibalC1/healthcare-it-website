# Healthcare IT Solutions — Project Plan & Implementation Roadmap

**Owner:** Anibal Cabral
**Team:** Lucy (orchestration), Venom (research), Scorpion (security), Ace (implementation)
**Created:** 2026-07-18
**Target:** Launch-ready within 2 weekends of evening/weekend work

---

## Tech Stack Decision

### Recommendation: Pure HTML/CSS/JS (Bridgewell Standard)

Per Anibal's standing directive, all web projects must meet or exceed Bridgewell standards. This means:

- Zero npm dependencies
- No frameworks (no React, no Next.js)
- Pure HTML5, CSS3, vanilla JavaScript (ES6+)
- No build tools, no compilation step
- Deploy by uploading files

**Why this is the right call for this project:**

1. **Maintenance:** Anibal is running this as a side business while working full-time. A framework-free site has zero dependency updates, zero breaking changes, zero build failures. It just works.
2. **Cost:** Static hosting is free or near-free (GitHub Pages, Cloudflare Pages, Netlify free tier). No server costs.
3. **Performance:** No JavaScript bundle to download. Instant page loads. 95+ Lighthouse score out of the box.
4. **Longevity:** HTML/CSS/JS from 2026 will still work in 2036. A Next.js 14 project from 2026 will need migration by 2028.
5. **HIPAA simplicity:** Static sites with no server-side data processing have a minimal HIPAA attack surface. Forms submit to third-party HIPAA-compliant services via API.

**What about the dynamic features?**

| Feature | Solution | Dependency |
|---------|----------|------------|
| Booking system | Cal.com embed (iframe or JS widget) | External service |
| AI chat assistant | Anthropic API via lightweight fetch wrapper | 50 lines of JS |
| Contact forms | Formspree or similar HIPAA-compliant form backend | External service |
| Analytics | Plausible Analytics (script tag) | External service |
| Payment processing | Stripe embed (if needed later) | External service |
| CRM | HubSpot free tier or spreadsheet (Phase 2) | External service |

All dynamic features are external service embeds — no server-side code needed.

### Hosting Recommendation

**Primary: Cloudflare Pages** (free tier)
- Free SSL, free CDN, free custom domain
- Deploy via git push (auto-deploy from GitHub)
- Edge-cached globally
- DDoS protection included
- No HIPAA BAA needed for static content (no PHI stored)

**Alternative: GitHub Pages** (free, simpler setup)

**Domain:** Purchase `healthcareitsolutions.com` or similar (~$12/year)

---

## Architecture

```
                    +-------------------+
                    |   Cloudflare CDN  |
                    |   (Edge Cache)    |
                    +--------+----------+
                             |
                    +--------v----------+
                    |   Static Site     |
                    |   (HTML/CSS/JS)   |
                    +--------+----------+
                             |
              +--------------+--------------+
              |              |              |
     +--------v---+  +------v------+  +----v--------+
     | Cal.com    |  | Formspree   |  | Plausible   |
     | (Booking)  |  | (Forms)     |  | (Analytics) |
     +------------+  +------+------+  +-------------+
                            |
                     +------v------+
                     | Email       |
                     | (Anibal)    |
                     +-------------+

     AI Chat: Anthropic API called directly from browser
     (API key proxied through Cloudflare Worker for security)
```

### File Structure

```
/
+-- index.html              # Homepage
+-- services.html           # Service packages
+-- about.html              # About Anibal
+-- contact.html            # Contact + booking
+-- assessment.html         # Free assessment landing page
+-- privacy.html            # Privacy policy
+-- terms.html              # Terms of service
+-- assets/
|   +-- css/
|   |   +-- styles.css      # Full design system + all styles
|   +-- js/
|   |   +-- main.js         # All interactivity (nav, forms, chat, animations)
|   +-- images/
|       +-- logo.svg
|       +-- hero-bg.webp
|       +-- ...
+-- docs/                   # Project documentation (not deployed)
+-- .gitignore
+-- README.md
```

---

## Implementation Phases

### Phase 1: Foundation (Weekend 1, Evening 1 — ~6 hours)

**Deliverables:**
- Design system (CSS custom properties: colors, typography, spacing, shadows)
- HTML boilerplate with semantic structure, ARIA landmarks, skip links
- Responsive navigation (mobile hamburger, sticky header)
- Footer with contact info, links, trust signals
- Homepage: hero section, value props, trust signals, CTA

**Quality gate:** Lighthouse 95+ on homepage, WCAG AA pass, mobile-responsive

### Phase 2: Content Pages (Weekend 1, Evening 2 — ~4 hours)

**Deliverables:**
- Services page with package cards (Bronze/Silver/Gold)
- About page with credentials, experience, approach
- Contact page with form + embedded Cal.com booking
- Free assessment landing page (lead magnet)

**Quality gate:** All pages responsive, consistent design, forms functional

### Phase 3: Interactivity & Integrations (Weekend 2, Evening 1 — ~4 hours)

**Deliverables:**
- Contact form connected to Formspree (HIPAA-compliant plan)
- Cal.com booking widget embedded
- AI chat widget (Anthropic API via Cloudflare Worker proxy)
- Scroll animations (IntersectionObserver, Bridgewell-style)
- Smooth scroll navigation

**Quality gate:** All integrations functional, no console errors, chat responds accurately

### Phase 4: Polish & Launch Prep (Weekend 2, Evening 2 — ~4 hours)

**Deliverables:**
- SEO optimization (meta tags, Open Graph, structured data, sitemap.xml)
- Privacy policy and terms of service pages
- Performance optimization (image compression, lazy loading)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Accessibility audit (screen reader testing, keyboard navigation)
- Deploy to Cloudflare Pages

**Quality gate:** Lighthouse 95+ all pages, valid structured data, no broken links

### Phase 5: Post-Launch (Week following launch — ~2 hours)

**Deliverables:**
- Google Business Profile setup
- Local directory submissions (Yelp, Healthgrades)
- Google Search Console verification
- Plausible Analytics dashboard review
- First week performance report

---

## Timeline (Evenings/Weekends)

Assumes 2-3 hour evening sessions and 4-6 hour weekend sessions.

| When | Phase | Hours | Milestone |
|------|-------|-------|-----------|
| Weekend 1 Sat | Phase 1: Foundation | 4-6h | Homepage live locally |
| Weekend 1 Sun | Phase 2: Content | 3-4h | All pages complete |
| Mon-Wed eve | Phase 2 overflow + Phase 3 start | 2-3h | Forms + booking connected |
| Weekend 2 Sat | Phase 3: Integrations | 4-5h | AI chat + animations done |
| Weekend 2 Sun | Phase 4: Polish + Deploy | 4-5h | Site live on custom domain |
| Following week | Phase 5: Post-launch | 2h | SEO + directories |

**Total estimated effort:** 18-25 hours over 2 weekends

---

## Budget Breakdown

### One-Time Costs

| Item | Cost | Notes |
|------|------|-------|
| Domain registration | $12/year | .com via Cloudflare Registrar or Namecheap |
| Logo design | $0-50 | Canva Pro or simple text logo initially |
| Stock photos | $0-30 | Unsplash (free) or one iStock pack |
| **Subtotal** | **$12-92** | |

### Monthly Recurring Costs

| Item | Cost/month | Notes |
|------|------------|-------|
| Cloudflare Pages hosting | $0 | Free tier (unlimited bandwidth) |
| Formspree (HIPAA plan) | $50 | HIPAA-compliant form submissions with BAA |
| Cal.com (free tier) | $0 | Self-serve booking, free for individuals |
| Plausible Analytics | $9 | Privacy-focused, no cookie banner needed |
| Anthropic API (chat) | ~$5-15 | Pay-per-use, low volume initially |
| Cloudflare Worker (API proxy) | $0 | Free tier covers 100k requests/day |
| **Monthly total** | **~$64-74** | |

### Annual Cost Summary

| Category | Year 1 |
|----------|--------|
| One-time setup | $12-92 |
| Monthly services (x12) | $768-888 |
| **Total Year 1** | **$780-980** |

Well within the ~$6k startup budget. Leaves $5k+ for business operations (insurance, tools, marketing).

---

## Integration Architecture

### Contact Form Flow
```
User fills form --> Formspree API (HIPAA) --> Email to Anibal
                                           --> Auto-reply to user
                                           --> Lead logged in Formspree dashboard
```

### Booking Flow
```
User clicks "Book Assessment" --> Cal.com widget opens
                               --> User picks date/time
                               --> Calendar event created (Google Calendar)
                               --> Email confirmation to both parties
```

### AI Chat Flow
```
User types question --> JS sends to Cloudflare Worker (API key hidden)
                     --> Worker forwards to Anthropic API
                     --> Response streamed back to browser
                     --> Chat handles: FAQ, service info, booking redirect
```
System prompt covers: services, pricing, HIPAA basics, Anibal's background.
Chat NEVER collects PHI. Redirects to phone/email for sensitive discussions.

### Analytics Flow
```
Page load --> Plausible script (no cookies, GDPR/HIPAA friendly)
          --> Dashboard: visitors, sources, top pages, conversions
          --> Goal tracking: form submissions, booking clicks, chat opens
```

---

## Content Requirements by Page

### Homepage (index.html)
- Hero: headline + subhead + CTA button ("Get Your Free IT Assessment")
- Pain points section (3 cards: HIPAA compliance, ransomware threats, IT overwhelm)
- Services overview (3 package cards linking to services page)
- Trust signals (years of experience, certifications, hospital background)
- Testimonials section (placeholder for future client quotes)
- Final CTA section (assessment booking)
- Footer (contact info, quick links, privacy/terms)

### Services (services.html)
- Package comparison (Bronze/Silver/Gold with feature matrix)
- A la carte services table
- Pricing transparency section
- "Which package is right for you?" decision helper
- CTA: Book free assessment to get custom recommendation

### About (about.html)
- Anibal's background (8+ years HRI Hospital)
- Why healthcare IT specifically
- Approach/philosophy (proactive, not reactive)
- Certifications and training
- Service area map (Fitchburg/Leominster/Gardner radius)

### Contact (contact.html)
- Contact form (name, practice name, email, phone, message)
- Embedded Cal.com booking widget
- Direct contact info (phone, email)
- Office hours
- Service area

### Free Assessment Landing Page (assessment.html)
- What the assessment covers (security, HIPAA, backups, equipment)
- What you get (written report with recommendations)
- Why it is free (builds trust, no obligation)
- Booking CTA (prominent Cal.com embed)
- FAQ about the assessment process

### Privacy Policy (privacy.html)
- Standard privacy policy covering form data handling
- HIPAA notice (site does not collect PHI)
- Analytics disclosure (Plausible, no cookies)
- Contact for privacy questions

### Terms of Service (terms.html)
- Standard terms for consulting service website
- Disclaimer (website info is not a substitute for professional IT assessment)
- Service agreement references

---

## SEO Strategy

### Target Keywords (Local Healthcare IT)
- "healthcare IT support Fitchburg MA"
- "HIPAA compliance consultant Massachusetts"
- "medical practice IT services Leominster"
- "dental office IT support near me"
- "healthcare cybersecurity consultant MA"
- "HIPAA compliant IT services"

### Technical SEO
- Semantic HTML5 (h1-h6 hierarchy, landmarks)
- Meta descriptions per page (unique, keyword-rich, under 160 chars)
- Open Graph tags for social sharing
- Schema.org structured data (LocalBusiness, Service, FAQPage)
- XML sitemap
- robots.txt
- Canonical URLs
- Alt text on all images

### Local SEO
- Google Business Profile (post-launch)
- NAP consistency (Name, Address, Phone) across all directories
- Healthgrades, Yelp, and local chamber listings
- Service area pages (if warranted by search volume)

---

## Quality Standards

### Performance
- Lighthouse Performance: 95+
- First Contentful Paint: under 1.5s
- Largest Contentful Paint: under 2.5s
- Total Blocking Time: under 200ms
- Cumulative Layout Shift: under 0.1

### Accessibility (WCAG AA)
- Skip link to main content
- ARIA labels on all interactive elements
- Keyboard navigation for all functionality
- Color contrast ratio 4.5:1 minimum
- Reduced motion support (@media prefers-reduced-motion)
- Screen reader tested (VoiceOver/NVDA)

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari
- Chrome Android

### Code Standards (Bridgewell Minimum)
- Zero external dependencies
- BEM-like CSS naming
- CSS custom properties for design system
- Data attributes for JS hooks (no class selectors in JS)
- IIFE pattern for JavaScript (no global pollution)
- IntersectionObserver for scroll effects
- requestAnimationFrame for animations
- Passive event listeners
- GPU-accelerated transforms

---

## Launch Checklist

### Pre-Launch
- [ ] All pages complete and responsive
- [ ] Forms tested (submissions reach Anibal's email)
- [ ] Booking widget tested (appointments create calendar events)
- [ ] AI chat tested (responds accurately, never collects PHI)
- [ ] Cross-browser testing passed
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Lighthouse 95+ on all pages
- [ ] Privacy policy and terms published
- [ ] SSL certificate active (automatic via Cloudflare)
- [ ] Custom domain configured and propagated
- [ ] Structured data validated (Google Rich Results Test)
- [ ] Sitemap.xml submitted to Google Search Console
- [ ] robots.txt configured
- [ ] 404 page created
- [ ] All links tested (no broken links)
- [ ] Images optimized (WebP format, lazy loading)
- [ ] Meta descriptions written for all pages
- [ ] Open Graph tags set for social sharing
- [ ] Favicon set

### Post-Launch (First Week)
- [ ] Google Business Profile created/claimed
- [ ] Google Search Console site verified
- [ ] Plausible Analytics dashboard confirmed working
- [ ] Submit to local directories (Yelp, Healthgrades, Chamber of Commerce)
- [ ] Test contact form in production
- [ ] Test booking flow in production
- [ ] Share site URL on LinkedIn profile
- [ ] Monitor analytics for first 7 days

### Post-Launch (First Month)
- [ ] Review analytics (top pages, traffic sources, conversion rate)
- [ ] Collect first client testimonial
- [ ] Add testimonial to homepage
- [ ] Evaluate SEO rankings for target keywords
- [ ] Adjust content based on user behavior data

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| HIPAA violation via website | Site collects NO PHI. Forms go to HIPAA-compliant backend. AI chat system prompt prevents PHI collection. |
| Site goes down | Static site on Cloudflare CDN — 99.99% uptime SLA. No server to maintain. |
| Framework becomes outdated | No framework. Pure HTML/CSS/JS has no dependency lifecycle. |
| Anibal too busy to maintain | Static site needs zero maintenance. Content updates are HTML edits. |
| Cost overrun | Total year 1 cost under $1,000. No surprise infrastructure bills. |
| AI chat says something wrong | System prompt constrains responses to known service info. Disclaimer on chat widget. |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-18 | Pure HTML/CSS/JS over Next.js | Bridgewell standard. Zero maintenance. Free hosting. No build chain. |
| 2026-07-18 | Cloudflare Pages over Vercel | Free tier is more generous. Built-in CDN + DDoS. Workers for API proxy. |
| 2026-07-18 | Formspree over custom backend | HIPAA BAA available. No server to maintain. $50/mo. |
| 2026-07-18 | Plausible over Google Analytics | No cookies needed. HIPAA/GDPR friendly. $9/mo. |
| 2026-07-18 | Cal.com free tier over Calendly | Free for individuals. Clean embed. No HIPAA risk (no PHI in scheduling). |
