# Tagging & Segmentation Strategy — All SLO Products

## Tag Naming Convention

All tags follow this format: `[category]_[product]_[detail]`

Categories:
- `src` — Source/origin
- `prod` — Product related
- `seq` — Sequence status
- `action` — User actions
- `interest` — Interest signals
- `aff` — Affiliate clicks/conversions
- `engagement` — Email engagement level

---

## Product Tags

### Product 1: Kit Fiscal del Autonomo

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `prod_fiscal_lead` | Enters funnel (gives email) | Identifies as fiscal lead |
| `prod_fiscal_buyer` | Completes purchase | Identifies as buyer |
| `prod_fiscal_nonbuyer` | Gave email but no purchase after 24h | Triggers recovery sequence |
| `prod_fiscal_upsell_buyer` | Bought masterclass upsell | Excludes from upsell pitches |
| `prod_fiscal_upsell_declined` | Declined upsell on checkout | Gets soft pitch later |
| `seq_fiscal_welcome_active` | Enters buyer welcome sequence | Prevents sequence overlap |
| `seq_fiscal_welcome_complete` | Finishes buyer welcome | Unlocks next sequences |
| `seq_fiscal_recovery_active` | Enters non-buyer recovery | Prevents duplicate sends |
| `seq_fiscal_recovery_complete` | Finishes recovery sequence | Moves to nurture |
| `seq_fiscal_nurture_active` | Enters quarterly nurture | Ongoing engagement |
| `seq_fiscal_affiliate_active` | Enters affiliate sequence | Monetization tracking |
| `aff_fiscal_quipu_click` | Clicks Quipu affiliate link | Affiliate tracking |
| `aff_fiscal_gestoria_click` | Clicks gestoria affiliate link | Affiliate tracking |
| `aff_fiscal_banking_click` | Clicks banking affiliate link | Affiliate tracking |
| `interest_fiscal_declaracion` | Opens/clicks tax declaration emails | Interest segmentation |
| `interest_fiscal_verifactu` | Opens/clicks VERIFACTU emails | Interest segmentation |

### Product 2: Planificador de Oposiciones

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `prod_opos_lead` | Enters funnel | Lead identification |
| `prod_opos_buyer` | Completes purchase | Buyer identification |
| `prod_opos_nonbuyer` | No purchase after 24h | Triggers recovery |
| `prod_opos_upsell_buyer` | Bought premium planner upsell | Excludes from pitches |
| `prod_opos_upsell_declined` | Declined upsell | Gets soft pitch later |
| `seq_opos_welcome_active` | Enters buyer welcome | Sequence tracking |
| `seq_opos_welcome_complete` | Finishes welcome | Unlocks next |
| `seq_opos_recovery_active` | Enters recovery | Prevents overlap |
| `seq_opos_recovery_complete` | Finishes recovery | Moves to nurture |
| `seq_opos_nurture_active` | Enters study tips | Ongoing value |
| `seq_opos_affiliate_active` | Enters affiliate | Monetization |
| `aff_opos_academia_click` | Clicks academia link | Affiliate tracking |
| `aff_opos_amazon_click` | Clicks Amazon books link | Affiliate tracking |
| `interest_opos_tecnicas` | Engages study technique emails | Segmentation |
| `interest_opos_motivacion` | Engages motivation emails | Segmentation |

### Product 3: Plantillas IA Profesionales

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `prod_ia_lead` | Enters funnel | Lead identification |
| `prod_ia_buyer` | Completes purchase | Buyer identification |
| `prod_ia_nonbuyer` | No purchase after 24h | Triggers recovery |
| `prod_ia_upsell_buyer` | Bought advanced course | Excludes from pitches |
| `prod_ia_upsell_declined` | Declined upsell | Gets soft pitch later |
| `seq_ia_welcome_active` | Enters buyer welcome | Sequence tracking |
| `seq_ia_welcome_complete` | Finishes welcome | Unlocks next |
| `seq_ia_recovery_active` | Enters recovery | Prevents overlap |
| `seq_ia_recovery_complete` | Finishes recovery | Moves to nurture |
| `seq_ia_nurture_active` | Enters AI tips | Ongoing value |
| `seq_ia_affiliate_active` | Enters affiliate | Monetization |
| `aff_ia_chatgpt_click` | Clicks ChatGPT Plus link | Affiliate tracking |
| `aff_ia_jasper_click` | Clicks Jasper link | Affiliate tracking |
| `aff_ia_notion_click` | Clicks Notion AI link | Affiliate tracking |
| `interest_ia_prompts` | Engages prompt emails | Segmentation |
| `interest_ia_automation` | Engages automation emails | Segmentation |

