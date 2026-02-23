# SEO & Content

## Job to Be Done

The sales page ranks for high-intent Spanish keywords and attracts organic traffic alongside paid campaigns, ensuring every visitor from Google or social media encounters optimized metadata, structured data, and share-friendly previews that maximize click-through rates and search visibility.

---

## User Stories

### SEO Specialist

**As an** SEO specialist managing the site,
**I want** properly structured on-page SEO elements (H1, H2s, meta tags, JSON-LD, canonical URLs, hreflang) implemented consistently across all pages,
**so that** search engines can accurately index, understand, and rank the content for target Spanish-language queries.

**As an** SEO specialist,
**I want** an auto-generated sitemap.xml and properly configured robots.txt,
**so that** crawlers discover all public pages efficiently and respect noindex directives on private pages.

### Organic Visitor from Google

**As a** Spanish-speaking professional searching Google for AI prompt resources,
**I want** to find a compelling, relevant search result with a clear title and description in my language,
**so that** I can quickly determine whether this product solves my need before clicking through.

**As an** organic visitor,
**I want** the page I land on to match the search intent behind my query (e.g., "prompts ChatGPT espanol"),
**so that** I immediately see content relevant to what I searched for without feeling misled.

### Social Media Sharer

**As a** person sharing the sales page link on LinkedIn, Twitter/X, or WhatsApp,
**I want** the shared link to display a professional preview card with the correct title, description, and image,
**so that** the share looks credible and entices my contacts to click through.

---

## Acceptance Criteria

### Target Keywords

- [ ] Primary keywords are integrated naturally into page content at 1-2% density:
  - "prompts ChatGPT espanol"
  - "plantillas IA marketing"
  - "prompts inteligencia artificial negocios"
  - "pack prompts IA profesional"
- [ ] Secondary keywords appear at least once each across the page body:
  - "como usar ChatGPT para marketing"
  - "prompts para autonomos"
  - "plantillas IA para emprendedores"

### On-Page SEO Structure

- [ ] The H1 heading contains the primary keyword and appears exactly once on the page
- [ ] Each major section uses an H2 heading that incorporates a relevant keyword or semantic variation
- [ ] Heading hierarchy is valid: no H3 without a parent H2, no skipped levels
- [ ] Keyword density for primary terms is between 1% and 2% of body text (excluding code and metadata)

### Title Tag & Meta Description

- [ ] Title tag is set to: `Pack de 275+ Prompts IA para Marketing y Negocios | Solo 27€`
- [ ] Title tag length is under 60 characters (or displays without truncation in SERPs)
- [ ] Meta description is set to: `Descubre 275+ prompts de IA listos para copiar y pegar. Diseñados para profesionales y autónomos en España. Marketing, ventas, contenido y más. Ahorra +10 horas/semana.`
- [ ] Meta description length is between 150-160 characters

### JSON-LD Structured Data

- [ ] A `Product` schema is present in the page `<head>` with:
  - `name`: product name
  - `description`: product description
  - `offers.price`: `27`
  - `offers.priceCurrency`: `EUR`
  - `offers.availability`: `https://schema.org/InStock`
  - `aggregateRating` (when reviews exist): `ratingValue`, `reviewCount`
- [ ] A `FAQPage` schema is present containing all FAQ section question/answer pairs
- [ ] Each FAQ item uses `Question` and `AcceptedAnswer` types correctly
- [ ] JSON-LD validates without errors via Google Rich Results Test or Schema.org validator

### Open Graph & Twitter Card Tags

- [ ] `og:title` is set and matches or closely mirrors the title tag
- [ ] `og:description` is set and matches or closely mirrors the meta description
- [ ] `og:image` points to a social preview card image (minimum 1200x630px)
- [ ] `og:type` is set to `product`
- [ ] `og:url` is set to the canonical URL
- [ ] `og:locale` is set to `es_ES`
- [ ] `twitter:card` is set to `summary_large_image`
- [ ] `twitter:title`, `twitter:description`, and `twitter:image` are set
- [ ] Social preview renders correctly when URL is pasted into LinkedIn, Twitter/X, and WhatsApp

### Sitemap, Robots, & Crawl Directives

