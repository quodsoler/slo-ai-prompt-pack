# Systeme.io Setup Checklist -- SLO AI Prompt Pack Funnel

> **Funnel:** Pack de 200+ Prompts de IA para Negocios
> **Platform:** Systeme.io (Startup Plan, $27/mo)
> **Market:** Spain | **Language:** Spanish | **Currency:** EUR

---

## Phase 1: Account & Configuration

### 1.1 Account Setup
- [ ] Create Systeme.io account at https://systeme.io
  - Plan: **Startup ($27/mo)** -- includes funnels, email campaigns, automation rules, custom domains
  - Use business email for the account
- [ ] Verify email address and complete onboarding

### 1.2 Domain Configuration
- [ ] Purchase or designate subdomain (e.g., `prompts.tudominio.com` or `ofertas.tudominio.com`)
- [ ] In Systeme.io: Settings > Custom Domains > Add domain
- [ ] Add CNAME record in DNS: point subdomain to `ssl.systeme.io`
- [ ] Wait for DNS propagation (up to 48 hours, usually 1-4 hours)
- [ ] Verify SSL certificate is active (green padlock)
- [ ] Set custom domain as default for funnels

### 1.3 Payment Configuration
- [ ] Go to Settings > Payment Gateways
- [ ] Connect **Stripe** account
  - Ensure Stripe is configured for EUR currency
  - Verify Stripe is activated for Spain/EU
  - Enable relevant payment methods (card, SEPA if desired)
- [ ] Set default currency to **EUR**
- [ ] Configure tax settings if applicable (IVA for Spain = 21%)
  - Note: Consult an accountant for digital product tax obligations in Spain
- [ ] Run a test payment through Stripe (use Stripe test mode first)

### 1.4 Language & Localization
- [ ] Set default language to **Spanish (Espanol)**
- [ ] Go to Settings > General and verify:
  - Timezone: Europe/Madrid (CET/CEST)
  - Date format: DD/MM/YYYY
  - Currency display: EUR

### 1.5 GDPR & Legal Compliance
- [ ] Go to Settings > General > GDPR
- [ ] Enable cookie consent banner
  - Customize text in Spanish:
    > "Este sitio web utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra politica de cookies."
- [ ] Create Privacy Policy page (Politica de Privacidad)
  - Include: data controller info, data collected, purpose, legal basis, retention, rights (RGPD)
  - Link to it from all funnel pages
- [ ] Create Terms of Service page (Terminos y Condiciones)
  - Include: digital product delivery, refund policy, payment terms
- [ ] Add legal checkbox on checkout: "He leido y acepto los Terminos y Condiciones y la Politica de Privacidad"
- [ ] Add cookie consent to all funnel pages

### 1.6 Email Configuration
- [ ] Go to Settings > SMTP / Email
- [ ] Set sender name: (your brand name or personal name)
- [ ] Set sender email: (e.g., `hola@tudominio.com`)
- [ ] Verify sender email (click confirmation link)
- [ ] Optional: Configure custom SMTP (Mailgun, SendGrid) for better deliverability
- [ ] Send test email to verify delivery
- [ ] Check that emails do not land in spam (test with Gmail, Outlook, Yahoo)

---

## Phase 2: Products

### 2.1 Product 1: Pack de 200+ Prompts de IA (Front-End)
- [ ] Go to Products > Create a new product
- [ ] Product name: **Pack de 200+ Prompts de IA para Negocios**
- [ ] Product type: **Digital download / Online course**
- [ ] Price: **EUR 27.00** (one-time payment)
- [ ] Upload deliverables:
  - [ ] Notion workspace link (include in thank-you page and delivery email)
  - [ ] PDF companion file(s) with prompt categories and usage guides
  - [ ] Any bonus files (cheat sheets, quick-start guide)
- [ ] Set access method: Immediate delivery after purchase
- [ ] Write product description (internal reference)
- [ ] Configure payment options:
  - One-time payment: EUR 27.00
  - No recurring billing
  - No free trial

