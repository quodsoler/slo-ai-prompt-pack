# Site Architecture

## Job to Be Done

Deliver a fast, SEO-optimized static architecture for a Spanish-language sales funnel site that converts Google Ads traffic into Systeme.io checkout sessions for the "Pack de 275+ Prompts IA para Marketing y Negocios" (EUR 27).

---

## User Stories

### US-1: Mobile visitor arriving from Google Ads
**As a** Spanish professional landing on the site from a Google Ads click on mobile,
**I want** the page to load instantly and render correctly on my phone,
**so that** I can start reading the sales pitch without waiting or pinch-zooming.

**Acceptance Criteria:**
- LCP < 2.5s on 4G connection (Moto G Power baseline)
- No horizontal scroll at 320px viewport width
- All above-the-fold content visible without JS hydration (SSG HTML)
- FID < 100ms, CLS < 0.1
- Spanish text renders with correct encoding (UTF-8, lang="es")

### US-2: Google crawler indexing the site
**As a** Google search crawler,
**I want** to discover well-structured, semantically marked-up pages with unique metadata,
**so that** the site ranks for relevant Spanish-language AI prompt keywords.

**Acceptance Criteria:**
- Each of the 5 pages has a unique `<title>`, `<meta name="description">`, and canonical URL
- Open Graph tags (og:title, og:description, og:image, og:url, og:locale=es_ES) present on all pages
- `sitemap.xml` generated at build time listing all 5 pages
- `robots.txt` allows crawling of all public pages
- Semantic HTML: single `<h1>` per page, logical heading hierarchy, `<main>`, `<nav>`, `<footer>`
- JSON-LD structured data: Product schema on `/`, FAQPage schema on `/` (FAQ section)
- `hreflang="es"` attribute on `<html>` element
- Clean URLs without trailing slashes (consistent canonical)

### US-3: Developer setting up or maintaining the project
**As a** developer cloning the repository,
**I want** a clear, conventional project structure with typed data and explicit conventions,
**so that** I can understand the codebase and contribute without guessing where things go.

**Acceptance Criteria:**
- Project initializes with `pnpm create astro@latest` (minimal template, strict TypeScript)
- All dependencies installable via `pnpm install`
- `pnpm dev` starts local dev server; `pnpm build` produces static output; `pnpm preview` serves build
- TypeScript strict mode enabled; `astro check` and `tsc --noEmit` pass with zero errors
- ESLint configured and passing on `src/`
- Directory structure matches the documented pattern (see Technical Details)
- Environment variables documented in `.env.example`
- `data/` directory is reference-only; `src/data/*.ts` contains typed const exports derived from it

### US-4: Site owner deploying and managing the site
**As the** product owner,
**I want** zero-config deployment to Vercel with environment-based checkout URL configuration,
**so that** I can manage staging vs production checkout URLs without code changes.

**Acceptance Criteria:**
- Vercel adapter configured for static output (`@astrojs/vercel` with SSG)
- `PUBLIC_CHECKOUT_URL` env var consumed by Astro's public env mechanism (`import.meta.env.PUBLIC_CHECKOUT_URL`)
- `PUBLIC_CHECKOUT_URL_VARIANT` env var supported for A/B price testing
- Build output is fully static (no server functions required)
- Deployment preview works on Vercel pull request branches
- Build completes in < 60 seconds

### US-5: Returning visitor navigating legal pages
**As a** returning visitor who already read the sales page,
**I want** to access privacy policy, legal notice, and terms from the footer,
**so that** I can review legal information before purchasing.

**Acceptance Criteria:**
- Footer contains links to `/politica-privacidad`, `/aviso-legal`, `/condiciones`
- Each legal page uses the same base layout (header, footer) as the sales page
- Legal pages load as fast as the main page (same SSG, same performance targets)
- Cookie consent banner appears on all pages (GDPR/LOPD requirement)
- Legal pages are indexable (included in sitemap)

---

## Technical Details

### Tech Stack
- **Framework:** Astro 5.x (Static Site Generation mode)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.x (CSS-first config via `@tailwindcss/vite` plugin; no `tailwind.config.js`)
- **Interactive islands:** Preact (via `@astrojs/preact`)
- **Package manager:** pnpm
- **Hosting:** Vercel (SSG output adapter)
- **Checkout:** Systeme.io (external; CTAs link out)

### Pages (5 total)
| Route | File | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | Long-form sales page (11 sections) |
| `/gracias` | `src/pages/gracias.astro` | Thank-you / post-purchase page |
| `/politica-privacidad` | `src/pages/politica-privacidad.astro` | Privacy policy (GDPR/LOPD) |
| `/aviso-legal` | `src/pages/aviso-legal.astro` | Legal notice (Aviso Legal) |
| `/condiciones` | `src/pages/condiciones.astro` | Terms and conditions |

