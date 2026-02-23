# Automation Flows — ASCII Diagrams

## Master Flow Architecture

All 5 products follow the same core flow structure. Product-specific variations are noted where applicable.

```
                         ┌─────────────────────┐
                         │   VISITOR ARRIVES    │
                         │   (Ad / Organic)     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   SLO LANDING PAGE   │
                         │   Enters email for   │
                         │   lead magnet/offer  │
                         └──────────┬──────────┘
                                    │
                              Tag added:
                           prod_[x]_lead
                           src_[source]
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   CHECKOUT PAGE      │
                         │   SLO offer shown    │
                         └──────────┬──────────┘
                                    │
                        ┌───────────┴───────────┐
                        │                       │
                   PURCHASED               DID NOT BUY
                        │                       │
                        ▼                       ▼
              ┌─────────────────┐    ┌─────────────────────┐
              │ Tag: buyer      │    │ Wait 1 hour         │
              │ Remove: nonbuyer│    │ Check: still no     │
              │ Show: Upsell    │    │ purchase?            │
              └────────┬────────┘    └──────────┬──────────┘
                       │                        │
              ┌────────┴────────┐          YES  │
              │                 │               ▼
         BOUGHT UPSELL    DECLINED     ┌─────────────────┐
              │               │        │ Tag: nonbuyer    │
              ▼               ▼        │ START: Non-buyer │
     Tag: upsell_buyer  Tag: upsell_   │ Recovery (5 em.) │
              │          declined      └────────┬────────┘
              │               │                 │
              └───────┬───────┘          ┌──────┴──────┐
                      │                  │             │
                      ▼              PURCHASED     FINISHED
                ┌───────────────┐   (during seq)   (no buy)
                │ START: Buyer  │        │             │
                │ Welcome       │        ▼             ▼
                │ Sequence      │   Move to Buyer   Tag: recovery
                │ (7 emails)    │   Welcome seq     _complete
                └───────┬──────┘                       │
                        │                              ▼
                        ▼                     ┌─────────────────┐
               ┌─────────────────┐            │ START: Nurture  │
               │ Tag: welcome    │            │ Sequence        │
               │ _complete       │            │ (4-10 emails)   │
               └───────┬────────┘            └────────┬────────┘
                       │                              │
              ┌────────┴────────┐                     ▼
              │                 │            ┌─────────────────┐
        HAS upsell_       HAS upsell_       │ Tag: nurture    │
        declined          buyer              │ _complete       │
              │                 │            └────────┬────────┘
              ▼                 ▼                     │
     ┌─────────────┐   ┌─────────────┐               ▼
     │ Soft upsell │   │ Skip to     │      ┌─────────────────┐
     │ in welcome  │   │ affiliate   │      │ Monitor for     │
     │ emails      │   │ sequence    │      │ cross-sell      │
     └──────┬──────┘   └──────┬──────┘      │ opportunities   │
            │                 │              └─────────────────┘
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ START: Affiliate│
            │ Sequence        │
            │ (5 emails)      │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Tag: affiliate  │
            │ _complete       │
            │ Move to ongoing │
            │ newsletter      │
            └─────────────────┘
```

---

## Flow 1: Kit Fiscal del Autonomo

