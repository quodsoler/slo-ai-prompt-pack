# Analytics & Tracking

## Job to Be Done

Comprehensive analytics that tracks the full funnel from ad click to purchase, including cross-domain tracking between the Astro site and Systeme.io checkout. Every meaningful user interaction is tracked, privacy regulations are respected, and marketers have the data they need to optimize conversion rates and ad spend.

---

## User Stories

### US-1: Marketer analyzing funnel performance
**As a** marketer reviewing funnel analytics,
**I want to** see the complete user journey from ad click through sales page engagement to checkout completion,
**so that** I can identify where users drop off and optimize each stage for higher conversion.

### US-2: Developer implementing tracking
**As a** developer adding analytics to the Astro site,
**I want to** have a clear, centralized tracking API with typed event helpers,
**so that** I can fire events consistently across components without duplicating tracking logic or making mistakes with event names.

### US-3: Privacy-conscious visitor
**As a** visitor to the sales page who cares about privacy,
**I want to** have control over which tracking scripts run via a cookie consent banner,
**so that** my data is not collected without my explicit permission, in compliance with GDPR and LOPD.

---

## Acceptance Criteria

### AC-1: GA4 property with GTM container
- Google Analytics 4 property configured for the Astro site domain
- Google Tag Manager (GTM) container manages all tracking scripts
- GTM container snippet loads in `BaseLayout.astro` `<head>` section
- GTM noscript fallback in `<body>` for non-JS environments
- **Conditional loading:** GTM container script ONLY fires after cookie consent is granted (no tracking before consent)

### AC-2: Cross-domain tracking (Astro site <--> Systeme.io checkout)
- GA4 cross-domain measurement configured to link sessions between Astro domain and Systeme.io checkout domain
- GA4 linker parameter (`_gl`) automatically decorates outbound links to Systeme.io
- Implementation: `gtag('config', 'G-XXXXXXXXXX', { linker: { domains: ['systeme.io'] } })` or equivalent GTM configuration
- Verify: a user clicking CTA on Astro site and completing checkout on Systeme.io appears as a single session in GA4

### AC-3: Google Ads conversion tracking
- Purchase event (`conversion`) fires on Systeme.io thank-you page (configured in Systeme.io, not Astro)
- Purchase conversion imported to GA4 via Google Ads link
- `gclid` parameter captured on Astro site landing, stored in sessionStorage, and forwarded to Systeme.io checkout URL for attribution
- Conversion value: EUR 27 (base) or dynamic value if Systeme.io supports it
- Attribution: Data-driven model, 30-day click window, 1-day view window

### AC-4: Facebook Pixel events
- Facebook Pixel installed via GTM (conditional on cookie consent)
- Events:
  - `PageView` -- fires on all pages (automatic with pixel base code)
  - `ViewContent` -- fires on sales page load with parameters: `content_name: "Pack 275+ Prompts IA"`, `content_type: "product"`, `value: 27`, `currency: "EUR"`
  - `InitiateCheckout` -- fires when user clicks any CTA button that redirects to Systeme.io checkout
- Pixel ID configured as GTM variable (not hardcoded)

### AC-5: Custom GA4 events tracked on the Astro site
- **`cta_clicked`** -- Fires when any CTA button is clicked
  - Parameters: `section` (hero | price | final | sticky | fab), `variant` (for future A/B testing, default "control"), `destination_url`
  - Implementation: attached to all CTA buttons via shared component or utility

- **`scroll_depth`** -- Fires at 25%, 50%, 75%, 100% scroll milestones
  - Parameters: `percent` (25 | 50 | 75 | 100), `page_path`
  - Implementation: Intersection Observer on sentinel elements at each depth, or scroll event with throttle
  - Each milestone fires only once per page view

- **`faq_expanded`** -- Fires when an FAQ accordion item is opened
  - Parameters: `question_text` (truncated to 100 chars), `question_index` (0-based position)
  - Implementation: event listener on FAQ component expand action