### 2.2 Product 2: Mega Pack Automatizacion (Order Bump)
- [ ] Create new product
- [ ] Product name: **Mega Pack de Automatizacion con IA**
- [ ] Price: **EUR 17.00** (one-time payment)
- [ ] Upload deliverables:
  - [ ] Automation templates pack
  - [ ] PDF guide for automation setup
- [ ] Set access method: Immediate delivery after purchase
- [ ] Note: This will be configured as an order bump on the checkout page (Phase 3)

### 2.3 Product 3: Sistema Completo (Upsell)
- [ ] Create new product
- [ ] Product name: **Sistema Completo de IA para Negocios**
- [ ] Price: **EUR 67.00** (one-time payment)
- [ ] Upload deliverables:
  - [ ] Full system access (Notion workspace, expanded)
  - [ ] Video tutorials or detailed PDF guides
  - [ ] Templates, workflows, advanced prompts
- [ ] Set access method: Immediate delivery after purchase

### 2.4 Product 4: Mini Sistema (Downsell)
- [ ] Create new product
- [ ] Product name: **Mini Sistema de IA para Negocios**
- [ ] Price: **EUR 27.00** (one-time payment)
- [ ] Upload deliverables:
  - [ ] Subset of Sistema Completo
  - [ ] Core templates and guides only
- [ ] Set access method: Immediate delivery after purchase

### 2.5 Product Verification
- [ ] All 4 products created and visible in Products dashboard
- [ ] All prices set correctly in EUR
- [ ] All deliverable files uploaded and accessible
- [ ] Product names are clear and consistent

---

## Phase 3: Funnel Build

### Funnel Flow Overview

```
[Google Ad] --> [1. Landing/Sales Page] --> [2. Two-Step Checkout + Order Bump]
                                                    |
                                              (Purchase)
                                                    |
                                           [3. Upsell Page]
                                            /              \
                                      (Yes: Buy)      (No: Decline)
                                          |                  |
                                  [5. Thank You]    [4. Downsell Page]
                                                     /              \
                                               (Yes: Buy)      (No: Decline)
                                                   |                  |
                                           [5. Thank You]    [5. Thank You]
```

### 3.0 Create Funnel
- [ ] Go to Funnels > Create a new funnel
- [ ] Funnel name: **SLO - Pack Prompts IA**
- [ ] Select "Sell" or "Custom" funnel type
- [ ] Set custom domain for this funnel

---

### 3.1 Page 1: Landing / Sales Page

**Page type:** Sales page

**Key elements to include:**
- [ ] **Headline:** Compelling benefit-driven headline in Spanish
  - Example: "200+ Prompts de IA Listos para Usar que Transformaran tu Negocio"
- [ ] **Sub-headline:** Specificity and urgency
- [ ] **Hero section:** Problem-agitation-solution framework
- [ ] **Social proof:** Testimonials, number of users, results
- [ ] **Product showcase:** What is included in the pack (visual list)
- [ ] **Benefit bullets:** 5-7 key benefits with icons
- [ ] **Objection handling:** FAQ section (5-8 questions)
- [ ] **Guarantee:** Satisfaction guarantee or risk reversal statement
- [ ] **Price anchor:** Show value vs. price (e.g., "Valor real: EUR 297 -> Hoy solo EUR 27")
- [ ] **CTA button:** Clear, action-oriented ("Quiero Mis 200+ Prompts Ahora" or "Acceder al Pack por Solo EUR 27")
- [ ] **Scarcity/urgency:** Limited-time price, countdown timer (if applicable)
- [ ] **Footer:** Privacy policy link, terms link, contact info

**Configuration:**
- [ ] Set page URL path (e.g., `/pack-prompts-ia`)
- [ ] Set SEO title and meta description in Spanish
- [ ] Configure Open Graph tags (for social sharing)
- [ ] Set favicon
- [ ] Enable mobile responsiveness (check preview)
- [ ] CTA button links to next step (checkout page)
- [ ] Remove Systeme.io branding (available on Startup plan)

