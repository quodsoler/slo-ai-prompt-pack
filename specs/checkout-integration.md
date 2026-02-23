# Checkout Integration

## Job to Be Done

Provide a seamless handoff from the Astro sales page to the Systeme.io checkout that preserves UTM attribution, enables cross-domain GA4 tracking, supports price A/B testing, and fires structured analytics events on every CTA interaction — maximizing AOV through the Systeme.io order bump and upsell/downsell flow.

---

## User Stories

### US-1: Visitor clicking a CTA button
**As a** Spanish professional who has decided to buy,
**I want** the CTA button to take me directly to the checkout page with my session context preserved,
**so that** the purchase process feels like a continuation of the sales page, not a jarring redirect to an unrelated site.

**Acceptance Criteria:**
- All CTA buttons across the page (Hero, PriceOffer, FinalCta, StickyCtaBar) link to the same Systeme.io checkout URL
- Checkout URL is constructed via a single shared URL builder (`src/lib/checkout-url.ts`)
- UTM parameters from the visitor's current URL are appended to the checkout URL
- GA4 cross-domain linker parameter (`_gl`) is appended to the checkout URL
- Checkout opens in the same tab (no `target="_blank"`)
- URL loads within 1 second of click (no client-side processing delay)
- If `PUBLIC_CHECKOUT_URL` is not configured, CTA buttons render with `href="#"` and log a console warning in development

### US-2: Marketer running an A/B price test
**As a** marketer testing EUR 17 vs EUR 27 pricing,
**I want** to serve different checkout URLs to different visitors without code changes,
**so that** I can measure conversion rate impact of each price point.

**Acceptance Criteria:**
- `PUBLIC_CHECKOUT_URL` is the default checkout URL (EUR 27 product)
- `PUBLIC_CHECKOUT_URL_VARIANT` is an optional alternate checkout URL (EUR 17 product)
- When both env vars are set, the URL builder randomly assigns visitors to variant A or B (50/50 split)
- Assignment is stored in `localStorage` so the same visitor always sees the same price on return
- Assignment is passed as a UTM parameter (`utm_content=price_27` or `utm_content=price_17`) for analytics segmentation
- When only `PUBLIC_CHECKOUT_URL` is set, all visitors get the default URL (no split)
- The A/B assignment does not cause CLS (no visible price text change on the sales page — price display is always "27 EUR" unless explicitly changed)

### US-3: Analytics reviewer tracing the funnel
**As an** analytics reviewer looking at GA4 data,
**I want** every CTA click to fire a structured event with section context,
**so that** I can analyze which section drives the most checkout initiations and optimize the page layout.

**Acceptance Criteria:**
- Every CTA click fires a `cta_clicked` GA4 event
- Event payload includes: `{ section: string, url: string, variant?: string }`
- Section values are: `'hero'`, `'price_offer'`, `'final'`, `'sticky_bar'`
- Events fire before navigation (use `navigator.sendBeacon` or `setTimeout` redirect pattern)
- UTM parameters on the current page are included in the event as custom dimensions
- Cross-domain measurement works: GA4 session persists from Astro site to Systeme.io checkout

---

## Technical Details

### CTA URL Builder (`src/lib/checkout-url.ts`)

Single source of truth for constructing checkout URLs. Used by all CTA components.

```typescript
interface CheckoutUrlOptions {
  section: 'hero' | 'price_offer' | 'final' | 'sticky_bar';
}

function buildCheckoutUrl(options: CheckoutUrlOptions): string;
```

**URL construction logic:**
1. Start with base URL from `import.meta.env.PUBLIC_CHECKOUT_URL` (or variant if A/B test active)
2. Parse existing UTM parameters from `window.location.search`
3. Append UTMs to checkout URL: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
4. If no UTMs present on current page, use defaults: `utm_source=website`, `utm_medium=sales_page`, `utm_campaign=prompt_pack`
5. Override `utm_content` with A/B variant identifier if price test is active
6. Append GA4 cross-domain linker decoration (via `gtag('get', ...)` or GTM linker)
7. Return fully constructed URL string