- **`checkout_started`** -- Fires when user clicks CTA and is about to be redirected to Systeme.io
  - Parameters: `source_section`, `product_name`, `product_price`
  - Note: This fires BEFORE the redirect; it's the Astro site's last trackable event before the user leaves

- **`prompt_showcase_viewed`** -- Fires when a prompt example becomes visible in the viewport
  - Parameters: `prompt_category`, `prompt_index`
  - Implementation: Intersection Observer on prompt showcase elements

- **`social_share_clicked`** -- Fires on the thank-you page when a share button is clicked
  - Parameters: `platform` (linkedin | twitter | whatsapp), `page_path`

### AC-6: Cookie consent banner (GDPR/LOPD)
- Cookie consent banner displays on first visit to any page
- Banner text in Spanish: "Usamos cookies para analizar el trafico y mejorar tu experiencia. Puedes aceptar todas las cookies o solo las necesarias."
- Two options: "Aceptar todas" (accept all) and "Solo necesarias" (necessary only)
- **Before consent:** No tracking scripts fire (no GTM, no GA4, no Facebook Pixel, no Google Ads tag)
- **On "Aceptar todas":** GTM container loads, which in turn loads GA4, Facebook Pixel, and Google Ads tags
- **On "Solo necesarias":** Only essential functionality runs (no analytics, no marketing pixels)
- Consent preference stored in a cookie (e.g., `cookie_consent=all` or `cookie_consent=necessary`)
- On subsequent visits, consent preference is read from cookie; if "all", GTM loads automatically without showing banner again
- Banner must not block critical page content (position: fixed bottom or overlay)
- Consent cookie expires after 12 months (GDPR requirement to re-consent)
- Must include link to privacy policy page

### AC-7: UTM parameter capture and forwarding
- On page load, read UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) and `gclid` from URL
- Store all captured parameters in `sessionStorage` under a known key (e.g., `utm_params`)
- When user clicks CTA to go to Systeme.io checkout, append stored UTM parameters and `gclid` to the checkout URL
- If no UTM parameters exist (organic visit), do not append empty params
- Parameters persist across page navigation within the same session (SPA-like behavior via Astro View Transitions if enabled, or multi-page via sessionStorage)

---

## Technical Details

### File Structure
```
src/
  lib/
    analytics.ts          # GA4 event helpers, dataLayer push functions, UTM utilities
    cookie-consent.ts     # Consent state management, GTM conditional loading
  components/
    CookieConsent.tsx     # Preact island for cookie consent banner UI
```

### `src/lib/analytics.ts` -- Event Helpers
```typescript
// Type-safe event names and parameters
type AnalyticsEvent =
  | { name: 'cta_clicked'; params: { section: string; variant?: string; destination_url: string } }
  | { name: 'scroll_depth'; params: { percent: 25 | 50 | 75 | 100; page_path: string } }
  | { name: 'faq_expanded'; params: { question_text: string; question_index: number } }
  | { name: 'checkout_started'; params: { source_section: string; product_name: string; product_price: number } }
  | { name: 'prompt_showcase_viewed'; params: { prompt_category: string; prompt_index: number } }
  | { name: 'social_share_clicked'; params: { platform: 'linkedin' | 'twitter' | 'whatsapp'; page_path: string } };

// Push event to GTM dataLayer (only if consent given)
function trackEvent(event: AnalyticsEvent): void;

// UTM parameter utilities
function captureUTMParams(): void;          // Read from URL, store in sessionStorage
function getStoredUTMParams(): Record<string, string> | null;  // Retrieve from sessionStorage
function appendUTMToURL(baseURL: string): string;              // Append stored UTMs to checkout URL
```

### GTM Container Loading (Conditional on Consent)
- GTM container ID stored as environment variable or site config
- On page load, check consent cookie:
  - If `cookie_consent=all`: inject GTM `<script>` tag dynamically
  - If `cookie_consent=necessary` or no cookie: do not inject GTM