**Testing:**
- [ ] Page loads in under 3 seconds
- [ ] All images load correctly
- [ ] CTA button works and goes to checkout
- [ ] Page looks correct on mobile (iPhone, Android)
- [ ] Page looks correct on desktop (Chrome, Firefox, Safari)
- [ ] All Spanish copy is grammatically correct
- [ ] No placeholder text remaining

---

### 3.2 Page 2: Two-Step Checkout Page (with Order Bump)

**Page type:** Checkout / Order form

**Key elements to include:**
- [ ] **Step 1 - Contact info:**
  - Name field
  - Email field
  - "Continuar" button to Step 2
- [ ] **Step 2 - Payment info:**
  - Credit card fields (via Stripe)
  - Order summary showing Pack de Prompts -- EUR 27
- [ ] **Order bump checkbox:**
  - Position: Between order summary and payment button
  - Checkbox label: "Si, anadir el Mega Pack de Automatizacion por solo EUR 17"
  - Short description: 2-3 lines explaining the bump value
  - Visual: Highlighted box with border/background color (yellow or light blue)
  - Product: Mega Pack Automatizacion (EUR 17)
- [ ] **Trust elements:**
  - Secure payment icons (SSL, Stripe badge)
  - Guarantee reminder
  - "Pago 100% seguro" text
- [ ] **Order summary:** Dynamic total (updates when bump is checked)
- [ ] **Legal checkbox:** Terms and privacy policy acceptance
- [ ] **Purchase button:** "Completar Mi Pedido" or "Pagar Ahora -- EUR 27" (updates with bump)

**Configuration:**
- [ ] Set page URL path (e.g., `/checkout`)
- [ ] Connect to Product 1 (Pack de 200+ Prompts, EUR 27)
- [ ] Configure order bump:
  - In funnel step settings > Order bump
  - Select Product 2 (Mega Pack Automatizacion, EUR 17)
  - Write bump headline and description in Spanish
  - Enable the bump checkbox
- [ ] Set "after purchase" redirect to Upsell Page (Page 3)
- [ ] Ensure Stripe integration is active on this page
- [ ] Remove navigation/header to prevent abandonment

**Testing:**
- [ ] Two-step form works (Step 1 -> Step 2 transition)
- [ ] Order bump checkbox appears correctly
- [ ] Checking bump updates total price (EUR 27 -> EUR 44)
- [ ] Unchecking bump reverts to EUR 27
- [ ] Payment processes correctly in test mode
- [ ] Email and name are captured correctly
- [ ] After purchase, redirects to upsell page
- [ ] Mobile checkout works smoothly

---

### 3.3 Page 3: Upsell Page

**Page type:** Upsell / One-click upsell

**Key elements to include:**
- [ ] **Headline:** "Espera! Tu Pedido No Esta Completo..."
- [ ] **Sub-headline:** Introduce the Sistema Completo offer
- [ ] **Video or long-form copy:** Explain the upsell value
- [ ] **What is included:** Detailed list of Sistema Completo contents
- [ ] **Price presentation:** "Accede al Sistema Completo por solo EUR 67"
- [ ] **Value stack:** Show everything included and individual values
- [ ] **CTA button (Yes):** "Si, Quiero el Sistema Completo por EUR 67"
  - One-click purchase (no re-entering payment info)
- [ ] **Decline link (No):** "No gracias, solo quiero el pack de prompts"
  - Smaller text, positioned below the CTA button
  - Links to Downsell Page (Page 4)
- [ ] **Guarantee:** Same guarantee as front-end, applied to upsell
- [ ] **No navigation bar** -- only yes/no options

**Configuration:**
- [ ] Set page URL path (e.g., `/oferta-especial`)
- [ ] Connect to Product 3 (Sistema Completo, EUR 67)
- [ ] Enable **one-click upsell** (customer already entered payment on checkout)
- [ ] Set "Yes" button action: Purchase Product 3 and redirect to Thank You page
- [ ] Set "No" button/link action: Redirect to Downsell Page (Page 4)
- [ ] Timer/urgency element (optional): "Esta oferta solo esta disponible ahora"

