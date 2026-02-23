## Build & Run

- **Framework:** Astro 5.x + TypeScript + Tailwind CSS 4.x + Preact islands
- **Package manager:** pnpm (use `npx pnpm` if not globally installed)
- **Init:** `npx pnpm create astro@latest . --template minimal --typescript strict --install --git`
- **Install deps:** `npx pnpm add @astrojs/preact preact @astrojs/tailwind @astrojs/sitemap`
- **Tailwind:** Use `@tailwindcss/vite` plugin (Tailwind 4.x — CSS-first config, no tailwind.config.js)
- **Dev:** `npx pnpm dev`
- **Build:** `npx pnpm build`
- **Preview:** `npx pnpm preview`

## Validation

Run these after implementing to get immediate feedback:

- Tests: `npx pnpm exec vitest run`
- Typecheck: `npx pnpm exec astro check && npx pnpm exec tsc --noEmit`
- Lint: `npx pnpm exec eslint src/`
- Build: `npx pnpm build`

## Operational Notes

- **Language:** All user-facing content is in Spanish (es-ES). Code comments and variable names in English.
- **Currency:** EUR (€). Format: `27 €` or `EUR 27` (Spanish convention).
- **Checkout:** Systeme.io handles checkout, email delivery, and payment processing. The Astro site is the front door only — CTAs link to external Systeme.io checkout URL via `PUBLIC_CHECKOUT_URL` env var.
- **Mobile-first:** 70%+ of Spanish traffic is mobile. Design from 320px up. Sticky CTA bar on mobile is essential.
- **Cross-domain tracking:** GA4 must track across Astro site → Systeme.io. Use GTM for tag management.
- **`data/` is reference-only:** Read `data/*` to understand product content, then create structured `src/data/*.ts` TypeScript exports. Never import directly from `data/`.
- **Hosting:** Vercel (SSG output).
- **Images:** Use Astro `<Image>` component for optimization. Store in `src/assets/`.

### Codebase Patterns

- `src/components/sales/` — Section components for the long-form sales page (Hero, PainAgitation, SolutionPresentation, etc.)
- `src/components/layout/` — Header, Footer, PageLayout, StickyCtaBar
- `src/components/ui/` — Reusable UI components (Button, Accordion, Badge, Card)
- `src/data/` — TypeScript const exports: product-config.ts, faq-items.ts, testimonials.ts, prompt-categories.ts
- `src/lib/analytics.ts` — GA4/GTM event helpers (cta_clicked, scroll_depth, faq_expanded, checkout_started)
- `src/lib/tracking.ts` — UTM parameter handling and cross-domain linker
- `src/pages/` — Astro page routes (index.astro, gracias.astro, politica-privacidad.astro, aviso-legal.astro, condiciones.astro)
- `src/layouts/` — BaseLayout.astro (HTML head, fonts, analytics scripts, cookie consent)

### Skills Reference

| Scenario | Skill to invoke |
|----------|----------------|
| Writing/improving sales page copy | `copywriting` or `copy-editing` |
| CTA button placement and conversion | `page-cro` |
| Google Ads campaign structure | `paid-ads` |
| Email sequence optimization | `email-sequence` |
| Analytics and event tracking | `analytics-tracking` |
| JSON-LD structured data | `schema-markup` |
| SEO optimization | `seo-audit` |
| Pricing and offer structure | `pricing-strategy` |
| A/B test design | `ab-test-setup` |
| Popup/exit intent | `popup-cro` |
| Persuasion and urgency techniques | `marketing-psychology` |
| Social proof and sharing | `social-content` |
| Launch sequencing | `launch-strategy` |
