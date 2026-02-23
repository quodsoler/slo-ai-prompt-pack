# Google Ads Campaign

## Job to Be Done

A Google Ads search campaign structure that drives qualified traffic to the sales page at CPA < EUR 25, with a target optimized CPA of EUR 13-15. The campaign targets Spanish-language searchers in Spain who are actively looking for AI prompt solutions for their business or marketing needs.

> **Important:** This spec is NOT implemented in the Astro codebase. It documents the Google Ads campaign structure so that Ralph understands the traffic source, ad messaging angles, keyword intent, and landing page expectations. This context directly informs sales page copy priorities, hero section messaging, CTA placement, page load performance requirements, and UTM parameter handling.

---

## User Stories

### US-1: Campaign manager setting up and optimizing the campaign
**As the** campaign manager running Google Ads for this SLO funnel,
**I want to** have a clearly documented campaign structure with ad groups, keywords, bidding strategy, and scaling rules,
**so that** I can launch quickly, optimize based on data, and scale profitably.

### US-2: Landing page designer needing to match ad messaging
**As the** developer/designer building the Astro sales page,
**I want to** understand the exact headlines, value propositions, and keyword intent behind each ad group,
**so that** I can ensure message match between ad copy and landing page (improving Quality Score and conversion rate).

### US-3: Marketer analyzing campaign-to-purchase funnel
**As a** marketer reviewing end-to-end funnel performance,
**I want to** understand how ad traffic flows through the Astro site to Systeme.io checkout,
**so that** I can identify drop-off points and optimize the full path from click to purchase.

---

## Acceptance Criteria

### AC-1: Campaign structure (reference: data/google-ads-campaign/google-ads-campaign-complete.md)
- **Campaign name:** SLO_ES_Search_PromptPackIA
- **Campaign type:** Search only (no Search Partners, no Display Network)
- **Target location:** Spain -- physical presence only ("personas en esta ubicacion")
- **Language:** Spanish
- **5 Ad Groups:**
  1. **AG1_Transaccional:** High-intent buyers -- keywords like "comprar prompts IA", "pack plantillas ChatGPT", "prompts chatgpt espanol comprar"
  2. **AG2_Problema:** Problem-aware searchers -- keywords like "ChatGPT no funciona", "IA resultados genericos", "como mejorar textos de venta con chatgpt"
  3. **AG3_Herramienta:** Tool seekers -- keywords like "plantillas ChatGPT espanol", "prompts marketing", "crear contenido con ia"
  4. **AG4_Profesional:** Professional use cases -- keywords like "IA para autonomos", "IA para marketing digital", "chatgpt para negocios"
  5. **AG5_Competencia:** Competitor alternatives -- keywords like "alternativa Jasper espanol"

### AC-2: RSA ad structure
- Each ad group has Responsive Search Ads with:
  - **15 headlines** (max 30 characters each) covering: feature, price, benefit, CTA, social proof, objection handling
  - **4 descriptions** (max 90 characters each) with value propositions
- Headlines H1 and H2 are pinned to positions 1 and 2 for consistency
- Ad copy angles per group match keyword intent:
  - AG1: Price + immediate access ("200+ Prompts IA por 27 EUR", "Descarga Inmediata Hoy")
  - AG2: Problem acknowledgment + solution ("ChatGPT te da respuestas genericas? Prueba prompts optimizados")
  - AG3: Tool/feature focus ("Plantillas ChatGPT en Espanol", "Copywriting con ChatGPT")
  - AG4: Professional outcome ("IA Para Tu Negocio", "Automatiza Tu Marketing")
  - AG5: Alternative positioning ("Mejor que herramientas de 50 EUR/mes")

### AC-3: Bidding strategy
- **Phase 1 (Weeks 1-2):** Maximize conversions without CPA target (data collection)
- **Phase 2 (Week 3+):** Target CPA of EUR 13-15 (activated after 15+ conversions)
- **Daily budget:** EUR 30 start, scale to EUR 50 when CPA consistently < EUR 15
- **Device adjustments:** +10% desktop, +0% mobile, -20% tablets
- **Schedule:** Mon-Fri 07:00-23:00, Sat 08:00-15:00, Sun 09:00-14:00

### AC-4: Negative keywords list
- Campaign-level negatives (58 terms) including:
  - Free/educational: "gratis", "gratuito", "curso", "tutorial", "aprender"
  - Employment: "empleo", "trabajo", "vacante", "salario"
  - Technical/developer: "API", "Python", "javascript", "programacion"
  - Image/multimedia: "Midjourney", "DALL-E", "imagen", "video"
  - Generic/informational: "que es ChatGPT", "como crear cuenta ChatGPT"
- Weekly review of search terms report to add new negatives

### AC-5: Conversion tracking setup
- **Primary conversion:** Purchase completed on Systeme.io thank-you page (value: EUR 27 or dynamic)
- **Secondary conversion:** Checkout initiated (begin_checkout event)
- **Observation conversions:** Sales page view, CTA button click
- Tracking via Google Ads global site tag (gtag.js) + event snippets, OR via GTM container
- Attribution: Data-driven (preferred) or Last click; 30-day click window, 1-day view window
- Count: One conversion per click (prevents inflation from page reloads)