**Testing:**
- [ ] Page loads immediately after checkout purchase
- [ ] "Yes" button charges EUR 67 without re-entering payment
- [ ] After "Yes," redirects to Thank You page
- [ ] "No" link redirects to Downsell page
- [ ] No way to navigate away except Yes or No
- [ ] Mobile layout is clean and buttons are easily tappable

---

### 3.4 Page 4: Downsell Page

**Page type:** Downsell (shown only if upsell is declined)

**Key elements to include:**
- [ ] **Headline:** "Entiendo. El sistema completo no es para todos..."
- [ ] **Sub-headline:** Introduce the Mini Sistema as a lighter alternative
- [ ] **Explanation:** Why the Mini Sistema is still valuable
- [ ] **What is included:** Subset of Sistema Completo features
- [ ] **Price presentation:** "Solo EUR 27 -- el mismo precio que tu pack de prompts"
- [ ] **CTA button (Yes):** "Si, Anadir el Mini Sistema por EUR 27"
  - One-click purchase
- [ ] **Decline link (No):** "No, gracias. Solo quiero mi pack de prompts."
  - Links to Thank You page
- [ ] **No navigation bar**

**Configuration:**
- [ ] Set page URL path (e.g., `/ultima-oportunidad`)
- [ ] Connect to Product 4 (Mini Sistema, EUR 27)
- [ ] Enable **one-click purchase**
- [ ] Set "Yes" button action: Purchase Product 4 and redirect to Thank You page
- [ ] Set "No" button/link action: Redirect to Thank You page
- [ ] This page should ONLY appear after declining the upsell

**Testing:**
- [ ] Page loads only after declining upsell (not directly accessible)
- [ ] "Yes" button charges EUR 27 without re-entering payment
- [ ] After "Yes," redirects to Thank You page
- [ ] "No" link redirects to Thank You page
- [ ] Product is correctly added to the customer's purchases

---

### 3.5 Page 5: Thank You Page

**Page type:** Thank you / Confirmation

**Key elements to include:**
- [ ] **Headline:** "Felicidades! Tu compra se ha completado con exito"
- [ ] **Order confirmation:** Summary of what was purchased
- [ ] **Access instructions:**
  - Link to Notion workspace
  - Download links for PDF files
  - Instructions for accessing products
- [ ] **What happens next:**
  - "Revisa tu email para el recibo y acceso completo"
  - "En los proximos minutos recibiras un email con todos los detalles"
- [ ] **Support info:** Contact email for questions
- [ ] **Social sharing:** Optional buttons to share on social media
- [ ] **Bonus:** Any surprise bonus to delight the customer

**Configuration:**
- [ ] Set page URL path (e.g., `/gracias`)
- [ ] Include product access links/buttons for all purchased products
- [ ] Ensure this page dynamically shows relevant content based on purchases
  - Alternative: Create one universal thank-you page with links to all products
- [ ] Add Google Ads conversion tracking pixel/tag on this page (critical)
- [ ] Add GA4 purchase event tracking on this page

**Testing:**
- [ ] Page displays correctly after completing any purchase path
- [ ] All product access links work
- [ ] Notion link opens correctly
- [ ] PDF downloads function
- [ ] Conversion tracking fires (check Google Ads and GA4)
- [ ] Email receipt is sent automatically

---

## Phase 4: Email Automation

### 4.1 Delivery Emails (Immediate)

- [ ] **Email 1: Purchase Confirmation + Product Delivery**
  - Trigger: Immediately after front-end purchase
  - Subject: "Tu Pack de 200+ Prompts de IA esta listo"
  - Content:
    - Thank the customer
    - Provide Notion workspace link
    - Attach or link PDF files
    - Quick-start instructions (3 steps to get value immediately)
    - Support contact info
  - Tag customer: `comprador-pack-prompts`

