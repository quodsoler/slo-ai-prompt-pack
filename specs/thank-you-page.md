# Thank You Page

## Job to Be Done

A post-purchase thank-you page that confirms the purchase, guides product access with clear step-by-step instructions, encourages social sharing for organic referral traffic, and reinforces the buying decision to reduce refund rates and increase customer satisfaction.

---

## User Stories

### Excited New Buyer

**As an** excited new buyer who just completed the checkout on Systeme.io,
**I want** to land on a celebratory confirmation page that tells me my purchase was successful,
**so that** I feel reassured that my payment went through and I know exactly what to do next.

**As a** new buyer,
**I want** a simple 3-step guide showing me how to access and start using my prompts immediately,
**so that** I get value from my purchase within the first 5 minutes and do not feel lost or frustrated.

### Buyer Who Purchased Multiple Products

**As a** buyer who also purchased the order bump and/or upsell,
**I want** the thank-you page to acknowledge all the products I purchased,
**so that** I know everything I paid for is accounted for and I can access all of it.

**As a** buyer who only purchased the front-end product,
**I want** to see a tasteful teaser for the order bump I passed on,
**so that** I have one more chance to add it if I changed my mind (without feeling pressured).

### Buyer Wanting to Share with Team

**As a** buyer who wants to tell colleagues or my professional network about this product,
**I want** easy-to-use social sharing buttons with pre-written professional messages,
**so that** I can share my purchase on LinkedIn, Twitter/X, or WhatsApp with a single click.

---

## Acceptance Criteria

### Page Basics

- [ ] The page is accessible at the URL path `/gracias`
- [ ] The page has `<meta name="robots" content="noindex, nofollow">` to prevent search engine indexing
- [ ] The page uses the same dark theme and visual style as the rest of the site
- [ ] The page is fully responsive and functional from 320px to 1440px+ viewport widths

### Purchase Confirmation State

- [ ] A celebration animation plays on page load (confetti effect or similar)
- [ ] A green checkmark icon is prominently displayed
- [ ] The heading reads "Compra confirmada!" (or equivalent celebratory Spanish heading)
- [ ] The confirmation section is the first thing visible above the fold

### 3-Step Access Guide

- [ ] Step 1 ("Revisa tu email"): Instructs the buyer to check their inbox for the delivery email from [SENDER], including a note to check spam/junk folders
- [ ] Step 2 ("Accede al contenido"): Instructs the buyer to open the Notion workspace or download the PDF pack via the link in the email
- [ ] Step 3 ("Empieza con la Guia Rapida"): Directs the buyer to start with the quick-start guide and try their first 3 prompts
- [ ] Each step has a numbered indicator, a clear title, and a brief description
- [ ] The steps are visually distinct and easy to scan (card layout or timeline layout)

### Conditional Content via Query Parameters

- [ ] When `?bump=1` is present in the URL, the page displays a confirmation message: "Tambien incluido: Tu Pack de 50 Prompts de Automatizacion"
- [ ] When `?upsell=1` is present in the URL, the page displays a confirmation message: "Tambien incluido: Sistema Completo de IA"
- [ ] When both `?bump=1&upsell=1` are present, both confirmation messages display
- [ ] When neither `?bump` nor `?upsell` is present (default), a teaser for the order bump is shown: "Quieres 50 prompts mas? Consigue el Pack de Automatizacion por EUR 17" with a link to the Systeme.io bump purchase page (or an informational callout if repurchase is not possible)
- [ ] Query parameter parsing is handled client-side (Preact island or inline script) since the page is statically generated

### Social Sharing Section

- [ ] A LinkedIn share button is present with a pre-filled professional post about AI productivity
- [ ] A Twitter/X share button is present with a pre-written short tweet about the prompt pack
- [ ] A WhatsApp share button is present with a pre-composed message to share with colleagues
- [ ] All share buttons open in a new tab/window
- [ ] Pre-filled share text includes a referral angle, e.g., "Acabo de conseguir 275+ prompts de IA para mi negocio" and a link back to the sales page
- [ ] Share text is written in Spanish, professional in tone, and appropriate for a business audience
- [ ] Each button has an appropriate platform icon (LinkedIn, Twitter/X, WhatsApp)

### Analytics Events

- [ ] A `purchase_confirmed` event fires on page load via the analytics helper (GA4 dataLayer push)
- [ ] A `social_share_clicked` event fires when any share button is clicked, with a parameter indicating the platform (linkedin, twitter, whatsapp)
- [ ] Analytics events only fire if the visitor has given analytics consent (per cookie consent mechanism)

---

## Technical Details

### Page Implementation

- **File**: `src/pages/gracias.astro`
- **Layout**: Uses `BaseLayout.astro` with `noindex: true` prop to add the robots meta tag
- **Static generation**: The page is statically generated by Astro. Dynamic content (query params, confetti animation, share buttons) is handled by Preact islands hydrated on the client.

### Confetti Animation

- Use a lightweight confetti library (e.g., `canvas-confetti`, ~6KB gzipped) or a custom CSS animation
- The animation triggers once on page load and runs for 2-3 seconds
- The animation should not block page rendering or cause layout shifts
- Fallback: if the confetti library fails to load, the page still displays correctly without animation

### Conditional Content Component