```
TRIGGER: Purchase of Kit Fiscal
    │
    ▼
┌───────────────────────────────────────────────────────────┐
│                 BUYER WELCOME SEQUENCE                     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Email 1 (Immediate) ─── Delivery + Quick Win            │
│       │                                                   │
│       ▼                                                   │
│  Email 2 (Day 1) ─── Expense Tracker Tutorial            │
│       │                                                   │
│       ▼                                                   │
│  Email 3 (Day 3) ─── 5 Gastos Deducibles Olvidados      │
│       │                                                   │
│       ▼                                                   │
│  Email 4 (Day 5) ─── VERIFACTU Checklist                │
│       │                                                   │
│       ▼                                                   │
│  Email 5 (Day 7) ─── Caso Maria (€2,400 ahorro)         │
│       │                                                   │
│       ▼                                                   │
│  ┌─────────────────────────────────┐                     │
│  │ CHECK: Has tag upsell_buyer?    │                     │
│  └───────────┬─────────────────────┘                     │
│         NO   │    YES                                     │
│         │    └──► Skip Email 6, go to Email 7            │
│         ▼                                                 │
│  Email 6 (Day 10) ─── Masterclass Soft Pitch             │
│       │                                                   │
│       ▼                                                   │
│  Email 7 (Day 14) ─── Gestoria Affiliate                 │
│       │                                                   │
│  Add tag: seq_fiscal_welcome_complete                     │
│  Remove tag: seq_fiscal_welcome_active                    │
└───────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ Wait 3 days                         │
│ START: Affiliate Sequence           │
│ Add tag: seq_fiscal_affiliate_active│
└──────────────┬──────────────────────┘
               │
    ┌──────────┴──────────────────────┐
    │  Email 1: Quipu/Holded (SaaS)  │
    │  Wait 3 days                    │
    │  Email 2: Gestoria Digital      │
    │  Wait 3 days                    │
    │  Email 3: Business Banking      │
    │  Wait 3 days                    │
    │  Email 4: Insurance             │
    │  Wait 3 days                    │
    │  Email 5: Invoicing Software    │
    └──────────────┬──────────────────┘
                   │
                   ▼
    ┌─────────────────────────────────┐
    │ Add tag: seq_fiscal_affiliate   │
    │ _complete                       │
    │ Enroll in: Quarterly Nurture    │
    └──────────────┬──────────────────┘
                   │
    ┌──────────────┴──────────────────┐
    │    QUARTERLY NURTURE LOOP       │
    │                                 │
    │  Q1 (Jan) ─── Prep Model 303   │
    │  Q2 (Apr) ─── Declaration Tips  │
    │  Q3 (Jul) ─── Mid-year Optim.  │
    │  Q4 (Oct) ─── Year-end Plan    │
    │                                 │
    │  Repeats annually               │
    └─────────────────────────────────┘


NON-BUYER RECOVERY:

TRIGGER: Tag prod_fiscal_nonbuyer added (1 hour after lead, no purchase)
    │
    ▼
┌───────────────────────────────────────────────────────────┐
│              NON-BUYER RECOVERY SEQUENCE                   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────┐                     │
│  │ CHECK: Has tag prod_fiscal_     │                     │
│  │ buyer? (purchased in meantime)  │                     │
│  └───────────┬─────────────────────┘                     │
│         NO   │    YES                                     │
│         │    └──► EXIT, move to Buyer Welcome             │
│         ▼                                                 │
│  Email 1 (1 hour) ─── Te quedaste a medias?              │
│       │                                                   │
│       ▼ Check buyer tag again                            │
│  Email 2 (Day 1) ─── 3 Gastos Deducibles Gratis         │
│       │                                                   │
│       ▼ Check buyer tag again                            │
│  Email 3 (Day 3) ─── Urgencia: Proximo Trimestre         │
│       │                                                   │
│       ▼ Check buyer tag again                            │
│  Email 4 (Day 5) ─── Social Proof (Testimonios)         │
│       │                                                   │
│       ▼ Check buyer tag again                            │
│  Email 5 (Day 7) ─── Oferta Final (Descuento)           │
│       │                                                   │
│  Add tag: seq_fiscal_recovery_complete                    │
│  Remove tag: seq_fiscal_recovery_active                   │
│  Move to: Nurture sequence (non-buyer variant)           │
└───────────────────────────────────────────────────────────┘
```

---

## Flow 2: Planificador de Oposiciones

