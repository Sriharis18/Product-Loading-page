# NEXORA — Product Landing Page

> **Internship Task 3:** Product Landing Page  
> **Platform Concept:** NEXORA — All-in-One SaaS Productivity Workspace  
> **Author:** Frontend Engineering Intern  
> **Tech Stack:** HTML5 • CSS3 (Vanilla) • JavaScript (ES6+) • Zero External Framework Dependencies

---

## 1. Project Overview

**NEXORA** is a fictional modern SaaS productivity platform designed to unite smart task management, real-time team collaboration, and visual productivity insights into one unified, distraction-free workspace.

This project represents the complete implementation of **Task 3: Product Landing Page**. It has been developed following senior frontend engineering standards, visual design principles (inspired by premium SaaS companies like Linear, Raycast, and Stripe), accessible HTML5 semantics, responsive layouts, fluid typography, and clean JavaScript micro-interactions.

---

## 2. Project Objectives

- **Professional Aesthetics:** Create a high-end dark SaaS interface using tailored violet-to-cyan gradients, ambient glow orbs, subtle borders, and balanced whitespace.
- **Rich Interactive Components:** Include a sticky navigation bar with a mobile drawer, an interactive pure HTML/CSS dashboard preview, a 6-feature responsive grid, a functional monthly/annual billing toggle, an accessible FAQ accordion, and a client-side sign-up modal with form validation.
- **Lightweight & High Performance:** Rely solely on vanilla web technologies with zero bulky runtime dependencies or CSS frameworks.
- **Full Responsiveness & Accessibility:** Provide a mobile-first experience tested from 320px mobile to ultra-wide desktop viewports with keyboard support, ARIA attributes, and `prefers-reduced-motion` compliance.
- **Static Hosting Ready:** Structure assets with clean relative paths for immediate deployment to GitHub Pages or Netlify.

---

## 3. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Structure** | Semantic HTML5 | Clean landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>`), strict heading hierarchy (`h1`–`h4`), and ARIA controls. |
| **Styling** | Vanilla CSS3 | Custom properties (`:root`), Flexbox, CSS Grid, CSS transitions, keyframe animations, backdrop filters, and clamp() fluid typography. |
| **Interactivity** | Vanilla JavaScript (ES6+) | Event delegation, `IntersectionObserver` scroll reveals, modal state management, keyboard trap, and live validation. |
| **Typography** | Google Fonts | `Plus Jakarta Sans` (headlines & badges) and `Inter` (body copy & UI metrics). |
| **Iconography** | Inline & Asset SVGs | Crisp, resolution-independent vector icons with gradient fills and glowing strokes. |

---

## 4. Folder Structure

```text
nexora-product-landing-page/
├── index.html              # Main HTML document with semantic landmarks & accessible dialog
├── style.css               # Complete stylesheet with design system tokens, layout & responsive queries
├── script.js               # Vanilla JavaScript interaction logic (sticky nav, toggle, accordion, modal)
├── README.md               # Comprehensive documentation and deployment guide
└── assets/
    ├── icons/
    │   ├── favicon.svg          # Geometric brand icon
    │   ├── task-management.svg  # Smart task management feature icon
    │   ├── collaboration.svg    # Real-time team collaboration icon
    │   ├── analytics.svg        # Productivity analytics icon
    │   ├── scheduling.svg       # Intelligent scheduling icon
    │   ├── security.svg         # Secure workspace icon
    │   └── integrations.svg     # Seamless integrations icon
    └── images/                  # Reserved for illustrative static assets
```

---

## 5. Visual Design & Color System

The design system is defined using CSS Custom Properties in the `:root` selector:

### 5.1 Color Palette (Color Hunt: #FFCED8, #FFDDDD, #FFF4DE, #FFE8C4)
The aesthetic is built directly upon the curated warm luxury palette from Color Hunt:
- **Soft Blush Rose (`#FFCED8`):** Primary brand accent tint, decorative borders, active state indicators, ambient glow orbs, and tag highlights.
- **Misty Rose Cream (`#FFDDDD`):** Subtle card dividers, pill badge containers, search inputs, and hover tints.
- **Champagne Ivory (`#FFF4DE`):** Warm secondary section background, header frames, and surface cards.
- **Warm Apricot Peach (`#FFE8C4`):** Gradient partner, metrics charts, secondary accent glow, and contrast pills.
- **Primary Page Canvas:** `#FFF9F2` (Luminous warm champagne base).
- **Surface / Card Background:** `#FFFFFF` (Crisp elevated cards) and `#FFFBF7`.
- **Text Primary:** `#26161D` (Deep warm espresso ink, achieving WCAG AAA >14:1 contrast).
- **Text Secondary:** `#6A545E` (Warm plum charcoal, achieving WCAG AA >5.2:1 contrast).
- **Primary Button Gradient:** `linear-gradient(135deg, #E25075 0%, #EE7752 100%)` (Saturated extension of `#FFCED8` and `#FFE8C4`).
- **Footer Background:** `#23171D` (Grounding dark warm cocoa plum).

