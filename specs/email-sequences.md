# Email Sequences

## Job to Be Done

A 7-email post-purchase nurture sequence that onboards buyers, drives product usage, and sets up backend offers -- delivered over 14 days via Systeme.io automation. This spec documents the full email funnel context so Ralph understands how the Astro site fits within the broader customer journey, even though these emails are NOT built in Astro.

> **Important:** This spec is a reference document. The emails and automation rules are configured entirely in Systeme.io. No email-sending functionality is implemented in the Astro codebase. This spec exists so that Ralph understands the complete funnel from ad click through post-purchase nurture, which informs decisions about the thank-you page, analytics tracking, and checkout integration.

---

## User Stories

### US-1: New buyer receiving onboarding emails
**As a** buyer who just purchased the Pack de 275+ Prompts,
**I want to** receive a structured email sequence that guides me through using the product,
**so that** I get value from my purchase quickly and don't feel abandoned after buying.

### US-2: Buyer not opening emails
**As a** buyer who hasn't opened the last 2-3 emails,
**I want to** receive emails with varied subject lines and angles,
**so that** at least one resonates and pulls me back into using the product.

### US-3: Buyer who purchased order bump
**As a** buyer who also purchased the Mega Pack de Automatizacion,
**I want to** receive email content that references my automation templates,
**so that** I get onboarding for ALL products I purchased, not just the base pack.

### US-4: Buyer who did NOT purchase order bump or upsell
**As a** buyer of only the base pack,
**I want to** receive gentle mentions of what I missed without being pressured,
**so that** I can make an informed decision about upgrading later.

---

## Acceptance Criteria

