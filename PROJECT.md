# Project: NoThanagentic B2B SaaS Brand Homepage

## Architecture
- **Framework**: Next.js (App Router, React, TypeScript)
- **Styling**: Tailwind CSS for responsive design and brand color scheme.
- **Components**:
  - `Header`: Sticky nav with logo, anchor links, mobile menu, CTA.
  - `Hero`: Headline, Subheadline, CTA buttons, client logos, interactive SVG Dashboard mockup.
  - `HowItWorks`: 3-step workflow (Connect -> Analyze -> Approve).
  - `UseCases`: Role-specific tabs/cards (Owner, Warehouse, Marketing).
  - `AIDecisionWidget`: Pending tasks widget with confidence score bar, embeds HumanOverridePanel.
  - `HumanOverridePanel`: Approve/Reject/Override buttons, toast with 10s countdown + Undo.
  - `Testimonials`: Customer quote and before/after metrics.
  - `FAQ`: Accordion questions and answers.
  - `LeadForm`: Form with validation and success state.
  - `CommandPalette`: Ctrl+K dialog modal with filterable command list.
  - `FloatingContact`: Floating contact card for Zalo / Messenger.
  - `Footer`: Navigation links & copyright.
- **SEO & Metadata**:
  - Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`).
  - Meta tags, Open Graph (opengraph-image), sitemap, and robots.txt.
  - Schema.org JSON-LD structured data.

## Milestones
| # | Name | Scope | Dependencies | Status | Conversation ID |
|---|------|-------|-------------|--------|-----------------|
| 1 | Next.js Setup & Config | Next.js & Tailwind configuration | none | DONE | Completed |
| 2 | Static & Core UI | Core landing page components | M1 | DONE | Completed |
| 3 | Agentic UI Widgets | AI Decision, Human Override, Ctrl+K, Zalo OA float | M2 | DONE | Completed |
| 4 | SEO & Metadata | Semantic HTML, JSON-LD, robots/sitemap | M2 | DONE | Completed |
| 5 | E2E Verification & Audit | Run all E2E test suites (Tiers 1-4) and Forensic Audit | M3, M4 | IN_PROGRESS | Active |

## Code Layout
- `app/` - Next.js App Router root
  - `layout.tsx` - Root layout with Plus Jakarta Sans and viewport metadata
  - `page.tsx` - Homepage page view
  - `globals.css` - Custom styling rules, Tailwind imports
- `components/` - Reusable UI components
  - `Hero.tsx`, `HowItWorks.tsx`, `UseCases.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `LeadForm.tsx`, `Footer.tsx`
  - `AIDecisionWidget.tsx`, `HumanOverridePanel.tsx`, `CommandPalette.tsx`, `FloatingContact.tsx`, `Logo.tsx`
- `tests/` - Playwright E2E tests