- [ ] **Email 2: Order Bump Delivery** (conditional)
  - Trigger: Immediately after bump purchase
  - Subject: "Tu Mega Pack de Automatizacion esta listo"
  - Content: Access links for bump product
  - Tag customer: `comprador-bump`

- [ ] **Email 3: Upsell Delivery** (conditional)
  - Trigger: Immediately after upsell purchase
  - Subject: "Acceso a tu Sistema Completo de IA"
  - Content: Access links for upsell product
  - Tag customer: `comprador-upsell`

- [ ] **Email 4: Downsell Delivery** (conditional)
  - Trigger: Immediately after downsell purchase
  - Subject: "Acceso a tu Mini Sistema de IA"
  - Content: Access links for downsell product
  - Tag customer: `comprador-downsell`

### 4.2 Post-Purchase Email Sequence (7 Emails)

- [ ] **Email 1 (Day 1): Bienvenida + Quick Win**
  - Subject: "Por donde empezar con tus 200+ prompts"
  - Content: Guide them to their first prompt, one quick win they can get today
  - Goal: Ensure they open and use the product

- [ ] **Email 2 (Day 2): Caso de uso especifico**
  - Subject: "Usa este prompt para [specific result] en 5 minutos"
  - Content: Walk through one specific prompt with a real example
  - Goal: Demonstrate value, build habit

- [ ] **Email 3 (Day 4): Social proof + tip**
  - Subject: "Lo que otros usuarios estan logrando con estos prompts"
  - Content: Share results/testimonials, provide an advanced tip
  - Goal: Reinforce purchase decision

- [ ] **Email 4 (Day 6): Common mistake + solution**
  - Subject: "El error #1 que cometen con ChatGPT (y como evitarlo)"
  - Content: Educational content that positions your expertise
  - Goal: Build trust and authority

- [ ] **Email 5 (Day 8): Upsell reminder** (only for non-upsell buyers)
  - Subject: "La oferta del Sistema Completo sigue disponible (por poco tiempo)"
  - Content: Remind them of the upsell offer, link to sales page
  - Condition: Only send to customers tagged `comprador-pack-prompts` but NOT `comprador-upsell`
  - Goal: Second chance upsell

- [ ] **Email 6 (Day 11): Advanced strategy**
  - Subject: "Estrategia avanzada: como encadenar prompts para resultados 10x"
  - Content: Teach a technique that makes the product more valuable
  - Goal: Increase product usage and satisfaction

- [ ] **Email 7 (Day 14): Feedback + future**
  - Subject: "Pregunta rapida sobre tu experiencia con los prompts"
  - Content: Ask for feedback, testimonial request, hint at future products
  - Goal: Gather testimonials, segment engaged users

### 4.3 Automation Rules

- [ ] **Rule 1:** On front-end purchase -> Send delivery email + Add tag `comprador-pack-prompts` + Start post-purchase sequence
- [ ] **Rule 2:** On bump purchase -> Send bump delivery email + Add tag `comprador-bump`
- [ ] **Rule 3:** On upsell purchase -> Send upsell delivery email + Add tag `comprador-upsell`
- [ ] **Rule 4:** On downsell purchase -> Send downsell delivery email + Add tag `comprador-downsell`
- [ ] **Rule 5:** Upsell reminder (Email 5) -> Only send if tag `comprador-upsell` is NOT present

### 4.4 Tags Summary

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `comprador-pack-prompts` | Front-end purchase | Identify buyers |
| `comprador-bump` | Bump purchase | Track bump buyers |
| `comprador-upsell` | Upsell purchase | Track upsell buyers, exclude from upsell reminder |
| `comprador-downsell` | Downsell purchase | Track downsell buyers |
| `lead-no-compra` | Entered email but did not purchase | Follow up with abandoned cart |

### 4.5 Email Verification
- [ ] All emails have correct sender name and email
- [ ] All emails render correctly on mobile and desktop
- [ ] All links in emails work (Notion, PDFs, etc.)
- [ ] Unsubscribe link present in all emails (required by law)
- [ ] Physical address included in email footer (CAN-SPAM / GDPR)
- [ ] Email sequence timing verified (Day 1, 2, 4, 6, 8, 11, 14)

