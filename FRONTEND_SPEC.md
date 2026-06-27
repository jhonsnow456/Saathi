# Frontend Specification Document — Saathi

> Learning Disability Analyser Platform
>
> **Version:** 1.0
> **Date:** 2026-06-27
> **Status:** Planning Phase

---

## Table of Contents

1. [Overview](#1--overview)
2. [Design System](#2--design-system)
3. [Typography](#3--typography)
4. [Color Palette](#4--color-palette)
5. [Spacing & Layout](#5--spacing--layout)
6. [Components](#6--components)
7. [Pages & Routes](#7--pages--routes)
8. [Accessibility Requirements](#8--accessibility-requirements)
9. [Responsive Breakpoints](#9--responsive-breakpoints)
10. [Animation Guidelines](#10--animation-guidelines)
11. [State Management](#11--state-management)
12. [API Integration](#12--api-integration)
13. [Error Handling UI](#13--error-handling-ui)
14. [Loading States](#14--loading-states)

---

## 1 — Overview

### 1.1 Purpose

This document defines the frontend specification for Saathi, a learning disability screening platform. It serves as the authoritative source for UI/UX design decisions, component specifications, and implementation guidelines.

### 1.2 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 16.13.1 |
| UI Library | Material-UI | 4.10.2 |
| Routing | React Router DOM | 5.2.0 |
| State Management | Recoil | 0.1.2 |
| Build Tool | React Scripts | 3.4.1 |
| Notifications | Notistack | 0.9.17 |
| Icons | React Icons | 3.10.0 |

### 1.3 Browser Support

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Primary target |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| Mobile Chrome | 90+ | Mobile-optimized |
| Mobile Safari | 14+ | Mobile-optimized |

---

## 2 — Design System

### 2.1 Design Principles

| Principle | Description |
|-----------|-------------|
| **Accessible** | WCAG 2.1 AA compliant by default |
| **Clear** | Simple, unambiguous language and interactions |
| **Calming** | Warm, supportive aesthetic for sensitive subject matter |
| **Professional** | Trustworthy appearance for healthcare context |
| **Responsive** | Optimized for all device sizes |

### 2.2 Design Tokens

```css
:root {
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

---

## 3 — Typography

### 3.1 Font Families

| Usage | Font | Fallback |
|-------|------|----------|
| Headings | Playfair Display | Georgia, serif |
| Body | DM Sans | -apple-system, BlinkMacSystemFont, sans-serif |
| Mono | JetBrains Mono | Consolas, monospace |

### 3.2 Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 48px / 3rem | 700 | 1.2 |
| H2 | 36px / 2.25rem | 700 | 1.25 |
| H3 | 30px / 1.875rem | 600 | 1.3 |
| H4 | 24px / 1.5rem | 600 | 1.35 |
| H5 | 20px / 1.25rem | 600 | 1.4 |
| H6 | 18px / 1.125rem | 500 | 1.4 |
| Body Large | 18px / 1.125rem | 400 | 1.6 |
| Body | 16px / 1rem | 400 | 1.6 |
| Body Small | 14px / 0.875rem | 400 | 1.5 |
| Caption | 12px / 0.75rem | 400 | 1.4 |
| Button | 14px / 0.875rem | 600 | 1 |

### 3.3 Usage Guidelines

- Use H1 only once per page (hero sections)
- Use H2 for major section headings
- Use H3-H4 for card titles and subsections
- Body text should be 16px minimum for readability
- Assessment questions should be 18px for better readability

---

## 4 — Color Palette

### 4.1 Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary 50 | #E3F2FD | 227, 242, 253 | Lightest backgrounds |
| Primary 100 | #BBDEFB | 187, 222, 251 | Light backgrounds |
| Primary 200 | #90CAF9 | 144, 202, 249 | Borders, dividers |
| Primary 500 | #2196F3 | 33, 150, 243 | Primary buttons, links |
| Primary 700 | #1976D2 | 25, 118, 210 | Hover states |
| Primary 900 | #0D47A1 | 13, 71, 161 | Active states |

### 4.2 Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Secondary 500 | #9C27B0 | 156, 39, 176 | Accent elements |
| Secondary 700 | #7B1FA2 | 123, 31, 162 | Hover states |

### 4.3 Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | #4CAF50 | Positive indicators, completion |
| Success Light | #E8F5E9 | Success backgrounds |
| Warning | #FF9800 | Caution indicators |
| Warning Light | #FFF3E0 | Warning backgrounds |
| Error | #F44336 | Errors, critical alerts |
| Error Light | #FFEBEE | Error backgrounds |
| Info | #03A9F4 | Informational messages |
| Info Light | #E1F5FE | Info backgrounds |

### 4.4 Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| Gray 50 | #FAFAFA | Page backgrounds |
| Gray 100 | #F5F5F5 | Card backgrounds |
| Gray 200 | #EEEEEE | Borders, dividers |
| Gray 300 | #E0E0E0 | Disabled states |
| Gray 400 | #BDBDBD | Placeholder text |
| Gray 500 | #9E9E9E | Secondary text |
| Gray 600 | #757575 | Icons |
| Gray 700 | #616161 | Body text |
| Gray 800 | #424242 | Headings |
| Gray 900 | #212121 | Primary text |

### 4.5 Dark Mode Colors

| Name | Hex | Usage |
|------|-----|-------|
| Dark BG | #121212 | Page background |
| Dark Surface | #1E1E1E | Card backgrounds |
| Dark Elevated | #2C2C2C | Elevated surfaces |
| Dark Text | #FFFFFF | Primary text |
| Dark Text Secondary | #B3B3B3 | Secondary text |

---

## 5 — Spacing & Layout

### 5.1 Container Sizes

| Name | Max Width | Padding |
|------|-----------|---------|
| Small | 640px | 16px |
| Medium | 768px | 24px |
| Large | 1024px | 32px |
| XLarge | 1280px | 48px |
| Full | 1440px | 64px |

### 5.2 Grid System

```
12-column grid
Gutter: 24px
Margin: 24px (mobile), 48px (tablet), 64px (desktop)
```

### 5.3 Layout Sections

| Section | Min Height | Padding |
|---------|------------|---------|
| Hero | 60vh | 64px top/bottom |
| Content | Auto | 48px top/bottom |
| CTA | Auto | 48px top/bottom |
| Footer | Auto | 32px top/bottom |

### 5.4 Card Specifications

| Type | Padding | Border Radius | Shadow |
|------|---------|---------------|--------|
| Flat | 16px | 8px | None |
| Elevated | 24px | 12px | md |
| Prominent | 32px | 16px | lg |

---

## 6 — Components

### 6.1 Button Component

#### Variants

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| Primary | Primary 500 | White | None | Main actions |
| Secondary | Transparent | Primary 500 | Primary 500 | Secondary actions |
| Text | Transparent | Primary 500 | None | Tertiary actions |
| Danger | Error | White | None | Destructive actions |

#### States

| State | Visual Change |
|-------|---------------|
| Hover | Background darkens 10% |
| Active | Background darkens 15%, scale 0.98 |
| Disabled | Opacity 0.5, cursor not-allowed |
| Loading | Spinner replaces text, disabled |

#### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| Small | 32px | 8px 16px | 12px |
| Medium | 40px | 12px 24px | 14px |
| Large | 48px | 16px 32px | 16px |

### 6.2 Input Components

#### Text Input

| State | Border | Background |
|-------|--------|------------|
| Default | Gray 300 | White |
| Focus | Primary 500 | White |
| Error | Error | Error Light |
| Disabled | Gray 200 | Gray 100 |

#### Validation Messages

- **Error:** Red text below input, error icon prefix
- **Success:** Green text below input, check icon prefix
- **Helper:** Gray text, no icon

### 6.3 Card Components

#### Assessment Card

```
┌────────────────────────────────────┐
│  [Icon]  Module Name               │
│          Brief description...       │
│                                    │
│  Duration: 15-20 min               │
│  Questions: 25                     │
│                                    │
│  [Start Assessment]                │
└────────────────────────────────────┘
```

#### Result Card

```
┌────────────────────────────────────┐
│  Child Name          Date: XX/XX   │
├────────────────────────────────────┤
│  Module: Dyslexia                  │
│                                    │
│  Score: 72%                        │
│  ████████████░░░░░░░░  72%         │
│                                    │
│  Risk Level: [Moderate]            │
│                                    │
│  [View Details] [Download Report]  │
└────────────────────────────────────┘
```

### 6.4 Navigation Components

#### Top Navigation Bar

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo]  Home  Assessments  Resources  [Profile ▼]  [Login]│
└──────────────────────────────────────────────────────────────┘
```

#### Sidebar Navigation (Dashboard)

```
┌────────────────┐
│  [Logo]        │
├────────────────┤
│  Dashboard     │
│  Assessments   │
│  Children      │
│  Results       │
│  Reports       │
│  ──────────    │
│  Settings      │
│  Help          │
└────────────────┘
```

### 6.5 Assessment Components

#### Question Card

```
┌────────────────────────────────────────────────────────────┐
│  Question 5 of 25                              [Progress]  │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │                   [Image/Audio]                      │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Which letter makes the /k/ sound in this word?           │
│                                                            │
│  ○ A) "ck"      ○ B) "k"    ○ C) "c"     ○ D) "ch"       │
│                                                            │
│                              [Next →]                       │
└────────────────────────────────────────────────────────────┘
```

#### Progress Indicator

```
┌────────────────────────────────────────────────────────────┐
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  20%     │
└────────────────────────────────────────────────────────────┘
```

---

## 7 — Pages & Routes

### 7.1 Page Hierarchy

```
/                           → Landing Page (Public)
/about                      → About Us (Public)
/contact                    → Contact Form (Public)
/faq                        → FAQ (Public)
/privacy                    → Privacy Policy (Public)
/terms                      → Terms of Service (Public)

/login                      → Login (Guest only)
/register                   → Registration (Guest only)
/register/:role             → Role-specific registration
/forgot-password            → Password Recovery

/dashboard                  → Dashboard Home (Authenticated)
  /dashboard/children       → Manage Child Profiles
  /dashboard/assessments    → Assessment List
  /dashboard/results        → History & Results
  /dashboard/reports        → Report Downloads
  /dashboard/settings       → Account Settings
  /dashboard/billing        → Subscription & Billing

/assessment/:id             → Assessment Flow (Authenticated)
  /assessment/:id/take     → Take Assessment
  /assessment/:id/review   → Review Answers
  /assessment/:id/results  → View Results

/professional               → Professional Dashboard
  /professional/students   → Student Management
  /professional/batch      → Batch Assessments
  /professional/analytics   → Analytics
```

### 7.2 Landing Page Structure

```
┌────────────────────────────────────────────────────────────┐
│  [Navigation Bar]                                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  HERO SECTION                                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │  Headline: "Identify Learning Challenges Early"      │ │
│  │                                                      │ │
│  │  Supporting text about early intervention...         │ │
│  │                                                      │ │
│  │  [Get Started Free]  [Learn More]                   │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  HOW IT WORKS (3 steps)                                    │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ 1. Create  │ │ 2. Assess  │ │ 3. Get     │              │
│  │ Profile    │ │ Your Child │ │ Insights   │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│                                                            │
│  SCREENING MODULES                                         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [Dyslexia]  [Dyscalculia]  [Dysgraphia]            │ │
│  │  [ADHD]      [Autism]                                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  TESTIMONIALS                                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  "..." — Parent Name, Role                          │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  PRICING                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Free    │  │   Pro    │  │Institution│                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                            │
│  [Footer]                                                  │
└────────────────────────────────────────────────────────────┘
```

### 7.3 Dashboard Structure

```
┌────────────────────────────────────────────────────────────┐
│  Dashboard                                    [User Menu ▼]│
├──────────────┬─────────────────────────────────────────────┤
│              │                                             │
│  Navigation  │  Dashboard Overview                         │
│              │  ┌─────────────────────────────────────┐ │
│  Overview    │  │  Welcome back, [Name]!                │ │
│  Assessments │  │                                     │ │
│  Children    │  │  Recent Assessments                  │ │
│  Results     │  │  ┌─────┐ ┌─────┐ ┌─────┐            │ │
│  Reports     │  │  │     │ │     │ │     │            │ │
│  ───────     │  │  └─────┘ └─────┘ └─────┘            │ │
│  Settings    │  │                                     │ │
│  Help        │  │  Quick Actions                      │ │
│              │  │  [New Assessment] [View Results]      │ │
│              │  └─────────────────────────────────────┘ │
│              │                                             │
└──────────────┴─────────────────────────────────────────────┘
```

---

## 8 — Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance

| Criterion | Implementation |
|-----------|----------------|
| **1.1.1 Non-text Content** | All images have alt text |
| **1.3.1 Info and Relationships** | Semantic HTML throughout |
| **1.4.1 Use of Color** | Color not sole indicator |
| **1.4.3 Contrast Minimum** | 4.5:1 text, 3:1 UI |
| **1.4.4 Resize Text** | Supports 200% zoom |
| **2.1.1 Keyboard** | All functions keyboard accessible |
| **2.4.1 Bypass Blocks** | Skip navigation link |
| **2.4.2 Page Titled** | Descriptive page titles |
| **2.4.3 Focus Order** | Logical tab order |
| **2.4.4 Link Purpose** | Descriptive link text |
| **3.1.1 Language of Page** | lang attribute set |
| **3.2.1 On Focus** | No unexpected context changes |
| **3.3.1 Error Identification** | Errors clearly identified |
| **3.3.2 Labels or Instructions** | Labels for all inputs |

### 8.2 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move to next focusable element |
| Shift + Tab | Move to previous focusable element |
| Enter | Activate buttons, links |
| Space | Activate buttons, toggle checkboxes |
| Escape | Close modals, cancel actions |
| Arrow keys | Navigate within components |

### 8.3 Screen Reader Support

- All form inputs have associated labels
- Error messages linked to inputs via aria-describedby
- Dynamic content announced via aria-live regions
- Progress updates announced on assessment pages

---

## 9 — Responsive Breakpoints

### 9.1 Breakpoint Values

| Name | Min Width | Max Width | Typical Device |
|------|-----------|-----------|----------------|
| xs | 0px | 599px | Mobile phones |
| sm | 600px | 899px | Tablets (portrait) |
| md | 900px | 1199px | Tablets (landscape), Small laptops |
| lg | 1200px | 1535px | Desktops |
| xl | 1536px | ∞ | Large screens |

### 9.2 Layout Changes by Breakpoint

#### Mobile (xs, sm)

```
┌────────────────────┐
│  Hamburger Menu    │
│  ┌────────────────┐│
│  │                ││
│  │   Content      ││
│  │   (Full width) ││
│  │                ││
│  └────────────────┘│
└────────────────────┘
```

#### Tablet (md)

```
┌────────────────────────────────────┐
│  Logo    Navigation    Profile     │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐ │
│  │                              │ │
│  │        Content               │ │
│  │        (With margins)        │ │
│  │                              │ │
│  └──────────────────────────────┘ │
│                                    │
└────────────────────────────────────┘
```

#### Desktop (lg, xl)

```
┌──────────────────────────────────────────────┐
│  Logo    Navigation           Profile        │
├──────────────┬───────────────────────────────┤
│              │                               │
│   Sidebar    │      Main Content             │
│   (Collapsed)│      (Wide layout)           │
│              │                               │
└──────────────┴───────────────────────────────┘
```

---

## 10 — Animation Guidelines

### 10.1 Animation Principles

| Principle | Implementation |
|-----------|----------------|
| Purposeful | Every animation has a reason |
| Subtle | Never distracting |
| Fast | Under 300ms for micro-interactions |
| Consistent | Same animation for same actions |

### 10.2 Animation Timings

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Micro (hover, focus) | 150ms | ease-in-out |
| Transition (page) | 250ms | ease-in-out |
| Modal (open/close) | 200ms | ease-out |
| Loading spinner | 1000ms | linear |
| Progress bar | 300ms | ease-in-out |

### 10.3 Approved Animations

| Element | Animation | Trigger |
|---------|------------|---------|
| Button hover | Scale 1.02, slight shadow increase | Mouse enter |
| Card hover | Slight lift (translateY -2px) | Mouse enter |
| Modal open | Fade in + scale from 0.95 | Open action |
| Modal close | Fade out + scale to 0.95 | Close action |
| Toast notification | Slide in from bottom | Show action |
| Progress bar | Width transition | Progress update |
| Loading spinner | Continuous rotation | Loading state |

### 10.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11 — State Management

### 11.1 Recoil State Structure

```
store/
├── theme/
│   ├── atoms.js
│   │   ├── themeModeAtom    // 'light' | 'dark'
│   │   └── themeSettingsAtom
│   └── selectors.js
│       ├── currentThemeSelector
│       └── isDarkModeSelector
│
├── auth/
│   ├── atoms.js
│   │   ├── userAtom         // Current user object
│   │   ├── accessTokenAtom  // JWT access token
│   │   ├── isAuthenticatedAtom
│   │   └── userRoleAtom     // 'parent' | 'educator' | 'professional'
│   └── selectors.js
│
├── notifications/
│   └── index.js            // Notification actions (notistack)
│
├── sw/
│   └── index.js            // Service worker state
│
└── assessment/
    ├── atoms.js
    │   ├── currentAssessmentAtom
    │   ├── currentQuestionAtom
    │   ├── answersAtom
    │   └── timeRemainingAtom
    └── selectors.js
```

### 11.2 State Persistence

| Atom | Storage | Notes |
|------|---------|-------|
| themeMode | localStorage | Persist across sessions |
| user preferences | localStorage | UI preferences |
| assessment progress | sessionStorage | Clear on completion |

---

## 12 — API Integration

### 12.1 API Client Structure

```javascript
// src/api/client.js
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const token = await this.getAccessToken();
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    return this.handleResponse(response);
  }

  // ... methods for GET, POST, PUT, PATCH, DELETE
}

export const api = new ApiClient();
```

### 12.2 Error Handling

```javascript
// Error codes mapped to user-friendly messages
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  RATE_LIMITED: 'Too many requests. Please wait a moment.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};
```

---

## 13 — Error Handling UI

### 13.1 Error Page Layout

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    ┌─────────────────┐                      │
│                    │   [Error Icon]  │                      │
│                    └─────────────────┘                      │
│                                                            │
│                    Oops! Something went wrong               │
│                                                            │
│                    We apologize for the inconvenience.     │
│                    Our team has been notified.             │
│                                                            │
│                    Error ID: [XXXXXXXX]                   │
│                                                            │
│                    [Go to Home]  [Try Again]               │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 13.2 Inline Error Messages

```
┌─────────────────────────────────────────┐
│  Email Address                         │
│  ┌───────────────────────────────────┐ │
│  │ invalid-email                     │ │
│  └───────────────────────────────────┘ │
│  ✗ Please enter a valid email address │
└─────────────────────────────────────────┘
```

### 13.3 Toast Notifications

| Type | Background | Icon | Duration |
|------|------------|------|----------|
| Success | Success Light | Check circle | 4 seconds |
| Error | Error Light | Error circle | 6 seconds |
| Warning | Warning Light | Warning triangle | 5 seconds |
| Info | Info Light | Info circle | 4 seconds |

---

## 14 — Loading States

### 14.1 Page Loading

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                     ╱╲    Loading...                       │
│                    ╱  ╲                                    │
│                   ╱    ╲                                   │
│                  ╱──────╲                                  │
│                 ╱        ╲                                 │
│                ╱──────────╲                                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 14.2 Button Loading State

```
┌─────────────────────┐
│  ┌───┐              │
│  │ ↻ │  Submitting... │
│  └───┘              │
└─────────────────────┘
```

### 14.3 Skeleton Loading

```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ████████████████████████████████████████████████    │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌────────────────┐  ┌────────────────┐                   │
│  │ ████████████   │  │ ████████████   │                   │
│  │ ████████████   │  │ ████████████   │                   │
│  └────────────────┘  └────────────────┘                   │
└────────────────────────────────────────────────────────────┘
```

---

## 15 — Implementation Notes

### 15.1 Code Organization

```javascript
// Component file structure
ComponentName/
├── Component.js           // Main component
├── Component.stories.js    // Storybook stories (future)
├── Component.test.js      // Unit tests
├── useComponentName.js    // Custom hook (if needed)
├── styles.js             // Material-UI styles
└── index.js              // Export
```

### 15.2 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `AssessmentCard.js` |
| Hooks | camelCase with `use` | `useAuth.js` |
| Utilities | camelCase | `formatDate.js` |
| Constants | SCREAMING_SNAKE | `API_ENDPOINTS` |
| CSS classes | kebab-case | `.assessment-card` |

### 15.3 Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Bundle Size | < 500KB gzipped |

---

*End of Frontend Specification v1.0*
