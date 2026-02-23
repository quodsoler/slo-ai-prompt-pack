# Funnel Economics

## Job to Be Done

A clear economic model and KPI tracking framework that enables data-driven scale/pause/kill decisions, so the business owner and campaign manager can evaluate funnel health daily and act decisively based on evidence rather than guesswork.

---

## User Stories

### Business Owner Reviewing Daily Metrics

**As a** business owner reviewing the daily tracking dashboard,
**I want** a single view showing ad spend, revenue by funnel step, CPA, ACV, and ROAS,
**so that** I can assess in under 60 seconds whether the funnel is profitable today and trending in the right direction.

**As a** business owner,
**I want** a clear decision framework with specific thresholds for scaling, optimizing, pausing, or killing campaigns,
**so that** I can act quickly without second-guessing whether the data supports the decision.

**As a** business owner,
**I want** monthly revenue projections based on realistic conversion assumptions,
**so that** I can plan cash flow, set budget caps, and communicate expectations to stakeholders.

### Campaign Manager Deciding to Scale or Pause

**As a** campaign manager monitoring Google Ads performance,
**I want** to see conversion rates broken down by each funnel step (ad click, landing page visit, sale, bump, upsell, downsell),
**so that** I can identify exactly where the funnel is leaking and prioritize optimization efforts.

**As a** campaign manager,
**I want** a documented scale/pause decision protocol with minimum data requirements,
**so that** I do not make premature decisions on insufficient data or delay action when the data is clear.

---

## Acceptance Criteria

### Pricing & Revenue Model

- [ ] Front-end price is documented as EUR 27 (with EUR 17 as a test variant)
- [ ] Order bump price is EUR 17 with expected take rate of 30-45%, yielding EUR 5.10-7.65 average per buyer
- [ ] Upsell price is EUR 67 with expected take rate of 15-20%, yielding EUR 10.05-13.40 average per buyer
- [ ] Downsell price is EUR 27 with expected take rate of 10-15% (of upsell decliners), yielding EUR 2.16-3.24 average per buyer
- [ ] Target Average Customer Value (ACV) is EUR 44-51, with EUR 48 as the working target
- [ ] All revenue calculations are consistent and mathematically verifiable

### CPA & ROAS Targets

- [ ] CPA target is documented as EUR 25 (Google Ads)
- [ ] ROAS target is >1.5 on front-end revenue only
- [ ] ROAS target is >2.0 when including upsell/downsell revenue
- [ ] Break-even CPA is documented: approximately EUR 27 on front-end only, approximately EUR 48 with full funnel
- [ ] The relationship between CPC, conversion rate, and CPA is documented (CPA = CPC / conversion rate)

### Daily KPI Tracking Template

- [ ] A tracking template exists (referencing `data/tracking-metrics/daily-tracking-template.md`) with columns for:
  - Ad spend, impressions, clicks, CTR, CPC
  - Landing page views, sales (front-end), conversion rate
  - Revenue broken down: front-end, bumps, upsells, downsells, total
  - CPA, ACV, ROAS, profit/loss
- [ ] Conversion rate is tracked at each step:
  - Ad impression to click (CTR)
  - Click to landing page view (LP view rate)
  - Landing page view to sale (LP conversion rate)
  - Sale to order bump (bump rate)
  - Sale to upsell (upsell rate)
  - Upsell decline to downsell (downsell rate)
- [ ] Weekly and monthly summary rollups are documented

### Decision Framework

- [ ] **Scale** criteria: ROAS > 1.5 for 3+ consecutive days with 10+ sales -- increase budget by 20%
- [ ] **Optimize** criteria: ROAS 1.0-1.5 -- A/B test landing page, ad copy, or audience; do not increase spend
- [ ] **Pause** criteria: ROAS < 0.8 for 3+ days -- pause ad group, investigate root cause
- [ ] **Kill** criteria: ROAS < 0.5 after 100+ clicks -- kill ad group, reallocate budget to higher performers
- [ ] Minimum data requirements are specified before each decision type can be triggered
- [ ] Emergency stop documented: total spend > EUR 300 with ROAS < 0.5 = kill campaign entirely

### Monthly Projections

- [ ] Base case projection is documented: 900 clicks/month at 3% CVR = 27 sales
- [ ] Base case monthly revenue: EUR 1,296 (27 sales x EUR 48 ACV)
- [ ] Base case monthly ad spend: EUR 729 (900 clicks x EUR 0.81 CPC at EUR 25 CPA / 3% CVR)
- [ ] Projections cover conservative (75% of base), base, and optimistic (125% of base) scenarios

### Non-Implementation Note

- [ ] This spec clearly states that funnel economics are NOT implemented as Astro code
- [ ] This spec is a reference document for business context that informs other specs (analytics tracking, checkout integration, Google Ads campaign)
- [ ] No Astro components, pages, or TypeScript modules are derived from this spec

---

## Technical Details

### This Spec Is Reference-Only

