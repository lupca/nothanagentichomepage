# Original User Request

## Initial Request — 2026-07-15T20:37:44Z

Build a high-converting, premium B2B SaaS brand homepage for NoThanagentic, an Agentic AI-powered omnichannel sales and management ecosystem in Vietnam, fully compliant with the brand design manual and optimized for search engines and AI web crawlers.

Working directory: /data/nothanagentic
Integrity mode: development

## Requirements

### R1. Tech Stack & Framework
- Use **Next.js** and **React** to ensure optimal Server-Side Rendering (SSR) or Static Site Generation (SSG) for SEO.
- Styling can be done using Tailwind CSS or standard CSS modules, maintaining high performance and clean loading (minimal CLS).

### R2. Brand Manual Compliance
Create a website that strictly implements the brand design manual:
- **Typography**: Plus Jakarta Sans font (imported via Google Fonts/Next Font) with the specified typography hierarchy (H1: 56px, H2: 40px, H3: 24px, Body: 16px, Caption: 12px) and full Vietnamese language support. Contrast ratio must satisfy WCAG 2.1 AA (min 4.5:1 for body, 3:1 for headings).
- **Brand Colors**:
  - Primary Background (Hero, Footer, Deep AI sections): Digital Twilight (`#1D0B3B`).
  - Key Accent (CTA Buttons): Safety Orange (`#F25C05`).
  - Body/Dashboard Background: Oatmeal White (`#F8F6F0`).
  - Semantic Colors: Emerald (`#059669`) for success, Sand Gold (`#D97706`) for warning/pending, Crimson (`#DC2626`) for error, and Slate Gray (`#475569`) for secondary text/borders.
- **Logo Proportions**: Render the logo using SVG according to the specified 62x by 16x horizontal ratio (19x by 16x for the icon mark), with clear space rules (minimum 4x buffer). Generate negative white versions for dark sections and full color for light sections.

### R3. Homepage UX Architecture & Copy (Vietnamese)
Construct a conversion-focused B2B landing page containing:
- **Hero Section**: Eyebrow text identifying it as the first Agentic AI platform in VN, high-converting Headline focusing on outcome ("Tự động hóa toàn diện chuỗi cung ứng & Marketing..."), Sub-headline, Dual-CTAs (Safety Orange "Dùng thử miễn phí 7 ngày" and outline "Đặt lịch Demo tư vấn"), monochrome Vietnamese client logos, and an interactive, clean SVG mockup showing the AI dashboard.
- **How It Works**: 3-step workflow (Connect -> Analyze -> Approve).
- **Use Case Tiles**: Sectioned for Owner (Cashflow), Warehouse Manager (Auto-forecast), and Marketing Team (Cross-campaigns).
- **Trust Signals**: Real case study testimonial with before/after metrics.
- **FAQ Accordion**: Addressing security (ISO), integrations (Shopee, TikTok Shop, Lazada, GHTK, MoMo), and deployment time.
- **Bottom CTA Form**: Compact lead form (Work email, Company name, Phone number) with a functional success state.
- **Footer**: Full navigation matrix, resources, and privacy policy links.

### R4. Agentic AI UI/UX Patterns (2026)
Include interactive components showcasing AI features:
- **AI Decision Support Widget**: A panel showing pending tasks (using Sand Gold `#D97706`) with confidence score progress bars (e.g. 92%).
- **Human Override Panel**: Clickable buttons (Approve / Reject / Override) that trigger a 10-second toast countdown with an "Undo" option.
- **Ctrl+K Command Palette**: A modal search interface that opens on keyboard shortcut to run commands.
- **Floating Contact Widget**: Bottom-right floating contact card with Zalo OA and Facebook Messenger links, with Vietnamese copy: "Luôn có chuyên gia trực chat hỗ trợ 365 ngày".

### R5. SEO & AI Readability Optimization
- Provide full SEO optimization: descriptive `<title>` tags, meta descriptions, semantic HTML5 tags (header, main, section, footer), open graph tags, and image alt texts.
- **Schema.org structured JSON-LD data** embedded for B2B SaaS organization/product search ranking.
- Proper robots.txt and sitemap structure.
- Content structured with clear headings and text blocks to be easily read and understood by search engines and AI search engines (like Perplexity or Gemini).

## Acceptance Criteria

### Technical & Functional Verification
- [ ] Next.js app builds successfully without any errors or warnings.
- [ ] The site is fully responsive (mobile, tablet, desktop) and touch-friendly (buttons are at least 44x44px touch targets).
- [ ] Typographic hierarchy, brand colors, and logo ratios strictly conform to the manual.
- [ ] Lead capture form submits successfully (shows visual confirmation) and validates fields.
- [ ] Interactive UI components work flawlessly: FAQ accordions toggle, Command Palette opens with Ctrl+K / closes, Zalo OA float triggers action, and AI pending review items allow override with a working 10-second toast count and Undo.
- [ ] HTML code is semantic, and JSON-LD schema passes validation rules.
- [ ] Tải trang tối ưu: WebP image formats, CSS styling, and high Google Web Vitals scores.

## Follow-up — 2026-07-15T14:01:56Z

The user has requested that the entire agent team work using the newly selected model (Gemini 3.5 Flash (Low)). Please ensure all active sub-orchestrators and worker agents are aware of and use the updated model selection setting if applicable.