### Project Structure
```
src/
  assets/              # Images, icons (processed by Astro <Image>)
  components/
    sales/             # Section components: Hero, PainAgitation, SolutionPresentation,
                       #   ProductContents, PromptShowcase, AudienceFit, BenefitsGrid,
                       #   PriceOffer, FaqAccordion, FinalCta, StickyCtaBar
    layout/            # Header, Footer, PageLayout, StickyCtaBar
    ui/                # Button, Accordion, Badge, Card, PromptPreview
  data/                # TypeScript const exports:
                       #   product-config.ts, faq-items.ts, testimonials.ts,
                       #   prompt-categories.ts, legal-content.ts
  layouts/             # BaseLayout.astro (HTML head, fonts, analytics, cookie consent)
  lib/                 # Utility modules:
                       #   analytics.ts (GA4/GTM event helpers)
                       #   tracking.ts (UTM handling, cross-domain linker)
                       #   checkout-url.ts (URL builder with UTM pass-through)
                       #   format.ts (Spanish number formatting)
  pages/               # Astro page routes (index, gracias, politica-privacidad,
                       #   aviso-legal, condiciones)
public/
  robots.txt           # Generated or static
```

### Environment Variables
| Variable | Required | Description |
|---|---|---|
| `PUBLIC_CHECKOUT_URL` | Yes | Systeme.io checkout page URL |
| `PUBLIC_CHECKOUT_URL_VARIANT` | No | Alternate checkout URL for A/B price test |
| `PUBLIC_GA4_MEASUREMENT_ID` | Yes | GA4 measurement ID (G-XXXXXXX) |
| `PUBLIC_GTM_CONTAINER_ID` | Yes | GTM container ID (GTM-XXXXXXX) |
| `PUBLIC_SITE_URL` | Yes | Canonical site URL (https://domain.com) |

### Systeme.io Integration
- All CTA buttons link to the external checkout URL; no checkout logic lives in the Astro site
- URL constructed via `src/lib/checkout-url.ts`: `${PUBLIC_CHECKOUT_URL}?utm_source=...&utm_medium=...&utm_campaign=...`
- UTM parameters from the current page URL are forwarded to the checkout URL
- GA4 cross-domain linker decoration appended to checkout URLs

### Core Web Vitals Targets
| Metric | Target | Strategy |
|---|---|---|
| LCP | < 2.5s | SSG HTML, optimized images via `<Image>`, font preload, minimal JS |
| FID | < 100ms | Preact islands hydrate only interactive components; bulk is static HTML |
| CLS | < 0.1 | Explicit dimensions on images/embeds, font-display: swap with size-adjust |

### SEO Implementation
- Unique `<title>` and `<meta name="description">` per page (set via frontmatter/props in BaseLayout)
- Canonical `<link rel="canonical">` per page using `PUBLIC_SITE_URL` + route
- Open Graph tags: og:title, og:description, og:image, og:url, og:type, og:locale (es_ES)
- `@astrojs/sitemap` integration generates `sitemap.xml` at build
- Static `robots.txt` in `public/` or generated
- JSON-LD: Product schema (name, description, price, currency, availability) and FAQPage schema on `/`

### Cookie Consent (GDPR/LOPD)
- Cookie consent banner rendered in BaseLayout on all pages
- Blocks GA4/GTM scripts until user accepts analytics cookies
- Stores consent preference in localStorage
- Provides "Manage cookies" link in footer for preference changes
- Compliant with Spanish LOPD and EU GDPR requirements

---

## Edge Cases

- **JS disabled:** All sales copy, pricing, legal content must be readable without JavaScript. Only interactive elements (accordion, sticky bar, prompt showcase animation) degrade.
- **Slow connection:** Images must have width/height attributes to prevent CLS. Fonts load with `font-display: swap`. Critical CSS inlined by Astro.
- **Missing env vars:** Build should fail with a clear error if `PUBLIC_CHECKOUT_URL` is not set. Other optional vars default gracefully.
- **UTM parameter edge cases:** Handle missing UTMs (don't append empty params), URL-encoded characters in UTM values, excessively long UTM strings (truncate at 2048 char total URL length).
- **Trailing slash inconsistency:** Astro `trailingSlash: 'never'` config ensures consistent canonical URLs.
- **Old browser:** Site must be usable (not necessarily identical) on Safari 14+, Chrome 80+. Tailwind CSS 4 uses native CSS features; verify cascade layers support or add fallback.

---

## Dependencies

- **design-system.md** — Visual theme, component catalog, typography, color tokens
- **seo-content.md** — Page titles, meta descriptions, OG copy, JSON-LD content
- **analytics-tracking.md** — GA4/GTM implementation, event definitions, cross-domain setup
- **legal-compliance.md** — Cookie consent requirements, legal page content, GDPR/LOPD specifics