- [ ] `sitemap.xml` is auto-generated via `@astrojs/sitemap` integration
- [ ] Sitemap includes all public pages: `/`, `/politica-privacidad`, `/aviso-legal`, `/condiciones`
- [ ] Sitemap excludes `/gracias` (thank-you page)
- [ ] `robots.txt` exists at site root, allows all crawlers, and references the sitemap URL
- [ ] Canonical `<link rel="canonical">` tags are present on every page pointing to the correct absolute URL
- [ ] `hreflang` tag is set to `es-ES` on all pages (single language site)
- [ ] The `/gracias` page has `<meta name="robots" content="noindex, nofollow">` set

---

## Technical Details

### Implementation in Astro

- **Title & meta tags**: Set via `<head>` in `BaseLayout.astro` using props passed from each page. Use Astro's built-in `<head>` management or a shared SEO component.
- **JSON-LD**: Render as `<script type="application/ld+json">` in the page `<head>`. Define Product and FAQPage schemas as TypeScript objects in `src/data/` and serialize them into the layout.
- **OG/Twitter tags**: Include as `<meta>` tags in `BaseLayout.astro`, populated via page-level props.
- **Sitemap**: Install and configure `@astrojs/sitemap` in `astro.config.mjs`. Set `site` property to the production URL. Use `filter` option to exclude `/gracias`.
- **robots.txt**: Create as a static file at `public/robots.txt` or generate via an Astro endpoint. Content:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://[DOMAIN]/sitemap-index.xml
  ```
- **Canonical URLs**: Generate from `Astro.url` or `Astro.site` + `Astro.url.pathname` in the layout.
- **hreflang**: Single `<link rel="alternate" hreflang="es-ES" href="[canonical URL]">` on every page.
- **noindex for /gracias**: Add `<meta name="robots" content="noindex, nofollow">` conditionally when rendering the thank-you page.

### Social Preview Image

- Create a 1200x630px OG image stored in `public/og-image.jpg` (or similar).
- Image should include: product name, price (27€), visual representation of the prompt pack, and brand styling consistent with the dark theme.

### Keyword Integration Strategy

- H1: contains "Prompts IA" + "Marketing y Negocios" (primary keyword cluster)
- H2s: each section heading uses a variation (e.g., "Prompts para Marketing y Copywriting", "Prompts para Gestion de Negocios")
- Body copy: primary keywords in first 100 words, naturally distributed throughout
- Alt text on images: include relevant keyword variations where contextually appropriate
- Internal links: use descriptive anchor text with keyword relevance

---

## Edge Cases

- **Title tag truncation**: If the title tag exceeds 60 characters, Google may truncate it. Test that the truncated version still conveys the core message. The specified title is approximately 58 characters -- verify with pixel-width checker.
- **Meta description rewriting**: Google may choose to display a different snippet from page content. Ensure the first 160 characters of visible body text are also compelling.
- **OG image caching**: Social platforms cache OG images aggressively. If the image is updated, use Facebook Sharing Debugger and Twitter Card Validator to force a refresh.
- **JSON-LD with no reviews yet**: At launch, `aggregateRating` may not have data. Omit the `aggregateRating` field entirely rather than including it with zero reviews (Google penalizes empty or fabricated review data).
- **Sitemap changes on new pages**: If new pages are added later, `@astrojs/sitemap` regenerates automatically on build. Ensure `/gracias` stays excluded via the filter function.
- **Multiple canonical issues**: If the site is accessible via both `www` and non-`www`, or `http` and `https`, configure redirects at the hosting level (Vercel) to avoid duplicate content.
- **hreflang without alternate languages**: A single hreflang `es-ES` self-referencing tag is valid but some tools flag it as a warning. This is expected and correct for a single-language site.
- **FAQ schema limit**: Google may display up to 10 FAQ results in rich snippets. If the FAQ section has more than 10 items, prioritize the most high-intent questions first in the markup order.

---

## Dependencies

- **site-architecture.md**: Page structure, routes, and layout system define where SEO elements are injected.
- **sales-page-sections.md**: Section headings and content determine keyword placement and H2 structure.
- **design-system.md**: OG image must follow the established visual identity and dark theme.
- **analytics-tracking.md**: GA4 and search console integration for monitoring organic traffic performance.