**URL format:**
```
https://systeme.io/checkout/[product-id]?utm_source=google&utm_medium=cpc&utm_campaign=prompts_ia&utm_content=price_27&_gl=1*abc123*...
```

### Environment Variables

| Variable | Required | Type | Description |
|---|---|---|---|
| `PUBLIC_CHECKOUT_URL` | Yes | string | Primary Systeme.io checkout URL |
| `PUBLIC_CHECKOUT_URL_VARIANT` | No | string | Alternate checkout URL for A/B price test |

Both are Astro public env vars accessed via `import.meta.env.PUBLIC_CHECKOUT_URL`.

### A/B Price Test Implementation

```typescript
// src/lib/checkout-url.ts (internal logic)

function getCheckoutVariant(): { url: string; variant: string } {
  const primary = import.meta.env.PUBLIC_CHECKOUT_URL;
  const variantUrl = import.meta.env.PUBLIC_CHECKOUT_URL_VARIANT;

  // No variant configured — use primary
  if (!variantUrl) {
    return { url: primary, variant: 'default' };
  }

  // Check localStorage for existing assignment
  const stored = localStorage.getItem('checkout_variant');
  if (stored === 'A' || stored === 'B') {
    return {
      url: stored === 'A' ? primary : variantUrl,
      variant: stored === 'A' ? 'price_27' : 'price_17',
    };
  }

  // Random 50/50 assignment
  const assignment = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem('checkout_variant', assignment);

  return {
    url: assignment === 'A' ? primary : variantUrl,
    variant: assignment === 'A' ? 'price_27' : 'price_17',
  };
}
```

### UTM Parameter Pass-Through (`src/lib/tracking.ts`)

```typescript
interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

function getCurrentUtmParams(): UtmParams;
function appendUtmParams(baseUrl: string, params: UtmParams): string;
```

**Behavior:**
- Reads UTM parameters from `window.location.search` on page load
- Stores in sessionStorage so they persist across SPA-like navigation (if any)
- Merges with default UTMs when constructing checkout URL
- URL-encodes all parameter values
- Strips empty/undefined parameters (does not append `&utm_term=`)

### GA4 Cross-Domain Linker

Checkout URLs must include the GA4 `_gl` linker parameter for cross-domain session stitching.

**Implementation options (in priority order):**
1. **GTM auto-link:** Configure GTM to automatically decorate outbound links to the Systeme.io domain. Preferred — no custom code needed.
2. **Manual decoration:** If GTM auto-link is insufficient, call `gtag('get', GA4_ID, 'client_id', callback)` and manually append `_gl` parameter.

The URL builder should support both: check if GTM has already decorated the link; if not, apply manual decoration.

### CTA Click Tracking (`src/lib/analytics.ts`)

```typescript
function trackCtaClick(section: string, url: string, variant?: string): void;
```

**Implementation:**
1. Push event to GTM dataLayer:
   ```javascript
   window.dataLayer.push({
     event: 'cta_clicked',
     cta_section: section,
     cta_url: url,
     cta_variant: variant || 'default',
   });
   ```
2. Use `navigator.sendBeacon` to ensure event fires before navigation
3. Delay navigation by 150ms to allow beacon to send (with `setTimeout` fallback)
4. If `dataLayer` is not available (consent not given), skip tracking and navigate immediately

### CTA Component Integration

All CTA buttons use a shared pattern:

```astro
---
// In each section component (Hero.astro, PriceOffer.astro, FinalCta.astro)
import CtaButton from '../ui/CtaButton.astro';
---
<CtaButton section="hero" label="Quiero Mis 275+ Prompts Ahora -- 27 EUR" />
```

The `CtaButton` component:
- Renders an `<a>` tag with `href` set at build time to `PUBLIC_CHECKOUT_URL` (SSG-safe)
- Enhances with JS (Preact island or inline script) to:
  - Replace href with full URL (UTMs + linker + variant)
  - Attach click handler for tracking