---

## Phase 5: Tracking & Analytics

### 5.1 Google Analytics 4 (GA4)

- [ ] Create GA4 property (if not already existing)
- [ ] Get Measurement ID (G-XXXXXXXXXX)
- [ ] In Systeme.io: Settings > Tracking codes
- [ ] Add GA4 Global Site Tag to **header** of all funnel pages:
  ```html
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```
- [ ] Verify GA4 is receiving data (check Real-time report)
- [ ] Set up GA4 events:
  - `page_view` (automatic)
  - `begin_checkout` (when user reaches checkout page)
  - `purchase` (on thank you page -- include value and currency)

### 5.2 Google Ads Conversion Tracking

- [ ] In Google Ads: Tools > Conversions > New conversion action
- [ ] Create conversion: **Purchase**
  - Category: Purchase/Sale
  - Value: Use different values for each conversion (or use dynamic values)
  - Currency: EUR
  - Count: Every conversion
  - Attribution: Data-driven (or Last click)
- [ ] Get the conversion tracking tag (Global site tag + Event snippet)
- [ ] Add **Global site tag** to header of ALL funnel pages
- [ ] Add **Event snippet** to the Thank You page ONLY:
  ```html
  <!-- Event snippet for Purchase conversion -->
  <script>
    gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX',
      'value': 27.0,
      'currency': 'EUR',
      'transaction_id': ''
    });
  </script>
  ```
  - Note: For dynamic values, the value should reflect total purchase amount
  - If Systeme.io supports dynamic values in tracking code, use that feature
- [ ] Verify conversion tracking in Google Ads:
  - Go to Tools > Conversions > check status shows "Recording conversions"
  - Use Google Tag Assistant to verify tag fires on thank you page
- [ ] Optional: Set up additional conversion actions:
  - `Lead` (when someone enters email on checkout Step 1)
  - `PageView` (landing page view, for optimization)

### 5.3 UTM Parameters

- [ ] Define UTM structure for all traffic sources:
  ```
  ?utm_source=google
  &utm_medium=cpc
  &utm_campaign={campaign_name}
  &utm_content={ad_group}
  &utm_term={keyword}
  ```
- [ ] Configure Google Ads auto-tagging (gclid) -- enable in Google Ads settings
- [ ] Create UTM-tagged URLs for:
  - [ ] Google Ads campaigns (auto-tagged via gclid, but add UTMs as backup)
  - [ ] Email campaigns (utm_source=email&utm_medium=automation)
  - [ ] Social media posts (utm_source=instagram&utm_medium=organic)
  - [ ] Any other traffic sources
- [ ] Verify UTM parameters pass through the funnel correctly
- [ ] Check that UTM data appears in GA4 reports

### 5.4 End-to-End Tracking Verification

- [ ] Complete a full test purchase flow with tracking active
- [ ] Verify in GA4 Real-time: landing page view registered
- [ ] Verify in GA4 Real-time: checkout page view registered
- [ ] Verify in GA4 Real-time: purchase event fires on thank you page
- [ ] Verify in Google Ads: conversion appears (may take up to 24 hours)
- [ ] Check that Systeme.io dashboard shows the test sale
- [ ] Ensure no duplicate conversion tracking (one purchase = one conversion)

---

## Phase 6: Testing

### 6.1 Full Purchase Flow Test

- [ ] **Test 1: Front-end only (no bump, no upsell, no downsell)**
  1. Click ad (or simulate via direct URL)
  2. Land on sales page
  3. Click CTA
  4. Fill in checkout Step 1 (name, email)
  5. Fill in checkout Step 2 (test card: 4242 4242 4242 4242)
  6. Do NOT check order bump
  7. Complete purchase
  8. Decline upsell
  9. Decline downsell
  10. Arrive at Thank You page
  - [ ] Verify: Charged EUR 27 only
  - [ ] Verify: Delivery email received with product access
  - [ ] Verify: Thank you page shows correct info

