# Product Requirements Document — Saathi

> Learning Disability Analyser Platform — AI-Powered Assessment Tool
>
> **Version:** 1.0.0
> **Status:** Planning Phase
> **Date:** 2026-06-27
> **Owner:** jhonsnow456

---

## Table of Contents

1. [Vision & Goals](#1--vision--goals)
2. [Target Users](#2--target-users)
3. [Core Features](#3--core-features)
4. [User Flows](#4--user-flows)
5. [Non-Functional Requirements](#5--non-functional-requirements)
6. [Open Questions & Risks](#6--open-questions--risks)
7. [Success Metrics](#7--success-metrics)

> All other PRD content (architecture, security, feature status, implementation details) has been moved to companion documents:
> - **Architecture:** [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)
> - **Security & Privacy:** [SECURITY_ACCESS.md](SECURITY_ACCESS.md)
> - **Security Audit:** [SECURITY_AUDIT.md](SECURITY_AUDIT.md)
> - **Frontend Spec:** [FRONTEND_SPEC.md](FRONTEND_SPEC.md)
> - **Feature Status:** [FEATURE_TICKETS.md](FEATURE_TICKETS.md)

---

## 1 — Vision & Goals

### 1.1 Vision

**Saathi** (meaning "companion" in Hindi) is an AI-powered platform designed to help identify and assess learning disabilities in children and adults. The platform provides accessible, scientifically-grounded screening tools that assist educators, parents, and healthcare professionals in early detection and intervention.

### 1.2 Mission

To democratize access to learning disability screening by providing affordable, user-friendly, and culturally-sensitive assessment tools that can be deployed in schools, clinics, and homes worldwide.

### 1.3 Business Goals

| # | Goal | Metric | Timeline |
|---|------|--------|----------|
| G1 | Establish as a trusted screening tool | 500+ registered educators/clinicians | 6 months |
| G2 | Enable early intervention | 10,000+ assessments completed | 12 months |
| G3 | Build community of practitioners | 1,000+ support forum members | 9 months |
| G4 | Expand to 3+ languages | Hindi, English, regional language support | 12 months |

### 1.4 Success Criteria (v1)

- Users can complete a comprehensive screening in under **20 minutes**
- Assessment results are available immediately with actionable insights
- The platform maintains **HIPAA/GDPR compliance** for health data
- Accessibility score of **WCAG 2.1 AA** across all pages
- Support for **dyslexia, dyscalculia, dysgraphia, ADHD, and autism** screening domains

---

## 2 — Target Users

### 2.1 Primary Users

#### Educators & Teachers

| Attribute | Detail |
|-----------|--------|
| Role | School teachers, special education coordinators |
| Tech Skill | Moderate — comfortable with web applications |
| Pain Point | Limited time for individual assessments, lack of standardized tools |
| Motivation | Better identify struggling students early, provide evidence for accommodations |
| Budget | School/institutional budget |

#### Parents & Caregivers

| Attribute | Detail |
|-----------|--------|
| Role | Parents of children ages 5-18 who suspect learning difficulties |
| Tech Skill | Basic to Moderate — can navigate web forms |
| Pain Point | Long wait times for professional assessment, expensive testing |
| Motivation | Understand their child's learning profile, advocate for school support |
| Budget | Personal/family budget |

#### Healthcare Professionals

| Attribute | Detail |
|-----------|--------|
| Role | Psychologists, developmental pediatricians, occupational therapists |
| Tech Skill | High — comfortable with clinical software |
| Pain Point | Need quick screening tools to prioritize cases |
| Motivation | Supplement clinical evaluation, track progress over time |
| Budget | Clinical/institutional budget |

### 2.2 User Demographics

| Segment | Age | Primary Device | Context |
|---------|-----|----------------|---------|
| Parents | 30-50 | Mobile (60%), Desktop (40%) | Home, evening hours |
| Educators | 25-55 | Desktop (70%), Mobile (30%) | School, working hours |
| Healthcare | 30-60 | Desktop (85%), Tablet (15%) | Clinical setting |

---

## 3 — Core Features

### 3.1 Screening Modules

| Module | Description | Target Age | Duration |
|--------|-------------|------------|----------|
| **Dyslexia Screener** | Visual, auditory, and reading pattern assessment | 6-18 years | 15-20 min |
| **Dyscalculia Screener** | Number sense, math fluency, pattern recognition | 6-18 years | 12-15 min |
| **Dysgraphia Screener** | Fine motor, writing fluency, letter formation | 6-15 years | 10-12 min |
| **ADHD Indicator** | Attention, impulse control, activity level patterns | 5-18 years | 15-20 min |
| **Autism Spectrum Traits** | Social communication, sensory patterns | All ages | 20-25 min |

### 3.2 Assessment Flow Features

- [ ] **Age-adaptive questions** — Questions adjust based on reported age
- [ ] **Multimedia elements** — Audio clips for auditory processing tests
- [ ] **Progress saving** — Ability to pause and resume assessments
- [ ] **Real-time scoring** — Immediate result calculation
- [ ] **Detailed report generation** — PDF export with recommendations
- [ ] **Multi-language support** — Initial: English, Hindi

### 3.3 User Account Features

| Feature | Free Tier | Professional | Institutional |
|---------|-----------|--------------|---------------|
| Assessments | 2/month | Unlimited | Unlimited |
| Detailed Reports | Summary only | Full PDF | Full PDF + branding |
| History Tracking | 3 months | Unlimited | Unlimited |
| API Access | No | No | Yes |
| Team Management | No | No | Yes |
| Price | Free | $19/month | $99/month |

### 3.4 Educator Dashboard

- Student roster management
- Batch assessment scheduling
- Progress tracking over time
- Export data to CSV/Excel
- Comparative analytics across classrooms

### 3.5 Parent Portal

- Individual child profiles
- Assessment history per child
- Resource recommendations based on results
- Progress monitoring tools
- Community forum access

---

## 4 — User Flows

### 4.1 Assessment Flow

```
Landing Page
    │
    ▼
Select Role (Parent / Educator / Professional)
    │
    ▼
Create Account / Login
    │
    ▼
Dashboard
    │
    ├── Start New Assessment
    │       │
    │       ▼
    │   Select Child Profile / Create New
    │       │
    │       ▼
    │   Choose Screening Module
    │       │
    │       ▼
    │   Pre-Assessment Questionnaire (age, grade, concerns)
    │       │
    │       ▼
    │   Interactive Assessment Tasks
    │       │
    │       ▼
    │   Results Summary
    │       │
    │       ▼
    │   Detailed Report (PDF)
    │       │
    │       ▼
    │   Next Steps & Resources
    │
    └── View History
```

### 4.2 Educator Flow

```
Registration (with institution verification)
    │
    ▼
Setup Workspace
    │
    ├── Add Students (CSV import or manual)
    ├── Create Classes/Groups
    └── Configure Assessment Settings
    │
    ▼
Dashboard
    │
    ├── Individual Screening
    ├── Group Screening Sessions
    ├── Analytics & Reports
    └── Student Progress Tracking
```

### 4.3 Data Flow

```
User Input → Validation → Processing → Storage → Report Generation
     │                                           │
     │                                           ▼
     │                                   PDF/HTML Export
     │                                           │
     ▼                                           ▼
Secure Storage (Encrypted)              Email/Print/Download
     │
     ▼
Analytics Dashboard
```

---

## 5 — Non-Functional Requirements

### 5.1 Performance

| Metric | Target |
|--------|--------|
| Page Load (LCP) | < 2.5s |
| Time to Interactive | < 3.5s |
| Assessment Task Response | < 200ms |
| Report Generation | < 5s |
| API Response (p95) | < 500ms |

### 5.2 Accessibility

- **WCAG 2.1 AA** compliance required
- Screen reader compatible (NVDA, VoiceOver, JAWS)
- Keyboard navigation for all interactive elements
- High contrast mode support
- Font size adjustments (up to 200%)
- Captions for all audio/video content

### 5.3 Security & Compliance

| Requirement | Standard |
|-------------|----------|
| Data encryption at rest | AES-256 |
| Data encryption in transit | TLS 1.3 |
| Authentication | JWT with refresh tokens |
| Session management | httpOnly cookies |
| Compliance | HIPAA, GDPR, COPPA |
| Audit logging | All data access logged |

### 5.4 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Safari | 14+ |
| Chrome Android | 90+ |

---

## 6 — Open Questions & Risks

### 6.1 Open Questions

| # | Question | Impact | Status |
|---|----------|--------|--------|
| Q1 | Should assessments be adaptive (computer-adaptive testing)? | High | Open |
| Q2 | What scientific validation methodology to use? | High | Open |
| Q3 | Store assessment responses for re-analysis? | Medium | Open |
| Q4 | Offline mode for schools with limited connectivity? | Medium | v2 scope |
| Q5 | Integration with existing school management systems? | Low | v2 scope |
| Q6 | Telehealth integration for remote assessments? | Medium | v2 scope |

### 6.2 Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Misdiagnosis from inaccurate screening | Medium | Critical | Clear disclaimers, not a diagnosis tool |
| Data privacy breach of health information | Low | Critical | Encryption, access controls, audit logs |
| Cultural bias in assessment content | Medium | High | Multi-cultural review panel, localization |
| Regulatory changes in health data laws | Low | High | Modular compliance architecture |
| User misunderstanding of results | High | Medium | Clear language, professional interpretation guides |

---

## 7 — Success Metrics

### 7.1 Engagement Metrics

| Metric | Target (6 months) |
|--------|-------------------|
| Monthly Active Users | 2,000 |
| Assessment Completion Rate | > 85% |
| Average Session Duration | 25 minutes |
| Return User Rate | > 40% |

### 7.2 Business Metrics

| Metric | Target (12 months) |
|--------|---------------------|
| Registered Users | 5,000 |
| Paid Subscribers | 200 |
| Revenue (ARR) | $50,000 |
| NPS Score | > 40 |

### 7.3 Quality Metrics

| Metric | Target |
|--------|--------|
| Accessibility Score | 100% WCAG AA |
| Security Audit | Pass |
| Response Time (API p95) | < 500ms |
| Error Rate | < 0.1% |

---

*End of PRD v1.0.0. Implementation details in companion documents.*
