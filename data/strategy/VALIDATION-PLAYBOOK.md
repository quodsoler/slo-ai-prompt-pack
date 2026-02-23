# SLO Spain Strategy: Validation Playbook

## Purpose

This document provides the exact step-by-step process to validate each product before investing significant time or money. The goal is to spend no more than 100 EUR and 1 week to determine whether a product has sufficient demand to justify a full build.

---

## Phase 1: Google Keyword Planner Validation

### Objective
Confirm that enough people in Spain are actively searching for the problem your product solves. Minimum threshold: 5,000 combined monthly searches across your keyword cluster.

### Step-by-Step Process

**Step 1: Access Google Keyword Planner**
1. Log into Google Ads (ads.google.com)
2. Click Tools & Settings (wrench icon) in top navigation
3. Under "Planning," click "Keyword Planner"
4. Select "Discover new keywords"

**Step 2: Enter Seed Keywords**

Copy-paste these keyword lists directly into the Keyword Planner for each product:

**Kit Fiscal del Autonomo - Seed Keywords:**
```
deducciones autonomos
gastos deducibles autonomos
calendario fiscal autonomos
obligaciones fiscales autonomos
modelo 303 autonomos
modelo 130 autonomos
cuota autonomos
impuestos autonomos
declaracion renta autonomos
IVA autonomos
IRPF autonomos
facturacion autonomos
VERIFACTU
factura electronica obligatoria
gastos coche autonomos
gastos deducibles trabajo casa
amortizacion autonomos
retenciones autonomos
seguridad social autonomos
alta autonomo
```

**Kit Oposiciones Planner - Seed Keywords:**
```
como estudiar oposiciones
plan de estudio oposiciones
tecnicas estudio oposiciones
temario oposiciones
planificacion oposiciones
oposiciones administrativo
oposiciones educacion
oposiciones sanidad
oposiciones justicia
oposiciones policia nacional
oposiciones guardia civil
oposiciones correos
metodo estudio oposiciones
organizacion estudio oposiciones
horario estudio oposiciones
apps oposiciones
repasar temario oposiciones
memorizar temario
oposiciones faciles
preparar oposiciones trabajando
```

**IA Prompts Profesionales - Seed Keywords:**
```
prompts ChatGPT
prompts inteligencia artificial
como usar ChatGPT
ChatGPT para trabajo
prompts para marketing
prompts para escribir
ChatGPT espanol
mejores prompts ChatGPT
plantillas ChatGPT
ChatGPT para empresas
IA para negocios
herramientas IA trabajo
automatizar con IA
ChatGPT trucos
prompts para profesores
prompts para abogados
prompts para contables
prompt engineering espanol
IA productividad
ChatGPT profesional
```

**Calculadora Inmobiliaria - Seed Keywords:**
```
gastos compra vivienda
calculadora hipoteca
gastos notaria compra piso
ITP compra vivienda
gastos compra casa espana
calculadora gastos compra vivienda
impuestos compra vivienda
gastos escritura piso
registro propiedad coste
gestoria compra vivienda
simulador hipoteca
cuanto cuesta comprar un piso
gastos compraventa
plusvalia compra vivienda
AJD compra vivienda
IVA vivienda nueva
costes compra vivienda segunda mano
gastos hipoteca
comision inmobiliaria
comprar primera vivienda
```

**Marketing Pymes Kit - Seed Keywords:**
```
marketing para pymes
marketing digital pequenas empresas
plan marketing pequena empresa
redes sociales para negocios
como hacer marketing mi negocio
publicidad para pymes
marketing local
Google My Business optimizar
SEO local
marketing bajo presupuesto
calendario redes sociales
plantillas marketing
email marketing pymes
marketing contenidos pymes
estrategia redes sociales negocio
publicidad Google pymes
Facebook ads pymes
Instagram para negocios
marketing restaurantes
marketing peluquerias
```

**Step 3: Configure Keyword Planner Settings**
1. Location: Spain
2. Language: Spanish
3. Time range: Last 12 months
4. Google and search partners (default)