- [ ] **Test 2: Front-end + Order Bump**
  1. Repeat flow but CHECK the order bump
  - [ ] Verify: Charged EUR 44 (27 + 17)
  - [ ] Verify: Both delivery emails received
  - [ ] Verify: Both products accessible

- [ ] **Test 3: Front-end + Upsell**
  1. Complete front-end purchase
  2. Accept upsell (EUR 67)
  - [ ] Verify: Charged EUR 27 + EUR 67 = EUR 94
  - [ ] Verify: Upsell delivery email received
  - [ ] Verify: Redirected to Thank You page (skipping downsell)

- [ ] **Test 4: Front-end + Downsell (upsell declined)**
  1. Complete front-end purchase
  2. Decline upsell
  3. Accept downsell (EUR 27)
  - [ ] Verify: Charged EUR 27 + EUR 27 = EUR 54
  - [ ] Verify: Downsell delivery email received

- [ ] **Test 5: Full stack (Front-end + Bump + Upsell)**
  1. Complete front-end + bump
  2. Accept upsell
  - [ ] Verify: Total charged EUR 111 (27 + 17 + 67)
  - [ ] Verify: All three delivery emails received
  - [ ] Verify: All products accessible

### 6.2 Order Bump Testing

- [ ] Bump checkbox appears on checkout page
- [ ] Bump description is clear and compelling
- [ ] Checking bump updates order total in real-time
- [ ] Unchecking bump reverts order total
- [ ] Bump product is correctly delivered after purchase
- [ ] Bump works on mobile (checkbox tappable, text readable)

### 6.3 Upsell/Downsell Testing

- [ ] Upsell page loads immediately after checkout (no delay)
- [ ] "Yes" button charges correctly via one-click
- [ ] "No" link is visible and works
- [ ] Downsell page loads only after declining upsell
- [ ] Downsell "Yes" charges correctly
- [ ] Downsell "No" goes to thank you page
- [ ] Customer cannot navigate back to upsell/downsell pages

### 6.4 Email Delivery Testing

- [ ] Delivery email arrives within 5 minutes of purchase
- [ ] Email subject line renders correctly (no encoding issues with Spanish characters)
- [ ] All links in delivery email work
- [ ] Notion workspace link opens correctly
- [ ] PDF files download successfully
- [ ] Post-purchase sequence starts on schedule
- [ ] Emails render correctly on:
  - [ ] Gmail (web)
  - [ ] Gmail (mobile app)
  - [ ] Outlook
  - [ ] Apple Mail
- [ ] Unsubscribe link works

### 6.5 Product Access Testing

- [ ] Notion workspace accessible via shared link
- [ ] PDF files open correctly
- [ ] All content is present and formatted properly
- [ ] Bonus materials (if any) are accessible
- [ ] Each product tier delivers only its designated content

### 6.6 Mobile Responsiveness

- [ ] Sales page: All sections readable, images scale, CTA visible
- [ ] Checkout page: Form fields usable, bump checkbox tappable
- [ ] Upsell page: Buttons large enough, text readable
- [ ] Downsell page: Same as upsell
- [ ] Thank you page: Links tappable, content readable
- [ ] Test on:
  - [ ] iPhone (Safari)
  - [ ] iPhone (Chrome)
  - [ ] Android (Chrome)
  - [ ] iPad/Tablet

### 6.7 Spanish Copy Verification

- [ ] Sales page: All copy in Spanish, no English remnants
- [ ] Checkout page: Labels, buttons, bump text in Spanish
- [ ] Upsell page: Headline, copy, buttons in Spanish
- [ ] Downsell page: Same
- [ ] Thank you page: Same
- [ ] All emails: Subject lines and body in Spanish
- [ ] Error messages: Verify Systeme.io error messages display in Spanish
- [ ] Special characters render correctly (n with tilde, accents, inverted punctuation)

### 6.8 Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Check: page loading, forms, checkout, tracking codes fire

---

## Phase 7: Launch

