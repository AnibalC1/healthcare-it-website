# HIPAA-Compliant Security Architecture
## Healthcare IT Consulting Business Website

**Prepared by:** Scorpion (Security Specialist)
**Date:** 2026-07-18
**Version:** 1.0

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [HIPAA Compliance Requirements](#2-hipaa-compliance-requirements)
3. [Security Architecture](#3-security-architecture)
4. [Privacy Policy and Legal Requirements](#4-privacy-policy-and-legal-requirements)
5. [Security Headers and Hardening](#5-security-headers-and-hardening)
6. [Secure Booking/Chat System](#6-secure-bookingchat-system)
7. [Pre-Launch Compliance Checklist](#7-pre-launch-compliance-checklist)
8. [Incident Response Plan](#8-incident-response-plan)
9. [Cost Estimates](#9-cost-estimates)
10. [Implementation Guide](#10-implementation-guide)

---

## 1. Executive Summary

As a healthcare IT consulting firm selling HIPAA compliance services, the website itself must be an exemplar of security best practices. This is not just regulatory compliance -- it is brand credibility. A prospect who discovers security weaknesses on the site will never hire us.

**Key principle:** Treat ALL contact form submissions as potential PHI until proven otherwise. A visitor may include patient names, diagnoses, or other protected information in a general inquiry.

---

## 2. HIPAA Compliance Requirements

### 2.1 What Makes a Business Website HIPAA Compliant

HIPAA applies when a website collects, stores, transmits, or processes Protected Health Information (PHI). For a consulting firm website:

| Element | HIPAA Relevance | Action Required |
|---------|----------------|-----------------|
| Contact forms | HIGH -- visitors may include PHI in messages | Encrypt in transit + at rest |
| Appointment booking | HIGH -- scheduling implies a healthcare relationship | Encrypt, access-control, audit log |
| AI chat assistant | HIGH -- users may disclose PHI in conversation | Encrypt, retention policy, BAA with AI provider |
| Analytics/tracking | MEDIUM -- IP addresses + health-related page visits could be PHI | Use privacy-respecting analytics |
| Email communications | HIGH -- follow-up emails may reference PHI | Use encrypted email or secure portal |
| Payment processing | LOW-MEDIUM -- payment data is PCI, not HIPAA, unless tied to health services | PCI DSS compliance, separate from PHI |

### 2.2 Business Associate Agreements (BAAs)

**MUST-HAVE BAAs with:**
- Hosting provider (cloud infrastructure)
- Email service provider (if handling PHI in email)
- AI chat provider (if using third-party AI)
- Analytics provider (if tracking could expose PHI)
- Payment processor (if accepting deposits)
- Backup/disaster recovery provider
- Any SaaS tool that touches form submissions

**BAA checklist for each vendor:**
- [ ] BAA signed and on file
- [ ] Vendor SOC 2 Type II report reviewed
- [ ] Vendor HIPAA compliance documentation obtained
- [ ] Data handling and breach notification terms confirmed
- [ ] Subcontractor/subprocessor list reviewed

### 2.3 PHI Handling on Contact Forms

**Rule:** Never assume a contact form submission is PHI-free.

**Required controls:**
1. Form submissions encrypted in transit (TLS 1.2+)
2. Form data encrypted at rest (AES-256)
3. Form data stored in HIPAA-compliant infrastructure (not plain email)
4. Access to form submissions restricted to authorized personnel
5. Audit log of who accessed which submission and when
6. Automatic purge policy (e.g., 90 days after resolution)
7. Form disclaimer: "Do not include patient names, medical records, or other protected health information in this form."

**Implementation:**
- Do NOT email form submissions in plaintext
- Store submissions in an encrypted database on HIPAA-compliant hosting
- Send notification emails without the submission content (link to secure portal instead)
- Provide a secure messaging portal for follow-up communication

### 2.4 Encryption Requirements

| Layer | Requirement | Standard |
|-------|-------------|----------|
| In transit | TLS 1.2 minimum, TLS 1.3 preferred | NIST SP 800-52 Rev. 2 |
| At rest | AES-256 encryption for all stored PHI | NIST SP 800-111 |
| Database | Column-level encryption for PHI fields | Application-layer encryption |
| Backups | Encrypted backups, encrypted transfer | Same as at-rest standard |
| Key management | HSM or KMS-managed keys, rotation policy | NIST SP 800-57 |

### 2.5 Access Logging and Audit Trails

HIPAA requires audit controls (45 CFR 164.312(b)):

**Must log:**
- All access to PHI (form submissions, appointment data)
- Login/logout events for admin panel
- Failed login attempts
- Changes to user permissions
- Data exports or downloads
- Data deletion events

**Log requirements:**
- Tamper-evident (append-only or write-once storage)
- Retained for minimum 6 years (HIPAA requirement)
- Include: timestamp, user ID, action, resource accessed, source IP
- Stored separately from application data
- Regular review process (monthly minimum)

---

## 3. Security Architecture

### 3.1 Hosting Platform Recommendations

**Tier 1 -- HIPAA-Certified, Recommended:**

| Platform | BAA Available | HIPAA Features | Est. Monthly Cost |
|----------|:------------:|----------------|:-----------------:|
| AWS (GovCloud or standard) | Yes | Encryption, CloudTrail, Config, GuardDuty | $50-200 |
| Google Cloud Platform | Yes | CMEK, Access Transparency, VPC SC | $50-200 |
| Microsoft Azure | Yes | Azure Policy, Sentinel, Key Vault | $50-200 |
| Vercel (Enterprise) | Yes (Enterprise only) | Edge encryption, SOC 2, limited PHI scope | $150+ |

**Tier 2 -- HIPAA-Ready, Acceptable:**

| Platform | BAA Available | Notes | Est. Monthly Cost |
|----------|:------------:|-------|:-----------------:|
| Render | Yes (Team+) | Managed PostgreSQL, private networking | $50-100 |
| DigitalOcean | Yes | Managed DB, Spaces encryption | $40-100 |
| Heroku (Salesforce) | Yes (Shield) | Heroku Shield for HIPAA | $250+ |

**NOT Recommended:**
- Shared hosting (no BAA, no isolation)
- Vercel Free/Pro (no BAA)
- Netlify (no BAA for PHI)
- Any provider without a signed BAA

**Recommended Architecture:**
```
[Vercel/Cloudflare] -- Static site + edge caching (no PHI)
        |
   [API Gateway] -- Rate limiting, WAF
        |
   [AWS/GCP Backend] -- HIPAA-compliant, BAA signed
        |
   [Encrypted DB] -- PostgreSQL with column-level encryption
        |
   [Encrypted Object Storage] -- S3/GCS with SSE-KMS
```

Separation of concerns: the marketing/content site runs on a fast CDN with no PHI. All PHI-handling (forms, bookings, chat) routes to a HIPAA-compliant backend.

### 3.2 SSL/TLS Certificate Setup

**Requirements:**
- TLS 1.2 minimum; disable TLS 1.0, 1.1, SSLv3
- TLS 1.3 preferred for all new connections
- HSTS header with min 1-year max-age, includeSubDomains, preload
- Certificate: EV or OV certificate (shows organization name in browser)
- Auto-renewal via Let's Encrypt or managed certificate
- Certificate Transparency monitoring

**Recommended cipher suites (TLS 1.3):**
```
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_128_GCM_SHA256
```

**TLS 1.2 fallback ciphers:**
```
ECDHE-ECDSA-AES256-GCM-SHA384
ECDHE-RSA-AES256-GCM-SHA384
ECDHE-ECDSA-AES128-GCM-SHA256
ECDHE-RSA-AES128-GCM-SHA256
```

**Validation:** Test with SSL Labs (target A+ rating).

### 3.3 Form Encryption and Secure Data Transmission

**Architecture for contact/booking forms:**
```
Browser                    Edge/CDN              Backend (HIPAA)
   |                          |                       |
   |-- TLS 1.3 ------------->|                       |
   |   POST /api/contact     |-- TLS 1.3 ---------->|
   |                          |                       |-- Encrypt payload (AES-256)
   |                          |                       |-- Store in encrypted DB
   |                          |                       |-- Write audit log
   |                          |                       |-- Send notification (no PHI)
   |<-- 200 OK --------------|<-- 200 OK ------------|
```

**Client-side measures:**
- JavaScript form validation (prevent accidental submission)
- CSRF token on every form
- Honeypot field for bot detection
- Rate limiting: max 5 submissions per IP per hour
- PHI disclaimer displayed above submit button

**Server-side measures:**
- Input sanitization (prevent injection)
- Payload size limits
- Content-Type validation
- Encrypted storage immediately on receipt
- No plaintext logging of form data

### 3.4 Password Policies for Admin Access

**Minimum requirements (NIST SP 800-63B aligned):**
- Minimum 12 characters
- No maximum length (allow passphrases)
- Check against breached password databases (Have I Been Pwned API)
- No periodic rotation requirement (NIST current guidance)
- Account lockout after 5 failed attempts (30-minute lockout)
- Password stored using Argon2id (preferred) or bcrypt (cost 12+)

### 3.5 Two-Factor Authentication

**MUST-HAVE for:**
- All admin/CMS access
- Hosting provider accounts
- DNS management
- Email accounts
- Any service with access to PHI

**Acceptable 2FA methods (in order of preference):**
1. Hardware security keys (FIDO2/WebAuthn) -- best
2. TOTP authenticator apps (Authy, Google Authenticator)
3. Push notifications (Duo, Microsoft Authenticator)

**NOT acceptable:**
- SMS-based 2FA (SIM swap vulnerable)
- Email-based 2FA (circular dependency)

### 3.6 DDoS Protection and Rate Limiting

**Recommended stack:**
- Cloudflare Pro or Business (WAF + DDoS protection + BAA available at Enterprise)
- Application-level rate limiting:
  - API endpoints: 100 req/min per IP
  - Form submissions: 5/hour per IP
  - Login attempts: 5/15 min per IP
  - Admin API: 30 req/min per authenticated user

**WAF rules (must-have):**
- OWASP Core Rule Set
- Bot management (challenge suspicious user agents)
- Geo-blocking (optional, based on business needs)
- Custom rules for admin paths

### 3.7 Secure Backup Strategy

**Requirements:**
- Encrypted backups (AES-256, separate key from production)
- Backup frequency: daily for database, real-time for critical data
- Backup storage: separate region/account from production
- Backup testing: monthly restore test
- Retention: 30 days daily, 12 months monthly, 7 years annual (HIPAA)
- Access to backups: separate credentials, 2FA required, audit logged

**Backup architecture:**
```
Production DB (encrypted)
    |
    |-- Daily encrypted snapshot --> Backup Region (encrypted S3/GCS)
    |-- WAL/binlog streaming -----> Hot standby (same region)
    |
Backup verification (monthly automated restore test)
```

---

## 4. Privacy Policy and Legal Requirements

### 4.1 HIPAA Privacy Notice Requirements

The website MUST include a Notice of Privacy Practices (NPP) if the business is a covered entity or business associate. For a consulting firm:

**Required elements:**
- How PHI is used and disclosed
- Individual rights regarding their PHI
- Business obligations to protect PHI
- Contact information for privacy complaints
- Effective date and revision history

**Website-specific additions:**
- How form data is collected, stored, and used
- Data retention periods
- Right to request deletion
- How to submit a privacy complaint
- Breach notification procedures

### 4.2 Cookie Consent (GDPR/CCPA)

Even though HIPAA is the primary concern, multi-regulation compliance builds trust:

**Required:**
- Cookie consent banner (opt-in for non-essential cookies)
- Cookie policy page listing all cookies, their purpose, and duration
- "Do Not Sell My Personal Information" link (CCPA)
- Consent management platform (OneTrust, Cookiebot, or custom)
- Analytics only after consent (or use cookieless analytics like Plausible/Fathom)

**Recommended approach:**
- Use Plausible Analytics (no cookies, no consent needed, privacy-first)
- If Google Analytics is required, implement consent-first loading
- No third-party tracking pixels without explicit consent

### 4.3 Terms of Service

**Must include:**
- Service description and limitations
- User responsibilities
- Prohibited uses
- Intellectual property rights
- Limitation of liability
- Dispute resolution
- Governing law
- Modification procedures
- Contact information

### 4.4 BAA Template for Client Agreements

**Key sections for client-facing BAA:**
- Definitions (PHI, breach, security incident)
- Permitted uses and disclosures
- Safeguards obligation
- Reporting requirements (breach within 60 days)
- Subcontractor requirements
- Return/destruction of PHI at termination
- Term and termination conditions
- Indemnification

**Recommendation:** Have healthcare attorney review all legal documents before publication. Template available from HHS.gov.

---

## 5. Security Headers and Hardening

### 5.1 Required HTTP Security Headers

```
# Strict Transport Security -- force HTTPS for 1 year, include subdomains
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Content Security Policy -- restrict resource loading
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.yourdomain.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'

# Prevent clickjacking
X-Frame-Options: DENY

# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Referrer Policy -- minimize information leakage
Referrer-Policy: strict-origin-when-cross-origin

# Permissions Policy -- disable unnecessary browser features
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()

# Cross-Origin policies
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### 5.2 Content Security Policy (CSP) Details

**Strategy:** Start strict, relax only as needed with nonce-based script loading.

- No `unsafe-eval` ever
- `unsafe-inline` for styles only if required by framework (use nonces when possible)
- Report-URI or report-to for CSP violation monitoring
- Deploy in report-only mode first, then enforce

### 5.3 SQL Injection Prevention

- Use parameterized queries / prepared statements exclusively
- ORM with query builder (Prisma, Drizzle, or similar)
- No raw SQL concatenation anywhere in codebase
- Database user with minimum required privileges (no DROP, no GRANT)
- Input validation on all user-supplied data (type, length, format)

### 5.4 XSS Protection

- React/Next.js default escaping (JSX auto-escapes)
- No `dangerouslySetInnerHTML` without DOMPurify sanitization
- CSP with nonce-based script loading
- HttpOnly + Secure + SameSite=Strict cookies
- Input sanitization on server before storage
- Output encoding on render

### 5.5 CSRF Protection

- SameSite=Strict cookies for session management
- CSRF token on all state-changing forms
- Verify Origin/Referer headers on API endpoints
- Double-submit cookie pattern as defense in depth

### 5.6 Additional Hardening

- Remove server version headers (X-Powered-By, Server)
- Disable directory listing
- Custom error pages (no stack traces in production)
- Rate limiting on all endpoints
- Request size limits (body, headers, URL)
- Subresource Integrity (SRI) for any external scripts/styles

---

## 6. Secure Booking/Chat System

### 6.1 Appointment Data Handling

**Architecture:**
```
Client Browser
    |
    |-- Encrypted form submission (TLS 1.3)
    |
API Gateway (rate limited, WAF)
    |
Booking Service (HIPAA-compliant backend)
    |-- Validate + sanitize input
    |-- Encrypt appointment data (AES-256-GCM)
    |-- Store in encrypted DB
    |-- Write audit log entry
    |-- Send encrypted calendar invite
    |-- Send confirmation (no PHI in email body)
```

**Data classification:**
| Field | Classification | Encryption |
|-------|---------------|------------|
| Patient/client name | PHI | AES-256 at rest |
| Email address | PII | AES-256 at rest |
| Phone number | PII | AES-256 at rest |
| Appointment type | Potential PHI | AES-256 at rest |
| Appointment notes | PHI | AES-256 at rest |
| Date/time | Metadata | Standard DB encryption |

**Calendar integration:**
- Use Google Workspace with BAA (Google offers HIPAA BAA)
- Or use a HIPAA-compliant scheduling tool (Calendly for Teams w/ BAA, Acuity w/ BAA, or Jane App)
- Calendar invites should not contain PHI in the subject/description
- Sync via encrypted API (OAuth 2.0 + TLS)

### 6.2 AI Chat Assistant Security

**CRITICAL: AI chat is the highest-risk feature.** Users will share PHI in chat.

**Requirements:**
- BAA with AI provider (OpenAI offers BAA on API; Anthropic offers BAA for Claude API)
- Chat data encrypted in transit and at rest
- No chat data used for model training (verify in provider terms)
- Chat history retention: maximum 30 days, then auto-purge
- User consent banner before chat starts: "This chat may be used to assist you. Do not share sensitive patient information."
- Option to download/delete chat history
- Audit log of all chat sessions

**Recommended providers with BAA:**
| Provider | BAA | API-only | Training opt-out | Notes |
|----------|:---:|:--------:|:----------------:|-------|
| OpenAI API | Yes | Yes | Yes (API default) | Good for GPT-4 integration |
| Anthropic Claude API | Yes | Yes | Yes (API default) | Strong safety features |
| Google Vertex AI | Yes | Yes | Yes | Enterprise controls |
| Azure OpenAI | Yes | Yes | Yes | Azure compliance stack |

**NOT recommended:**
- Consumer ChatGPT (no BAA on consumer tier)
- Any AI without explicit BAA and training opt-out
- Self-hosted LLMs without proper infrastructure security

**Data retention policy for chat:**
```
Chat initiated --> Encrypted in transit (TLS 1.3)
    |
Chat processed --> AI provider (BAA signed, no training)
    |
Response returned --> Encrypted in transit (TLS 1.3)
    |
Chat stored --> Encrypted at rest (AES-256), 30-day TTL
    |
30 days --> Automatic purge + audit log entry
```

### 6.3 Payment Processing Security (if accepting deposits)

- Use Stripe (PCI DSS Level 1 certified, BAA available for Stripe Atlas/custom)
- Never handle raw card data -- use Stripe Elements/Checkout
- Payment data never touches your servers
- Separate payment records from PHI
- No PHI in payment descriptions or metadata

---

## 7. Pre-Launch Compliance Checklist

### MUST-HAVE (Launch Blockers)

**Infrastructure:**
- [ ] HIPAA-compliant hosting with signed BAA
- [ ] TLS 1.2+ enforced, TLS 1.3 preferred
- [ ] HSTS header deployed with preload
- [ ] SSL Labs score: A+
- [ ] All PHI encrypted at rest (AES-256)
- [ ] Database on encrypted volume with column-level encryption for PHI
- [ ] Backups encrypted and tested

**Application Security:**
- [ ] All security headers deployed (CSP, X-Frame-Options, etc.)
- [ ] CSRF protection on all forms
- [ ] Input validation and output encoding
- [ ] No SQL injection vectors (parameterized queries only)
- [ ] Rate limiting on all endpoints
- [ ] Admin panel behind 2FA
- [ ] Session management: HttpOnly, Secure, SameSite cookies
- [ ] Custom error pages (no stack traces)

**Compliance:**
- [ ] Privacy Policy / Notice of Privacy Practices published
- [ ] Terms of Service published
- [ ] Cookie consent mechanism deployed
- [ ] PHI disclaimer on all forms
- [ ] BAAs signed with all vendors handling PHI
- [ ] Audit logging enabled and verified
- [ ] Data retention policy documented and implemented
- [ ] Breach notification procedures documented

**Access Control:**
- [ ] Admin accounts use strong passwords + 2FA
- [ ] Principle of least privilege for all service accounts
- [ ] No shared credentials
- [ ] SSH keys rotated, password auth disabled on servers
- [ ] API keys stored in secrets manager (not in code)

### NICE-TO-HAVE (Post-Launch Enhancements)

- [ ] DNSSEC enabled
- [ ] Certificate Transparency monitoring
- [ ] Automated vulnerability scanning (weekly)
- [ ] Penetration test by third party
- [ ] SOC 2 Type II certification
- [ ] Bug bounty program
- [ ] SIEM integration for real-time alerting
- [ ] Geo-fencing for admin access
- [ ] Hardware security key enforcement for admin

---

## 8. Incident Response Plan

### 8.1 Incident Classification

| Severity | Description | Response Time | Example |
|----------|-------------|:-------------:|---------|
| Critical | Confirmed PHI breach | 1 hour | Database exfiltration, unauthorized PHI access |
| High | Security vulnerability with PHI exposure risk | 4 hours | SQL injection found, admin account compromised |
| Medium | Security issue without PHI risk | 24 hours | DDoS attack, non-PHI data exposure |
| Low | Policy violation, minor issue | 72 hours | Failed login spike, CSP violation |

### 8.2 Response Procedures

**Phase 1 -- Detection and Analysis (0-1 hour)**
1. Confirm the incident is real (not a false positive)
2. Classify severity
3. Assign incident commander
4. Begin documentation in incident log

**Phase 2 -- Containment (1-4 hours)**
1. Isolate affected systems
2. Revoke compromised credentials
3. Block attacker IP/access
4. Preserve evidence (logs, snapshots)

**Phase 3 -- Eradication (4-24 hours)**
1. Identify root cause
2. Patch vulnerability
3. Scan for additional compromise
4. Verify containment is complete

**Phase 4 -- Recovery (24-72 hours)**
1. Restore from clean backups if needed
2. Deploy fixes to production
3. Monitor for re-exploitation
4. Verify normal operations

**Phase 5 -- Notification (within 60 days for HIPAA)**
1. Determine if PHI was involved
2. If PHI breach affecting 500+ individuals: notify HHS within 60 days
3. If PHI breach affecting <500 individuals: notify HHS annually
4. Notify affected individuals without unreasonable delay
5. If 500+ individuals in a state: notify prominent media outlet

**Phase 6 -- Post-Incident (within 2 weeks)**
1. Conduct post-mortem
2. Update security controls
3. Update incident response plan
4. Retraining if needed
5. Document lessons learned

### 8.3 Contact List Template

| Role | Name | Phone | Email |
|------|------|-------|-------|
| Incident Commander | [TBD] | | |
| Technical Lead | [TBD] | | |
| Legal Counsel | [TBD] | | |
| Privacy Officer | [TBD] | | |
| HHS OCR | -- | -- | ocrmail@hhs.gov |

---

## 9. Cost Estimates

### Monthly Operating Costs

| Service | Provider | Monthly Cost | Notes |
|---------|----------|:------------:|-------|
| Hosting (HIPAA) | AWS/GCP | $50-150 | Small app server + encrypted DB |
| CDN + WAF | Cloudflare Pro | $20-200 | Pro for WAF, Business for advanced |
| SSL Certificate | Let's Encrypt / Cloudflare | $0 | Auto-renewal |
| Analytics | Plausible | $9 | Privacy-first, no cookies |
| Email (transactional) | AWS SES or SendGrid | $15-30 | BAA available |
| Secrets Manager | AWS Secrets Manager | $5-10 | Key rotation |
| Monitoring | Datadog / CloudWatch | $0-50 | Basic monitoring free tier |
| Backup storage | S3/GCS | $5-15 | Encrypted, cross-region |
| **Subtotal** | | **$100-465/mo** | |

### One-Time Costs

| Item | Est. Cost | Notes |
|------|:---------:|-------|
| Healthcare attorney review | $2,000-5,000 | Privacy policy, BAA, terms |
| Penetration test | $3,000-10,000 | Annual, third-party |
| SOC 2 Type II (optional) | $15,000-30,000 | If pursuing certification |
| Security training | $500-1,000 | Staff HIPAA training |

### Recommended Security Tools/Services

| Tool | Purpose | Cost |
|------|---------|:----:|
| Plausible Analytics | Privacy-first web analytics | $9/mo |
| 1Password Business | Password management + 2FA | $8/user/mo |
| Cloudflare | CDN, DDoS protection, WAF | $20-200/mo |
| Snyk | Dependency vulnerability scanning | Free tier available |
| Mozilla Observatory | Security header testing | Free |
| SSL Labs | TLS configuration testing | Free |
| OWASP ZAP | Automated security scanning | Free (open source) |
| Have I Been Pwned API | Breached password checking | Free for small scale |

---

## 10. Implementation Guide

### 10.1 Next.js Security Headers (next.config.js)

```javascript
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 10.2 CSRF Token Implementation (API Route)

```typescript
// lib/csrf.ts
import { randomBytes } from 'crypto';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export function validateCsrfToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;
  return timingSafeEqual(
    Buffer.from(token),
    Buffer.from(sessionToken)
  );
}
```

### 10.3 Form Submission Encryption (Server-Side)

```typescript
// lib/encryption.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';

export function encrypt(plaintext: string, key: Buffer): {
  ciphertext: string;
  iv: string;
  tag: string;
} {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
  ciphertext += cipher.final('base64');
  return {
    ciphertext,
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
  };
}

export function decrypt(
  ciphertext: string,
  key: Buffer,
  iv: string,
  tag: string
): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(iv, 'base64')
  );
  decipher.setAuthTag(Buffer.from(tag, 'base64'));
  let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
  plaintext += decipher.final('utf8');
  return plaintext;
}
```

### 10.4 Audit Logging Schema

```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  source_ip INET,
  user_agent TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp);
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_resource ON audit_log(resource_type, resource_id);

-- Make table append-only for application role
REVOKE UPDATE, DELETE ON audit_log FROM app_user;
```

### 10.5 Rate Limiting Middleware

```typescript
// middleware.ts (Next.js)
import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 100;

    const record = rateLimit.get(ip);
    if (record && now < record.resetTime) {
      if (record.count >= maxRequests) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429, headers: { 'Retry-After': '60' } }
        );
      }
      record.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    }
  }

  return NextResponse.next();
}
```

### 10.6 Ongoing Compliance Monitoring

**Weekly:**
- Review audit logs for anomalies
- Check for dependency vulnerabilities (npm audit / Snyk)
- Verify backup integrity

**Monthly:**
- Review access permissions
- Test backup restoration
- Review security header configuration
- Check certificate expiration dates
- Review rate limiting effectiveness

**Quarterly:**
- Conduct internal security assessment
- Review and update privacy policy if needed
- Review vendor BAAs and compliance status
- Staff security awareness refresh

**Annually:**
- Third-party penetration test
- Full HIPAA risk assessment
- Update incident response plan
- Review and update all security policies
- Staff HIPAA training

---

## Summary: Must-Have vs Nice-to-Have

### MUST-HAVE (Non-negotiable)

1. TLS 1.2+ with HSTS preload
2. AES-256 encryption at rest for all form/booking/chat data
3. Signed BAAs with every vendor touching PHI
4. All security headers (CSP, X-Frame-Options, HSTS, etc.)
5. 2FA on all admin access
6. Audit logging with 6-year retention
7. CSRF + XSS + SQLi protection
8. Privacy policy / Notice of Privacy Practices
9. PHI disclaimer on forms
10. Incident response plan
11. Rate limiting on all endpoints
12. Encrypted backups with tested restoration
13. No PHI in plaintext email

### NICE-TO-HAVE (Credibility Boosters)

1. SOC 2 Type II certification
2. Hardware security keys for admin
3. DNSSEC
4. Bug bounty program
5. Real-time SIEM alerting
6. Geo-fencing for admin access
7. Third-party pen test report (publishable summary)
8. Zero-trust network architecture

---

*This document should be reviewed by a healthcare attorney and updated as regulations evolve. Last updated: 2026-07-18.*
