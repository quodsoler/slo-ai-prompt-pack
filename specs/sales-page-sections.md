# Sales Page Sections

## Job to Be Done

Build an 11-section long-form sales page that guides a Spanish professional visitor from problem awareness to purchase, achieving >3% conversion rate on the "Pack de 275+ Prompts IA para Marketing y Negocios" (EUR 27) with every section implemented as an Astro or Preact component.

---

## User Stories

### US-1: Visitor scrolling on mobile
**As a** Spanish professional scrolling the sales page on my phone,
**I want** each section to flow naturally into the next with a clear narrative arc,
**so that** I stay engaged long enough to understand the offer and reach a CTA button.

**Acceptance Criteria:**
- All 11 sections render in order on `/` (index.astro)
- Each section is a distinct Astro component in `src/components/sales/`
- Visual rhythm alternates between content-heavy and visual-break sections
- At least 3 CTA buttons visible during a full scroll: Hero, PriceOffer, FinalCta
- StickyCtaBar provides a persistent CTA after scrolling past the hero
- Each section loads progressively (fade-in on scroll) without blocking render
- Total page weight < 500KB (excluding fonts)

### US-2: Skeptical professional evaluating the product
**As a** Spanish autonomo who has been burned by generic AI products,
**I want** to see specific, relatable examples and proof that this is made for the Spanish market,
**so that** I feel confident this product will actually work for me.

**Acceptance Criteria:**
- PainAgitation section uses emotional copy that mirrors real Spanish autonomo frustrations
- PromptShowcase displays actual prompt text with realistic AI responses in terminal UI
- AudienceFit section explicitly lists target personas (autonomos, marketers, emprendedores, equipos)
- FAQ answers address common objections (generic AI, language concerns, format, guarantee)
- Spanish-specific references present in copy (mentions of gestoria, autonomo, Spanish market, RGPD)
- No English-language UI or lorem ipsum visible anywhere

### US-3: Time-pressed autonomo who scrolls fast
**As a** busy autonomo who does not have time to read every word,
**I want** scannable headings, bullet points, and visual highlights that communicate the value quickly,
**so that** I can decide to buy within 2-3 minutes of landing.

**Acceptance Criteria:**
- Every section has a clear heading visible on screen (H2 minimum)
- Benefits and features presented as bullet lists or card grids, not long paragraphs
- Key numbers highlighted visually: "275+", "10+ horas", "27 EUR", "30 dias"
- Value stack in PriceOffer section uses a clear table format
- Strikethrough original price prominently displayed next to offer price
- Primary CTA button text always includes the price: "Quiero Mis 275+ Prompts Ahora -- 27 EUR"

### US-4: Comparison shopper considering alternatives
**As a** visitor comparing this product to other AI prompt packs,
**I want** to understand what makes this pack unique (Spanish-adapted, 275+ prompts, format),
**so that** I can justify the EUR 27 purchase over free alternatives or English-language packs.

**Acceptance Criteria:**
- SolutionPresentation lists 5 differentiators explicitly
- ProductContents shows exact prompt count per category with sample prompts
- BenefitsGrid highlights Spanish-market adaptation as a distinct benefit
- PriceOffer anchors value with original value (~2,450 EUR) vs offer price (27 EUR)
- Guarantee (30 days, no questions) prominently displayed near price

---

## Technical Details

### Section Architecture

All 11 sections are Astro components (`.astro` files) in `src/components/sales/`. Sections that require client-side interactivity use Preact islands (`client:visible` directive).

Content copy is sourced from `src/data/*.ts` (TypeScript const exports derived from `data/sales-funnel/landing-page-copy/sales-page-copy.md`). Components receive data as props or import directly from `src/data/`.

### Section 1: Hero (`Hero.astro`)
**Purpose:** Capture attention, establish credibility, present core promise, trigger first CTA click.

**Layout:**
- Full-viewport-height section with gradient hero background
- Pre-headline stat line: "El 73% de los profesionales en Espana ya estan usando IA..."
- H1 headline: "Copia, Pega y Lanza: 275+ Prompts de IA Listos para Usar que Te Ahorran +10 Horas a la Semana en Marketing y Gestion de Tu Negocio"
- Subheadline paragraph (2-3 sentences)
- Primary CTA button (gradient, glow effect)
- Social proof line below CTA: "Ya lo usan mas de [X] profesionales y autonomos en Espana | Compatible con ChatGPT y Claude"