**Step 4: Analyze Results**

Record the following for each product:

| Metric | Minimum Threshold | Ideal |
|--------|-------------------|-------|
| Total monthly searches (all keywords) | 5,000 | 20,000+ |
| Number of keywords with 100+ monthly searches | 10 | 30+ |
| Average suggested CPC | Below projected CPC | 50% of projected CPC |
| Competition level | Low to Medium | Low |
| Seasonal trends | No single-month concentration | Relatively flat |

**Step 5: Record Results in Validation Scorecard**

Create a Google Sheet with these columns:
- Keyword
- Monthly searches
- Competition (Low/Medium/High)
- Suggested bid (low range)
- Suggested bid (high range)
- Relevance to product (1-5 scale)
- Intent level (informational/commercial/transactional)

**Decision Gate:**
- GREEN (proceed to Phase 2): 5,000+ monthly searches, 10+ relevant keywords, CPC within budget
- YELLOW (proceed with caution): 3,000-5,000 monthly searches, CPC within budget
- RED (do not proceed): Below 3,000 monthly searches OR average CPC more than 2x projection

---

## Phase 2: 100 EUR Smoke Test

### Objective
Determine if real people will click on your ad AND take an action on your landing page. Budget: exactly 100 EUR per product. Duration: 5-7 days.

### Step 1: Build a Minimal Landing Page (2-4 hours)

You do not need a product yet. Build a single page with:

**Above the fold:**
- Headline addressing the core pain point
- 3-4 bullet points of what the product includes
- Price displayed (use intended front-end price)
- CTA button: "Quiero Mi [Product Name]" or "Descargar Ahora"

**Below the fold:**
- 5-6 benefit statements with icons
- Simple FAQ (3-4 questions)
- Second CTA button

**What happens when they click CTA:**
- Option A (recommended): Redirect to a "coming soon" page that says "Estamos ultimando los detalles. Deja tu email y te avisamos cuando este listo (con un descuento especial de lanzamiento)." with an email capture form.
- Option B: Redirect to a Stripe checkout page with the actual product (if you already have the MVP built).

**Technical setup:**
- Use an Astro template or even a simple HTML page
- Deploy to Vercel (free)
- Point domain or use Vercel subdomain
- Add Google Analytics 4
- Add Google Ads conversion tracking (track both page views and email submissions/purchases)

### Step 2: Create Google Ads Campaign

**Campaign settings:**
- Campaign type: Search
- Goal: Leads or Sales
- Location: Spain only
- Language: Spanish
- Budget: 15 EUR/day (will spend roughly 100 EUR over 7 days)
- Bid strategy: Manual CPC (start with manual to control costs)
- Ad schedule: All day (adjust after data)

**Ad group structure (2 ad groups per campaign):**

Ad Group 1: High-intent keywords (8-12 keywords)
- Use [exact match] for all keywords
- Focus on keywords with commercial/transactional intent
- Example for Kit Fiscal: [deducciones autonomos], [gastos deducibles autonomos], [calendario fiscal autonomos]

Ad Group 2: Problem-aware keywords (8-12 keywords)
- Use "phrase match" for broader capture
- Focus on keywords describing the problem
- Example for Kit Fiscal: "impuestos autonomos", "obligaciones fiscales autonomos"

**Ad copy (3 responsive search ads per ad group):**

Headlines (15 headlines, Google will test combinations):
1. {Product Name} - Descarga Inmediata
2. Ahorra Tiempo y Dinero
3. Todo Lo Que Necesitas en Un Kit
4. Mas de [X] Personas Ya Lo Usan
5. Precio de Lanzamiento: {Price} EUR
6. Descarga Tu {Product} Ahora
7. Resuelve {Core Problem} Hoy
8. Plantillas + Guias + Herramientas
9. Actualizado Para 2026
10. No Pierdas Mas Tiempo Buscando
11. Kit Completo en PDF + Excel
12. Listo Para Usar en 5 Minutos
13. {Specific Benefit 1}
14. {Specific Benefit 2}
15. Solo {Price} EUR - Oferta Limitada

