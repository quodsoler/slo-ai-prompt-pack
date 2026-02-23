# Legal Compliance

## Job to Be Done

Full GDPR (Reglamento General de Proteccion de Datos), LOPD (Ley Organica de Proteccion de Datos), and LSSI (Ley de Servicios de la Sociedad de la Informacion) compliance for a Spanish commercial website selling digital products, so that visitors can exercise their data rights, the business avoids regulatory penalties, and analytics/marketing scripts only run with proper consent.

---

## User Stories

### Privacy-Conscious Visitor

**As a** privacy-conscious visitor arriving on the site for the first time,
**I want** a clear, non-deceptive cookie consent banner that lets me accept all, reject all, or customize my preferences before any tracking scripts execute,
**so that** my browsing data is not collected without my explicit informed consent.

**As a** visitor who previously gave or denied consent,
**I want** to be able to change my cookie preferences at any time via a clearly visible link in the footer,
**so that** I remain in control of my data regardless of when I first visited.

**As a** visitor considering a purchase,
**I want** to easily find and read the privacy policy, legal notice, and terms & conditions in my language (Spanish),
**so that** I understand how my data is handled, who I am buying from, and what my rights are before committing to a purchase.

### Business Owner Ensuring Compliance

**As a** business owner operating in Spain,
**I want** the site to meet all GDPR, LOPD, and LSSI requirements out of the box,
**so that** I am not exposed to fines (up to EUR 20 million or 4% of annual turnover under GDPR) or legal complaints.

**As a** business owner,
**I want** legal page content provided as templates with clear placeholder markers for my personal/business data,
**so that** I can fill in my details and have legally adequate pages without hiring a lawyer for the initial draft.

### Developer Implementing Consent

**As a** developer implementing the cookie consent system,
**I want** a lightweight Preact island component that blocks all analytics and marketing scripts until consent is granted,
**so that** the site is technically compliant and the consent mechanism does not degrade page performance.

**As a** developer,
**I want** consent state stored reliably in both localStorage and a first-party cookie,
**so that** the consent decision persists across sessions and can be read by both client-side JavaScript and server-side logic if needed.

---

## Acceptance Criteria

### Cookie Consent Banner

- [ ] A consent banner appears on the first visit before any analytics or marketing scripts execute
- [ ] The banner presents three clear options: "Aceptar todas", "Rechazar todas", and "Personalizar"
- [ ] The "Personalizar" option opens a panel showing cookie categories: Necesarias (always on, not toggleable), Analiticas, and Marketing
- [ ] Each category in the customization panel shows: category name, description, and an on/off toggle
- [ ] No analytics scripts (GA4, GTM) load until "Analiticas" consent is granted
- [ ] No marketing scripts (Google Ads conversion tag, Facebook Pixel) load until "Marketing" consent is granted
- [ ] Necessary cookies (consent storage, session) function without requiring consent
- [ ] Consent state is stored in `localStorage` under a defined key (e.g., `cookie_consent`)
- [ ] Consent state is also stored as a first-party cookie (e.g., `cookie_consent`) for potential server-side reads
- [ ] The banner does not reappear for visitors who have already made a choice
- [ ] A "Configuracion de cookies" link in the footer re-opens the consent banner/panel at any time
- [ ] The banner is accessible: keyboard-navigable, sufficient color contrast, screen-reader compatible

### Privacy Policy Page (`/politica-privacidad`)

- [ ] Page is accessible at the URL path `/politica-privacidad`
- [ ] Content includes all required GDPR Article 13/14 disclosures:
  - Data controller identification: name, [NIF/CIF], [ADDRESS], [EMAIL]
  - Types of data collected: analytics data (GA4), advertising data (Google Ads, Facebook Pixel), purchase data (via Systeme.io)
  - Legal basis for each processing activity:
    - Consent: analytics and marketing cookies
    - Contract performance: purchase processing and product delivery
    - Legitimate interest: fraud prevention and site security
  - Data retention periods for each data type
  - Data subject rights: access, rectification, erasure, portability, objection, restriction of processing, right to lodge a complaint with the AEPD
  - Third-party data transfers with safeguards:
    - Google LLC (US) -- EU Standard Contractual Clauses
    - Meta Platforms Inc (US) -- EU Standard Contractual Clauses
    - Systeme.io (EU -- AWS Ireland)
  - Cookie table listing: cookie name, provider, purpose, type, and duration