- **Component**: `src/components/sales/ThankYouContent.tsx` (Preact island, `client:load`)
- **Logic**:
  ```typescript
  const params = new URLSearchParams(window.location.search);
  const hasBump = params.get('bump') === '1';
  const hasUpsell = params.get('upsell') === '1';
  const showBumpTeaser = !hasBump && !hasUpsell;
  ```
- The component renders conditional blocks based on these flags
- Default state (no params) shows the bump teaser/upsell callout

### Social Share URLs

- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?url={ENCODED_SALES_PAGE_URL}`
- **Twitter/X**: `https://twitter.com/intent/tweet?text={ENCODED_TWEET_TEXT}&url={ENCODED_SALES_PAGE_URL}`
- **WhatsApp**: `https://api.whatsapp.com/send?text={ENCODED_MESSAGE_WITH_URL}`
- Share URLs should reference the main sales page (`/`) not the thank-you page
- Pre-filled text examples:
  - LinkedIn: `Acabo de conseguir 275+ prompts de IA profesionales para marketing y negocios. Si usas ChatGPT o Claude en tu trabajo, esto te va a ahorrar horas cada semana.`
  - Twitter/X: `275+ prompts de IA listos para copiar y pegar. Marketing, ventas, contenido, gestion... Para profesionales y autonomos en Espana.`
  - WhatsApp: `Mira esto: un pack de 275+ prompts de IA para marketing y negocios. Yo acabo de comprarlo y tiene muy buena pinta. Te lo comparto por si te interesa:`

### Analytics Integration

- Import analytics helpers from `src/lib/analytics.ts`
- `purchase_confirmed` event payload:
  ```typescript
  {
    event: 'purchase_confirmed',
    page: '/gracias',
    has_bump: boolean,
    has_upsell: boolean
  }
  ```
- `social_share_clicked` event payload:
  ```typescript
  {
    event: 'social_share_clicked',
    platform: 'linkedin' | 'twitter' | 'whatsapp'
  }
  ```
- Both events must respect the cookie consent state: check consent before pushing to dataLayer

### Design Notes

- **Color scheme**: Dark background consistent with the rest of the site
- **Celebration feel**: Use accent colors (green for the checkmark, bright accents for confetti) to create a positive, celebratory atmosphere while maintaining the professional dark theme
- **Visual hierarchy**:
  1. Confirmation heading + checkmark (most prominent)
  2. 3-step access guide (primary action area)
  3. Conditional product confirmations (secondary information)
  4. Social sharing (tertiary/optional action)
- **Spacing**: Generous vertical spacing between sections for easy scanning on mobile

---

## Edge Cases

- **Direct navigation to /gracias without a purchase**: Some visitors may arrive at `/gracias` directly (bookmarked, shared link, or curiosity). Without query parameters, the page shows the default state (no bump/upsell confirmations, shows bump teaser). Since the page does not verify purchase status (Systeme.io handles that), it displays generic confirmation content. The `noindex` meta tag prevents search engines from surfacing this page.
- **Both bump and upsell params present**: When `?bump=1&upsell=1` is in the URL, both product confirmations display. The bump teaser is hidden (the buyer already has everything). Test that the layout handles showing both messages without visual breakage.
- **Unknown or malformed query parameters**: If `?bump=abc` or `?upsell=2` is passed, treat them as falsy (not equal to `'1'`). Only the exact string `'1'` activates the conditional content.
- **Social share on mobile**: WhatsApp sharing on mobile should open the WhatsApp app directly. LinkedIn and Twitter/X should open in the mobile browser. Test that share buttons work correctly on both iOS and Android.
- **Confetti on low-end devices**: The confetti animation should detect reduced motion preferences (`prefers-reduced-motion: reduce`) and skip the animation for accessibility. On very low-end devices, a simple CSS fade-in of the checkmark is sufficient.
- **Share text character limits**: Twitter/X has a 280-character limit for tweets. Verify that the pre-filled tweet text plus the URL stays under this limit. LinkedIn and WhatsApp have generous or no limits.
- **Ad blocker interference**: Some ad blockers may block the GA4 analytics script. The `purchase_confirmed` event may not fire for these users. This is acceptable -- the primary conversion tracking happens on the Systeme.io side, not on the thank-you page.
- **Page reload / back button**: If the buyer refreshes the page or navigates back and forward, the confetti animation should not replay. Use a session flag (`sessionStorage`) to track whether the animation has already played in this visit.
- **Systeme.io redirect timing**: After checkout on Systeme.io, the redirect to `/gracias` may take 1-3 seconds. The thank-you page should load quickly and not depend on any data from the Systeme.io session. All conditional content is derived purely from URL query parameters.

---

## Dependencies

- **design-system.md**: Visual styling, dark theme colors, typography, button components, and spacing system used throughout the page.
- **site-architecture.md**: Page route definition (`/gracias`), `BaseLayout.astro` integration, and noindex configuration.
- **analytics-tracking.md**: GA4 event definitions (`purchase_confirmed`, `social_share_clicked`), dataLayer structure, and consent-aware event firing.
- **legal-compliance.md**: Cookie consent must be respected when firing analytics events on this page. Footer legal links must appear on this page.
- **checkout-integration.md**: Defines the query parameters that Systeme.io appends when redirecting to the thank-you page after purchase.