Descriptions (4 descriptions):
1. Descarga ahora tu {product} con todo lo que necesitas para {solve problem}. Plantillas, guias y herramientas listas para usar.
2. Deja de perder horas buscando informacion. Nuestro kit incluye {component 1}, {component 2} y {component 3}. Descarga inmediata.
3. Mas de {X} {target audience} ya usan nuestro {product}. Precio especial de lanzamiento por tiempo limitado.
4. Kit completo actualizado para 2026. Incluye {main components}. Descarga en PDF y Excel. Garantia de satisfaccion.

**Negative keywords (add from day 1):**
```
gratis
free
descargar gratis
pdf gratis
torrent
curso gratis
youtube
wikipedia
que es
definicion
```

### Step 3: Monitor Daily (5 minutes/day)

Track these metrics every day in a Google Sheet:

| Day | Spend | Impressions | Clicks | CTR | Avg CPC | Page Views | Email Signups / Purchases | Conv Rate |
|-----|-------|-------------|--------|-----|---------|------------|--------------------------|-----------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| ... | | | | | | | | |
| 7 | | | | | | | | |

### Step 4: Analyze Results After 100 EUR Spent

**Metrics to evaluate:**

| Metric | Red Flag | Acceptable | Strong Signal |
|--------|----------|------------|---------------|
| CTR (click-through rate) | Below 2% | 2-5% | Above 5% |
| Actual CPC | 2x+ projected | Within 30% of projected | Below projected |
| Landing page bounce rate | Above 80% | 60-80% | Below 60% |
| Landing page conversion (email/purchase) | Below 1% | 1-3% | Above 3% |
| Total conversions (emails or sales) | 0-2 | 3-5 | 6+ |
| Cost per conversion | 3x+ front-end price | 1-2x front-end price | Below front-end price |

**Decision Gate:**

- GREEN (proceed to Phase 3): 3%+ landing page conversion, CPC within budget, 5+ conversions
- YELLOW (iterate and retest): 1-3% conversion, decent traffic quality, clear optimization path
  - Action: Rewrite headline, adjust offer, test different keywords, spend another 50 EUR
- RED (kill this product): Below 1% conversion after 200+ clicks, or CPC 3x higher than projected
  - Action: Archive campaign, move to next product in priority list

---

## Phase 3: MVP Product Build

### Objective
Create a minimum viable version of the product that delivers genuine value. Time budget: 2-3 days. The product should be good enough that 90%+ of buyers would not request a refund.

### MVP Product Specifications Per Product

**Kit Fiscal del Autonomo MVP:**
- 5-page PDF: "Guia Rapida de Deducciones para Autonomos 2026"
  - Page 1: Cover + table of contents
  - Page 2: Complete list of deductible expenses with percentage deductible
  - Page 3: Quarterly tax calendar with exact deadlines and models to file
  - Page 4: VERIFACTU requirements summary and compliance checklist
  - Page 5: Common mistakes to avoid + resources
- 1 Google Sheets spreadsheet: Expense tracker with categories, IVA calculation, quarterly totals
- Delivery: ZIP file containing PDF + link to Google Sheets template (make a copy)

**Kit Oposiciones Planner MVP:**
- 4-page PDF: "Sistema de Estudio Para Oposiciones"
  - Page 1: Cover + the method overview
  - Page 2: How to create your study plan (with formula for hours needed)
  - Page 3: Spaced repetition schedule template (which topics to review when)
  - Page 4: Exam week preparation checklist
- 1 Notion template: Study planner with topic tracker, daily schedule, progress dashboard
- Delivery: PDF + Notion template duplication link

