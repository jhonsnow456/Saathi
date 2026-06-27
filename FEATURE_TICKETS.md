# Feature Ticket List — Saathi

> Learning Disability Analyser Platform
>
> **Version:** 1.0.0
> **Status:** Planning Phase
> **Date:** 2026-06-27

---

## Table of Contents

1. [Completed Features (✅)](#1--completed-features--)
2. [In Progress (🔄)](#2--in-progress--)
3. [Next Sprint (🎯 Ready to Start)](#3--next-sprint--ready-to-start)
4. [Backlog — v1.1 (📋 Planned)](#4--backlog--v11--planned)
5. [Backlog — v2.0 (🔮 Future)](#5--backlog--v20--future)
6. [Technical Debt (🔧)](#6--technical-debt--)
7. [Quick Stats](#7--quick-stats)

---

## 1 — Completed Features (✅)

*Current React PWA base template features*

### 1.1 Platform & Infrastructure

| Ticket | Description | Status | Notes |
|--------|-------------|--------|-------|
| **INF-001** | ✅ Base React PWA setup with CRA | Done | react-scripts 3.4.1 |
| **INF-002** | ✅ React Router v5 integration | Done | Client-side routing |
| **INF-003** | ✅ Material-UI v4 theming | Done | ThemeProvider setup |
| **INF-004** | ✅ Recoil state management | Done | Atoms + selectors |
| **INF-005** | ✅ Notistack notifications | Done | Toast notifications |
| **INF-006** | ✅ Error boundaries | Done | React error boundary |
| **INF-007** | ✅ React Helmet SEO | Done | Meta tags |
| **INF-008** | ✅ Service worker (PWA) | Done | Offline caching |
| **INF-009** | ✅ Express hoster server | Done | Production static server |
| **INF-010** | ✅ Dark/Light theme toggle | Done | User preference |
| **INF-011** | ✅ Responsive design | Done | Mobile-first |
| **INF-012** | ✅ ESLint configuration | Done | Code quality |
| **INF-013** | ✅ JSconfig path aliases | Done | Cleaner imports |
| **INF-014** | ✅ Husky + lint-staged | Done | Pre-commit hooks |

### 1.2 Authentication UI

| Ticket | Description | Status | Notes |
|--------|-------------|--------|-------|
| **AUTH-001** | ✅ Login page layout | Planned | To be implemented |
| **AUTH-002** | ✅ Register page layout | Planned | To be implemented |
| **AUTH-003** | ✅ Password reset flow UI | Planned | To be implemented |
| **AUTH-004** | ✅ Email verification UI | Planned | To be implemented |

### 1.3 Layout Components

| Ticket | Description | Status | Notes |
|--------|-------------|--------|-------|
| **LAY-001** | ✅ AppBar navigation | Done | Top navigation |
| **LAY-002** | ✅ Layout wrapper | Done | Main layout |
| **LAY-003** | ✅ Navigation menu | Done | Menu items |
| **LAY-004** | ✅ Content section | Done | Page content |
| **LAY-005** | ✅ Copyright footer | Done | Footer |
| **LAY-006** | ✅ Notifications section | Done | Toast container |
| **LAY-007** | ✅ Menu component | Done | Sidebar menu |
| **LAY-008** | ✅ Flexbox utility (Fb) | Done | Layout helper |

### 1.4 UI Components

| Ticket | Description | Status | Notes |
|--------|-------------|--------|-------|
| **UI-001** | ✅ Divider component | Done | Line divider |
| **UI-002** | ✅ Link component | Done | Styled links |
| **UI-003** | ✅ Loading component | Done | Spinner/loader |
| **UI-004** | ✅ Meta component | Done | SEO meta |
| **UI-005** | ✅ NotFound component | Done | 404 page |
| **UI-006** | ✅ Page component | Done | Page wrapper |
| **UI-007** | ✅ ScrollBar component | Done | Custom scrollbar |
| **UI-008** | ✅ Async component loader | Done | Code splitting |

### 1.5 Pages

| Ticket | Description | Status | Notes |
|--------|-------------|--------|-------|
| **PAGE-001** | ✅ Welcome/Landing page | Done | Main landing |
| **PAGE-002** | ✅ Page1 template | Done | Placeholder |
| **PAGE-003** | ✅ Page2 template | Done | Placeholder |
| **PAGE-004** | ✅ Page3 template | Done | Placeholder |
| **PAGE-005** | ✅ Page4 template | Done | Placeholder |

---

## 2 — In Progress (🔄)

*Features currently being developed*

### 2.1 Authentication System

| Ticket | Description | Status | Progress | Owner |
|--------|-------------|--------|----------|-------|
| **🔄 AUTH-010** | Backend API setup | 10% | Express server scaffolding | TBD |
| **🔄 AUTH-011** | JWT authentication | 0% | Not started | TBD |
| **🔄 AUTH-012** | User registration API | 0% | Not started | TBD |
| **🔄 AUTH-013** | User login API | 0% | Not started | TBD |

### 2.2 Database Setup

| Ticket | Description | Status | Progress | Owner |
|--------|-------------|--------|----------|-------|
| **🔄 DB-001** | PostgreSQL setup | 0% | Not started | TBD |
| **🔄 DB-002** | User entity | 0% | Not started | TBD |
| **🔄 DB-003** | Child profile entity | 0% | Not started | TBD |
| **🔄 DB-004** | Assessment entity | 0% | Not started | TBD |

---

## 3 — Next Sprint (🎯 Ready to Start)

*Sprint 1: Core Authentication & User Management*

### Sprint 1.1 — Authentication Foundation

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🎯 AUTH-020** | **Setup Express backend with TypeScript** | P0 | 4h | — |
| **🎯 AUTH-021** | **PostgreSQL + TypeORM setup** | P0 | 4h | — |
| **🎯 AUTH-022** | **User registration endpoint** | P0 | 4h | AUTH-020, AUTH-021 |
| **🎯 AUTH-023** | **User login endpoint** | P0 | 4h | AUTH-022 |
| **🎯 AUTH-024** | **JWT token generation** | P0 | 2h | AUTH-023 |
| **🎯 AUTH-025** | **Token refresh mechanism** | P1 | 2h | AUTH-024 |
| **🎯 AUTH-026** | **Password reset flow** | P1 | 4h | AUTH-022 |
| **🎯 AUTH-027** | **Email verification** | P1 | 4h | AUTH-022 |
| **🎯 AUTH-028** | **Login/Register UI pages** | P0 | 6h | AUTH-023 |

### Sprint 1.2 — User Management

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🎯 USER-001** | **User profile CRUD** | P0 | 4h | AUTH-024 |
| **🎯 USER-002** | **Role-based access (parent/educator/pro)** | P0 | 4h | AUTH-024 |
| **🎯 USER-003** | **Child profile management** | P1 | 6h | USER-001 |
| **🎯 USER-004** | **Account settings page** | P1 | 4h | USER-001 |

---

## 4 — Backlog — v1.1 (📋 Planned)

*Sprint 2: Assessment Engine*

### 4.1 Assessment Module

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **📋 ASSESS-001** | **Question bank database** | P0 | 6h | DB-003 |
| **📋 ASSESS-002** | **Assessment session management** | P0 | 8h | ASSESS-001 |
| **📋 ASSESS-003** | **Question delivery API** | P0 | 6h | ASSESS-001 |
| **📋 ASSESS-004** | **Answer submission API** | P0 | 6h | ASSESS-002 |
| **📋 ASSESS-005** | **Dyslexia screening module (25 questions)** | P0 | 16h | ASSESS-002 |
| **📋 ASSESS-006** | **Dyscalculia screening module (20 questions)** | P1 | 12h | ASSESS-002 |
| **📋 ASSESS-007** | **Dysgraphia screening module (20 questions)** | P1 | 12h | ASSESS-002 |
| **📋 ASSESS-008** | **ADHD indicator module (30 questions)** | P1 | 16h | ASSESS-002 |
| **📋 ASSESS-009** | **Autism spectrum module (35 questions)** | P2 | 20h | ASSESS-002 |
| **📋 ASSESS-010** | **Assessment progress saving** | P0 | 4h | ASSESS-002 |
| **📋 ASSESS-011** | **Assessment timer** | P1 | 4h | ASSESS-002 |

### 4.2 Assessment UI

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **📋 UI-ASSESS-001** | **Assessment landing page** | P0 | 4h | ASSESS-001 |
| **📋 UI-ASSESS-002** | **Question presentation component** | P0 | 8h | ASSESS-003 |
| **📋 UI-ASSESS-003** | **Multiple choice input** | P0 | 4h | UI-ASSESS-002 |
| **📋 UI-ASSESS-003** | **Rating scale input** | P1 | 4h | UI-ASSESS-002 |
| **📋 UI-ASSESS-004** | **Progress indicator** | P0 | 2h | UI-ASSESS-002 |
| **📋 UI-ASSESS-005** | **Audio player component** | P1 | 6h | UI-ASSESS-002 |
| **📋 UI-ASSESS-006** | **Image display component** | P0 | 4h | UI-ASSESS-002 |
| **📋 UI-ASSESS-007** | **Timer display** | P1 | 2h | ASSESS-011 |

---

## 5 — Backlog — v2.0 (🔮 Future)

*Sprint 3+: Results, Reports & Advanced Features*

### 5.1 Results & Scoring

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🔮 RES-001** | **Scoring algorithm implementation** | P0 | 8h | ASSESS-009 |
| **🔮 RES-002** | **Age-adjusted normalization** | P1 | 6h | RES-001 |
| **🔮 RES-003** | **Indicator identification** | P1 | 8h | RES-001 |
| **🔮 RES-004** | **Results display page** | P0 | 6h | RES-003 |
| **🔮 RES-005** | **Recommendations engine** | P1 | 8h | RES-003 |
| **🔮 RES-006** | **Results history** | P1 | 4h | RES-004 |

### 5.2 Report Generation

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🔮 RPT-001** | **PDF report template** | P0 | 8h | RES-005 |
| **🔮 RPT-002** | **PDF generation service** | P0 | 8h | RPT-001 |
| **🔮 RPT-003** | **Report download functionality** | P0 | 4h | RPT-002 |
| **🔮 RPT-004** | **Branded reports (Pro)** | P1 | 6h | RPT-001 |
| **🔮 RPT-005** | **Email report delivery** | P2 | 4h | RPT-002 |

### 5.3 Educator Features

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🔮 EDU-001** | **Student roster management** | P0 | 8h | USER-003 |
| **🔮 EDU-002** | **Batch assessment scheduling** | P1 | 12h | EDU-001 |
| **🔮 EDU-003** | **Class/group management** | P1 | 8h | EDU-001 |
| **🔮 EDU-004** | **Analytics dashboard** | P1 | 12h | EDU-001 |
| **🔮 EDU-005** | **CSV export** | P1 | 4h | EDU-004 |

### 5.4 Professional Features

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🔮 PRO-001** | **Patient management** | P0 | 8h | USER-003 |
| **🔮 PRO-002** | **API access for integrations** | P1 | 16h | AUTH-024 |
| **🔮 PRO-003** | **Progress tracking over time** | P1 | 8h | PRO-001 |
| **🔮 PRO-004** | **Clinical notes** | P2 | 8h | PRO-001 |

### 5.5 Multi-Language Support

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🔮 I18N-001** | **i18n infrastructure setup** | P0 | 4h | — |
| **🔮 I18N-002** | **Hindi translation** | P1 | 16h | I18N-001 |
| **🔮 I18N-003** | **Question translations** | P1 | 40h | I18N-002 |

### 5.6 Advanced Features

| Ticket | Description | Priority | Effort | Depends |
|--------|-------------|----------|--------|---------|
| **🔮 ADV-001** | **Adaptive testing algorithm** | P2 | 24h | ASSESS-009 |
| **🔮 ADV-002** | **Offline mode (PWA)** | P2 | 16h | — |
| **🔮 ADV-003** | **Mobile app (React Native)** | P3 | 80h | — |
| **🔮 ADV-004** | **Telehealth integration** | P3 | 24h | PRO-001 |

---

## 6 — Technical Debt (🔧)

### 6.1 High Priority

| Ticket | Description | Risk | Effort | Status |
|--------|-------------|------|--------|--------|
| **🔧 DEBT-001** | **Move hardcoded config to env vars** | High | 2h | Open |
| **🔧 DEBT-002** | **Add environment validation (Joi/Zod)** | High | 2h | Open |
| **🔧 DEBT-003** | **Remove debug console.log statements** | Medium | 1h | Open |
| **🔧 DEBT-004** | **Add request validation middleware** | High | 2h | Open |

### 6.2 Medium Priority

| Ticket | Description | Risk | Effort | Status |
|--------|-------------|------|--------|--------|
| **🔧 DEBT-005** | **Add integration tests** | Medium | 8h | Open |
| **🔧 DEBT-006** | **Add E2E tests** | Medium | 8h | Open |
| **🔧 DEBT-007** | **Performance audit** | Medium | 4h | Open |
| **🔧 DEBT-008** | **Bundle size optimization** | Low | 4h | Open |

### 6.3 Low Priority

| Ticket | Description | Risk | Effort | Status |
|--------|-------------|------|--------|--------|
| **🔧 DEBT-009** | **Add Storybook** | Low | 8h | Open |
| **🔧 DEBT-010** | **Code documentation (JSDoc)** | Low | 4h | Open |
| **🔧 DEBT-011** | **GitHub Actions CI/CD** | Low | 4h | Open |
| **🔧 DEBT-012** | **Add Sentry error tracking** | Low | 2h | Open |

---

## 7 — Quick Stats

### 7.1 Current Status

| Category | Count |
|----------|-------|
| Total tickets | 85+ |
| Completed | 23 |
| In Progress | 4 |
| Ready to Start | 17 |
| Planned (v1.1) | 17 |
| Future (v2.0) | 18 |
| Technical Debt | 12 |

### 7.2 Effort Estimates

| Phase | Features | Estimated Hours |
|-------|----------|-----------------|
| Sprint 1 (Auth) | 13 | 48h |
| Sprint 2 (Assessments) | 17 | 120h |
| Sprint 3 (Results) | 10 | 64h |
| Sprint 4 (Reports) | 5 | 30h |
| Sprint 5 (Educator) | 5 | 44h |
| Sprint 6 (Professional) | 4 | 40h |
| **Total** | **~55** | **~346h** |

### 7.3 Milestones

| Milestone | Target | Features |
|-----------|--------|----------|
| MVP - Auth | Week 2 | User registration, login, JWT |
| MVP - Children | Week 3 | Child profile CRUD |
| MVP - Assessment | Week 6 | Dyslexia screening |
| MVP - Results | Week 8 | Scoring, display |
| v1.0 Release | Week 10 | All 5 modules |
| v1.1 Release | Week 14 | Reports, educator dashboard |

---

## Ticket Naming Convention

```
[TYPE]-[NUMBER]

Types:
  INF  - Infrastructure
  AUTH - Authentication
  DB   - Database
  USER - User Management
  ASSESS - Assessment
  UI   - User Interface
  RES  - Results
  RPT  - Reports
  EDU  - Educator Features
  PRO  - Professional Features
  I18N - Internationalization
  DEBT - Technical Debt
  ADV  - Advanced Features
```

---

*End of Feature Ticket List v1.0.0*