```
TRIGGER: Purchase of Planificador
    │
    ▼
┌───────────────────────────────────────────────────────────┐
│                 BUYER WELCOME SEQUENCE                     │
├───────────────────────────────────────────────────────────┤
│  Email 1 (Immediate) ─── Delivery + Bienvenida           │
│       │                                                   │
│  Email 2 (Day 1) ─── Notion Setup Guide                  │
│       │                                                   │
│  Email 3 (Day 3) ─── Tecnica de Estudio #1               │
│       │                                                   │
│  Email 4 (Day 5) ─── Repeticion Espaciada                │
│       │                                                   │
│  Email 5 (Day 7) ─── Motivacion + Comunidad              │
│       │                                                   │
│  Email 6 (Day 10) ─── [IF !upsell_buyer] Niche Planner  │
│       │                                                   │
│  Email 7 (Day 14) ─── Academia Affiliate                 │
│                                                           │
│  Add tag: seq_opos_welcome_complete                       │
└────────────────────────┬──────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ Wait 3 days          │
              │ START: Study Tips    │
              │ Nurture (10 emails)  │
              │ 1 email per week     │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ START: Affiliate     │
              │ Sequence (5 emails)  │
              │ Interleaved with     │
              │ nurture or after     │
              └──────────────────────┘


NON-BUYER RECOVERY: Same structure as Kit Fiscal
    │
    Email 1 (1h) ─── Recordatorio + FAQ
    Email 2 (D1) ─── Valor gratis: Tecnica Pomodoro
    Email 3 (D3) ─── Urgencia: Plazas limitadas convocatoria
    Email 4 (D5) ─── Testimonios opositores
    Email 5 (D7) ─── Oferta final
```

---

## Flow 3: Plantillas IA Profesionales

```
TRIGGER: Purchase of Plantillas IA
    │
    ▼
┌───────────────────────────────────────────────────────────┐
│                 BUYER WELCOME SEQUENCE                     │
├───────────────────────────────────────────────────────────┤
│  Email 1 (Immediate) ─── Delivery + Quick Win Prompt     │
│       │                                                   │
│  Email 2 (Day 1) ─── Tu primer prompt perfecto           │
│       │                                                   │
│  Email 3 (Day 3) ─── Automatizacion con IA               │
│       │                                                   │
│  Email 4 (Day 5) ─── Tips por profesion                  │
│       │                                                   │
│  Email 5 (Day 7) ─── Tecnicas avanzadas                  │
│       │                                                   │
│  Email 6 (Day 10) ─── [IF !upsell_buyer] Curso avanzado │
│       │                                                   │
│  Email 7 (Day 14) ─── Tool affiliate (ChatGPT Plus)     │
│                                                           │
│  Add tag: seq_ia_welcome_complete                         │
└────────────────────────┬──────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ START: AI Tips       │
              │ Nurture (8 emails)   │
              │ 1 email per week     │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ START: Affiliate     │
              │ Sequence (5 emails)  │
              └──────────────────────┘
```

---

## Flow 4: Calculadora Inversion Inmobiliaria

```
TRIGGER: Purchase of Calculadora
    │
    ▼
┌───────────────────────────────────────────────────────────┐
│                 BUYER WELCOME SEQUENCE                     │
├───────────────────────────────────────────────────────────┤
│  Email 1 (Immediate) ─── Delivery + Bienvenida           │
│       │                                                   │
│  Email 2 (Day 1) ─── Tutorial Calculadora                │
│       │                                                   │
│  Email 3 (Day 3) ─── Caso practico (rentab. real)        │
│       │                                                   │
│  Email 4 (Day 5) ─── Optimizacion fiscal inmobiliaria    │
│       │                                                   │
│  Email 5 (Day 7) ─── Financiacion inteligente            │
│       │                                                   │
│  Email 6 (Day 10) ─── [IF !upsell_buyer] Curso inversor │
│       │                                                   │
│  Email 7 (Day 14) ─── Broker hipotecario affiliate       │
│                                                           │
│  Add tag: seq_inmob_welcome_complete                      │
└────────────────────────┬──────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ START: Investor      │
              │ Nurture (8 emails)   │
              │ 1 email per week     │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ START: Affiliate     │
              │ Sequence (5 emails)  │
              │ High-ticket focus    │
              │ (€100-500/referral)  │
              └──────────────────────┘
```

---

## Flow 5: Marketing Digital para Pymes