### AC-6: UTM parameter structure
- All ad traffic tagged with: `?utm_source=google&utm_medium=cpc&utm_campaign=slo_prompt_pack_ia&utm_content={adgroupid}&utm_term={keyword}&gclid={gclid}`
- Astro site captures UTM parameters on page load, stores in sessionStorage
- UTM parameters appended to Systeme.io checkout URL for cross-domain attribution

### AC-7: Scaling rules and kill criteria
- **Scale:** CPA < EUR 10 for 3+ days --> increase budget 20%; CTR > 6% in ad group --> expand similar keywords
- **Kill:** 0 conversions after EUR 100 spend --> pause and review; CPA > EUR 20 for 7+ days --> pause expensive keywords; CTR < 1.5% after 500 impressions --> rewrite ads
- **Pivot:** If one ad group captures 80%+ conversions --> concentrate budget there; if mobile converts 50%+ worse --> reduce mobile bid -30%

---

## Technical Details

### How This Affects the Astro Site

1. **Message match:** The sales page hero section must echo the primary ad headlines. Key phrases to mirror:
   - "200+ Prompts IA" (now 275+ in product; ads may still say 200+ initially)
   - "Copia, pega y resultados al instante"
   - "Solo 27 EUR -- pago unico"
   - "Probados en +1.500 negocios"
   - "Ahorra 10h cada semana"

2. **Landing page URL:** All ad groups point to `https://[domain]/pack-prompts-ia` (or root `/`)
   - Sitelink extensions link to anchor sections: `#ver-prompts`, `#opiniones`, `#guia`, `#categorias`, `#oferta`, `#faq`
   - These anchors MUST exist on the sales page for sitelink extensions to work

3. **Page load performance:** Google Ads Quality Score factors in landing page experience
   - Target: LCP < 2.5s, FID < 100ms, CLS < 0.1 (Core Web Vitals)
   - Mobile-first: majority of clicks will come from mobile devices
   - No render-blocking scripts before main content

4. **UTM capture on landing:**
   - On page load, `src/lib/analytics.ts` reads UTM parameters from URL
   - Stores in `sessionStorage` for persistence across page interactions
   - Appends to Systeme.io checkout URL when CTA is clicked
   - `gclid` parameter must also be captured and forwarded for Google Ads conversion attribution

5. **Ad extensions require page anchors:**
   - `#ver-prompts` -- prompt showcase section
   - `#opiniones` -- testimonials section
   - `#guia` -- usage guide mention
   - `#categorias` -- category breakdown
   - `#oferta` -- pricing section
   - `#faq` -- FAQ section

### Campaign Performance Estimates (Month 1)

| Scenario | Budget/mo | CPC | Clicks | CVR | Sales | CPA | Revenue | ROAS |
|---|---|---|---|---|---|---|---|---|
| Conservative | EUR 900 | EUR 0.70 | 1,286 | 2.5% | 32 | EUR 28 | EUR 864 | 0.96x |
| Medium | EUR 1,050 | EUR 0.55 | 1,909 | 3.5% | 67 | EUR 15.70 | EUR 1,809 | 1.72x |
| Optimistic | EUR 1,500 | EUR 0.45 | 3,333 | 4.0% | 133 | EUR 11.28 | EUR 3,591 | 2.39x |

Note: ROAS improves significantly when including order bump (EUR 17) and upsell (EUR 67) revenue. The SLO model expects front-end to break even or be slightly profitable, with backend offers driving profit.

### Month 2 Expansion (Documented, Not Astro-Built)
- Display remarketing campaign for landing page visitors who did not purchase
- YouTube Video Action campaign targeting remarketing + in-market audiences
- These campaigns point to the same Astro sales page URL

---

## Edge Cases

| Scenario | Expected Behavior |
|---|---|
| User clicks ad but has ad blocker that strips UTM parameters | Analytics should handle missing UTMs gracefully; sessionStorage stores empty/null; checkout URL built without UTMs |
| User clicks ad on mobile, completes purchase on desktop later | Cross-device attribution handled by Google Ads (data-driven model); Astro site cannot control this |
| Google disapproves an ad for policy violation | Does not affect Astro site; campaign manager resolves in Google Ads dashboard |
| Quality Score drops below 5 for a keyword | Indicates landing page relevance issue; may require sales page copy adjustments to better match keyword intent |
| CPC spikes above EUR 1.50 due to competition | Campaign manager adjusts bids or pauses expensive keywords; no Astro changes needed |
| User arrives from ad with `gclid` but JavaScript is disabled | `gclid` in URL is still available server-side if needed; without JS, sessionStorage capture fails but Systeme.io can still read gclid from referrer or URL if passed as query param |
| Sitelink extension anchor does not exist on page | Google may still show the sitelink; user lands on page top; fix by ensuring all anchor IDs exist |
| Ad copy mentions "200+ Prompts" but product page says "275+" | Acceptable during transition; update ad copy to match product page once ads are re-approved. Sales page is the source of truth for actual count |

---

## Dependencies

- **analytics-tracking.md** -- GA4 + Google Ads conversion tracking setup, GTM container, UTM parameter capture
- **checkout-integration.md** -- Systeme.io checkout URL format, cross-domain tracking for conversion attribution