### 7.1 Pre-Launch Final Checks

- [ ] All test transactions refunded/deleted from Stripe
- [ ] Test tags removed from email list (or test contacts deleted)
- [ ] All funnel pages using custom domain (not systeme.io default URL)
- [ ] Stripe switched from test mode to **live mode**
- [ ] All tracking codes point to production (not test/debug)
- [ ] Systeme.io funnel is set to **published/active**
- [ ] Email automation rules are **active**
- [ ] All product access links verified one final time
- [ ] Landing page URL ready for Google Ads

### 7.2 Google Ads Campaign Launch

- [ ] Campaign created and configured:
  - Campaign type: Search
  - Target location: Spain
  - Language: Spanish
  - Budget: EUR 20/day (test phase)
  - Bid strategy: Maximize conversions (or Manual CPC initially)
- [ ] Ad groups set up with targeted keywords
- [ ] Ad copy written and approved (all variations)
- [ ] Ad extensions configured (sitelinks, callouts, structured snippets)
- [ ] Final destination URL = funnel landing page with UTM parameters
- [ ] Conversion tracking verified one more time
- [ ] **Launch campaign** -- set to active

### 7.3 First 2 Hours Monitoring

- [ ] Check Google Ads: Ads showing, impressions coming in
- [ ] Check Google Ads: No disapproved ads
- [ ] Check GA4 Real-time: Visitors arriving on landing page
- [ ] Check Systeme.io: Page view counts increasing
- [ ] Monitor for first click-through to checkout
- [ ] If first sale comes in:
  - [ ] Verify payment received in Stripe
  - [ ] Verify delivery email sent
  - [ ] Verify conversion tracked in Google Ads
  - [ ] Verify sale recorded in Systeme.io
- [ ] No errors or broken pages reported

### 7.4 First Conversion Tracking Verification

- [ ] First real sale conversion appears in Google Ads (may take 1-3 hours)
- [ ] Conversion value is correct (EUR amount)
- [ ] GA4 shows purchase event
- [ ] Systeme.io dashboard matches Stripe transaction
- [ ] Customer received delivery email
- [ ] Customer can access the product

### 7.5 Day 1 End-of-Day Review

- [ ] Fill in first row of daily tracking template
- [ ] Calculate all KPIs
- [ ] Compare against benchmark targets
- [ ] Note any issues or observations
- [ ] Plan adjustments for Day 2 (if any)
- [ ] No action unless KILL criteria triggered (let data accumulate)

---

## Quick Reference: Key URLs

| Item | URL |
|------|-----|
| Systeme.io Dashboard | https://systeme.io/dashboard |
| Funnel Landing Page | `https://[yourdomain]/pack-prompts-ia` |
| Checkout Page | `https://[yourdomain]/checkout` |
| Upsell Page | `https://[yourdomain]/oferta-especial` |
| Downsell Page | `https://[yourdomain]/ultima-oportunidad` |
| Thank You Page | `https://[yourdomain]/gracias` |
| Google Ads | https://ads.google.com |
| GA4 | https://analytics.google.com |
| Stripe Dashboard | https://dashboard.stripe.com |

---

## Quick Reference: Product & Pricing

| Product | Type | Price (EUR) | Systeme.io Product ID |
|---------|------|-------------|----------------------|
| Pack de 200+ Prompts de IA | Front-end | 27.00 | __________ |
| Mega Pack Automatizacion | Order Bump | 17.00 | __________ |
| Sistema Completo de IA | Upsell | 67.00 | __________ |
| Mini Sistema de IA | Downsell | 27.00 | __________ |

---

## Quick Reference: Tags

| Tag | Trigger |
|-----|---------|
| `comprador-pack-prompts` | Front-end purchase |
| `comprador-bump` | Bump purchase |
| `comprador-upsell` | Upsell purchase |
| `comprador-downsell` | Downsell purchase |
| `lead-no-compra` | Email captured, no purchase |

---

*Checklist version 1.0 -- SLO AI Prompt Pack Funnel on Systeme.io*