The funnel economics model is **not implemented in Astro**. This specification documents the economic model, KPI targets, and decision framework that provide context to the engineering and marketing teams. It informs:

- **analytics-tracking.md**: Which events and values to track (purchase amounts, bump/upsell conversions)
- **checkout-integration.md**: Price points, products, and funnel flow that Systeme.io must be configured with
- **google-ads-campaign.md**: Budget allocation, CPA targets, and scaling/pausing criteria
- **thank-you-page.md**: Conditional content logic based on which products were purchased

### Revenue Model Detail

```
Per 100 front-end sales at target rates:

Front-end (275+ Prompts Pack):     100 x EUR 27  = EUR 2,700  (56.2%)
Order bump (Automation Pack):       40 x EUR 17  = EUR   680  (14.2%)
Upsell (Sistema Completo):          18 x EUR 67  = EUR 1,206  (25.1%)
Downsell (Mini Sistema):             8 x EUR 27  = EUR   216  ( 4.5%)
                                                   ----------
Total:                                             EUR 4,802
ACV:                                               EUR 48.02
```

Downsell is offered only to those who decline the upsell: 82 decliners x 10% take rate = ~8 downsells.

### Tracking Infrastructure

Daily tracking uses the Google Sheets template from `data/tracking-metrics/daily-tracking-template.md`. Data sources:

| Metric | Source |
|--------|--------|
| Ad spend, clicks, impressions, CTR, CPC | Google Ads dashboard |
| Landing page views | GA4 (page_view event on index page) |
| Front-end sales, bump sales | Systeme.io dashboard |
| Upsell sales, downsell sales | Systeme.io dashboard |
| Revenue totals | Calculated from Systeme.io transaction data |
| CPA, ACV, ROAS | Calculated fields in tracking spreadsheet |

### Scaling Budget Progression

| Phase | Daily Budget | Trigger |
|-------|-------------|---------|
| Test (Days 1-7) | EUR 20/day | Launch |
| Validation (Days 8-14) | EUR 30/day | ROAS > 1.2, CPA < EUR 40, 10+ sales |
| Growth (Days 15-21) | EUR 50/day | ROAS > 1.5, stable CVR > 3% over 300+ views |
| Scale (Days 22-30) | EUR 75/day | Consistent profitability over 2+ weeks |
| Full scale (Month 2+) | EUR 100+/day | Proven funnel, 50+ total sales |

Rule: Never increase budget by more than 30% in a single change. Wait 3 days after each increase before adjusting again.

---

## Edge Cases

- **EUR 17 test price variant**: If the front-end price is tested at EUR 17 instead of EUR 27, all downstream economics change. ACV drops to approximately EUR 38. The CPA target must be recalculated: break-even on front-end becomes EUR 17, requiring either cheaper traffic or higher bump/upsell rates to maintain profitability.
- **Zero upsell sales in first week**: If no upsells close after 20+ front-end sales, ACV is only EUR 31-34 (front-end + bumps). This is still above the EUR 25 CPA target but leaves little margin. Investigate upsell page load issues before concluding the offer is wrong.
- **High bump, low upsell scenario**: If bump rate exceeds 50% but upsell rate is below 10%, ACV may still be acceptable (~EUR 40). This pattern suggests the audience prefers low-price additions over big commitments -- consider testing a lower-price upsell (EUR 37-47).
- **Weekday vs weekend performance**: Spanish digital product buyers may show different patterns on weekdays vs weekends. The decision framework should use rolling averages (3+ days) rather than single-day snapshots to avoid day-of-week noise.
- **VAT considerations**: All prices include 21% IVA. The EUR 27 price means EUR 22.31 net revenue before payment processing fees. Stripe fees (~1.5% + EUR 0.25 per transaction) reduce net revenue further. Actual net per front-end sale: approximately EUR 21.66. Economic model uses gross revenue for simplicity; net margin calculations should account for VAT and processing fees separately.
- **Refund impact**: The 30-day money-back guarantee means some portion of sales will be refunded. At an industry-standard 3-5% refund rate, 1-2 out of every 27 monthly sales may be refunded. Refunded sales still incur ad cost but return no revenue. Factor this into conservative projections.
- **Seasonal fluctuation**: AI-related search volume in Spain may spike around product launches (ChatGPT updates, new tools). CPC and volume are not constant -- monthly projections are averages, not guarantees.

---

## Dependencies

- **checkout-integration.md**: Defines the Systeme.io funnel structure, product configuration, and price points that this economic model is built upon.
- **google-ads-campaign.md**: Campaign structure, keyword targeting, and bid strategy that determine CPC and traffic volume.
- **analytics-tracking.md**: GA4 event tracking and conversion measurement that feed data into the daily tracking template.
- **data/tracking-metrics/daily-tracking-template.md**: The operational spreadsheet template referenced by this spec.
- **data/tracking-metrics/systeme-io-setup-checklist.md**: Product and funnel configuration in Systeme.io that implements the economic model.