**Data:** `src/data/product-config.ts` (headline, subheadline, social proof text, CTA label)

**Tracking:** CTA click fires `cta_clicked` event with `{ section: 'hero' }`

### Section 2: PainAgitation (`PainAgitation.astro`)
**Purpose:** Emotionally connect with the visitor's frustrations to build "I need a solution" urgency.

**Layout:**
- Section heading: "Esto te suena, verdad?"
- 5 pain point blocks, each starting with bold lead sentence + supporting paragraph
- Alternating subtle background tints or left-border accent for visual rhythm
- Pain points map to Section 2 of `sales-page-copy.md`:
  1. Hours wasted creating content from scratch
  2. ChatGPT gives generic, robotic results
  3. Competitors already using AI to produce more
  4. Administrative tasks eating into billable hours
  5. AI is the present, not the future — falling behind daily

**Data:** `src/data/sales-copy.ts` → `painPoints` array

### Section 3: SolutionPresentation (`SolutionPresentation.astro`)
**Purpose:** Introduce the product as the answer to the pain points, establishing 5 differentiators.

**Layout:**
- Section heading: "Presentamos el Pack de 275+ Prompts IA para Marketing y Negocios"
- Opening paragraph: "No es otro curso..."
- 5 differentiators as a list with icons or checkmarks:
  1. Culturally adapted for Spanish market
  2. Copy-paste ready (no AI knowledge needed)
  3. Three major sections: Marketing (105), Business (105), Social Media (65)
  4. Quick-start guide included
  5. Dual format: Notion + PDF

**Data:** `src/data/sales-copy.ts` → `differentiators` array

### Section 4: ProductContents (`ProductContents.astro` + Preact island)
**Purpose:** Show the depth and breadth of the pack with browsable category breakdown.

**Layout:**
- Section heading: "Que Incluye el Pack"
- Tabbed interface OR accordion with 3 categories (Preact `client:visible`):
  - **Marketing y Copywriting** — 105 prompts, 6 subcategories
  - **Business y Autonomo** — 105 prompts, 7 subcategories
  - **Social Media** — 65 prompts, subcategories
- Each category tab shows: category name + badge with prompt count, list of subcategories with 2-3 sample prompt titles each
- Bonus items listed below tabs: Quick-start guide, Quick reference index, Dual format

**Data:** `src/data/prompt-categories.ts` (structured categories with subcategories and sample prompts)

**Interactivity:** Tab switching or accordion expand/collapse (Preact island, `client:visible`)

### Section 5: PromptShowcase (`PromptShowcase.astro` + Preact island)
**Purpose:** Demonstrate the product in action with a terminal-style animation showing real prompts.

**Layout:**
- Section heading: "Mira lo que puedes hacer en menos de 2 minutos"
- Terminal-style PromptPreview component (dark background, dot chrome, monospace font)
- 3 rotating examples from `sales-page-copy.md` Section 5:
  1. Calendario de Contenido Mensual
  2. Email de Cobro a Morosos
  3. Pagina de Venta con Formula PAS
- Each example shows: prompt text (typewriter animation), then AI response preview (fade-in)
- Navigation dots or auto-rotate with 5s interval
- Pause auto-rotation on user interaction

**Data:** `src/data/prompt-examples.ts` (prompt text + response preview for each example)

**Interactivity:** Typewriter animation + carousel rotation (Preact island, `client:visible`)

### Section 6: AudienceFit (`AudienceFit.astro`)
**Purpose:** Help the visitor self-identify as the right audience for this product.

**Layout:**
- Section heading: "Es Este Pack Para Ti?"
- Two-column layout (stacked on mobile):
  - **Left/Top: "Este pack es para ti si..."** — 5 items with green checkmark icons
    - Autonomo/freelance wanting to save hours
    - Marketing professional needing more content faster
    - Business owner wanting to professionalize communications
    - Frustrated ChatGPT user getting generic results
    - Time-valuer preferring proven solution over trial-and-error
  - **Right/Bottom: "Este pack NO es para ti si..."** — 3 items with X icons (muted)
    - Looking for a theoretical AI course
    - Not willing to spend 5 minutes copy-pasting
    - No online presence and no intention to have one