- Without JS: link still works (goes to base checkout URL without UTMs)

### Systeme.io Funnel Flow (for reference — managed in Systeme.io, not Astro)

The Astro site only handles the first handoff. Everything below happens in Systeme.io:

```
Astro Sales Page (/)
  └── CTA click → Systeme.io Checkout Page
                    ├── Order Bump: EUR 17 "Mega Pack: 50 Prompts Automatizacion"
                    └── Purchase → Upsell Page
                                    ├── Accept → EUR 67 "Sistema Completo de IA"
                                    └── Decline → Downsell Page
                                                    ├── Accept → EUR 27 "Mini Sistema IA"
                                                    └── Decline → Thank You
                                                                    └── Redirect to /gracias
```

**Order bump details (configured in Systeme.io):**
- Product: "Mega Pack: 50 Prompts Avanzados de Automatizacion"
- Price: EUR 17
- Shown as checkbox on checkout page
- Target take rate: >30%

**Upsell details (configured in Systeme.io):**
- Product: "Sistema Completo de IA para tu Negocio"
- Price: EUR 67
- One-click add (no re-entry of payment details)

**Downsell details (configured in Systeme.io):**
- Product: "Mini Sistema IA -- La Version Esencial"
- Price: EUR 27
- Shown only if upsell is declined

### Multiple CTA Locations

| Location | Component | CTA Label | Section ID |
|---|---|---|---|
| Hero | `Hero.astro` | "Quiero Mis 275+ Prompts Ahora -- 27 EUR" | `hero` |
| Price & Offer | `PriceOffer.astro` | "Si, quiero mis 275+ prompts por solo 27 EUR" | `price_offer` |
| Final CTA | `FinalCta.astro` | "Quiero Mis 275+ Prompts Ahora -- 27 EUR" | `final` |
| Sticky Bar | `StickyCtaBar.tsx` | "Quiero Mis Prompts" (compact) | `sticky_bar` |

All locations use `buildCheckoutUrl()` from `src/lib/checkout-url.ts` — single source of truth.

---

## Edge Cases

- **Missing `PUBLIC_CHECKOUT_URL`:** Build should fail with a descriptive error. In dev mode, CTA buttons render with `href="#"` and a visible warning badge overlay.
- **Malformed UTM parameters:** URL-encode all values. Strip control characters. Reject UTM values longer than 256 characters.
- **Total URL length exceeds limits:** If the constructed URL exceeds 2,048 characters (safe browser limit), truncate UTM parameters in priority order: `utm_term` first, then `utm_content`, then `utm_campaign`.
- **localStorage unavailable (private browsing):** A/B variant assignment falls back to random on each page load (no persistence). Wrap `localStorage` access in try-catch.
- **GA4 not loaded (consent denied):** CTA links still work — they navigate to checkout URL with UTMs but without `_gl` linker. `trackCtaClick` skips dataLayer push gracefully.
- **Multiple rapid CTA clicks:** Debounce click handler (ignore clicks within 500ms of the first). Prevent double navigation.
- **Systeme.io checkout down:** Astro site is unaffected (static). Visitor lands on Systeme.io error page. Consider adding a `rel="noopener"` but NOT `target="_blank"` (same-tab navigation is intentional).
- **Bot/crawler clicking CTA links:** Tracking should filter bot user-agents. The `<a href>` is a valid URL for crawlers to discover but Systeme.io handles bot filtering on their end.
- **UTM parameter injection:** Do not trust UTM values for display — they are only appended to URLs. Sanitize to prevent open-redirect if checkout URL base is ever dynamically constructed (it is not in this architecture, but defensive coding).
- **Price change:** If the product price changes from EUR 27 to another value, only `src/data/product-config.ts` and the Systeme.io product configuration need updating. CTA labels pull from data, not hardcoded.

---

## Dependencies

- **analytics-tracking.md** — GA4/GTM setup, event schema definitions, cross-domain tracking configuration, consent management
- **sales-page-sections.md** — CTA button placement within each section, section IDs for tracking context