**IA Prompts Profesionales MVP:**
- 8-page PDF: "50 Prompts Profesionales Que Realmente Funcionan"
  - Page 1: Cover
  - Page 2: How to use prompts effectively (prompt engineering basics in Spanish)
  - Pages 3-7: 50 prompts organized by category (10 per page)
    - Marketing y ventas (10 prompts)
    - Productividad y organizacion (10 prompts)
    - Escritura y comunicacion (10 prompts)
    - Analisis y toma de decisiones (10 prompts)
    - Educacion y formacion (10 prompts)
  - Page 8: How to customize prompts for your profession
- Delivery: PDF download

**Calculadora Inmobiliaria MVP:**
- 1 Google Sheets spreadsheet with 3 tabs:
  - Tab 1: "Gastos Compra" - Input property price, location (CCAA dropdown for ITP rates), new/second-hand toggle. Outputs: ITP/IVA, notary, registro, gestoria, total costs, total with property price.
  - Tab 2: "Hipoteca" - Input loan amount, interest rate, term. Outputs: Monthly payment, total interest, amortization schedule (first 12 months shown).
  - Tab 3: "Rentabilidad" - Input purchase price, rental income, expenses. Outputs: Net yield, ROI, 10-year projection.
- 2-page PDF: Quick guide explaining each tab and what numbers to input
- Delivery: PDF + Google Sheets link (make a copy)

**Marketing Pymes Kit MVP:**
- 6-page PDF: "Plan Marketing 90 Dias Para Tu Negocio"
  - Page 1: Cover
  - Page 2: Week-by-week 90-day calendar overview
  - Page 3: Social media posting schedule (what to post, when, which platform)
  - Page 4: Google My Business optimization checklist (15 items)
  - Page 5: Email marketing starter guide (first 5 automated emails to set up)
  - Page 6: How to measure if it is working (KPIs for small businesses)
- 1 Google Sheets: 90-day content calendar with dates, platforms, content types, and example post ideas
- Delivery: PDF + Google Sheets link

### MVP Creation Tools

| Tool | Purpose | Cost |
|------|---------|------|
| Google Docs | Write the content | Free |
| Canva (free tier) | Design PDF covers and layout | Free |
| Google Sheets | Create spreadsheet products | Free |
| Notion (free tier) | Create Notion template products | Free |
| Export to PDF | Convert Canva designs to PDF | Free |

### MVP Creation Process (2-3 days)

**Day 1: Content creation**
- Morning: Write all text content in Google Docs
- Afternoon: Create spreadsheet(s) with formulas and formatting
- Evening: Test spreadsheet with real numbers to ensure accuracy

**Day 2: Design and packaging**
- Morning: Design PDF in Canva (use a professional template, brand colors)
- Afternoon: Export to PDF, test all links
- Evening: Create ZIP file with all deliverables

**Day 3: Delivery setup**
- Morning: Upload files to Google Drive (or hosting solution)
- Set up Stripe product with correct price
- Create thank-you page with download links
- Test full purchase flow end to end (use Stripe test mode)
- Send test purchase confirmation email

### MVP Quality Checklist

Before launching, verify:
- [ ] PDF opens correctly on mobile and desktop
- [ ] All spreadsheet formulas work correctly
- [ ] Google Sheets "make a copy" link works for buyers
- [ ] Notion template duplication link works
- [ ] No typos or formatting errors in product
- [ ] Product delivers on the specific promise made on the landing page
- [ ] Thank-you page displays correctly with all download links
- [ ] Confirmation email sends and contains download links
- [ ] Stripe webhook fires correctly (if using automated delivery)
- [ ] Product would not embarrass you if shared publicly

---

## Phase 4: Full Funnel Build (After 20+ Sales)

### Objective
Once 20+ sales confirm demand, build the complete funnel with order bump, upsell, downsell, and email sequences to maximize customer value.

### Trigger: Proceed to Phase 4 when:
- 20+ sales of the MVP product
- Refund rate below 5%
- Conversion rate above 2%
- Positive customer feedback (or at minimum, no complaints)

### Full Funnel Components