```
TRIGGER: Purchase of Marketing Digital Kit
    │
    ▼
┌───────────────────────────────────────────────────────────┐
│                 BUYER WELCOME SEQUENCE                     │
├───────────────────────────────────────────────────────────┤
│  Email 1 (Immediate) ─── Delivery + Bienvenida           │
│       │                                                   │
│  Email 2 (Day 1) ─── Google Business Profile Setup       │
│       │                                                   │
│  Email 3 (Day 3) ─── Quick Win Redes Sociales            │
│       │                                                   │
│  Email 4 (Day 5) ─── Email Marketing Setup               │
│       │                                                   │
│  Email 5 (Day 7) ─── SEO Basico                          │
│       │                                                   │
│  Email 6 (Day 10) ─── [IF !upsell_buyer] Curso completo │
│       │                                                   │
│  Email 7 (Day 14) ─── Herramientas affiliate             │
│                                                           │
│  Add tag: seq_mkt_welcome_complete                        │
└────────────────────────┬──────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ START: Marketing     │
              │ Tips (10 emails)     │
              │ 1 email per week     │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ START: Affiliate     │
              │ Sequence (5 emails)  │
              └──────────────────────┘
```

---

## Cross-Sell Flow (All Products)

```
TRIGGER: Contact has 1+ prod_[x]_buyer tags AND opens/clicks email
    │
    ▼
┌─────────────────────────────────────────────────┐
│           CROSS-SELL EVALUATION                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  IF prod_fiscal_buyer AND interest_inmob         │
│  ──► Pitch Calculadora Inversion                 │
│                                                  │
│  IF prod_inmob_buyer AND interest_fiscal         │
│  ──► Pitch Kit Fiscal                            │
│                                                  │
│  IF prod_mkt_buyer AND interest_ia               │
│  ──► Pitch Plantillas IA                         │
│                                                  │
│  IF prod_ia_buyer AND interest_mkt               │
│  ──► Pitch Marketing Digital Kit                 │
│                                                  │
│  IF prod_opos_buyer AND interest_ia              │
│  ──► Pitch Plantillas IA (study prompts)         │
│                                                  │
│  RULE: Max 1 cross-sell email per 14 days        │
│  RULE: Only if engagement_hot or engagement_warm │
│  RULE: Never cross-sell to engagement_cold       │
└─────────────────────────────────────────────────┘
```

---

## Re-Engagement Flow (All Products)

```
TRIGGER: Tag engagement_cold added (no opens 30+ days)
    │
    ▼
┌─────────────────────────────────────────────────┐
│           RE-ENGAGEMENT SEQUENCE                 │
├─────────────────────────────────────────────────┤
│                                                  │
│  Email 1 (Day 0) ─── "Te echamos de menos"      │
│       │              Subject: "{{nombre}}, hace  │
│       │              tiempo que no sabemos de ti" │
│       │                                          │
│       ▼ Wait 5 days                              │
│  ┌────────────────────────┐                      │
│  │ CHECK: Opened Email 1? │                      │
│  └────────┬───────────────┘                      │
│      NO   │   YES                                │
│      │    └──► Remove cold tag, resume nurture   │
│      ▼                                           │
│  Email 2 ─── "Ultimo aviso" + best content piece │
│       │                                          │
│       ▼ Wait 5 days                              │
│  ┌────────────────────────┐                      │
│  │ CHECK: Opened Email 2? │                      │
│  └────────┬───────────────┘                      │
│      NO   │   YES                                │
│      │    └──► Remove cold tag, resume nurture   │
│      ▼                                           │
│  Tag: engagement_dead                            │
│  Suppress from all sequences                     │
│  Clean from list after 90 days                   │
└─────────────────────────────────────────────────┘
```

---

## Systeme.io Implementation Order

1. Create all tags (see tagging-strategy.md)
2. Set up Buyer Welcome sequences (all 5 products)
3. Set up Non-Buyer Recovery sequences (all 5 products)
4. Set up Nurture sequences (all 5 products)
5. Set up Affiliate sequences (all 5 products)
6. Set up Cross-Sell flow
7. Set up Re-Engagement flow
8. Test all sequences with test contacts
9. Monitor and optimize based on open/click rates