**Data:** `src/data/sales-copy.ts` → `audienceFit` and `audienceNotFit` arrays

### Section 7: BenefitsGrid (`BenefitsGrid.astro`)
**Purpose:** Reinforce value with concrete, icon-driven benefit statements.

**Layout:**
- Section heading: "Lo que cambia cuando tienes los prompts correctos"
- 6-card responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Each card: icon + heading + 2-3 sentence description
- Benefits (from Section 7 of sales-page-copy.md):
  1. Recover 10+ hours/week (clock icon)
  2. Save thousands in agencies/tools (coins icon)
  3. 5x content production (rocket icon)
  4. Project flawless professional image (shield icon)
  5. Master AI without studying (brain icon)
  6. Better business decisions (chart icon)

**Data:** `src/data/sales-copy.ts` → `benefits` array (icon identifier, heading, description)

### Section 8: PriceOffer (`PriceOffer.astro`)
**Purpose:** Present the price with value anchoring, overcome price objection, drive conversion.

**Layout:**
- Section heading: "Hagamos cuentas rapidas"
- Value stack table showing line items with original values totaling ~2,450 EUR
  - 105+ Marketing & Copywriting prompts — 197 EUR
  - 105+ Business & Autonomo prompts — 197 EUR
  - 65+ Social Media prompts — 147 EUR
  - Quick-start guide — 47 EUR
  - Quick reference index — 27 EUR
  - Dual format: Notion + PDF — 17 EUR
  - Lifetime updates — 97 EUR
  - **Total value: ~2,450 EUR** (strikethrough, muted)
- Comparison paragraph: consultant cost 500-2,000 EUR, agency 300-800 EUR/month
- Offer price block: strikethrough "Precio habitual: 67 EUR", then large "27 EUR" in `text-price` size
- Subtitle: "Pago unico. Acceso de por vida. Sin suscripciones."
- Order bump teaser line: mention of add-on available at checkout
- Guarantee badge: 30-day money-back, no questions asked
- Primary CTA button

**Data:** `src/data/product-config.ts` (price, original value, value stack items, guarantee text)

**Tracking:** CTA click fires `cta_clicked` event with `{ section: 'price_offer' }`

### Section 9: FaqAccordion (`FaqAccordion.astro` + Preact island)
**Purpose:** Overcome remaining objections with direct, conversational answers.

**Layout:**
- Section heading: "Preguntas Frecuentes"
- 8+ FAQ items in an accordion (single-expand, Preact `client:visible`)
- Questions from Section 10 of sales-page-copy.md:
  1. No se nada de IA. Puedo usar este pack?
  2. Funciona con ChatGPT y con Claude?
  3. En que formato recibo el pack?
  4. Hay garantia de devolucion?
  5. Puedo usar los prompts para proyectos de mis clientes?
  6. Funcionara para mi sector especifico?
  7. Por cuanto tiempo tengo acceso?
  8. Se actualizara el pack con nuevos prompts?
- FAQPage JSON-LD schema generated from the same data

**Data:** `src/data/faq-items.ts` (question/answer pairs)

**Interactivity:** Accordion expand/collapse (Preact island, `client:visible`)

**Tracking:** Each expand fires `faq_expanded` event with `{ question_index: N }`

### Section 10: FinalCta (`FinalCta.astro`)
**Purpose:** Last-chance persuasion with urgency and a final CTA for visitors who scrolled to the bottom.

**Layout:**
- Urgency banner: "Oferta de lanzamiento: este precio no durara para siempre..."
- Two-option comparison: Option 1 (keep struggling, free but costly) vs Option 2 (invest 27 EUR, start today)
- Closing headline: "Empieza a Trabajar con IA como un Profesional. Hoy."
- Primary CTA button
- Guarantee reminder line
- P.S. paragraph with emotional final push

**Data:** `src/data/sales-copy.ts` → `finalCta` object

**Tracking:** CTA click fires `cta_clicked` event with `{ section: 'final' }`

### Section 11: StickyCtaBar (`StickyCtaBar.tsx` — Preact component)
**Purpose:** Provide persistent mobile CTA after the hero scrolls out of view.

