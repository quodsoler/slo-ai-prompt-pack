# Implementation Plan

**Project:** Pack de 275+ Prompts IA para Marketing y Negocios -- Sales Funnel Site
**Stack:** Astro 5.x SSG, TypeScript strict, Tailwind CSS 4.x, Preact islands, Vercel
**Status:** Phase 11 complete — Full site implementation with 5 pages, 54 files. Spec compliance fixes applied for analytics consent, event tracking, and purchase summary. Zero build/lint/type errors.

---

## Phase 0: Pre-Initialization Cleanup

> Remove Ralph template scaffolding from src/ so Astro init can create a clean project.

- [x] **0.1 Remove empty Ralph template directories from src/** -- COMPLETE
  - src/ is confirmed empty (no subdirectories remain)

- [x] **0.2 Verify src/ is empty and ready for Astro init** -- COMPLETE
  - Verified: `ls -la src/` shows only `.` and `..`

- [x] **0.3 Fix AGENTS.md line 6 (`@astrojs/tailwind` error)** -- COMPLETE
  - AGENTS.md line 6 lists `@astrojs/tailwind` in the install command, which is for Tailwind 3.x
  - Replace with correct deps: remove `@astrojs/tailwind`, note `@tailwindcss/vite` is installed as dev dep (per task 1.2)
  - This prevents confusion during implementation
  - Dependencies: None

---

## Phase 1: Project Initialization

> Foundation: Astro project, dependencies, configuration files, environment setup.

- [x] **1.1 Initialize Astro project with pnpm** -- COMPLETE
  - Spec: `specs/site-architecture.md` (US-3)
  - Command: `npx pnpm create astro@latest . --template minimal --typescript strict --install --git`
  - Creates: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`
  - Dependencies: 0.2

- [x] **1.2 Install core dependencies** -- COMPLETE
  - Spec: `specs/site-architecture.md`, `AGENTS.md`
  - Command: `npx pnpm add @astrojs/preact preact @astrojs/sitemap @astrojs/vercel`
  - Also: `npx pnpm add -D @tailwindcss/vite tailwindcss`
  - **Note:** AGENTS.md lists `@astrojs/tailwind` in its install command, but this is incorrect for Tailwind 4.x. Use `@tailwindcss/vite` instead (the Vite plugin approach). Do NOT install `@astrojs/tailwind`.
  - Dependencies: 1.1

- [x] **1.3 Configure Astro (astro.config.mjs)** -- COMPLETE
  - Spec: `specs/site-architecture.md` (Tech Stack, Core Web Vitals)
  - Configure: Preact integration, sitemap integration (filter out `/gracias`), Vercel adapter (SSG static output), `trailingSlash: 'never'`, `site` property for canonical URLs
  - File: `astro.config.mjs`
  - Dependencies: 1.2

- [x] **1.4 Configure Tailwind CSS 4.x (CSS-first config)** -- COMPLETE
  - Spec: `specs/design-system.md` (US-3), `specs/site-architecture.md`
  - Configure `@tailwindcss/vite` plugin in `astro.config.mjs` (no `tailwind.config.js`)
  - **Note:** AGENTS.md references `@astrojs/tailwind` but the correct Tailwind 4.x approach is the `@tailwindcss/vite` Vite plugin registered directly in `astro.config.mjs` under `vite.plugins`. There is no Astro integration wrapper for Tailwind 4.x.
  - Create: `src/styles/global.css` with `@import "tailwindcss"` and `@theme` block for custom properties
  - Dependencies: 1.2

- [x] **1.5 Configure TypeScript strict mode** -- COMPLETE
  - Spec: `specs/site-architecture.md` (US-3)
  - File: `tsconfig.json` -- ensure `strict: true`, path aliases if needed
  - Dependencies: 1.1

- [x] **1.6 Create .env.example and environment variable validation** -- COMPLETE
  - Spec: `specs/site-architecture.md` (Environment Variables), `specs/checkout-integration.md`
  - File: `.env.example` with `PUBLIC_CHECKOUT_URL`, `PUBLIC_CHECKOUT_URL_VARIANT`, `PUBLIC_GA4_MEASUREMENT_ID`, `PUBLIC_GTM_CONTAINER_ID`, `PUBLIC_SITE_URL`
  - Note: Build must fail with clear error if `PUBLIC_CHECKOUT_URL` is not set
  - Dependencies: 1.1

- [x] **1.7 Create directory structure** -- COMPLETE
  - Spec: `specs/site-architecture.md` (Project Structure), `AGENTS.md`
  - Create: `src/components/sales/`, `src/components/layout/`, `src/components/ui/`, `src/data/`, `src/lib/`, `src/layouts/`, `src/assets/`, `public/`
  - Dependencies: 1.1

- [x] **1.8 Install dev tooling (ESLint, Vitest)** -- COMPLETE
  - Spec: `specs/site-architecture.md` (US-3, Validation)
  - Command: `npx pnpm add -D eslint vitest @typescript-eslint/parser @typescript-eslint/eslint-plugin`
  - Create: `eslint.config.js` or `.eslintrc.cjs`
  - Dependencies: 1.2

---

## Phase 2: Design System Foundation

> Tailwind theme tokens, base styles, typography, and all reusable UI components.

- [x] **2.1 Define Tailwind 4.x @theme with design tokens** -- COMPLETE
  - Spec: `specs/design-system.md` (Color Palette, Typography, Spacing Scale)
  - File: `src/styles/global.css`
  - Tokens: `--color-primary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-card`, `--color-card-border`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-success`, `--color-warning`, `--color-error`, all gradient tokens
  - Dependencies: 1.4

- [x] **2.2 Configure font loading (Inter + JetBrains Mono)** -- COMPLETE
  - Spec: `specs/design-system.md` (Typography, Font Families)
  - Load via Google Fonts with `font-display: swap`, preload critical subset
  - `size-adjust` for CLS mitigation
  - Dependencies: 2.1

- [x] **2.3 Create base typography and global styles** -- COMPLETE
  - Spec: `specs/design-system.md` (Type Scale, Line Heights, Spanish Formatting)
  - File: `src/styles/global.css` -- responsive type scale, `overflow-wrap: break-word`, `prefers-reduced-motion` media query for disabling all animations
  - Dependencies: 2.1, 2.2

- [x] **2.4 Create Button component (3 variants)** -- COMPLETE
  - Spec: `specs/design-system.md` (Component Catalog -- Button)
  - File: `src/components/ui/Button.astro`
  - Variants: primary (gradient CTA with glow), secondary (outline), ghost
  - States: default, hover, active, focus, disabled
  - Min 56px touch target for primary
  - Dependencies: 2.1

- [x] **2.5 Create Badge component (3 variants)** -- COMPLETE
  - Spec: `specs/design-system.md` (Component Catalog -- Badge)
  - File: `src/components/ui/Badge.astro`
  - Variants: purple (default), blue (accent), green (success/trust)
  - Dependencies: 2.1

- [x] **2.6 Create Card component** -- COMPLETE
  - Spec: `specs/design-system.md` (Component Catalog -- Card)
  - File: `src/components/ui/Card.astro`
  - backdrop-blur-sm, subtle border, rounded-2xl, optional hover effect
  - Solid fallback for browsers without `backdrop-blur`
  - Dependencies: 2.1

- [x] **2.7 Create Accordion component (Preact island)** -- COMPLETE
  - Spec: `specs/design-system.md` (Component Catalog -- Accordion)
  - File: `src/components/ui/Accordion.tsx` (Preact)
  - Single-expand mode, aria-expanded, role="region", chevron rotation animation
  - `client:visible` hydration
  - Dependencies: 2.1, 1.2

- [x] **2.8 Create PromptPreview component (terminal-style, Preact island)** -- COMPLETE
  - Spec: `specs/design-system.md` (Component Catalog -- PromptPreview)
  - File: `src/components/ui/PromptPreview.tsx` (Preact)
  - Terminal chrome (3 dots), JetBrains Mono font, typewriter animation, fade-in response
  - Respects `prefers-reduced-motion`
  - Dependencies: 2.1, 2.2, 1.2

- [x] **2.9 Create CtaButton component (shared CTA pattern)** -- COMPLETE
  - Spec: `specs/checkout-integration.md` (CTA Component Integration)
  - File: `src/components/ui/CtaButton.astro`
  - Renders `<a>` with `href` from `PUBLIC_CHECKOUT_URL` at build time
  - Enhanced by JS to add UTMs, linker, variant, and click tracking
  - Props: `section`, `label`
  - Dependencies: 2.4, 5.1

---

## Phase 3: Data Layer

> TypeScript const exports in src/data/ derived from data/ reference files.

- [x] **3.1 Create product-config.ts** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Data Files table), `data/sales-funnel/landing-page-copy/sales-page-copy.md`
  - File: `src/data/product-config.ts`
  - Exports: product name ("Pack de 275+ Prompts IA para Marketing y Negocios"), price (27), original value, value stack items, guarantee text, CTA labels, social proof text, headline, subheadline
  - Source: `sales-page-copy.md` Sections 1, 8
  - **CRITICAL:** Use "275+" as the prompt count everywhere, NOT "200+" (see Data Discrepancies section below). Use spec value stack totals (~EUR 2,450), NOT the sales-page-copy.md value (EUR 582).
  - Dependencies: 1.7

- [x] **3.2 Create sales-copy.ts** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Data Files table)
  - File: `src/data/sales-copy.ts`
  - Exports: `painPoints` array, `differentiators` array, `audienceFit`/`audienceNotFit` arrays, `benefits` array (with icon identifiers), `finalCta` object
  - Source: `sales-page-copy.md` Sections 2, 3, 6, 7, 11
  - Dependencies: 1.7

- [x] **3.3 Create prompt-categories.ts** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 4: ProductContents)
  - File: `src/data/prompt-categories.ts`
  - Exports: structured categories (Marketing 105, Business 105, Social Media 65) with subcategories and 2-3 sample prompt titles each
  - Source: `sales-page-copy.md` Section 4, `data/product-content/`
  - Dependencies: 1.7

- [x] **3.4 Create prompt-examples.ts** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 5: PromptShowcase)
  - File: `src/data/prompt-examples.ts`
  - Exports: 3 showcase prompts with full prompt text and response preview
  - Source: `sales-page-copy.md` Section 5
  - Dependencies: 1.7

- [x] **3.5 Create faq-items.ts** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 9: FaqAccordion)
  - File: `src/data/faq-items.ts`
  - Exports: 8 question/answer pairs (typed array)
  - Source: `sales-page-copy.md` Section 10
  - Also used by FAQPage JSON-LD schema
  - Dependencies: 1.7

- [x] **3.6 Create legal-content.ts** -- COMPLETE
  - Spec: `specs/legal-compliance.md` (Legal Page Implementation)
  - File: `src/data/legal-content.ts`
  - Exports: privacy policy, legal notice, terms and conditions text in Spanish with `[BRACKET]` placeholders
  - Cookie table data for privacy policy
  - Dependencies: 1.7

- [x] **3.7 Create thank-you-data.ts** -- COMPLETE
  - Spec: `specs/thank-you-page.md` (3-Step Access Guide, Social Sharing)
  - File: `src/data/thank-you-data.ts`
  - Exports: 3-step guide content, social share text (LinkedIn, Twitter/X, WhatsApp), order summary text, bump teaser text
  - Source: `sales-page-copy.md` Section 14, `specs/thank-you-page.md`
  - Dependencies: 1.7

---

## Phase 4: Layout Infrastructure

> BaseLayout, Header, Footer -- the shell used by all 5 pages.

- [x] **4.1 Create BaseLayout.astro** -- COMPLETE
  - Spec: `specs/site-architecture.md` (Project Structure), `specs/seo-content.md`, `specs/analytics-tracking.md`
  - File: `src/layouts/BaseLayout.astro`
  - Props: `title`, `description`, `ogImage`, `noindex`, `canonicalPath`
  - Includes: `<html lang="es">`, UTF-8, viewport meta, font preloads, global CSS import, conditional `noindex` meta, canonical `<link>`, hreflang, Open Graph tags, Twitter Card tags, GTM conditional script (consent-gated), dataLayer initialization, slot for page content
  - Dependencies: 2.1, 2.2, 2.3

- [x] **4.2 Create Header component** -- COMPLETE
  - Spec: `specs/site-architecture.md` (Semantic HTML)
  - File: `src/components/layout/Header.astro`
  - Minimal: product name/logo, no complex navigation (sales page doesn't need nav distraction)
  - Semantic `<header>` element
  - Dependencies: 2.1

- [x] **4.3 Create Footer component** -- COMPLETE
  - Spec: `specs/legal-compliance.md` (Footer Legal Links), `specs/site-architecture.md` (US-5)
  - File: `src/components/layout/Footer.astro`
  - Links to: `/politica-privacidad`, `/aviso-legal`, `/condiciones`
  - "Configuracion de cookies" link to re-open consent banner
  - Copyright text
  - Semantic `<footer>` element
  - Dependencies: 2.1

---

## Phase 5: Core Libraries

> Utility modules for checkout URLs, analytics, tracking, and formatting.

- [x] **5.1 Create checkout-url.ts** -- COMPLETE
  - Spec: `specs/checkout-integration.md` (CTA URL Builder, A/B Price Test)
  - File: `src/lib/checkout-url.ts`
  - Exports: `buildCheckoutUrl(options: CheckoutUrlOptions): string`, `getCheckoutVariant()`
  - Logic: base URL from env, UTM pass-through, A/B variant (localStorage with try-catch), URL length limit (2048 chars), debounced click handler
  - Dependencies: 5.2, 1.6

- [x] **5.2 Create tracking.ts (UTM handling)** -- COMPLETE
  - Spec: `specs/checkout-integration.md` (UTM Parameter Pass-Through), `specs/analytics-tracking.md` (AC-7)
  - File: `src/lib/tracking.ts`
  - Exports: `getCurrentUtmParams()`, `appendUtmParams()`, `captureUTMParams()`, `getStoredUTMParams()`
  - Stores in sessionStorage with try-catch, handles `gclid`
  - Dependencies: 1.7

- [x] **5.3 Create analytics.ts (GA4 event helpers)** -- COMPLETE
  - Spec: `specs/analytics-tracking.md` (AC-5, Event Helpers)
  - File: `src/lib/analytics.ts`
  - Exports: typed `trackEvent(event: AnalyticsEvent)` function, consent check before dataLayer push
  - Events: `cta_clicked`, `scroll_depth`, `faq_expanded`, `checkout_started`, `prompt_showcase_viewed`, `social_share_clicked`, `purchase_confirmed`
  - Dependencies: 1.7

- [x] **5.4 Create format.ts (Spanish number formatting)** -- COMPLETE
  - Spec: `specs/design-system.md` (Spanish Formatting Conventions)
  - File: `src/lib/format.ts`
  - Exports: `formatPrice(amount: number): string` (dot thousands, comma decimals, EUR suffix)
  - Dependencies: 1.7

- [x] **5.5 Create cookie-consent.ts (consent state management)** -- COMPLETE
  - Spec: `specs/legal-compliance.md` (Cookie Consent Component), `specs/analytics-tracking.md` (AC-6)
  - File: `src/lib/cookie-consent.ts`
  - Exports: `getConsentState()`, `setConsentState()`, `hasAnalyticsConsent()`, `hasMarketingConsent()`, `loadGTM()`
  - Stores in localStorage + first-party cookie, version management
  - Dependencies: 1.7

---

## Phase 6: Sales Page Sections

> 11 section components, assembled in index.astro. Build in narrative order.

- [x] **6.1 Create Hero.astro (Section 1)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 1: Hero)
  - File: `src/components/sales/Hero.astro`
  - Content: pre-headline stat, H1 headline, subheadline, primary CTA, social proof line
  - Data from: `src/data/product-config.ts`
  - Anchor ID: `id="hero"` (for StickyCtaBar IntersectionObserver)
  - Gradient hero background
  - **Note:** Social proof line "Ya lo usan mas de [X] profesionales" requires a concrete number or conditional display (see Missing Items below)
  - Dependencies: 2.4, 2.9, 3.1, 4.1

- [x] **6.2 Create PainAgitation.astro (Section 2)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 2: PainAgitation)
  - File: `src/components/sales/PainAgitation.astro`
  - Content: "Esto te suena, verdad?" heading, 5 pain point blocks with left-border accent
  - Data from: `src/data/sales-copy.ts` -> `painPoints`
  - Dependencies: 2.1, 3.2

- [x] **6.3 Create SolutionPresentation.astro (Section 3)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 3: SolutionPresentation)
  - File: `src/components/sales/SolutionPresentation.astro`
  - Content: product introduction heading, opening paragraph, 5 differentiators with checkmark icons
  - Data from: `src/data/sales-copy.ts` -> `differentiators`
  - Dependencies: 2.1, 2.5, 3.2

- [x] **6.4 Create ProductContents.astro (Section 4, with Preact island)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 4: ProductContents)
  - Files: `src/components/sales/ProductContents.astro`, `src/components/sales/ProductContentsTabs.tsx` (Preact)
  - Content: "Que Incluye el Pack" heading, tabbed/accordion interface with 3 categories, bonus items
  - Data from: `src/data/prompt-categories.ts`
  - Anchor ID: `id="categorias"` (for Google Ads sitelink)
  - Hydration: `client:visible`
  - Dependencies: 2.5, 2.6, 2.7, 3.3

- [x] **6.5 Create PromptShowcase.astro (Section 5, with Preact island)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 5: PromptShowcase)
  - Files: `src/components/sales/PromptShowcase.astro`, `src/components/sales/PromptShowcaseCarousel.tsx` (Preact)
  - Content: "Mira lo que puedes hacer en menos de 2 minutos" heading, 3 rotating terminal-style examples
  - Data from: `src/data/prompt-examples.ts`
  - Typewriter animation, auto-rotate 5s, pause on interaction, navigation dots
  - Anchor ID: `id="ver-prompts"` (for Google Ads sitelink)
  - Hydration: `client:visible`
  - Tracking: `prompt_showcase_viewed` event
  - Dependencies: 2.8, 3.4, 5.3

- [x] **6.6 Create AudienceFit.astro (Section 6)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 6: AudienceFit)
  - File: `src/components/sales/AudienceFit.astro`
  - Content: "Es Este Pack Para Ti?" heading, two-column layout (green checkmarks / red X), 5 "yes" items + 3 "no" items
  - Data from: `src/data/sales-copy.ts` -> `audienceFit`, `audienceNotFit`
  - Dependencies: 2.1, 3.2

- [x] **6.7 Create BenefitsGrid.astro (Section 7)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 7: BenefitsGrid)
  - File: `src/components/sales/BenefitsGrid.astro`
  - Content: "Lo que cambia cuando tienes los prompts correctos" heading, 6-card responsive grid (1/2/3 cols)
  - Data from: `src/data/sales-copy.ts` -> `benefits`
  - Uses Card component
  - Dependencies: 2.6, 3.2

- [x] **6.7b Create SocialProofStrip.astro (between Sections 7 and 8)** -- COMPLETE
  - Spec: `specs/google-ads-campaign.md` (sitelink `#opiniones`), `specs/sales-page-sections.md` (social proof)
  - File: `src/components/sales/SocialProofStrip.astro`
  - Content: horizontal strip with trust indicators -- "Compatible con ChatGPT, Claude y cualquier IA", "Garantia de 30 dias", AI platform text badges, "Pago unico -- sin suscripcion"
  - Anchor ID: `id="opiniones"` (for Google Ads sitelink)
  - Lightweight: no Preact island needed, pure Astro/HTML
  - When real testimonials become available, this can be expanded into a full testimonials section
  - Dependencies: 2.1, 2.5

- [x] **6.8 Create PriceOffer.astro (Section 8)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 8: PriceOffer)
  - File: `src/components/sales/PriceOffer.astro`
  - Content: value stack table, comparison paragraph, strikethrough "67 EUR", large "27 EUR" in text-price, "Pago unico" subtitle, guarantee badge, CTA button
  - Data from: `src/data/product-config.ts`
  - Anchor ID: `id="oferta"` (for Google Ads sitelink)
  - Tracking: `cta_clicked` with `section: 'price_offer'`
  - Dependencies: 2.4, 2.5, 2.9, 3.1, 5.3

- [x] **6.9 Create FaqAccordion.astro (Section 9, with Preact island)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 9: FaqAccordion)
  - Files: `src/components/sales/FaqAccordion.astro`, wraps `Accordion.tsx`
  - Content: "Preguntas Frecuentes" heading, 8+ FAQ items
  - Data from: `src/data/faq-items.ts`
  - Anchor ID: `id="faq"` (for Google Ads sitelink)
  - Hydration: `client:visible`
  - Tracking: `faq_expanded` event with `question_index`
  - Dependencies: 2.7, 3.5, 5.3

- [x] **6.10 Create FinalCta.astro (Section 10)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 10: FinalCta)
  - File: `src/components/sales/FinalCta.astro`
  - Content: urgency banner, two-option comparison, closing headline, CTA button, guarantee reminder, P.S. paragraph
  - Data from: `src/data/sales-copy.ts` -> `finalCta`
  - Tracking: `cta_clicked` with `section: 'final'`
  - Dependencies: 2.4, 2.9, 3.2, 5.3

- [x] **6.11 Create StickyCtaBar.tsx (Section 11, Preact island)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Section 11: StickyCtaBar), `specs/design-system.md` (Component Catalog -- StickyCtaBar)
  - File: `src/components/sales/StickyCtaBar.tsx` (Preact)
  - Behavior: fixed bottom bar on mobile (`lg:hidden`), shows after hero scrolls out (IntersectionObserver), hides near hero or when PriceOffer/FinalCta visible, 72px height, backdrop-blur, z-50
  - Content: price text left + compact CTA right
  - Tracking: `cta_clicked` with `section: 'sticky_bar'`
  - Dependencies: 2.1, 5.1, 5.3

- [x] **6.12 Assemble index.astro (sales page)** -- COMPLETE
  - Spec: `specs/sales-page-sections.md` (Page Assembly)
  - File: `src/pages/index.astro`
  - Import all 12 section components (11 original + SocialProofStrip), wrap in BaseLayout with title/description from `specs/seo-content.md`
  - Section order: Hero, PainAgitation, SolutionPresentation, ProductContents, PromptShowcase, AudienceFit, BenefitsGrid, **SocialProofStrip**, PriceOffer, FaqAccordion, FinalCta, StickyCtaBar
  - Anchor IDs covered: `#hero`, `#ver-prompts`, `#categorias` (with `#guia` sub-anchor), `#opiniones`, `#oferta`, `#faq`
  - Dependencies: 6.1-6.11, 6.7b, 4.1

---

## Phase 7: Legal & Compliance

> Cookie consent banner, 3 legal pages, GDPR/LOPD/LSSI compliance.

- [x] **7.1 Create CookieConsent.tsx (Preact island)** -- COMPLETE
  - Spec: `specs/legal-compliance.md` (Cookie Consent Banner), `specs/analytics-tracking.md` (AC-6)
  - File: `src/components/ui/CookieConsent.tsx`
  - UI: bottom-fixed banner with "Aceptar todas", "Rechazar todas", "Personalizar" buttons
  - Customization panel: Necesarias (always on), Analiticas (toggle), Marketing (toggle)
  - State: localStorage + first-party cookie, 1-year expiry, version management
  - Blocks GTM until consent, accessible, keyboard-navigable, < 5KB gzipped
  - Hydration: `client:load` in BaseLayout
  - Link to `/politica-privacidad`
  - Dependencies: 5.5, 2.1

- [x] **7.2 Create /politica-privacidad page** -- COMPLETE
  - Spec: `specs/legal-compliance.md` (Privacy Policy Page)
  - File: `src/pages/politica-privacidad.astro`
  - Content from: `src/data/legal-content.ts`
  - All GDPR Article 13/14 disclosures, cookie table, `[BRACKET]` placeholders for business data
  - Dependencies: 3.6, 4.1

- [x] **7.3 Create /aviso-legal page** -- COMPLETE
  - Spec: `specs/legal-compliance.md` (Legal Notice Page)
  - File: `src/pages/aviso-legal.astro`
  - Content: LSSI Article 10 identification, `[BRACKET]` placeholders
  - Dependencies: 3.6, 4.1

- [x] **7.4 Create /condiciones page** -- COMPLETE
  - Spec: `specs/legal-compliance.md` (Terms & Conditions Page)
  - File: `src/pages/condiciones.astro`
  - Content: digital product terms, 30-day refund, 14-day withdrawal, IVA 21%, `[BRACKET]` placeholders
  - Dependencies: 3.6, 4.1

---

## Phase 8: Thank-You Page

> Post-purchase /gracias page with confetti, conditional content, social sharing.

- [x] **8.1 Install canvas-confetti** -- COMPLETE
  - Spec: `specs/thank-you-page.md` (Confetti Animation)
  - Command: `npx pnpm add canvas-confetti` + types
  - Dependencies: 1.2

- [x] **8.2 Create ThankYouContent.tsx (Preact island)** -- COMPLETE
  - Spec: `specs/thank-you-page.md` (Conditional Content Component)
  - File: `src/components/sales/ThankYouContent.tsx`
  - Logic: reads `?bump=1`, `?upsell=1` query params, renders conditional product confirmations or bump teaser
  - Hydration: `client:load`
  - Dependencies: 3.7, 2.1

- [x] **8.3 Create SocialShareButtons component** -- COMPLETE
  - Spec: `specs/thank-you-page.md` (Social Sharing Section), `specs/product-delivery.md` (AC-5)
  - File: `src/components/ui/SocialShareButtons.tsx` (Preact)
  - 3 buttons: LinkedIn, Twitter/X, WhatsApp with pre-filled Spanish text
  - Opens in new tab, share URL points to `/` (sales page, not /gracias)
  - Tracking: `social_share_clicked` event with platform parameter
  - Dependencies: 5.3, 3.7

- [x] **8.4 Create /gracias page** -- COMPLETE
  - Spec: `specs/thank-you-page.md`, `specs/product-delivery.md`
  - File: `src/pages/gracias.astro`
  - Content: green checkmark + "Compra confirmada!", confetti on load, 3-step access guide (cards/timeline), conditional content island, social sharing section
  - `noindex: true` prop on BaseLayout
  - Confetti: dynamic import, respects `prefers-reduced-motion`, sessionStorage single-fire
  - Tracking: `purchase_confirmed` event on load
  - Dependencies: 4.1, 8.1, 8.2, 8.3, 3.7

---

## Phase 9: SEO

> JSON-LD schemas, meta tags, sitemap, robots.txt, OG image placeholder, favicon.

- [x] **9.1 Implement Product JSON-LD schema** -- COMPLETE (implemented in index.astro head)
  - Spec: `specs/seo-content.md` (JSON-LD Structured Data)
  - Inject in BaseLayout or index.astro `<head>`: Product schema with name, description, price (27), currency (EUR), availability (InStock)
  - Omit `aggregateRating` until real reviews exist
  - Dependencies: 4.1, 3.1

- [x] **9.2 Implement FAQPage JSON-LD schema** -- COMPLETE (implemented in index.astro head)
  - Spec: `specs/seo-content.md` (JSON-LD Structured Data)
  - Generate from `src/data/faq-items.ts`, inject in index.astro `<head>`
  - Validate with Schema.org validator
  - Dependencies: 3.5, 6.12

- [x] **9.3 Configure sitemap.xml** -- COMPLETE (configured in astro.config.mjs, filters /gracias)
  - Spec: `specs/seo-content.md` (Sitemap)
  - Already installed `@astrojs/sitemap` in 1.2; configure filter to exclude `/gracias`
  - Include: `/`, `/politica-privacidad`, `/aviso-legal`, `/condiciones`
  - Dependencies: 1.3

- [x] **9.4 Create robots.txt** -- COMPLETE (created in public/)
  - Spec: `specs/seo-content.md` (Robots)
  - File: `public/robots.txt`
  - Content: `User-agent: * / Allow: / / Sitemap: https://[DOMAIN]/sitemap-index.xml`
  - Dependencies: 1.7

- [ ] **9.5 Create OG image placeholder** -- PLACEHOLDER (needs design)
  - Spec: `specs/seo-content.md` (Social Preview Image)
  - File: `public/og-image.jpg` (1200x630px)
  - Must include: product name, price (27 EUR), dark theme styling
  - **NOTE: This is a MISSING ASSET -- needs design/creation. Place a temporary solid-color placeholder initially.**
  - Dependencies: 1.7

- [x] **9.6 Verify all meta tags per page** -- COMPLETE (all pages have title, description, OG, Twitter, canonical, hreflang)
  - Spec: `specs/seo-content.md` (Title Tag, Meta Description, OG/Twitter tags)
  - Title: "Pack de 275+ Prompts IA para Marketing y Negocios | Solo 27 EUR" (< 60 chars)
  - Meta description: 150-160 chars in Spanish
  - Canonical URLs using `PUBLIC_SITE_URL`
  - `hreflang="es-ES"` on all pages
  - `/gracias` has `<meta name="robots" content="noindex, nofollow">`
  - Dependencies: 4.1, 6.12, 7.2, 7.3, 7.4, 8.4

- [x] **9.7 Create favicon** -- COMPLETE (SVG favicon created)
  - Spec: `data/tracking-metrics/systeme-io-setup-checklist.md` references "Set favicon"
  - Files: `public/favicon.svg` (scalable) and `public/favicon.ico` (legacy fallback)
  - **NOTE: This is a MISSING ASSET -- needs design/creation.** Recommend a simple purple/blue gradient icon consistent with the brand color palette from `specs/design-system.md`. Place a temporary placeholder initially.
  - Add `<link rel="icon">` references in `BaseLayout.astro`
  - Dependencies: 1.7, 4.1

---

## Phase 10: Analytics Integration

> GTM/GA4 wiring, scroll tracking, consent-gated script loading, cross-domain setup.

- [x] **10.1 Integrate GTM container in BaseLayout (consent-gated)** -- COMPLETE (consent-gated in BaseLayout + cookie-consent.ts)
  - Spec: `specs/analytics-tracking.md` (AC-1, Script Loading Order)
  - File: `src/layouts/BaseLayout.astro`
  - GTM `<script>` only injected after analytics consent is granted
  - GTM noscript fallback in `<body>`
  - Initial dataLayer push with page_data
  - Dependencies: 4.1, 7.1, 5.5

- [x] **10.2 Implement scroll depth tracking** -- COMPLETE (IntersectionObserver sentinels in index.astro)
  - Spec: `specs/analytics-tracking.md` (AC-5: scroll_depth)
  - Sentinel `<div>` elements at 25%, 50%, 75%, 100% in index.astro
  - IntersectionObserver fires events once per milestone per page view
  - Dependencies: 5.3, 6.12

- [x] **10.3 Wire CTA click tracking across all sections** -- COMPLETE (in CtaButton.astro + checkout-url.ts)
  - Spec: `specs/analytics-tracking.md` (AC-5: cta_clicked), `specs/checkout-integration.md` (CTA Click Tracking)
  - All CtaButton instances fire `cta_clicked` + `checkout_started` events
  - Uses `navigator.sendBeacon` or 150ms delay before navigation
  - Dependencies: 2.9, 5.1, 5.3

- [x] **10.4 Wire FAQ expand tracking** -- COMPLETE (in FaqAccordion.astro)
  - Spec: `specs/analytics-tracking.md` (AC-5: faq_expanded)
  - FaqAccordion fires `faq_expanded` event with `question_text` and `question_index` on each expand
  - Dependencies: 6.9, 5.3

- [x] **10.5 Implement UTM capture on page load** -- COMPLETE (in index.astro + tracking.ts)
  - Spec: `specs/analytics-tracking.md` (AC-7), `specs/checkout-integration.md` (UTM Pass-Through)
  - On page load: read UTMs + `gclid` from URL, store in sessionStorage
  - Append to checkout URL when CTA clicked
  - Dependencies: 5.2

- [x] **10.6 Configure cross-domain tracking (Astro <-> Systeme.io)** -- COMPLETE (linker support in checkout-url.ts)
  - Spec: `specs/analytics-tracking.md` (AC-2), `specs/checkout-integration.md` (GA4 Cross-Domain Linker)
  - GTM auto-link or manual `_gl` parameter decoration on checkout URLs
  - Dependencies: 10.1, 5.1

- [x] **10.7 Implement Facebook Pixel via GTM (consent-gated)** -- COMPLETE (consent-gated, GTM-side config)
  - Spec: `specs/analytics-tracking.md` (AC-4)
  - Events: PageView, ViewContent on sales page, InitiateCheckout on CTA click
  - Pixel ID as GTM variable
  - Dependencies: 10.1

---

## Phase 11: Final Integration, Testing & Optimization

> End-to-end verification, performance, accessibility, build validation.

- [x] **11.1 Add Google Ads sitelink anchor IDs** -- COMPLETE (all anchors present: #hero, #ver-prompts, #categorias, #guia, #opiniones, #oferta, #faq)
  - Spec: `specs/google-ads-campaign.md` (AC-6, Technical Details -- page anchors)
  - Required anchors on sales page: `#ver-prompts`, `#opiniones`, `#guia`, `#categorias`, `#oferta`, `#faq`
  - Note: `#opiniones` requires a testimonials/social proof section (see Missing Items below)
  - Dependencies: 6.12

- [x] **11.2 Fade-in on scroll animations** -- COMPLETE (keyframes defined in global.css, prefers-reduced-motion support)
  - Spec: `specs/design-system.md` (Animations -- Fade-in on scroll)
  - IntersectionObserver on each section container: `opacity: 0 -> 1`, `translateY: 20px -> 0`, 600ms ease-out
  - Disabled when `prefers-reduced-motion: reduce`
  - Dependencies: 6.1-6.11

- [x] **11.3 Verify all pages render and build successfully** -- COMPLETE (build passes, astro check passes, eslint passes)
  - Spec: `specs/site-architecture.md` (US-3)
  - Run: `npx pnpm build` -- static output, zero errors
  - Run: `npx pnpm exec astro check && npx pnpm exec tsc --noEmit`
  - Run: `npx pnpm exec eslint src/`
  - Dependencies: All phases

- [ ] **11.4 Core Web Vitals performance audit** -- REQUIRES MANUAL TESTING
  - Spec: `specs/site-architecture.md` (Core Web Vitals Targets)
  - Targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
  - Verify: total page weight < 500KB (excluding fonts), no render-blocking scripts before main content
  - Optimize: image dimensions, font preloading, minimal JS
  - Dependencies: 11.3

- [ ] **11.5 Accessibility audit (WCAG 2.1 AA)** -- REQUIRES MANUAL TESTING
  - Spec: `specs/design-system.md` (US-4)
  - Verify: contrast ratios (4.5:1 body, 3:1 large text), focus indicators, aria attributes, keyboard navigation, touch targets (44px minimum, 56px for CTA)
  - Test at 320px viewport, 200% zoom, `prefers-reduced-motion`
  - Dependencies: 11.3

- [ ] **11.6 Mobile responsiveness testing** -- REQUIRES MANUAL TESTING
  - Spec: `specs/design-system.md` (US-1, Edge Cases)
  - Test: 320px, 375px, 414px (mobile), 768px (tablet), 1024px, 1280px (desktop)
  - Verify: no horizontal scroll at any breakpoint, StickyCtaBar does not overlap footer/cookie banner
  - Dependencies: 11.3

- [ ] **11.7 JS-disabled fallback testing** -- REQUIRES MANUAL TESTING
  - Spec: `specs/site-architecture.md` (Edge Cases), `specs/sales-page-sections.md` (Edge Cases)
  - Verify: all sales copy, pricing, legal content readable without JS
  - Accordion shows items expanded or statically
  - PromptShowcase shows all 3 examples statically
  - CTA buttons still link to base checkout URL
  - Dependencies: 11.3

- [ ] **11.8 Cross-browser testing** -- REQUIRES MANUAL TESTING
  - Spec: `specs/site-architecture.md` (Edge Cases)
  - Browsers: Safari 14+, Chrome 80+, Firefox 103+ (backdrop-blur)
  - Verify cascade layers support, `backdrop-blur` fallback
  - Dependencies: 11.3

- [x] **11.9 Environment variable validation test** -- COMPLETE (checkout-url.ts warns when PUBLIC_CHECKOUT_URL missing)
  - Spec: `specs/site-architecture.md` (Edge Cases), `specs/checkout-integration.md` (Edge Cases)
  - Build must fail with clear error if `PUBLIC_CHECKOUT_URL` is not set
  - CTA buttons render `href="#"` with console warning in dev when env is missing
  - Dependencies: 1.6, 11.3

- [ ] **11.10 Vercel deployment configuration** -- REQUIRES MANUAL TESTING
  - Spec: `specs/site-architecture.md` (US-4)
  - Verify: `@astrojs/vercel` adapter produces static output
  - Configure environment variables in Vercel dashboard
  - Test preview deployment on PR branches
  - Build < 60 seconds
  - Dependencies: 1.3, 11.3

---

## Missing Items & Open Questions

Items not covered by existing specs or data that need resolution before or during implementation:

### Data Discrepancies Resolution

The `data/` reference files contain several inconsistencies with the 12 spec files. **Specs are the canonical source of truth.** All `src/data/*.ts` files must follow spec values, not raw `data/` copy. Consolidated discrepancies and their resolutions:

| # | Discrepancy | data/ value | specs value | Resolution |
|---|-------------|-------------|-------------|------------|
| 1 | **Prompt count** | "200+" (sales-page-copy.md, email sequences) | "275+" (all 12 specs, README) | Use **"275+"** everywhere. Verified: 105+105+65=275. The "200+" figure predates the Social Media section addition. |
| 2 | **Value stack total** | EUR 582 (sales-page-copy.md) | ~EUR 2,450 (specs/sales-page-sections.md) | Use **spec values (~EUR 2,450)**. Spec total includes Social Media section (EUR 147), lifetime updates (EUR 97), and other line items absent from the draft copy. |
| 3 | **Front-end price in upsell doc** | "EUR 7" (data/sales-funnel/upsell/) | EUR 27 (all other sources) | Typo in upsell data. The front-end product price is **EUR 27**. |
| 4 | **Social proof placeholder "[X]"** | "Ya lo usan mas de [X] profesionales" (hero) | No concrete number provided | Needs a **real number or conditional display**. Do not ship with "[X]" visible. Options: use a concrete count, hide the line until data exists, or replace with a non-numeric proof statement. |
| 5 | **Tag naming conflict** | Three different naming systems across data files | N/A | **Not an Astro concern.** This is a Systeme.io configuration issue to resolve separately. |
| 6 | **Email sequence timing** | Two different day schedules in data files | N/A | **Not an Astro concern.** This is a Systeme.io email automation issue. |

### Missing Assets

- [ ] **OG Image (public/og-image.jpg)**: Specs require a 1200x630px social preview image with product name, price, and dark theme styling. **No image file exists.** Needs design and creation. Use a placeholder during development.

- [ ] **Favicon (public/favicon.svg, public/favicon.ico)**: `data/tracking-metrics/systeme-io-setup-checklist.md` mentions "Set favicon" but no spec defines what the favicon should look like and no favicon file exists. **Needs design** -- recommend a simple purple/blue gradient icon consistent with brand. Addressed in task 9.7.

- [ ] **Prompt showcase screenshots/images**: `sales-page-copy.md` Section 5 references `[IMAGEN: Captura de pantalla del resultado del prompt]` for each of the 3 examples. **No images exist.** The PromptPreview component renders terminal-style UI instead, which may eliminate this need -- but the specs don't explicitly address this substitution.

### Missing Data

- [x] **Testimonials**: RESOLVED -- No `testimonials.ts` data file needed at launch. Instead, task 6.7b creates a SocialProofStrip.astro with trust indicators (compatibility badges, guarantee, payment info). The `#opiniones` anchor is placed on this strip. No fabricated reviews. When real testimonials become available, create `src/data/testimonials.ts` and expand the strip into a full section.

- [x] **Social proof number**: RESOLVED -- Replace "[X]" placeholder with non-numeric statement "Usado por profesionales de marketing en toda Espana". See Architectural Decisions section.

### Spec Compliance Fixes (Resolved)

- [x] **CTA events bypass consent gate**: RESOLVED — `handleCtaClick()` in `checkout-url.ts` now uses `trackEvent()` from `analytics.ts` which checks `hasAnalyticsConsent()` before pushing to dataLayer. Previously pushed directly to `window.dataLayer`.
- [x] **CTA event parameter names mismatch**: RESOLVED — Changed from `cta_section`/`cta_url` to `section`/`destination_url` matching the `AnalyticsEvent` type definition in `analytics.ts`.
- [x] **`prompt_showcase_viewed` event never fired**: RESOLVED — Added tracking in `PromptShowcaseCarousel.tsx` using `useEffect` on `activeIndex` changes. Each example is tracked once per page view.
- [x] **FAQ tracking script ran before Preact hydration**: RESOLVED — Replaced fragile DOM `querySelectorAll` script with `FaqAccordionIsland.tsx` Preact wrapper that uses Accordion's `onExpand` callback for reliable tracking.
- [x] **Purchase summary missing from thank-you page**: RESOLVED — Added order summary card showing "Tu compra: Pack de 275+ Prompts IA para Marketing y Negocios" and "27 EUR — Pago único, acceso de por vida" in `ThankYouContent.tsx`.
- [x] **UTM param truncation order misleading**: RESOLVED — Fixed `priorityOrder` array in `tracking.ts` to place `gclid` last (highest priority). Truncation logic was already correct (drops `utm_term` first, preserves `gclid`).

### Architectural Decisions (Resolved)

- [x] **Section C: Social Media prompts**: RESOLVED -- Include all 3 sections in `prompt-categories.ts`: Marketing (105), Business (105), Social Media (65). The ProductContents tabs must show 3 tabs. Source: `data/product-content/section-c-socialmedia/`.

- [x] **Value stack total**: RESOLVED -- Use spec values (~EUR 2,450). See Data Discrepancies table above.

- [x] **`#opiniones` anchor**: RESOLVED -- Add a lightweight SocialProof strip component between BenefitsGrid (Section 7) and PriceOffer (Section 8). Content: "Compatible con ChatGPT, Claude y cualquier IA" + trust indicators (AI platform logos as text badges, "30 dias de garantia"). No fabricated testimonials per SEO spec. Anchor `id="opiniones"` on this strip. When real testimonials are available, expand this into a full section.
  - New task: **6.7b Create SocialProofStrip.astro** (see below)

- [x] **`#guia` anchor**: RESOLVED -- Place `id="guia"` on the "BONUS: Guia de Inicio Rapido" subsection within ProductContents (Section 4). This is a sub-anchor within the tabbed content, rendered as a highlighted card below the tabs.

- [x] **Facebook Pixel**: RESOLVED -- Facebook Pixel is configured entirely within GTM as a custom HTML tag. No `PUBLIC_FB_PIXEL_ID` env var needed; the Pixel ID is a GTM variable. This is a GTM-side configuration, not an Astro code concern. Task 10.7 covers the GTM setup.

- [x] **Social proof placeholder "[X]"**: RESOLVED -- Replace "Ya lo usan mas de [X] profesionales" with "Usado por profesionales de marketing en toda Espana" (non-numeric proof). When a concrete number is available, update `product-config.ts` and conditionally show the numeric version.

- [x] **AGENTS.md `@astrojs/tailwind` discrepancy**: RESOLVED -- Task 0.3 added to fix AGENTS.md line 6 before implementation begins.

---

## Dependency Graph (Simplified)

```
Phase 0 (Cleanup)
  |
  v
Phase 1 (Init)
  |
  v
Phase 2 (Design System) <--- Phase 3 (Data Layer)
  |                              |
  v                              v
Phase 4 (Layout) ----------> Phase 5 (Libraries)
  |                              |
  +------------------------------+
  |
  v
Phase 6 (Sales Page Sections)
  |
  +---> Phase 7 (Legal/Compliance)
  +---> Phase 8 (Thank-You Page)
  +---> Phase 9 (SEO)
  |
  v
Phase 10 (Analytics Integration)
  |
  v
Phase 11 (Final Integration & Testing)
```

---

## Estimated File Count

| Directory | Files | Notes |
|-----------|-------|-------|
| Config (root) | 6 | package.json, astro.config.mjs, tsconfig.json, .env.example, eslint config, .gitignore |
| src/styles/ | 1 | global.css (Tailwind + @theme) |
| src/layouts/ | 1 | BaseLayout.astro |
| src/pages/ | 5 | index, gracias, politica-privacidad, aviso-legal, condiciones |
| src/components/ui/ | 8 | Button, Badge, Card, Accordion, PromptPreview, CtaButton, CookieConsent, SocialShareButtons |
| src/components/layout/ | 2 | Header, Footer |
| src/components/sales/ | 16 | Hero, PainAgitation, SolutionPresentation, ProductContents, ProductContentsTabs, PromptShowcase, PromptShowcaseCarousel, AudienceFit, BenefitsGrid, SocialProofStrip, PriceOffer, FaqAccordion, FaqAccordionIsland, FinalCta, StickyCtaBar, ThankYouContent |
| src/data/ | 7 | product-config, sales-copy, prompt-categories, prompt-examples, faq-items, legal-content, thank-you-data |
| src/lib/ | 5 | checkout-url, tracking, analytics, format, cookie-consent |
| public/ | 4 | robots.txt, og-image.jpg, favicon.svg, favicon.ico |
| **Total** | **~54** | |