### AC-1: 7-email sequence structure (reference: data/email-sequences/7-email-nurture-sequence.md)
- 7 emails delivered over 14 days post-purchase via Systeme.io automation
- Schedule:
  - **Email 1 (Day 0):** Bienvenida y Entrega -- Welcome + product access link + first 3 prompts to try immediately
  - **Email 2 (Day 1):** Primeros Pasos -- Quick win tip (context specificity), link to Guia de Inicio Rapido
  - **Email 3 (Day 3):** Caso de Uso Destacado -- Deep dive into a real case study (Marta's 47 leads story), introduction to business/marketing prompt categories
  - **Email 4 (Day 5):** Los 3 Errores Mas Comunes -- Educational content positioning expertise, social media content creation workflow tips
  - **Email 5 (Day 7):** Contenido de Valor + Social Proof -- Advanced technique (two-phase prompting), testimonials, community building
  - **Email 6 (Day 10):** El Siguiente Nivel -- Upsell to Sistema Completo (EUR 67) for non-upsell buyers; alternative onboarding content for those who already bought the upsell
  - **Email 7 (Day 14):** Ultima Oportunidad + Vision -- Final upsell push with urgency (deadline) + 30/60/90-day vision; for upsell buyers, onboarding wrap-up + seeds for consulting/membership

### AC-2: Subject line A/B variants
- Each email has 2 subject line variants (A and B) for A/B testing
- Systeme.io configured with 50/50 split, optimizing for open rate after first 100 opens
- All subject lines in Spanish (Spain), using tuteo form

### AC-3: Tagging strategy (reference: data/strategy/tagging-strategy.md)
- Tags applied at each stage follow the naming convention from the tagging strategy:
  - **Purchase tags:** `prod_ia_buyer`, `comprador-prompt-pack` (applied on purchase)
  - **Sequence tags:** `seq_ia_welcome_active` (on sequence entry), `seq_ia_welcome_complete` (on sequence completion)
  - **Day tags:** `dia-0`, `dia-1`, `dia-3`, `dia-5`, `dia-7`, `dia-10`, `dia-14`
  - **Email-specific tags:** `email-primeros-pasos-enviado`, `email-caso-uso-enviado`, etc.
  - **Product status tags:** `comprador-order-bump` / no tag (for conditional Email 3, 6, 7 content)
  - **Engagement tags:** `engagement_hot`, `engagement_warm`, `engagement_cold` (applied automatically based on open behavior)
- On sequence completion: remove `secuencia-nurture-activa`, add `secuencia-nurture-completada`

### AC-4: Conditional content by purchase status
- **Email 3:** If buyer has `comprador-order-bump` tag, include specific block about the Kit de Automatizacion; if not, include generic soft mention
- **Email 6:** If buyer has `comprador-upsell-sistema` tag, send alternative version (advanced tips + onboarding); if not, send upsell pitch
- **Email 7:** If buyer has `comprador-upsell-sistema` tag, send alternative wrap-up version; if not, send final upsell with urgency deadline

### AC-5: Automation flow integrity
- Purchase of pack triggers sequence entry and applies `comprador-prompt-pack` + `secuencia-nurture-activa`
- Removes `no-comprador` and `secuencia-nb-activa` tags if they existed (from abandoned cart sequence)
- If buyer purchases upsell mid-sequence, tags update immediately and subsequent conditional emails adapt
- Send time optimized for 09:00-10:00h Spain time for maximum open rates

### AC-6: RGPD compliance for all emails
- Every email includes functional unsubscribe link
- Physical business address in email footer
- Explicit consent checkbox captured during Systeme.io checkout
- Footer text: "Has recibido este email porque compraste el Pack de 275+ Prompts IA para Marketing y Negocios. Si deseas dejar de recibir estos correos, puedes [darte de baja aqui]."

---

## Technical Details

### Platform Configuration
- **Platform:** Systeme.io (Startup Plan)
- **Automation type:** Workflow triggered by purchase event
- **Email sender:** Configured brand name + verified sender email
- **SMTP:** Default Systeme.io or custom SMTP (Mailgun/SendGrid) for better deliverability

### Automation Flow (from data/email-sequences/7-email-nurture-sequence.md)
```
[TRIGGER: Purchase completed -- Product "Pack de Prompts"]
    |
    +-- Apply tags: comprador-prompt-pack, secuencia-nurture-activa
    +-- Remove tags: no-comprador, secuencia-nb-activa (if exist)
    |
    +-- [IMMEDIATE] Email 1: Bienvenida y Entrega (tag: dia-0)
    +-- [WAIT 1 DAY] Email 2: Primeros Pasos (tag: dia-1)
    +-- [WAIT 2 DAYS] Email 3: Caso de Uso (tag: dia-3) -- conditional on bump
    +-- [WAIT 2 DAYS] Email 4: Errores Comunes (tag: dia-5)
    +-- [WAIT 2 DAYS] Email 5: Valor + Social Proof (tag: dia-7)
    +-- [WAIT 3 DAYS] Email 6: Upsell or Alt (tag: dia-10) -- conditional on upsell
    +-- [WAIT 4 DAYS] Email 7: Cierre (tag: dia-14) -- conditional on upsell
    |
    +-- Apply: secuencia-nurture-completada
    +-- Remove: secuencia-nurture-activa
    +-- [END]
```

### Non-Buyer Recovery Sequence (secondary, also in Systeme.io)
- 5 emails over 10 days for visitors who did NOT purchase
- Trigger: `visita-pagina-ventas` tag + no `comprador-prompt-pack` after 24h
- Exits immediately if purchase happens mid-sequence
- Not built in Astro; documented here for funnel context

### How This Affects the Astro Site
1. **Thank-you page (`/gracias`):** Must set expectations about email delivery ("Revisa tu email en los proximos 5 minutos") -- aligns with Email 1 immediate send
2. **Analytics tracking:** Email sequence engagement (opens, clicks) tracked in Systeme.io, not GA4. However, clicks from emails to the Astro sales page should carry UTM parameters (`utm_source=email&utm_medium=automation&utm_campaign=nurture-dia-X`)
3. **Checkout integration:** Purchase event on Systeme.io triggers the automation. The Astro site's CTA redirects to Systeme.io checkout which handles all post-purchase automation
4. **Upsell page links in emails:** Emails 6 and 7 link to Systeme.io upsell pages, not Astro pages

---

## Edge Cases

| Scenario | Expected Behavior |
|---|---|
| Buyer purchases upsell on Day 2 (before Email 6) | `comprador-upsell-sistema` tag applied immediately; Emails 6 and 7 detect tag and send alternative versions |
| Buyer unsubscribes mid-sequence | Systeme.io respects unsubscribe; remaining emails not sent; `secuencia-nurture-activa` remains (no completion tag) |
| Email bounces (invalid email) | Systeme.io handles bounce; contact flagged; sequence paused for that contact |
| Buyer was previously a non-buyer who completed the NB recovery sequence | On purchase, NB tags removed, nurture sequence starts fresh from Email 1 |
| Buyer purchases pack + bump + upsell all at once | All three product tags applied; Email 3 shows bump content; Emails 6-7 show upsell-owner alternative content |
| Email lands in spam | Not controllable from Astro; mitigated by Systeme.io deliverability setup, custom SMTP, and thank-you page instruction to check spam folder |
| Duplicate purchase (e.g., browser back button, retry) | Systeme.io deduplicates; buyer should not receive duplicate sequence |

---

## Dependencies

- **checkout-integration.md** -- Systeme.io purchase event triggers the sequence; tag application on purchase
- **product-delivery.md** -- Thank-you page sets expectations for Email 1 delivery timing