- [ ] Placeholder data (NIF, address, etc.) is enclosed in `[BRACKETS]` for easy identification and replacement
- [ ] Content is written in Spanish

### Legal Notice Page (`/aviso-legal`)

- [ ] Page is accessible at the URL path `/aviso-legal`
- [ ] Content includes identification per LSSI Article 10:
  - Full legal name of the individual or company
  - [NIF/CIF]
  - Registered address: [ADDRESS]
  - Contact email: [EMAIL]
  - Commercial register data (if applicable): [REGISTRO MERCANTIL]
- [ ] Placeholder data is enclosed in `[BRACKETS]`
- [ ] Content is written in Spanish

### Terms & Conditions Page (`/condiciones`)

- [ ] Page is accessible at the URL path `/condiciones`
- [ ] Content covers:
  - Nature of the product: digital product, instant electronic delivery, no physical goods shipped
  - Refund policy: 30-day money-back guarantee, conditions for requesting a refund
  - Right of withdrawal: 14-day withdrawal period per EU Consumer Rights Directive, with explicit statement that the right is waived upon immediate access to digital content (requires explicit consumer consent at checkout -- handled by Systeme.io)
  - Pricing: all prices include IVA at 21% (Spanish VAT for digital products)
  - Payment methods: processed via Systeme.io (Stripe)
  - Applicable law: Spanish law governs the contract
  - Competent courts: courts of [CITY] for dispute resolution
- [ ] Placeholder data is enclosed in `[BRACKETS]`
- [ ] Content is written in Spanish

### Footer Legal Links

- [ ] Every page on the site includes footer links to all three legal pages:
  - "Politica de Privacidad" linking to `/politica-privacidad`
  - "Aviso Legal" linking to `/aviso-legal`
  - "Terminos y Condiciones" linking to `/condiciones`
- [ ] A "Configuracion de cookies" link is present in the footer that re-opens the consent mechanism
- [ ] Footer links are visible, accessible, and consistent across all pages including `/gracias`

---

## Technical Details

### Cookie Consent Component

- **Architecture**: Preact island component (`src/components/ui/CookieConsent.tsx`) hydrated on the client side via `client:load`
- **State management**: Component internal state for UI; persisted to `localStorage` and `document.cookie` on user action
- **localStorage key**: `cookie_consent` storing a JSON object:
  ```json
  {
    "necessary": true,
    "analytics": false,
    "marketing": false,
    "timestamp": "2026-02-23T10:00:00Z",
    "version": 1
  }
  ```
- **First-party cookie**: `cookie_consent` with value `accepted|rejected|custom`, `Path=/`, `SameSite=Lax`, `Max-Age=31536000` (1 year)
- **Script blocking pattern**: Analytics and marketing `<script>` tags in `BaseLayout.astro` are conditionally rendered. On initial load with no consent, scripts are not included in the DOM. After consent, the Preact component dynamically injects the approved script tags or triggers a page reload to let Astro handle conditional rendering.
- **Recommended approach**: Use a `data-consent-category` attribute on script wrappers. The consent component reads the stored consent state and activates scripts matching granted categories.
- **Performance**: The consent banner itself must be lightweight (<5KB gzipped). It must not depend on external libraries beyond Preact.

### Legal Page Implementation