### Product 4: Calculadora Inversion Inmobiliaria

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `prod_inmob_lead` | Enters funnel | Lead identification |
| `prod_inmob_buyer` | Completes purchase | Buyer identification |
| `prod_inmob_nonbuyer` | No purchase after 24h | Triggers recovery |
| `prod_inmob_upsell_buyer` | Bought investor course | Excludes from pitches |
| `prod_inmob_upsell_declined` | Declined upsell | Gets soft pitch later |
| `seq_inmob_welcome_active` | Enters buyer welcome | Sequence tracking |
| `seq_inmob_welcome_complete` | Finishes welcome | Unlocks next |
| `seq_inmob_recovery_active` | Enters recovery | Prevents overlap |
| `seq_inmob_recovery_complete` | Finishes recovery | Moves to nurture |
| `seq_inmob_nurture_active` | Enters investor nurture | Ongoing value |
| `seq_inmob_affiliate_active` | Enters affiliate | Monetization |
| `aff_inmob_hipoteca_click` | Clicks mortgage broker link | Affiliate tracking |
| `aff_inmob_plataforma_click` | Clicks property platform link | Affiliate tracking |
| `aff_inmob_seguro_click` | Clicks insurance link | Affiliate tracking |
| `interest_inmob_fiscalidad` | Engages tax optimization emails | Segmentation |
| `interest_inmob_financiacion` | Engages financing emails | Segmentation |

### Product 5: Marketing Digital para Pymes

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `prod_mkt_lead` | Enters funnel | Lead identification |
| `prod_mkt_buyer` | Completes purchase | Buyer identification |
| `prod_mkt_nonbuyer` | No purchase after 24h | Triggers recovery |
| `prod_mkt_upsell_buyer` | Bought marketing course | Excludes from pitches |
| `prod_mkt_upsell_declined` | Declined upsell | Gets soft pitch later |
| `seq_mkt_welcome_active` | Enters buyer welcome | Sequence tracking |
| `seq_mkt_welcome_complete` | Finishes welcome | Unlocks next |
| `seq_mkt_recovery_active` | Enters recovery | Prevents overlap |
| `seq_mkt_recovery_complete` | Finishes recovery | Moves to nurture |
| `seq_mkt_nurture_active` | Enters marketing tips | Ongoing value |
| `seq_mkt_affiliate_active` | Enters affiliate | Monetization |
| `aff_mkt_siteground_click` | Clicks SiteGround link | Affiliate tracking |
| `aff_mkt_brevo_click` | Clicks Brevo link | Affiliate tracking |
| `aff_mkt_canva_click` | Clicks Canva Pro link | Affiliate tracking |
| `interest_mkt_seo` | Engages SEO emails | Segmentation |
| `interest_mkt_redes` | Engages social media emails | Segmentation |

---

## Engagement Tags (Applied Automatically)

| Tag | Criteria | Action |
|-----|----------|--------|
| `engagement_hot` | Opened 3+ emails in last 7 days | Priority for sales offers |
| `engagement_warm` | Opened 1-2 emails in last 14 days | Standard nurture |
| `engagement_cold` | No opens in 30+ days | Re-engagement campaign |
| `engagement_dead` | No opens in 90+ days | Suppress or remove |

## Source Tags

| Tag | Applied When |
|-----|-------------|
| `src_facebook_ads` | Came from Facebook/Instagram ad |
| `src_google_ads` | Came from Google ad |
| `src_organic_search` | Came from SEO |
| `src_organic_social` | Came from organic social post |
| `src_referral` | Came from referral/affiliate |
| `src_youtube` | Came from YouTube |
| `src_tiktok` | Came from TikTok |
| `src_blog` | Came from blog post |

---

## Segmentation Rules

### Rule 1: Buyer vs Non-Buyer Separation
- Contacts tagged `prod_[x]_buyer` are NEVER sent `non-buyer-recovery` emails for that product
- Buying removes `prod_[x]_nonbuyer` tag and adds `prod_[x]_buyer`

### Rule 2: Sequence Exclusion
- A contact can only be in ONE active sequence per product at a time
- `seq_[x]_[y]_active` tags prevent enrollment in other sequences
- On sequence completion, active tag is removed and `_complete` tag is added

### Rule 3: Cross-Product Intelligence
- Buyers of one product get tagged for cross-sell opportunities
- Example: `prod_fiscal_buyer` + `prod_inmob_buyer` = high-value investor segment
- Multi-buyers get `engagement_multibuyer` tag

### Rule 4: Affiliate Click Tracking
- Every affiliate link click adds a tag
- 2+ clicks on same affiliate = high intent, trigger follow-up email
- Affiliate conversions tracked via postback URL with tag `aff_[x]_converted`

### Rule 5: Suppression Lists
- `suppress_sales` — Temporary, remove after 7 days (just purchased)
- `suppress_all` — Unsubscribed from all communications
- `suppress_product_[x]` — Unsubscribed from specific product emails only

---

## Systeme.io Implementation Notes

1. Create tags in Settings > Tags before building automations
2. Use automation rules to add/remove tags at each step
3. Set up tag-based triggers for sequence enrollment
4. Use "Has tag" / "Does not have tag" conditions for branching
5. Webhook integration for purchase events from payment processor

## Brevo Implementation Notes

1. Use Lists for broad segments, Tags for granular tracking
2. Create automation workflows with tag-based entry conditions
3. Use Brevo's API for real-time tag updates on purchase events
4. Set up contact attributes for custom fields (nombre, producto, fecha_compra)
5. Use segments with AND/OR logic for complex targeting
