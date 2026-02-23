# Product Delivery

## Job to Be Done

After purchase, the customer lands on a clear thank-you page with step-by-step instructions to access their product. The page reinforces their buying decision, delivers immediate next-step clarity, and encourages social sharing -- all within 5 seconds of page load.

---

## User Stories

### US-1: New buyer excited to access product
**As a** buyer who just completed checkout on Systeme.io,
**I want to** land on a congratulatory page with clear access instructions,
**so that** I know exactly how to get my prompts and can start using them immediately.

### US-2: Buyer who purchased order bump
**As a** buyer who added the Mega Pack de Automatizacion order bump (EUR 17),
**I want to** see confirmation that my order bump purchase was included,
**so that** I know I received everything I paid for and can access the automation templates too.

### US-3: Buyer who wants to share
**As a** satisfied buyer riding the post-purchase dopamine hit,
**I want to** share my purchase with my professional network,
**so that** I can signal credibility and help others discover the pack.

### US-4: Buyer who skipped the order bump
**As a** buyer who purchased only the base pack,
**I want to** see a soft mention of the automation add-on I missed,
**so that** I can consider adding it later if I find value in the base product.

---

## Acceptance Criteria

### AC-1: Thank-you page route and redirect
- Page is accessible at `/gracias`
- Page renders as a static Astro page (no client-side routing required)
- Systeme.io checkout redirects back to `https://[domain]/gracias` with query parameters after successful purchase
- Page gracefully handles direct visits without query parameters (shows generic thank-you content)

### AC-2: 3-step access guide
- Displays a numbered 3-step visual guide:
  1. **Revisa tu email** -- "Busca el email de acceso en tu bandeja de entrada (revisa spam si no lo ves en 5 minutos)"
  2. **Abre tu workspace** -- "Haz clic en el enlace para abrir tu workspace de Notion o descargar el PDF"
  3. **Empieza con la Guia Rapida** -- "Sigue la Guia de Inicio Rapido para usar tu primer prompt en menos de 2 minutos"
- Each step includes an icon/illustration and brief description
- Steps are visually distinct and scannable on mobile

### AC-3: Email delivery timeline notice
- Prominent notice: "Revisa tu bandeja de entrada en los proximos 5 minutos"
- Includes tip to check spam/promotions folders
- Note that Systeme.io handles the actual delivery email (the Astro page does NOT send emails)

### AC-4: Conditional content by purchase type
- Reads query parameters from the Systeme.io redirect URL (e.g., `?bump=1` or `?products=pack,bump`)
- If order bump was purchased: shows confirmation banner -- "Tambien tienes acceso al Mega Pack de Automatizacion con IA"
- If order bump was NOT purchased: shows a soft teaser -- "Muchos compradores tambien anadieron el Mega Pack de Automatizacion. Si te interesa, lo veremos en los proximos emails."
- Parameter names must match whatever Systeme.io sends (configure during checkout integration)

### AC-5: Social sharing buttons
- Three sharing buttons: LinkedIn, Twitter/X, WhatsApp
- Pre-filled share text in Spanish:
  - **LinkedIn:** "Acabo de hacerme con el Pack de 275+ Prompts de IA para Marketing y Negocios. Si usas ChatGPT o Claude para tu negocio, esto es un game-changer. [URL]"
  - **Twitter/X:** "Me acabo de hacer con un pack de 275+ prompts de IA para marketing y negocios. Copia, pega y resultados al instante. [URL]"
  - **WhatsApp:** "Mira este pack de 275+ prompts de IA que acabo de comprar. Brutal para marketing y negocios: [URL]"
- Share URL points to the sales page (not the thank-you page)
- Buttons open native share dialogs or new tabs with pre-filled text
- Track `social_share_clicked` event with platform parameter

### AC-6: Confetti animation on page load
- Confetti or success visual animation triggers on initial page load
- Animation is lightweight (canvas-based or CSS, not a large JS library)
- Animation runs once and does not loop
- Respects `prefers-reduced-motion` media query -- skip animation if user prefers reduced motion
- Does not block page content rendering (loads asynchronously)

### AC-7: Purchase confirmation summary
- Displays a simple order summary: "Tu compra: Pack de 275+ Prompts de IA para Marketing y Negocios"
- If order bump purchased, also lists "Mega Pack de Automatizacion con IA"
- Shows price paid if available from query parameters, otherwise omits price

---

## Technical Details

### Route and Page Structure
- **File:** `src/pages/gracias.astro`
- **Layout:** Uses `BaseLayout.astro` with custom meta (noindex, nofollow -- do not index the thank-you page)
- **Rendering:** Static generation (SSG) -- Astro renders at build time; query param logic runs client-side

### Query Parameter Handling
- Client-side Preact island (`src/components/ThankYouContent.tsx`) reads `window.location.search` on mount
- Extracts relevant parameters (purchase type, bump status, transaction ID if available)
- Conditionally renders order bump confirmation or teaser based on parameters
- Falls back to generic content if no parameters present

### Social Sharing Implementation
- Sharing uses standard URL schemes (no SDK dependencies):
  - LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url={encodedURL}`
  - Twitter/X: `https://twitter.com/intent/tweet?text={encodedText}&url={encodedURL}`
  - WhatsApp: `https://wa.me/?text={encodedText}`
- Share text and URL are encoded with `encodeURIComponent()`
- Buttons are styled consistently with the design system

### Confetti Animation
- Use a lightweight canvas-based confetti library (e.g., `canvas-confetti`, ~6KB gzipped) or a custom CSS animation
- Load via dynamic import to avoid blocking initial render
- Trigger on `DOMContentLoaded` or component mount within the Preact island

### Analytics Events on Thank-You Page
- Fire `purchase` event for Google Ads conversion tracking (if not already fired by Systeme.io)
- Fire `social_share_clicked` event when a share button is clicked
- UTM parameters from `sessionStorage` (captured on initial landing) should be available for attribution

### SEO and Indexing
- `<meta name="robots" content="noindex, nofollow">` -- prevent search engines from indexing
- No canonical URL needed
- Open Graph tags can be omitted or set to generic fallback

---

## Edge Cases

| Scenario | Expected Behavior |
|---|---|
| User visits `/gracias` directly without purchasing | Show generic thank-you content without order details; hide conditional sections; no confetti |
| Query parameters are malformed or missing expected keys | Fall back to generic content; do not show errors |
| User has JavaScript disabled | Static content (headline, 3-step guide, email notice) renders via Astro SSG; sharing buttons link to share URLs without dynamic text; conditional content hidden |
| User visits on very slow connection | Confetti loads async and is non-blocking; page content is immediately usable |
| User shares and then navigates to sales page from share link | Sales page handles its own rendering; share URL is the sales page, not `/gracias` |
| `prefers-reduced-motion` is enabled | Confetti animation is skipped; success state shown via static visual (checkmark icon or similar) |
| Same user visits `/gracias` multiple times | Confetti plays each time (no single-fire persistence); content remains the same |
| Systeme.io changes redirect parameter format | Query param parsing should be configurable or easily updatable in a single location |

---

## Dependencies

- **site-architecture.md** -- BaseLayout, routing structure, page conventions
- **design-system.md** -- Typography, colors, button styles, spacing tokens
- **checkout-integration.md** -- Systeme.io redirect URL format, query parameter contract, cross-domain tracking setup
