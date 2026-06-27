# Technical Architecture Document — Saathi

> Learning Disability Analyser Platform
>
> **Version:** 1.0
> **Date:** 2026-06-27
> **Status:** Planning Phase

---

## Table of Contents

1. [System Overview](#1--system-overview)
2. [Architecture Diagram](#2--architecture-diagram)
3. [Project Structure](#3--project-structure)
4. [Frontend Architecture](#4--frontend-architecture)
5. [Backend Architecture](#5--backend-architecture)
6. [Data Layer](#6--data-layer)
7. [Authentication & Authorization](#7--authentication--authorization)
8. [Assessment Engine](#8--assessment-engine)
9. [Report Generation](#9--report-generation)
10. [Deployment Architecture](#10--deployment-architecture)
11. [Network & Traffic Flow](#11--network--traffic-flow)
12. [Error Handling Strategy](#12--error-handling-strategy)
13. [Performance Considerations](#13--performance-considerations)
14. [Scalability Path](#14--scalability-path)

---

## 1 — System Overview

Saathi is a full-stack web application built with React (CRA/PWA) for the frontend and Node.js for the backend API. The platform is designed to be HIPAA/GDPR compliant for handling sensitive health data.

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 16 + Material-UI 4 | SPA with PWA capabilities |
| **State Management** | Recoil | Atomic state management |
| **Routing** | React Router v5 | Client-side routing |
| **Backend** | Node.js + Express | REST API server |
| **Database** | PostgreSQL | Primary data store |
| **Cache** | Redis (planned) | Session & query caching |
| **Storage** | AWS S3 (planned) | File storage (reports, media) |
| **Auth** | JWT + Refresh Tokens | Stateless authentication |

---

## 2 — Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER                               │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    React SPA (PWA)                               │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │ │
│  │  │ Landing     │  │ Dashboard   │  │ Assessment Engine        │ │ │
│  │  │ Page        │  │ (Role-based)│  │ (Interactive Tasks)      │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘ │ │
│  │                                                                  │ │
│  │  ┌─────────────────────────────────────────────────────────────┐│ │
│  │  │ State: Recoil (Auth, Theme, Notifications)                ││ │
│  │  └─────────────────────────────────────────────────────────────┘│ │
│  └─────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │ HTTPS/REST
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│                         BACKEND API (Node.js)                         │
│                         Port: 8089 (Production)                       │
│                                                                        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────┐ │
│  │   Auth      │ │  Users     │ │ Assessment │ │   Reports         │ │
│  │   Module    │ │  Module    │ │  Module    │ │   Module          │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────┘ │
│                                                                        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────┐ │
│  │  Payments   │ │ Analytics  │ │   Email    │ │   Storage          │ │
│  │  Module     │ │  Module    │ │   Service  │ │   Service         │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────┘ │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Cross-Cutting: JWT Guard │ Rate Limiter │ Validation │ Logger │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
┌───────▼───────┐          ┌───────▼───────┐          ┌───────▼───────┐
│  PostgreSQL   │          │     Redis     │          │   AWS S3      │
│  Port: 5432   │          │  Port: 6379   │          │  (planned)    │
│               │          │               │          │               │
│ - Users       │          │ - Sessions    │          │ - PDF Reports │
│ - Assessments │          │ - Cache       │          │ - Media       │
│ - Profiles    │          │ - Rate Limit  │          │ - Exports     │
│ - Results     │          │               │          │               │
└───────────────┘          └───────────────┘          └───────────────┘
```

---

## 3 — Project Structure

```
special-learning-disablility-analyser/
├── package.json                    # Root dependencies
├── yarn.lock                       # Dependency lock file
├── .eslintrc.json                  # ESLint configuration
├── jsconfig.json                   # JS path aliases
├── README.md                       # Documentation
├── LICENSE.md                      # MIT License
├── CHANGELOG.md                    # Version history
│
├── public/                         # Static assets
│   ├── index.html                  # HTML template
│   ├── manifest.json               # PWA manifest
│   ├── favicon.ico                 # Favicon
│   ├── logo192.png                 # App icons
│   ├── logo512.png                 # App icons
│   ├── robots.txt                  # SEO
│   ├── images/                     # Static images
│   └── no-ie/                      # IE detection script
│
├── src/                           # Application source
│   ├── index.js                    # Entry point
│   ├── App.js                      # Root component
│   ├── serviceWorker.js            # Service worker (PWA)
│   ├── setupTests.js               # Test setup
│   │
│   ├── config/                     # Application configuration
│   │   └── index.js               # Config constants
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── Divider/
│   │   ├── Fb/                     # Flexbox utility component
│   │   ├── Link/
│   │   ├── Loading/
│   │   ├── Meta/                  # SEO meta tags
│   │   ├── NotFound/
│   │   ├── Page/
│   │   └── ScrollBar/
│   │
│   ├── pages/                      # Route pages
│   │   ├── Welcome/               # Landing page
│   │   ├── Page1/
│   │   ├── Page2/
│   │   ├── Page3/
│   │   └── Page4/
│   │
│   ├── sections/                   # Layout sections
│   │   ├── AppBar/                # Top navigation
│   │   ├── Layout/                # Main layout wrapper
│   │   ├── Navigation/            # Navigation menu
│   │   ├── Content/               # Page content area
│   │   ├── Menu/
│   │   ├── Copyright/
│   │   └── Notifications/
│   │
│   ├── store/                      # State management (Recoil)
│   │   ├── theme/                 # Theme state
│   │   ├── notifications/         # Notification state
│   │   └── sw/                    # Service worker state
│   │
│   ├── theme/                      # Material-UI theming
│   │   ├── ThemeProvider.js
│   │   └── index.js
│   │
│   ├── routes/                     # Routing configuration
│   │   └── index.js
│   │
│   ├── errorHandling/               # Error boundaries
│   │   ├── index.js
│   │   ├── withErrorHandler.js
│   │   └── Fallbacks/
│   │
│   └── utils/                      # Utility functions
│       ├── asyncComponentLoader/
│       ├── downloadFile.js
│       ├── today.js
│       ├── isMobile.js
│       ├── sleep.js
│       ├── resetApp.js
│       └── noop.js
│
└── hoster/                         # Production server
    └── server.js                   # Express static server
```

---

## 4 — Frontend Architecture

### 4.1 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 16.13.1 |
| UI Library | Material-UI | 4.10.2 |
| Routing | React Router | 5.2.0 |
| State | Recoil | 0.1.2 |
| Notifications | Notistack | 0.9.17 |
| Error Handling | React Error Boundary | 2.2.2 |
| SEO | React Helmet | 6.1.0 |
| Icons | React Icons | 3.10.0 |
| Build Tool | React Scripts | 3.4.1 |
| Date Handling | Day.js | 1.8.28 |
| Mobile Detection | is-mobile | 2.2.1 |
| UUID Generation | UUID | 8.2.0 |

### 4.2 Routing Structure

```
/                           → Welcome (Landing Page)
/register                   → Registration Page
/login                      → Login Page
/logout                     → Logout Handler
/dashboard                  → Role-based Dashboard
  /dashboard/assessments    → Assessment List
  /dashboard/assessment/:id  → Start/Continue Assessment
  /dashboard/results/:id     → View Results
  /dashboard/reports         → Report History
  /dashboard/settings        → Account Settings
/educator                   → Educator-specific routes
/parent                     → Parent-specific routes
/professional               → Healthcare professional routes
```

### 4.3 State Management (Recoil)

```
store/
├── theme/
│   ├── atoms.js            # Theme state atoms
│   └── selectors.js        # Theme derived state
├── notifications/
│   └── index.js            # Notification actions
└── sw/
    └── index.js            # Service worker state
```

### 4.4 Component Hierarchy

```
App
├── RecoilRoot
├── ThemeProvider
├── ErrorBoundary
│   └── Fb (Flexbox Container)
│       └── Router
│           └── Layout
│               ├── Notifications
│               ├── Navigation (AppBar)
│               ├── Content (Route Outlet)
│               │   ├── Welcome (Landing)
│               │   ├── Dashboard
│               │   ├── AssessmentFlow
│               │   └── Results
│               └── Copyright
```

---

## 5 — Backend Architecture

### 5.1 Module Structure (Planned)

| Module | Route Prefix | Auth | Purpose |
|--------|-------------|------|---------|
| `AuthController` | `/api/auth` | Public | Registration, login, tokens |
| `UsersController` | `/api/users` | JWT | Profile management |
| `ChildrenController` | `/api/children` | JWT | Child profile management |
| `AssessmentsController` | `/api/assessments` | JWT | Assessment sessions |
| `QuestionsController` | `/api/questions` | Public | Question bank (public) |
| `ResultsController` | `/api/results` | JWT | Result retrieval |
| `ReportsController` | `/api/reports` | JWT | Report generation |
| `AnalyticsController` | `/api/analytics` | JWT | Usage analytics |
| `BillingController` | `/api/billing` | JWT | Subscription management |
| `AdminController` | `/api/admin` | JWT + Admin | Platform admin |
| `HealthController` | `/health` | Public | Health check |

### 5.2 API Endpoints (Planned)

#### Authentication

```
POST   /api/auth/register        # Create account
POST   /api/auth/login           # Login
POST   /api/auth/logout          # Logout (invalidate tokens)
POST   /api/auth/refresh         # Refresh access token
POST   /api/auth/forgot-password # Password reset request
POST   /api/auth/reset-password  # Reset password with token
POST   /api/auth/verify-email    # Email verification
GET    /api/auth/me              # Get current user
```

#### Assessments

```
GET    /api/assessments           # List user's assessments
POST   /api/assessments          # Start new assessment
GET    /api/assessments/:id      # Get assessment details
PATCH  /api/assessments/:id      # Update assessment progress
POST   /api/assessments/:id/submit # Submit assessment

GET    /api/questions/:module    # Get questions for module
GET    /api/questions/:id        # Get single question
```

#### Results & Reports

```
GET    /api/results/:assessmentId     # Get assessment results
GET    /api/reports/:assessmentId      # Generate PDF report
GET    /api/reports/:reportId/download # Download report
```

#### Profiles

```
GET    /api/children              # List children
POST   /api/children              # Add child profile
GET    /api/children/:id          # Get child details
PATCH  /api/children/:id          # Update child profile
DELETE /api/children/:id         # Remove child profile
```

### 5.3 Request Flow

```
Request
  │
  ▼
┌─────────────────────┐
│  Rate Limiter       │  ← Check request limits
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  CORS Middleware     │  ← Validate origin
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  JWT Validation      │  ← Verify + decode token
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Validation Pipe     │  ← Validate request body
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Controller          │  ← Business logic
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Response Formatter   │  ← Consistent error format
└─────────────────────┘
```

---

## 6 — Data Layer

### 6.1 Database Schema (Planned)

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                │
├─────────────────────────────────────────────────────────────┤
│ id              UUID        PRIMARY KEY                     │
│ email           VARCHAR(255) UNIQUE, NOT NULL              │
│ password_hash   VARCHAR(255) NOT NULL                       │
│ role            ENUM       ('parent', 'educator', 'pro')   │
│ first_name      VARCHAR(100)                                │
│ last_name       VARCHAR(100)                                │
│ phone           VARCHAR(20)                                 │
│ institution     VARCHAR(255)                                │
│ email_verified  BOOLEAN     DEFAULT FALSE                   │
│ created_at      TIMESTAMP                                   │
│ updated_at      TIMESTAMP                                   │
└─────────────────┬───────────────────────────────────────────┘
                  │ 1:N
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      CHILDREN                               │
├─────────────────────────────────────────────────────────────┤
│ id              UUID        PRIMARY KEY                     │
│ user_id         UUID        FK → users.id                   │
│ first_name      VARCHAR(100)                                │
│ date_of_birth   DATE                                       │
│ gender          VARCHAR(20)                                 │
│ grade_level     VARCHAR(20)                                 │
│ notes           TEXT                                        │
│ created_at      TIMESTAMP                                   │
│ updated_at      TIMESTAMP                                   │
└─────────────────┬───────────────────────────────────────────┘
                  │ 1:N
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    ASSESSMENTS                             │
├─────────────────────────────────────────────────────────────┤
│ id              UUID        PRIMARY KEY                     │
│ user_id         UUID        FK → users.id                    │
│ child_id        UUID        FK → children.id                 │
│ module          VARCHAR(50)  (dyslexia, dyscalculia, etc.)   │
│ status          ENUM       ('in_progress', 'completed')    │
│ started_at      TIMESTAMP                                   │
│ completed_at    TIMESTAMP                                   │
│ answers         JSONB                                       │
│ metadata        JSONB                                       │
└─────────────────┬───────────────────────────────────────────┘
                  │ 1:1
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      RESULTS                               │
├─────────────────────────────────────────────────────────────┤
│ id              UUID        PRIMARY KEY                     │
│ assessment_id   UUID        FK → assessments.id             │
│ scores          JSONB                                       │
│ indicators      JSONB                                       │
│ recommendations TEXT                                        │
│ pdf_url         VARCHAR(500)                                │
│ generated_at    TIMESTAMP                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    SUBSCRIPTIONS                           │
├─────────────────────────────────────────────────────────────┤
│ id              UUID        PRIMARY KEY                     │
│ user_id         UUID        FK → users.id                   │
│ plan            ENUM       ('free', 'pro', 'institutional')│
│ status          ENUM       ('active', 'cancelled', 'expired')│
│ started_at      TIMESTAMP                                   │
│ expires_at      TIMESTAMP                                   │
│ stripe_customer_id VARCHAR(100)                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    AUDIT_LOGS                              │
├─────────────────────────────────────────────────────────────┤
│ id              UUID        PRIMARY KEY                     │
│ user_id         UUID        FK → users.id                   │
│ action          VARCHAR(100)                                │
│ resource_type   VARCHAR(50)                                 │
│ resource_id     UUID                                        │
│ ip_address      VARCHAR(45)                                 │
│ user_agent      TEXT                                        │
│ metadata        JSONB                                       │
│ created_at      TIMESTAMP                                   │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Entity Relationships

```
Users (1) ─── (N) Children
    │
    ├── (N) Assessments
    ├── (1) Subscription
    └── (N) AuditLogs

Children (1) ─── (N) Assessments
                       │
                       └── (1) Results
```

---

## 7 — Authentication & Authorization

### 7.1 Token Flow

```
Register/Login
  │
  ├── Validate credentials
  ├── Generate access token (JWT, 15min expiry)
  ├── Generate refresh token (JWT, 7d expiry)
  └── Return tokens to client

Client stores:
  ├── accessToken → memory (secure)
  └── refreshToken → httpOnly cookie

Request flow:
  ├── Attach accessToken to Authorization: Bearer header
  ├── On 401 → call POST /auth/refresh
  ├── Receive new access token
  └── Retry original request
```

### 7.2 JWT Payload

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "parent | educator | professional",
  "plan": "free | pro | institutional",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### 7.3 Role-Based Access Control

| Endpoint | Parent | Educator | Professional | Admin |
|----------|--------|----------|--------------|-------|
| View own results | ✅ | ✅ | ✅ | ✅ |
| Add child profiles | ✅ | ✅ | ✅ | ✅ |
| View student's results | — | Own students | Own patients | ✅ |
| Generate reports | ✅ | ✅ | ✅ | ✅ |
| Batch assessments | — | ✅ | ✅ | ✅ |
| API access | — | — | ✅ | ✅ |
| Admin panel | — | — | — | ✅ |

---

## 8 — Assessment Engine

### 8.1 Assessment Modules

| Module | Key | Question Count | Time (est) |
|--------|-----|---------------|------------|
| Dyslexia | `dyslexia` | 25-30 | 15-20 min |
| Dyscalculia | `dyscalculia` | 20-25 | 12-15 min |
| Dysgraphia | `dysgraphia` | 20-25 | 10-12 min |
| ADHD Indicators | `adhd` | 30-35 | 15-20 min |
| Autism Spectrum | `autism` | 35-40 | 20-25 min |

### 8.2 Question Types

| Type | Description | Scoring |
|------|-------------|---------|
| Multiple Choice | Single correct answer | 0-1 per question |
| Multiple Select | Multiple correct answers | Partial credit |
| Rating Scale | Likert scale (1-5) | Direct mapping |
| Timed Response | Response time measured | Speed indicator |
| Pattern Completion | Visual/auditory patterns | Correct/incorrect |

### 8.3 Assessment Flow

```
Start Assessment
  │
  ├── Load assessment config (module, version, settings)
  ├── Initialize session (create assessment record)
  └── Return first question

For each question:
  ├── Present question + media
  ├── Capture response + timing
  ├── Validate response
  ├── Store response (partial save)
  └── Return next question or completion

Complete Assessment:
  │
  ├── Calculate raw scores
  ├── Normalize scores (age-adjusted)
  ├── Identify indicators
  ├── Generate recommendations
  ├── Create result record
  ├── Generate PDF report (async)
  └── Return summary + result ID
```

---

## 9 — Report Generation

### 9.1 Report Sections

1. **Executive Summary** — Quick overview for parents
2. **Detailed Scores** — Score breakdown by category
3. **Indicator Analysis** — Strengths and areas of concern
4. **Recommendations** — Actionable next steps
5. **Resources** — Curated links and materials
6. **Professional Referral Guide** — When to seek professional help

### 9.2 PDF Generation (Planned)

```
Trigger: Assessment completion
  │
  ├── Fetch result data from database
  ├── Generate HTML template with scores
  ├── Apply styling (print-friendly CSS)
  ├── Convert to PDF (puppeteer/pdfkit)
  ├── Upload to storage (S3)
  ├── Update result record with PDF URL
  └── Send email with download link
```

---

## 10 — Deployment Architecture

### 10.1 Development

```bash
# Install dependencies
yarn install

# Run development server
yarn start

# Production build
yarn build

# Serve production build
yarn start-prod
```

### 10.2 Production Architecture (Planned)

```
                    ┌─────────────────┐
                    │   CDN (Cloudflare)│
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Load Balancer   │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
┌────────▼────────┐  ┌────────▼────────┐  ┌───────▼───────┐
│  React App      │  │  Node.js API     │  │  Worker       │
│  (Netlify/Vercel)│  │  (Render/Railway)│  │  (PDF, Email) │
│  Port: 80/443   │  │  Port: 3001       │  │               │
└─────────────────┘  └────────┬────────┘  └───────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
┌────────▼────────┐  ┌────────▼────────┐  ┌───────▼───────┐
│  PostgreSQL     │  │     Redis       │  │   AWS S3      │
│  (Neon/Supabase)│  │  (Upstash)      │  │               │
└─────────────────┘  └─────────────────┘  └───────────────┘
```

### 10.3 Docker Setup (Planned)

```yaml
# docker-compose.yml (planned)
services:
  api:
    build: ./api
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL
      - REDIS_URL
      - JWT_SECRET
    depends_on:
      - postgres
      - redis

  web:
    build: ./web
    ports:
      - "80:80"
    depends_on:
      - api

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=saathi
      - POSTGRES_USER=saathi
      - POSTGRES_PASSWORD

  redis:
    image: redis:7-alpine
```

---

## 11 — Network & Traffic Flow

### 11.1 Client → API

| Endpoint | Auth | Method |
|----------|------|--------|
| `/api/auth/*` | None | POST |
| `/api/users/me` | JWT | GET/PATCH |
| `/api/children/*` | JWT | GET/POST/PATCH/DELETE |
| `/api/assessments/*` | JWT | GET/POST/PATCH |
| `/api/questions/*` | None | GET |
| `/api/results/*` | JWT | GET |
| `/api/reports/*` | JWT | GET/POST |
| `/api/billing/*` | JWT | GET/POST |
| `/health` | Public | GET |

### 11.2 API → External Services

| Service | Protocol | Purpose |
|---------|----------|---------|
| SendGrid/Resend | SMTP/HTTPS | Transactional emails |
| Stripe | HTTPS | Payment processing |
| AWS S3 | AWS SDK | File storage |

---

## 12 — Error Handling Strategy

### 12.1 Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

### 12.2 HTTP Status Codes

| Code | Use Case |
|------|----------|
| 200 | Successful operation |
| 201 | Resource created |
| 400 | Validation failure |
| 401 | Authentication required |
| 403 | Permission denied |
| 404 | Resource not found |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

### 12.3 Error Boundaries

- **Frontend:** React Error Boundary at App level
- **Backend:** Global error handler middleware
- **Async:** Promise rejection handler with logging

---

## 13 — Performance Considerations

### 13.1 Current Optimizations

- **Code splitting:** Pages loaded asynchronously via `asyncComponentLoader`
- **Service Worker:** Offline caching, faster subsequent loads
- **Tree shaking:** Unused code eliminated in production build
- **Gzip/Brotli:** Static assets compressed

### 13.2 Planned Optimizations

- **Code splitting:** Per-route bundles (lazy loading)
- **Image optimization:** WebP format, lazy loading
- **Database:** Connection pooling, query optimization
- **Caching:** Redis for session and query cache
- **CDN:** Static assets served from CDN
- **API pagination:** Cursor-based pagination for lists

---

## 14 — Scalability Path

### 14.1 Current Limits

- **Single API instance** — no horizontal scaling
- **Local file storage** — single-server only
- **In-memory state** — no distributed cache

### 14.2 Scaling Steps

**Phase 1 — MVP (Current)**
- Single Node.js instance
- Local storage for static files
- PostgreSQL database

**Phase 2 — Production Launch**
- Multiple API instances behind load balancer
- Redis for sessions and caching
- S3 for file storage
- CDN for static assets

**Phase 3 — Growth**
- Database read replicas
- Redis cluster
- Background job queue (BullMQ)
- Microservices architecture

---

*End of Technical Architecture v1.0*