- GTM container contains all marketing/analytics tags (GA4, Facebook Pixel, Google Ads)
- This ensures zero tracking before consent

### Script Loading Order
1. Page HTML renders (Astro SSG)
2. Cookie consent banner Preact island hydrates
3. If returning user with `cookie_consent=all`: GTM loads immediately
4. If new user: banner shows; on "Aceptar todas", GTM loads
5. GTM fires GA4 config, Facebook Pixel base, Google Ads tags
6. Analytics helper functions become active (push to dataLayer)

### DataLayer Structure
```javascript
// Initial page data (pushed before GTM loads, available when it does)
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'page_data',
  page_path: window.location.pathname,
  page_language: 'es',
  product_name: 'Pack 275+ Prompts IA',
  product_price: 27,
  product_currency: 'EUR'
});

// Custom event example
window.dataLayer.push({
  event: 'cta_clicked',
  section: 'hero',
  variant: 'control',
  destination_url: 'https://systeme.io/checkout/...'
});
```

### Scroll Depth Tracking Implementation
- Place invisible sentinel `<div>` elements at 25%, 50%, 75% page height, and one at page bottom
- Use Intersection Observer to detect when each sentinel enters viewport
- Fire event once per milestone per page view (track fired milestones in a Set)
- Alternative: use a throttled scroll event listener with `document.documentElement.scrollHeight` calculation

### Cross-Domain Tracking Setup
- GA4 property configured with Astro domain + Systeme.io domain in cross-domain measurement settings
- GTM tag for GA4 config includes linker configuration:
  - `allowLinker: true`
  - `domains: ['your-domain.com', 'systeme.io']`
- All outbound links to Systeme.io automatically get `_gl` linker parameter appended
- Verify with GA4 DebugView that sessions are properly linked across domains

---

## Edge Cases

| Scenario | Expected Behavior |
|---|---|
| User declines cookies ("Solo necesarias") | No tracking scripts load; all `trackEvent()` calls are no-ops; page functions normally without analytics |
| User accepts cookies, then clears cookies and revisits | Consent banner shows again; treated as new visitor; previous consent lost |
| JavaScript is disabled | No tracking fires (GTM requires JS); cookie banner does not render; page content still accessible via Astro SSG |
| User has an ad blocker that blocks GTM | GTM does not load; `trackEvent()` calls push to dataLayer but nothing consumes them; no errors thrown; page functions normally |
| `sessionStorage` is full or unavailable (private browsing edge cases) | UTM capture wraps in try/catch; if storage fails, UTMs are not persisted; checkout URL built without UTMs |
| User lands on `/gracias` directly (no prior sales page visit) | No UTMs in sessionStorage; `social_share_clicked` events still fire if consent given; GA4 tracks page view |
| Multiple CTA clicks in quick succession | Each click fires `cta_clicked` event; no debounce needed (GA4 handles deduplication) |
| Scroll depth milestone reached by page load (short page or large viewport) | Intersection Observer fires immediately for visible sentinels; events fire as expected |
| Consent cookie expires after 12 months | Banner shows again on next visit; user must re-consent |
| Cross-domain linker parameter (`_gl`) is stripped by Systeme.io | Session breaks in GA4; verify with Systeme.io that `_gl` parameter is preserved through checkout. If not, document as known limitation |
| Facebook Pixel blocked by browser privacy features (Safari ITP, Firefox ETP) | Pixel events may not fire or cookies may be limited; this is a known platform limitation outside Astro control |
| User navigates using browser back button after CTA click | No double-counting; `checkout_started` fired on initial click only; browser back shows cached page |

---

## Dependencies

- **site-architecture.md** -- BaseLayout.astro where GTM container and consent banner are integrated
- **checkout-integration.md** -- Systeme.io checkout URL format for appending UTM/gclid parameters, cross-domain tracking configuration
- **legal-compliance.md** -- GDPR/LOPD requirements for cookie consent, privacy policy content, data retention policies