**Component 1: Enhanced Product**
Expand the MVP into a more comprehensive product:
- Kit Fiscal: Expand PDF from 5 to 15+ pages, add more spreadsheets, add video walkthrough
- Oposiciones: Add more Notion templates, add audio study tips, expand PDF
- IA Prompts: Expand to 500+ prompts, add profession-specific packs
- Inmobiliaria: Add more calculators, add neighborhood comparison tool, add checklist PDF
- Marketing Pymes: Expand calendar to 6 months, add Canva templates, add email templates

**Component 2: Order Bump**
A small add-on offered on the checkout page before payment. Must be:
- Complementary to the main product (not a substitute)
- Priced at 30-50% of front-end price
- Describable in 1-2 sentences
- Instantly deliverable

| Product | Order Bump | Price |
|---------|-----------|-------|
| Kit Fiscal | Plantilla Facturas VERIFACTU + Modelo Presupuesto | 9 EUR |
| Oposiciones | Pack 20 Resumenes Visuales (mapas mentales) | 7 EUR |
| IA Prompts | Guia Prompt Engineering Avanzado (15 paginas) | 9 EUR |
| Inmobiliaria | Checklist Compra Vivienda + Guia Negociacion | 15 EUR |
| Marketing Pymes | Pack 200 Plantillas Canva Editables | 15 EUR |

**Component 3: Upsell (One-Time Offer page)**
Shown immediately after purchase, before download page. Higher-priced product with more depth.

| Product | Upsell | Price | Format |
|---------|--------|-------|--------|
| Kit Fiscal | Curso Fiscal Completo Para Autonomos | 67 EUR | 2-hour video course + workbook |
| Oposiciones | Masterclass: Metodo Aprobado Garantizado | 47 EUR | 90-min video + planning system |
| IA Prompts | IA Masterclass: Automatiza Tu Trabajo | 67 EUR | 2-hour video course + template pack |
| Inmobiliaria | Curso Inversion Inmobiliaria Espana | 97 EUR | 3-hour video course + advanced calculators |
| Marketing Pymes | Consultoria Marketing Express (1 hora) | 97 EUR | 1-hour video call + custom plan |

**Component 4: Downsell (shown if upsell declined)**
A lower-priced alternative that captures some additional revenue from buyers who said no to the upsell.

| Product | Downsell | Price |
|---------|----------|-------|
| Kit Fiscal | Solo el Workbook del Curso (sin videos) | 27 EUR |
| Oposiciones | Solo los Resumenes del Metodo (PDF) | 19 EUR |
| IA Prompts | Pack Prompts Avanzados (100 adicionales) | 27 EUR |
| Inmobiliaria | Solo las Calculadoras Avanzadas (sin curso) | 37 EUR |
| Marketing Pymes | Revision de Marketing por Email (escrita) | 37 EUR |

**Component 5: Post-Purchase Email Sequence**

Sequence 1: Onboarding (Days 0-3)
- Email 1 (Immediate): Purchase confirmation + download links + "how to use" quick start
- Email 2 (Day 1): "Have you opened your [product]? Here's how to get started in 5 minutes"
- Email 3 (Day 3): One valuable tip related to the product topic (build goodwill)

Sequence 2: Value + Upsell (Days 5-14)
- Email 4 (Day 5): Case study or success story from another user
- Email 5 (Day 7): Additional free tip + soft mention of the upsell course
- Email 6 (Day 10): Direct pitch for the upsell course with a 48-hour discount
- Email 7 (Day 12): Last chance for the discount on the upsell course

Sequence 3: Long-term Nurture (Days 30+)
- Email every 7-10 days with tips, updates, and occasional promotions
- Cross-sell other products in the portfolio when relevant
- Seasonal promotions (Black Friday, new year, tax season)

### Two-Step Checkout Implementation

The checkout process that maximizes order bump take rates:

**Step 1: Contact Information**
- Full name
- Email address
- "Continuar" button

Purpose: Captures the email even if they abandon checkout. This contact goes into an abandoned cart email sequence.