**Layout:**
- Fixed position at bottom of viewport
- Left: price text ("27 EUR")
- Right: compact primary CTA button ("Quiero Mis Prompts")
- Height: 72px with backdrop blur and top border
- Hidden on desktop (`lg:hidden`)

**Behavior:**
- Hidden initially
- Appears (slide up, 300ms) when hero section scrolls out of viewport (IntersectionObserver on hero)
- Hides when scrolling back near hero or when PriceOffer or FinalCta sections are visible in viewport
- z-index above all other content but below modals/cookie consent

**Tracking:** CTA click fires `cta_clicked` event with `{ section: 'sticky_bar' }`

### Page Assembly (`src/pages/index.astro`)
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sales/Hero.astro';
import PainAgitation from '../components/sales/PainAgitation.astro';
import SolutionPresentation from '../components/sales/SolutionPresentation.astro';
import ProductContents from '../components/sales/ProductContents.astro';
import PromptShowcase from '../components/sales/PromptShowcase.astro';
import AudienceFit from '../components/sales/AudienceFit.astro';
import BenefitsGrid from '../components/sales/BenefitsGrid.astro';
import PriceOffer from '../components/sales/PriceOffer.astro';
import FaqAccordion from '../components/sales/FaqAccordion.astro';
import FinalCta from '../components/sales/FinalCta.astro';
import StickyCtaBar from '../components/sales/StickyCtaBar.astro';
---
<BaseLayout title="..." description="...">
  <Hero />
  <PainAgitation />
  <SolutionPresentation />
  <ProductContents />
  <PromptShowcase />
  <AudienceFit />
  <BenefitsGrid />
  <PriceOffer />
  <FaqAccordion />
  <FinalCta />
  <StickyCtaBar />
</BaseLayout>
```

### Data Files (src/data/)
| File | Exports | Source |
|---|---|---|
| `product-config.ts` | Product name, price, original value, value stack, guarantee, CTA labels | sales-page-copy.md Sections 1, 8 |
| `sales-copy.ts` | Pain points, differentiators, audience fit, benefits, final CTA copy | sales-page-copy.md Sections 2, 3, 6, 7, 11 |
| `prompt-categories.ts` | Category structure with subcategories and sample prompts | sales-page-copy.md Section 4 |
| `prompt-examples.ts` | 3 showcase prompts with text and response previews | sales-page-copy.md Section 5 |
| `faq-items.ts` | Question/answer pairs (8+) | sales-page-copy.md Section 10 |

---

## Edge Cases

- **Very long section on small screens:** PainAgitation and ProductContents can be lengthy. Ensure no single section exceeds ~3 screen-heights on mobile without a visual break or CTA.
- **Accordion with all items open simultaneously:** FaqAccordion and ProductContents should enforce single-expand to prevent overwhelming scroll depth.
- **PromptShowcase with JS disabled:** Show all 3 examples statically (no typewriter, no carousel) with prompt text and response visible.
- **StickyCtaBar z-index conflicts:** Must layer correctly with cookie consent banner and any future modals. Test stacking context.
- **Value stack number changes:** If product price or prompt count changes, only `src/data/product-config.ts` and `src/data/prompt-categories.ts` should need updating — no hardcoded values in components.
- **Placeholder content:** Social proof number "[X] profesionales" must be configurable in `product-config.ts`. Never display "[X]" literally to visitors.
- **Copy length variance:** Spanish text is ~20-30% longer than English equivalents. Test that button text, headings, and card content do not overflow at any breakpoint.
- **Scroll depth analytics:** Sections should have unique `id` attributes for scroll depth tracking (e.g., `id="hero"`, `id="pain-agitation"`, `id="price-offer"`).
- **IntersectionObserver fallback:** For StickyCtaBar and fade-in animations, if IntersectionObserver is unavailable (very old browsers), show elements immediately without animation.

---

## Dependencies

- **design-system.md** — Color tokens, typography, component catalog (Button, Accordion, Card, Badge, PromptPreview, StickyCtaBar)
- **checkout-integration.md** — CTA URL builder, UTM pass-through, tracking event specifications
- **seo-content.md** — Page title, meta description, OG tags, JSON-LD schemas for Product and FAQPage