### 5.2 Gradients & Shadows
- **Brand Gradient:** `linear-gradient(135deg, #FFCED8 0%, #FFE8C4 100%)`
- **Hero Highlight Text:** `linear-gradient(135deg, #D63B64 0%, #E86548 50%, #C45F22 100%)`
- **Ambient Glows:** Soft radial blur orbs using `#FFCED8` and `#FFE8C4`.
- **Card Elevation Shadow:** `0 22px 48px rgba(180, 80, 105, 0.14), 0 4px 14px rgba(255, 232, 196, 0.4)`
- **Button Glow Shadow:** `0 4px 18px rgba(226, 80, 117, 0.35)`

---

## 6. Typography & Spacing System

### 6.1 Font Hierarchy
- **Primary Headings:** `Plus Jakarta Sans`, 700 / 800 weight with tighter letter spacing (`-0.025em`).
- **Body & Captions:** `Inter`, 400 / 500 / 600 weight with readable line heights (`1.6` – `1.75`).
- **Fluid Font Sizes (`clamp()`):**
  - **H1:** `clamp(2.35rem, 4.4vw + 0.5rem, 3.85rem)`
  - **H2:** `clamp(1.85rem, 3.2vw + 0.5rem, 2.75rem)`
  - **Hero Subtitle:** `clamp(1.05rem, 1.2vw + 0.3rem, 1.2rem)`
  - **Body Text:** `1rem` (16px base)

### 6.2 Spacing Scale
- `var(--space-1)`: `4px`
- `var(--space-2)`: `8px`
- `var(--space-3)`: `12px`
- `var(--space-4)`: `16px`
- `var(--space-6)`: `24px`
- `var(--space-8)`: `32px`
- `var(--space-12)`: `48px`
- `var(--space-16)`: `64px`
- `var(--space-20)`: `80px`

---

## 7. Component & Section Architecture

### 1. Sticky Navigation (`<header>`, `<nav>`)
- Translucent backdrop blur (`backdrop-filter: blur(16px)`).
- Geometric SVG logo with violet/cyan accents.
- Smooth navigation links (`#home`, `#features`, `#pricing`, `#faq`).
- Active link tracking via `IntersectionObserver` scroll spy.
- Animated mobile hamburger toggle with accessible slide-down drawer.

### 2. Hero Section
- Announcement pill: *"✨ Introducing NEXORA 2.0 • Next-Gen Workspace"*.
- Bold H1 with gradient highlighted text *"One Powerful Workspace."*
- Primary CTA *"Start Your Free Trial"* and secondary CTA *"Explore Features"*.
- Avatar social-proof indicator with star rating.
- **Interactive Pure HTML/CSS Dashboard Preview:**
  - Window header with macOS-style controls and real-time status pill.
  - Sidebar with navigation icons and active task state.
  - Sprint velocity metric cards with animated progress bars.
  - Kanban task cards showing tags, assignees, and checklist progress.
  - CSS weekly output bar chart with Thursday peak activity.
  - Floating badges with gentle `@keyframes` floating animations.

### 3. Features Showcase (`#features`)
- 6 responsive feature cards:
  1. **Smart Task Management** (Checklist icon, priority tracking)
  2. **Real-Time Collaboration** (Shared team canvases)
  3. **Productivity Analytics** (Velocity & trend reporting)
  4. **Intelligent Scheduling** (Calendar time-blocking)
  5. **Secure Workspace** (Role-based access permissions)
  6. **Seamless Integrations** (50+ app connectors)
- CSS Grid: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile).

### 4. Benefits & Social Proof Strip
- 3 core advantage pillars:
  - *One organized workspace.*
  - *Clear visibility into project progress.*
  - *Less time spent managing tasks.*
- Illustrative simulation metrics: `4.2x faster turnaround*`, `85% less meeting overhead*`, `99.4% team alignment*`.
- Formatted customer testimonial card with explicit fictional persona identification.

