# Security & Access Document — Saathi

> Learning Disability Analyser Platform
>
> **Version:** 1.0
> **Date:** 2026-06-27
> **Classification:** Internal — Confidential

---

## Table of Contents

1. [Security Overview](#1--security-overview)
2. [Authentication Matrix](#2--authentication-matrix)
3. [Authorization & Access Control](#3--authorization--access-control)
4. [Endpoint Security Matrix](#4--endpoint-security-matrix)
5. [Secrets Management](#5--secrets-management)
6. [Data Protection](#6--data-protection)
7. [Input Validation](#7--input-validation)
8. [Rate Limiting](#8--rate-limiting)
9. [Session Management](#9--session-management)
10. [CORS & Content Security](#10--cors--content-security)
11. [File Upload Security](#11--file-upload-security)
12. [Third-Party Service Security](#12--third-party-service-security)
13. [Infrastructure Security](#13--infrastructure-security)
14. [Audit Trail](#14--audit-trail)
15. [Incident Response](#15--incident-response)
16. [Compliance](#16--compliance)
17. [Security Checklist](#17--security-checklist)

---

## 1 — Security Overview

Saathi handles sensitive health data including children's personal information and assessment results. A defense-in-depth strategy is implemented across four layers:

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 4: Infrastructure                                      │
│  HTTPS, HSTS, Docker isolation, network segmentation         │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: Application                                         │
│  JWT auth, role-based access, rate limiting, CSP            │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Data                                               │
│  Parameterized queries, input validation, encryption        │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: Client                                              │
│  XSS prevention (React auto-escape), CSRF protection        │
└─────────────────────────────────────────────────────────────┘
```

### 1.1 Security Principles

| Principle | Implementation |
|-----------|----------------|
| **Least Privilege** | Users have minimum required access |
| **Defense in Depth** | Multiple security layers |
| **Secure by Default** | Default deny, explicit allow |
| **Privacy by Design** | GDPR/HIPAA compliant from start |
| **Zero Trust** | Every request authenticated |

---

## 2 — Authentication Matrix

### 2.1 Authentication Methods

| Method | Status | Details |
|--------|--------|---------|
| **Email/Password** | ✅ Planned | bcrypt hashing, secure salt |
| **Social Login (Google)** | ⏳ Planned | OAuth 2.0 flow |
| **JWT Access Token** | ✅ Planned | 15-minute expiry |
| **JWT Refresh Token** | ✅ Planned | 7-day expiry, rotation |
| **Magic Links** | 📋 Future | Passwordless option |
| **MFA/2FA** | 📋 Future | TOTP or SMS |

### 2.2 User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| **Guest** | Unauthenticated visitor | Landing page, public info |
| **Parent** | Parent/caregiver account | Own children's data only |
| **Educator** | Teacher/school account | Own students' data |
| **Professional** | Healthcare provider | Own patients' data |
| **Admin** | Platform administrator | All data, system config |

### 2.3 Token Lifecycle

```
┌──────────┐    Register/Login     ┌───────────────┐
│  Client  │ ────────────────────► │  Auth Server   │
│          │ ◄──────────────────── │               │
│          │   accessToken (15m)  │               │
│          │   refreshToken (7d)   │               │
└────┬─────┘                       └───────────────┘
     │
     │ Request with accessToken
     ▼
┌─────────────────┐
│  Resource API    │
│  JWT validated   │
└─────────────────┘
     │
     │ accessToken expired (401)
     ▼
┌───────────────┐    POST /auth/refresh     ┌───────────────┐
│  Client       │ ────────────────────────► │  Auth Server   │
│  refreshToken │ ◄──────────────────────── │               │
│  (httpOnly)   │   new accessToken        │               │
└───────────────┘                           └───────────────┘
```

---

## 3 — Authorization & Access Control

### 3.1 Guard Chain

Every protected request passes through:

1. **Rate Limiter** — Check request limits
2. **@Public() check** — If decorated, skip auth
3. **JwtAuthGuard** — Verify `Authorization: Bearer <token>`
4. **RolesGuard** — Check role permissions
5. **ResourceOwnerGuard** — Verify ownership (for user-specific data)
6. **ValidationPipe** — Validate request data

### 3.2 Access Control Matrix

| Resource | Guest | Parent | Educator | Professional | Admin |
|----------|-------|--------|-----------|--------------|-------|
| View landing page | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create account | ✅ | — | — | — | — |
| View own profile | — | ✅ | ✅ | ✅ | ✅ |
| Add child/student profiles | — | ✅ | ✅ | ✅ | ✅ |
| Start assessment | — | ✅ | ✅ | ✅ | ✅ |
| View own results | — | Own only | Own + students | Own + patients | ✅ |
| Generate reports | — | ✅ | ✅ | ✅ | ✅ |
| Batch assessments | — | — | ✅ | ✅ | ✅ |
| API access | — | — | — | ✅ | ✅ |
| View all users | — | — | — | — | ✅ |
| System configuration | — | — | — | — | ✅ |

### 3.3 Data Isolation

- Every query scoped to `userId` from JWT `sub` claim
- Educator queries scoped to enrolled students only
- Professional queries scoped to registered patients only
- No cross-user data access possible through normal API paths
- Admin endpoints audited and logged

---

## 4 — Endpoint Security Matrix

### 4.1 Auth Endpoints

| Endpoint | Auth | Rate Limit | Risk Level | Notes |
|----------|------|-----------|------------|-------|
| `POST /api/auth/register` | Public | 5 req / 15 min | High | Email enumeration prevented |
| `POST /api/auth/login` | Public | **5 req / 15 min** | **High** | Brute force protection |
| `POST /api/auth/refresh` | Public | 10 req / min | Medium | Token rotation |
| `POST /api/auth/forgot-password` | Public | 3 req / hour | Medium | No email enumeration |
| `POST /api/auth/reset-password` | Public | 5 req / 15 min | High | Token consumed on use |
| `POST /api/auth/verify-email` | Public | 10 req / min | Low | Token consumed on use |
| `GET /api/auth/me` | JWT | Global | Low | Current user info |

### 4.2 User & Profile Endpoints

| Endpoint | Auth | Rate Limit | Risk Level |
|----------|------|-----------|------------|
| `GET /api/users/me` | JWT | Global | Low |
| `PATCH /api/users/me` | JWT | Global | Medium |
| `GET /api/children` | JWT | Global | Low |
| `POST /api/children` | JWT | Global | Medium |
| `GET /api/children/:id` | JWT | Global | Low |
| `PATCH /api/children/:id` | JWT | Global | Medium |
| `DELETE /api/children/:id` | JWT | Global | High |

### 4.3 Assessment Endpoints

| Endpoint | Auth | Rate Limit | Risk Level |
|----------|------|-----------|------------|
| `GET /api/assessments` | JWT | Global | Low |
| `POST /api/assessments` | JWT | 10 req / hour | Medium |
| `GET /api/assessments/:id` | JWT | Global | Low |
| `PATCH /api/assessments/:id` | JWT | Global | Medium |
| `POST /api/assessments/:id/submit` | JWT | 10 req / hour | High |
| `GET /api/questions/:module` | Public | Global | Low |

### 4.4 Results & Reports Endpoints

| Endpoint | Auth | Rate Limit | Risk Level |
|----------|------|-----------|------------|
| `GET /api/results/:assessmentId` | JWT | Global | Low |
| `GET /api/reports/:assessmentId` | JWT | 5 req / min | Medium |
| `GET /api/reports/:reportId/download` | JWT | 10 req / min | Medium |

### 4.5 Billing Endpoints

| Endpoint | Auth | Rate Limit | Risk Level |
|----------|------|-----------|------------|
| `GET /api/billing/subscription` | JWT | Global | Low |
| `POST /api/billing/checkout` | JWT | Global | High |
| `POST /api/billing/webhook` | Stripe sig | — | **Critical** |
| `POST /api/billing/cancel` | JWT | Global | High |

### 4.6 Admin Endpoints

| Endpoint | Auth | Rate Limit | Risk Level |
|----------|------|-----------|------------|
| `GET /api/admin/users` | JWT + Admin | Global | **Critical** |
| `GET /api/admin/stats` | JWT + Admin | Global | Medium |
| `GET /api/admin/assessments` | JWT + Admin | Global | Medium |
| `POST /api/admin/broadcast` | JWT + Admin | 1 req / day | **Critical** |

### 4.7 Health Endpoints

| Endpoint | Auth | Rate Limit | Risk Level |
|----------|------|-----------|------------|
| `GET /health` | Public | Global | Low |
| `GET /health/ready` | Public | Global | Low |

---

## 5 — Secrets Management

### 5.1 Environment Variables

| Variable | Purpose | Sensitivity | Storage |
|----------|---------|-------------|---------|
| `JWT_SECRET` | Token signing | **Critical** | `.env`, not committed |
| `JWT_REFRESH_SECRET` | Refresh token signing | **Critical** | `.env`, not committed |
| `DATABASE_URL` | Database connection | **Critical** | `.env`, not committed |
| `REDIS_URL` | Cache connection | High | `.env`, not committed |
| `SENDGRID_API_KEY` | Email sending | High | `.env`, not committed |
| `STRIPE_SECRET_KEY` | Payment processing | **Critical** | `.env`, not committed |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification | **Critical** | `.env`, not committed |
| `STRIPE_PUBLIC_KEY` | Client-side Stripe | Low | Can be public |
| `AWS_ACCESS_KEY_ID` | S3 storage | High | `.env`, not committed |
| `AWS_SECRET_ACCESS_KEY` | S3 storage | **Critical** | `.env`, not committed |
| `S3_BUCKET_NAME` | Storage bucket | Medium | `.env` |
| `SESSION_SECRET` | Session encryption | **Critical** | `.env`, not committed |

### 5.2 Secret Handling Rules

- **Never** commit `.env` files (enforced by `.gitignore`)
- **Never** log secrets (even in error messages)
- **Never** expose secrets client-side (only public keys)
- **Never** use secrets in client-side JavaScript
- **Rotate** JWT_SECRET if compromised — invalidates all tokens
- **Rotate** Stripe/API keys immediately if leaked
- **Use** secret scanning tools in CI/CD pipeline

### 5.3 `.gitignore` Configuration

```gitignore
# Environment files
.env
.env.local
.env.*.local
.env.production
.env.production.local

# Never commit these
*.pem
*.key
credentials.json
service-account.json

# Build outputs
build/
dist/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

### 5.4 Validation at Startup

All environment variables must be validated before the server starts:

```
Required:
  - JWT_SECRET (min 32 characters)
  - DATABASE_URL
  
Optional (server starts but features disabled):
  - REDIS_URL
  - SENDGRID_API_KEY
  - STRIPE_SECRET_KEY
  - AWS_* variables
```

---

## 6 — Data Protection

### 6.1 Data Classification

| Data Type | Classification | Retention | Encryption |
|-----------|---------------|-----------|------------|
| Email addresses | **PII** | Indefinite | At rest (DB encryption) |
| Password hashes | **Secret** | Indefinite | bcrypt (12 rounds) |
| Child profiles | **PHI** | Indefinite | At rest, encrypted |
| Assessment responses | **PHI** | 7 years | At rest, encrypted |
| Assessment results | **PHI** | 7 years | At rest, encrypted |
| JWT tokens | **Secret** | 15min / 7d | Signed (HS256) |
| Health information | **PHI** | 7 years | At rest, encrypted |
| Payment info | **Financial** | Per Stripe | Encrypted by Stripe |
| Audit logs | **Internal** | 2 years | At rest |

### 6.2 Password Security

| Requirement | Implementation |
|-------------|----------------|
| Minimum length | 8 characters (enforced) |
| Hashing algorithm | bcrypt with cost factor 12 |
| Salt | Auto-generated per password |
| Reset tokens | UUID v4, single-use, 1-hour expiry |
| Password requirements | At least 1 uppercase, 1 lowercase, 1 number |
| Password strength meter | Visual indicator on registration |
| Breach detection | HaveIBeenPwned API check (optional) |

### 6.3 Data Retention Policy

| Data Type | Retention | Cleanup Method |
|-----------|-----------|----------------|
| Assessment responses | 7 years | Automated archive after 2 years |
| Results | 7 years | Automated archive |
| User accounts | Indefinite | Manual deletion request |
| Audit logs | 2 years | Automated deletion |
| Session tokens | 7 days | Automatic expiration |
| Failed login attempts | 30 days | Automated cleanup |
| Temporary files | 24 hours | Scheduled job |

### 6.4 GDPR Compliance

| Requirement | Implementation |
|-------------|----------------|
| Right to access | User can export all their data |
| Right to rectification | Profile editing in settings |
| Right to erasure | Account deletion (GDPR delete) |
| Right to portability | JSON/CSV data export |
| Consent management | Granular consent for each data use |
| Privacy policy | Clear, plain language policy |
| Cookie consent | Banner with granular options |
| Data breach notification | 72-hour notification process |

### 6.5 HIPAA Compliance (US)

| Safeguard | Implementation |
|-----------|----------------|
| Administrative | Staff training, BAA with vendors |
| Physical | AWS physical security, encrypted backups |
| Technical | Encryption, access controls, audit logs |
| Organizational | Business Associate Agreements |

---

## 7 — Input Validation

### 7.1 Validation Layers

| Layer | Mechanism | Scope |
|-------|-----------|-------|
| DTO validation | `class-validator` decorators | All request bodies |
| Zod schema | Env validation | Server startup |
| Type coercion | Transform pipes | URL params, query strings |
| File validation | Type + size checks | File uploads |
| SQL injection | Parameterized queries | Database queries |
| XSS | React auto-escaping | All rendered content |

### 7.2 DTO Validation Rules

| DTO | Fields | Validation Rules |
|-----|--------|------------------|
| `RegisterDto` | email, password, firstName, lastName, role | `@IsEmail()`, `@MinLength(8)`, `@IsEnum()` |
| `LoginDto` | email, password | `@IsEmail()`, `@IsString()` |
| `CreateChildDto` | firstName, dateOfBirth, gender | `@IsString()`, `@IsDateString()`, `@IsEnum()` |
| `CreateAssessmentDto` | childId, module | `@IsUUID()`, `@IsEnum(MODULES)` |
| `SubmitAnswerDto` | questionId, answer, timeSpent | `@IsUUID()`, `@IsDefined()`, `@Min(0)` |

### 7.3 Validation Pipe Configuration

```typescript
{
  transform: true,           // Auto-transform to DTO types
  whitelist: true,           // Strip unknown properties
  forbidNonWhitelisted: true, // Reject requests with extra fields
  transformOptions: {
    enableImplicitConversion: true
  }
}
```

### 7.4 Input Sanitization

| Input Type | Sanitization |
|------------|--------------|
| Text fields | HTML entity encoding |
| URLs | URL validation, protocol check |
| Email | Format validation, normalization |
| Numbers | Type coercion, range checking |
| Dates | Format validation, range checking |
| File names | Alphanumeric + safe chars only |
| JSON | Schema validation |
| SQL | Parameterized queries only (no string concatenation) |

---

## 8 — Rate Limiting

### 8.1 Global Defaults

| Window | Limit | Purpose |
|--------|-------|---------|
| 1 minute | 20 requests | Short-term burst protection |
| 15 minutes | 100 requests | Sustained usage protection |
| 1 hour | 500 requests | Heavy usage protection |

### 8.2 Authentication Routes (CRITICAL)

| Endpoint | Limit | Window | Reason |
|----------|-------|--------|--------|
| `POST /api/auth/login` | **5** | **15 minutes** | Brute force prevention |
| `POST /api/auth/register` | 5 | 15 minutes | Spam prevention |
| `POST /api/auth/forgot-password` | 3 | 1 hour | Email flooding prevention |
| `POST /api/auth/reset-password` | 5 | 15 minutes | Token abuse prevention |

### 8.3 Assessment Routes

| Endpoint | Limit | Window | Reason |
|----------|-------|--------|--------|
| `POST /api/assessments` | 10 | 1 hour | Resource abuse prevention |
| `POST /api/assessments/:id/submit` | 10 | 1 hour | Submission spam |
| `GET /api/questions/:module` | 60 | 1 minute | Question scraping prevention |

### 8.4 Rate Limit Headers

All rate-limited responses include:

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1719484800
Retry-After: 847
```

### 8.5 Rate Limit Response (429)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many login attempts. Please try again in 15 minutes.",
    "retryAfter": 847
  }
}
```

---

## 9 — Session Management

### 9.1 Token Storage

| Token Type | Client Storage | Expiry | Rotation |
|------------|----------------|--------|----------|
| Access token | Memory only | 15 minutes | On expiry |
| Refresh token | httpOnly cookie | 7 days | On use |
| Session ID | httpOnly cookie | 24 hours | On activity |

### 9.2 Session Security

| Protection | Implementation |
|------------|----------------|
| httpOnly | Prevents JavaScript access |
| Secure | HTTPS only in production |
| SameSite=Strict | CSRF protection |
| Session fixation | Regenerate on login |
| Concurrent sessions | Track and limit per user |

### 9.3 Session Invalidation

| Event | Action |
|-------|--------|
| Password change | All refresh tokens invalidated |
| Email change | All refresh tokens invalidated |
| Logout | Current refresh token invalidated |
| Account deletion | All tokens invalidated |
| Security event | All tokens invalidated (admin action) |

### 9.4 Concurrent Session Policy

| Plan | Max Concurrent Sessions |
|------|------------------------|
| Free | 1 |
| Pro | 3 |
| Institutional | 10 |

---

## 10 — CORS & Content Security

### 10.1 CORS Configuration

| Environment | Allowed Origins |
|-------------|----------------|
| Development | `http://localhost:3000`, `http://localhost:8089` |
| Staging | `https://staging.saathi.app` |
| Production | `https://saathi.app`, `https://www.saathi.app` |

### 10.2 Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Force HTTPS |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'` | XSS prevention |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Clickjacking prevention |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage prevention |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Feature policy |

### 10.3 Content Security Policy (CSP)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.saathi.app;
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  object-src 'none';
```

---

## 11 — File Upload Security

### 11.1 Upload Validation

| Check | Implementation | Reject if |
|-------|----------------|-----------|
| File type | Magic bytes + MIME type | Non-image types |
| File size | 5 MB max | Larger files |
| Filename | Sanitized, UUID renamed | Special characters |
| Image dimensions | 100x100 minimum | Too small |
| Image dimensions | 8000x8000 maximum | Too large |
| Malicious content | Virus scan (planned) | Contains malware |

### 11.2 Storage Security

| Environment | Storage | Access |
|-------------|---------|--------|
| Development | Local filesystem | Direct access |
| Production | AWS S3 with encryption | Signed URLs only |

### 11.3 File Type Allowlist

```
Image types:
  - image/jpeg (.jpg, .jpeg)
  - image/png (.png)
  - image/webp (.webp)
  - image/gif (.gif) — for animations only

Document types:
  - application/pdf (.pdf) — for reports only
```

---

## 12 — Third-Party Service Security

### 12.1 Email (SendGrid/Resend)

| Aspect | Implementation |
|--------|----------------|
| Auth | API key in `Authorization: Bearer` header |
| Data sent | Email address, name, template data |
| Template security | Server-side rendering, no user input in templates |
| Rate limits | SendGrid handles sending limits |
| Bounce handling | Automatic via webhooks |

### 12.2 Payments (Stripe)

| Aspect | Implementation |
|--------|----------------|
| Auth | Secret key server-side, public key client-side |
| Webhook verification | Signature verification required |
| Data stored | Customer ID, subscription ID only |
| PCI compliance | All card data handled by Stripe |
| Refunds | Admin-initiated with audit log |

### 12.3 Cloud Storage (AWS S3)

| Aspect | Implementation |
|--------|----------------|
| Auth | IAM credentials with minimal permissions |
| Bucket policy | No public access, private by default |
| Encryption | AES-256 at rest |
| Access | Pre-signed URLs with 15-minute expiry |
| Cross-region | Replication for disaster recovery |

---

## 13 — Infrastructure Security

### 13.1 Network Security

| Practice | Implementation |
|----------|----------------|
| TLS 1.3 | All connections encrypted |
| Firewall | VPC security groups |
| Private subnets | Database in private subnet |
| Load balancer | SSL termination |
| DDoS protection | Cloudflare or AWS Shield |

### 13.2 Container Security

| Practice | Implementation |
|----------|----------------|
| Non-root user | All containers run as non-root |
| Read-only filesystem | Containers with read-only root |
| Minimal base image | Alpine-based images |
| No secrets in images | All secrets via env vars |
| Image scanning | Trivy in CI/CD pipeline |

### 13.3 Database Security

| Practice | Implementation |
|----------|----------------|
| SSL connections | Required in production |
| Passwords | Rotated quarterly |
| Access | IAM authentication preferred |
| Backups | Encrypted, tested monthly |
| Point-in-time recovery | Enabled |

---

## 14 — Audit Trail

### 14.1 Logged Events

| Event | Data Captured | Retention |
|-------|---------------|-----------|
| User registration | Email, role, timestamp, IP | 2 years |
| Login (success) | User ID, timestamp, IP, user agent | 2 years |
| Login (failure) | Email, timestamp, IP, reason | 30 days |
| Password change | User ID, timestamp, IP | 2 years |
| Profile update | User ID, changed fields, timestamp | 2 years |
| Assessment start | User ID, child ID, module, timestamp | 7 years |
| Assessment submission | User ID, child ID, module, timestamp | 7 years |
| Report generation | User ID, result ID, timestamp | 7 years |
| Data export | User ID, data types, timestamp | 2 years |
| Data deletion | User ID, deleted data, timestamp | 2 years |
| Admin actions | Admin ID, action, target, timestamp | 2 years |

### 14.2 Log Format

```json
{
  "timestamp": "2026-06-27T10:30:00.000Z",
  "level": "info",
  "event": "assessment_submitted",
  "userId": "uuid",
  "childId": "uuid",
  "module": "dyslexia",
  "ip": "203.0.113.0",
  "userAgent": "Mozilla/5.0...",
  "metadata": {}
}
```

### 14.3 Audit Log Protection

- Logs stored in append-only storage
- Tamper-evident logging
- Restricted access to audit logs
- Regular access reviews

---

## 15 — Incident Response

### 15.1 Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| P0 — Critical | Data breach, service down | Immediate | PHI exposure, database breach |
| P1 — High | Major feature broken | 1 hour | Authentication bypass, payment failure |
| P2 — Medium | Feature degraded | 4 hours | Slow performance, partial outage |
| P3 — Low | Minor issue | 24 hours | UI bug, non-critical error |

### 15.2 Incident Procedures

**Data Breach (P0):**
1. Contain the breach — revoke compromised credentials
2. Assess exposure — identify affected users and data
3. Notify team — activate incident response team
4. Notify authorities — GDPR/HIPAA required notifications
5. Notify users — within 72 hours (GDPR)
6. Remediate — fix vulnerability, strengthen defenses
7. Post-mortem — document lessons learned

**Authentication Bypass (P1):**
1. Disable affected authentication mechanism
2. Force password reset for affected users
3. Invalidate all active sessions
4. Investigate root cause
5. Deploy fix
6. Monitor for recurrence

### 15.3 Contact Information

| Contact | Purpose | Availability |
|---------|---------|--------------|
| Security Team | security@saathi.app | 24/7 for P0 |
| Privacy Officer | privacy@saathi.app | Business hours |
| Legal | legal@saathi.app | Business hours |

---

## 16 — Compliance

### 16.1 GDPR (EU)

| Article | Implementation |
|---------|----------------|
| Art. 5 | Data minimization, purpose limitation |
| Art. 6 | Lawful basis (consent, contract) |
| Art. 12-22 | Data subject rights |
| Art. 25 | Privacy by design/default |
| Art. 30 | Records of processing activities |
| Art. 32 | Security measures |
| Art. 33-34 | Breach notification |

### 16.2 HIPAA (US)

| Safeguard | Implementation |
|-----------|----------------|
| 164.308(a)(1) | Security management process |
| 164.308(a)(3) | Workforce security |
| 164.308(a)(5) | Information access management |
| 164.312(a)(1) | Access control |
| 164.312(b) | Audit controls |
| 164.312(e)(1) | Transmission security |

### 16.3 COPPA (US - Children)

| Requirement | Implementation |
|-------------|----------------|
| Verifiable parental consent | Email verification required |
| Data collection limitations | Minimal data collection |
| Parental rights | View, delete, revoke consent |
| Safe harbor | COPPA-compliant design |

---

## 17 — Security Checklist

### Pre-Launch

- [ ] All auth routes have rate limiting (5 attempts / 15 min for login)
- [ ] All API keys scanned and removed from codebase
- [ ] All sensitive data moved to environment variables
- [ ] Input validation on all endpoints
- [ ] JWT tokens use httpOnly cookies
- [ ] CORS configured with explicit whitelist
- [ ] Security headers enabled (HSTS, CSP, etc.)
- [ ] HTTPS enforced in production
- [ ] Database password rotated from defaults
- [ ] Audit logging implemented
- [ ] Error messages don't leak sensitive info
- [ ] Passwords hashed with bcrypt (12 rounds)
- [ ] File uploads validated and sanitized
- [ ] No secrets in git history
- [ ] `.gitignore` properly configured
- [ ] Security audit completed
- [ ] Penetration testing done
- [ ] GDPR privacy policy published
- [ ] Cookie consent implemented
- [ ] Terms of service published

### Ongoing

- [ ] Monthly dependency audit
- [ ] Quarterly security review
- [ ] Annual penetration testing
- [ ] Monthly log review for anomalies
- [ ] Quarterly secret rotation
- [ ] Backup restoration testing
- [ ] Incident response plan review

---

*End of Security & Access Document v1.0*