**Step 2: Payment + Order Bump**
- Payment details (Stripe Elements card form)
- Order summary showing the product
- Order bump checkbox: "Si, anade [Bump Product] por solo [Price] EUR" with 1-sentence description and checkmark box
- Total updates dynamically when bump is selected
- "Comprar Ahora - [Total] EUR" button

**After payment success:**
- Redirect to Upsell page (one-time offer)
- If upsell accepted: charge additional amount, redirect to download page
- If upsell declined: show downsell page
- If downsell declined (or accepted): redirect to download page

---

## Phase 4 Continued: Decision Framework

### When to Kill a Product

Kill the product and reallocate budget if ANY of these are true after the smoke test or first 50 sales:

1. **Search volume is insufficient:** Keyword Planner shows fewer than 3,000 monthly searches across all relevant keywords in Spain.

2. **CPC is unworkable:** Actual CPC is more than 2.5x the projected CPC, making CPA mathematically impossible to sustain even with perfect conversion rates.

3. **Conversion rate is stuck below 1%:** After testing 3+ landing page variants with 300+ visitors each, conversion rate remains below 1%.

4. **Refund rate exceeds 15%:** Indicates a product-market fit problem, not a marketing problem.

5. **No path to profitability:** Even with optimistic upsell assumptions (20% take rate), the unit economics do not reach break-even.

### When to Scale a Product

Increase budget by 20-30% per week if ALL of these are true:

1. **CPA is at or below target:** Actual CPA is within 120% of projected CPA.

2. **Front-end ROAS is above 0.7:** Even if not self-liquidating at front-end, the gap is small enough for upsells to cover.

3. **Order bump take rate is above 25%:** Indicates the bump offer resonates with buyers.

4. **Upsell conversion is above 8%:** Confirms the upsell product has perceived value.

5. **Refund rate is below 5%:** Product delivers on its promise.

6. **Email list is growing:** Non-buyers from the landing page are joining the email list (for future conversion).

### Scaling Rules

- Never increase daily ad budget by more than 30% in a single change
- Wait 3-4 days after a budget change before making another
- If performance drops after a budget increase, reduce back to the previous level immediately
- Add new keywords gradually (3-5 per week)
- Expand from exact match to phrase match only after exact match keywords are profitable
- Never use broad match until you have 500+ conversions of data

---

## Metrics Tracking Spreadsheet Structure

### Google Sheet: "SLO Spain - Validation Tracker"

**Tab 1: Keyword Research**
Columns: Keyword | Monthly Searches | Competition | Suggested Bid Low | Suggested Bid High | Relevance (1-5) | Intent (Info/Commercial/Transactional) | Include in Campaign (Y/N)

**Tab 2: Smoke Test Results**
Columns: Date | Product | Ad Spend | Impressions | Clicks | CTR | Avg CPC | Page Views | Bounces | Bounce Rate | Conversions (Email/Sale) | Conv Rate | CPA | Notes

**Tab 3: Product Validation Scorecard**
Columns: Product Name | Phase 1 Score (Keyword) | Phase 2 Score (Smoke Test) | Phase 3 Status (MVP) | Phase 4 Status (Full Funnel) | Decision (Scale/Hold/Kill) | Date Last Updated | Notes

**Tab 4: Daily Funnel Metrics (one per product)**
Columns: Date | Ad Spend | Clicks | CPC | Landing Page Views | LP Conversion Rate | Checkouts Started | Checkout Completion Rate | Sales | Order Bump Sales | Bump Take Rate | Upsell Views | Upsell Sales | Upsell Rate | Downsell Sales | Revenue (Front-end) | Revenue (Bumps) | Revenue (Upsells) | Revenue (Downsells) | Total Revenue | ROAS | CPA | Notes

**Tab 5: Monthly P&L**
Columns: Month | Product | Ad Spend | Stripe Fees | Tool Costs | Total Costs | Front-end Revenue | Bump Revenue | Upsell Revenue | Downsell Revenue | Email Revenue | Total Revenue | Net Profit | Margin %