### 5. Pricing Section with Functional Billing Toggle (`#pricing`)
- Functional switch (`role="switch"`, `aria-checked="false"`) toggling **Monthly** vs **Annual** pricing.
- Includes a *"Save 25%"* badge.
- Instant price updates:
  - **Starter:** `$0 / month` (Free forever)
  - **Pro:** `$12 / month` (Monthly) ↔ `$9 / month` (`$108/year` billed annually)
  - **Team:** `$29 / month` (Monthly) ↔ `$24 / month` (`$288/year` billed annually)
- Featured "Most Popular" card with ambient violet glow and floating badge.
- Clear demonstration notice stating that plans are for illustrative presentation.

### 6. Interactive FAQ Accordion (`#faq`)
- 6 complete Q&As answering product concept questions.
- Accessible buttons with `aria-expanded` and `aria-controls`.
- Smooth SVG chevron rotation transition.
- Single-open accordion behavior with full keyboard navigation (Space & Enter).

### 7. Interactive Sign-Up Demonstration Modal
- Accessible modal dialog (`role="dialog"`, `aria-modal="true"`).
- Traps focus and returns focus upon close; supports `Esc` key and backdrop click.
- Client-side validation for name and email format.
- Shows simulated loading state and transitions to an interactive success confirmation view.
- Explicit note communicating that no real personal data is stored or transmitted.

### 8. Professional Footer (`<footer>`)
- Brand summary with system operational indicator.
- Links to internal sections (`Home`, `Features`, `Pricing`, `FAQ`).
- Academic/internship details card.
- Dynamic copyright year updated via JavaScript (`© 2026`).
- "Back to Top" smooth scroll button.

---

## 8. Responsive Design & Accessibility

### 8.1 Viewport Breakpoints Tested
- **Mobile (320px – 480px):** Single-column layout, full-width CTA buttons, hidden sidebars inside dashboard preview to prevent cramping, hamburger drawer.
- **Large Mobile & Tablet (481px – 768px):** 2-column feature cards, stacked metrics, fluid typography.
- **Small Laptop (769px – 1024px):** 2-column grid for features, vertical pricing alignment.
- **Desktop (1025px and above):** 2-column hero split, 3-column features and pricing grids, floating badges.

### 8.2 Accessibility (a11y) Features
- Accessible skip link (`.skip-to-content`) for keyboard and screen-reader users.
- Visible `:focus-visible` outline rings on all interactive elements.
- ARIA attributes: `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="switch"`, `role="dialog"`, `aria-modal="true"`.
- Valid contrast ratios meeting WCAG AA requirements on dark backgrounds.
- Respects `@media (prefers-reduced-motion: reduce)` by disabling transforms and keyframe loops.

---

## 9. How to Run Locally

Because this project is built entirely with vanilla web standards, it requires no build tools or package managers.

### Option 1: Direct File Opening
Double-click `index.html` or right-click and choose **Open with Browser** (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Option 2: Local Static Server (Recommended)
You can serve the directory using any lightweight HTTP server:

#### Using Python 3:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

#### Using Node.js (`npx serve`):
```bash
npx -y serve .
```

#### Using VS Code / IDE:
Right-click `index.html` and click **"Open with Live Server"**.

---

## 10. Free Static Hosting Deployment Guide

### Option A: Deploying to Netlify (Drag & Drop or Git)
1. Sign up or log in to [Netlify](https://www.netlify.com/).
2. In the Netlify dashboard, navigate to **Sites** and drag & drop the project folder directly into the Netlify Drop area.
3. Netlify will deploy the site in seconds and provide a live URL (e.g., `https://nexora-landing.netlify.app`).
4. To connect to GitHub: Click **Add new site** → **Import an existing project** → Select your repository → Leave build settings blank (publish directory is `.`) → Click **Deploy site**.

### Option B: Deploying to GitHub Pages
1. Initialize a Git repository in the project folder (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Complete NEXORA product landing page (Internship Task 3)"
   ```
2. Create a new repository on [GitHub](https://github.com) named `nexora-product-landing-page`.
3. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/nexora-product-landing-page.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** → **Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Set the branch to `main` and folder to `/(root)`.
7. Click **Save**. Within 1–2 minutes, your live site will be live at `https://<your-username>.github.io/nexora-product-landing-page/`.

---

## 11. Disclaimer

**NEXORA** is a fictional demonstration product created solely for academic and technical evaluation as part of **Internship Task 3 — Product Landing Page**. All testimonials, metrics, plans, and sign-up flows are interactive simulations; no actual financial transactions or account creations are processed.