- **Pages**: `src/pages/politica-privacidad.astro`, `src/pages/aviso-legal.astro`, `src/pages/condiciones.astro`
- **Layout**: Use `BaseLayout.astro` with appropriate title and meta tags per page
- **Content**: Legal text as Markdown-style content within the `.astro` file, or imported from `src/data/legal-content.ts` as string constants
- **Placeholder convention**: All user-specific data uses `[BRACKET_NOTATION]`:
  - `[NOMBRE_COMPLETO]` -- full legal name
  - `[NIF_CIF]` -- tax identification number
  - `[DIRECCION]` -- registered address
  - `[EMAIL_CONTACTO]` -- contact email
  - `[CIUDAD]` -- city for court jurisdiction
  - `[REGISTRO_MERCANTIL]` -- commercial register data
- **SEO**: Legal pages should have basic meta tags but do not need JSON-LD or aggressive keyword optimization. They should be indexable (included in sitemap).

### Cookie Table Reference

| Cookie | Provider | Purpose | Type | Duration |
|--------|----------|---------|------|----------|
| `cookie_consent` | First-party | Stores user's cookie consent preferences | Necessary | 1 year |
| `_ga` | Google Analytics | Distinguishes unique users | Analytics | 2 years |
| `_ga_*` | Google Analytics | Maintains session state | Analytics | 2 years |
| `_gid` | Google Analytics | Distinguishes unique users | Analytics | 24 hours |
| `_gcl_au` | Google Ads | Stores conversion data | Marketing | 90 days |
| `_fbp` | Meta (Facebook) | Tracks visits across websites for ad delivery | Marketing | 90 days |

### Consent Version Management

- The `version` field in the consent object allows invalidating old consents when the cookie policy changes materially. If the stored version is less than the current version defined in code, the banner re-appears.

---

## Edge Cases

- **Visitor arrives with JavaScript disabled**: The site should still be usable (Astro SSG renders static HTML). Analytics and marketing scripts would not run anyway without JS. Legal pages are fully readable. The consent banner will not appear, but since no tracking runs, this is compliant.
- **Visitor clears localStorage but not cookies (or vice versa)**: The consent check should look at both storage mechanisms. If either indicates a valid consent decision, honor it. If they conflict, treat the more recent timestamp as authoritative. If only one exists, re-derive the other on next page load.
- **GDPR consent for existing visitors after policy update**: When the `version` field in the consent schema is incremented, all previous consents become invalid and the banner re-appears. Document this behavior so the business owner knows to increment the version when making material policy changes.
- **Mobile banner covering content**: On small screens (320px), the consent banner must not obscure the entire viewport. Use a compact design with a "Personalizar" expandable section. Maximum banner height: 40% of viewport on mobile.
- **Third-party cookie blocking by browsers**: Safari ITP and Firefox ETP may block third-party cookies automatically. The first-party consent cookie and localStorage are not affected. GA4 and Facebook Pixel functionality may be degraded by browser-level blocking independent of the consent mechanism -- this is expected and outside the site's control.
- **Consent banner and page performance**: The banner must not cause Cumulative Layout Shift (CLS). Use a fixed position at the bottom of the viewport so content does not shift when the banner appears or disappears.
- **Multiple tabs**: If a visitor changes consent in one tab, other open tabs will still use the old consent state until refreshed. This is acceptable behavior -- consent applies on next page navigation.
- **Placeholder data left unfilled at launch**: The build process should ideally warn (via linting or a build-time check) if `[BRACKETS]` placeholders remain in legal pages. At minimum, the placeholder format makes them visually obvious during manual review.

---

## Dependencies

- **site-architecture.md**: Defines the page routes (`/politica-privacidad`, `/aviso-legal`, `/condiciones`) and the `BaseLayout.astro` where the consent banner and footer links are integrated.
- **analytics-tracking.md**: Defines which analytics and marketing scripts must be blocked until consent is given (GA4, GTM, Google Ads tag, Facebook Pixel).
- **design-system.md**: Visual styling for the consent banner, legal page typography, and footer link styling must follow the established design system.
- **checkout-integration.md**: The Systeme.io checkout handles its own GDPR consent for purchase data. The Astro site's consent mechanism covers the Astro-hosted pages only.
