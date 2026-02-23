# Design System

## Job to Be Done

Provide a premium, trust-building dark-theme design system that converts Spanish professionals on mobile, establishing visual credibility for the "Pack de 275+ Prompts IA para Marketing y Negocios" (EUR 27) and driving CTA clicks to Systeme.io checkout.

---

## User Stories

### US-1: Mobile user scrolling the sales page
**As a** Spanish professional browsing on a 5.5-inch phone screen,
**I want** the design to feel premium and easy to read with clear visual hierarchy,
**so that** I trust the product enough to keep scrolling and eventually click the CTA.

**Acceptance Criteria:**
- Dark theme with sufficient contrast (WCAG 2.1 AA, minimum 4.5:1 for body text)
- Body text is 16px minimum on mobile; line-height >= 1.6 for readability
- CTA buttons have minimum 56px touch target height with generous horizontal padding
- Content width constrained to ~65ch for comfortable reading on larger screens
- Gradient accents (purple-to-blue) used sparingly to draw attention without overwhelming
- Sections have clear visual separation (spacing, background variation, or subtle borders)
- No horizontal scroll at any breakpoint from 320px upward

### US-2: First-time visitor skeptical about AI products
**As a** Spanish autonomo who has seen too many "get rich with AI" scams,
**I want** the design to feel professional and grounded, not hype-driven,
**so that** I take the product seriously and read the full sales page.

**Acceptance Criteria:**
- Typography is clean and professional (Inter for body, not decorative/novelty fonts)
- Color palette is restrained: dark backgrounds with controlled use of gradient accents
- Prompt preview components use monospace font (JetBrains Mono) for technical credibility
- Trust elements (guarantee badge, FAQ section) are visually distinct and easy to find
- No flashing, auto-playing video, or aggressive pop-ups
- Price presentation is clean with clear value stack formatting
- Badge and label components convey authority (e.g., "275+ Prompts", "30 dias garantia")

### US-3: Developer implementing components
**As a** developer building the Astro/Preact components,
**I want** a documented set of design tokens, component variants, and spacing rules,
**so that** I can implement consistent UI without making ad-hoc design decisions.

**Acceptance Criteria:**
- Color tokens defined as CSS custom properties (Tailwind 4.x `@theme` layer)
- Component catalog specifies all variants with exact token usage (colors, spacing, radii)
- Typography scale defined with specific sizes, weights, and line-heights per breakpoint
- Spacing follows a consistent scale (4px base unit)
- Animation specifications include duration, easing, and trigger conditions
- Breakpoint definitions match Tailwind defaults with documented mobile-first approach

### US-4: User with accessibility needs
**As a** visitor with low vision or who uses keyboard navigation,
**I want** the design to be accessible and respect my system preferences,
**so that** I can read the content and interact with all elements.

**Acceptance Criteria:**
- All text meets WCAG 2.1 AA contrast ratios (4.5:1 body text, 3:1 large text/UI components)
- Focus indicators visible on all interactive elements (buttons, accordion triggers, links)
- Focus indicators use a high-contrast outline (2px solid, offset from element)
- Interactive components have appropriate `aria-label`, `aria-expanded`, `role` attributes
- `prefers-reduced-motion: reduce` disables all animations (typewriter, fade-in, glow pulse)
- `prefers-color-scheme` respected if a light mode is ever added (future-proofing)
- Minimum touch target size: 44x44px (WCAG) with 56px preferred for primary CTAs

---

## Technical Details

### Color Palette

#### Core Colors (CSS custom properties via Tailwind 4.x `@theme`)
```
--color-primary:        #9333ea   /* purple-600 — primary brand, CTA gradient start */
--color-primary-hover:  #7c22ce   /* purple-700 — hover state */
--color-accent:         #3b82f6   /* blue-500 — CTA gradient end, links, highlights */
--color-accent-hover:   #2563eb   /* blue-600 — hover state */
```

#### Background & Surface
```
--color-bg:             #020617   /* slate-950 — page background */
--color-surface:        #0f172a   /* slate-900 — section alternate background */
--color-card:           rgba(30, 41, 59, 0.5)  /* slate-800/50 — card background */
--color-card-border:    rgba(71, 85, 105, 0.3) /* slate-600/30 — subtle card borders */
```

#### Text
```
--color-text-primary:   #f8fafc   /* slate-50 — headings, primary text */
--color-text-secondary: #cbd5e1   /* slate-300 — body text, descriptions */
--color-text-muted:     #64748b   /* slate-500 — captions, disclaimers */
```

#### Semantic
```
--color-success:        #22c55e   /* green-500 — checkmarks, positive indicators */
--color-warning:        #f59e0b   /* amber-500 — attention callouts */
--color-error:          #ef4444   /* red-500 — error states */
```

#### Gradients
```
--gradient-cta:         linear-gradient(135deg, #9333ea, #2563eb)  /* purple-600 → blue-600 */
--gradient-cta-hover:   linear-gradient(135deg, #7c22ce, #1d4ed8)  /* purple-700 → blue-700 */
--gradient-hero:        linear-gradient(180deg, #0f172a 0%, #020617 100%)  /* subtle hero bg */
--gradient-glow:        radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)
```

### Typography

#### Font Families
- **Body/Headings:** Inter (variable weight, loaded via Google Fonts with `font-display: swap`)
- **Prompt previews / code:** JetBrains Mono (loaded via Google Fonts, only `400` and `700` weights)

#### Type Scale (mobile-first, rem units)
| Token | Mobile (< 640px) | Desktop (>= 1024px) | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 0.75rem / 12px | 0.75rem | 400 | Captions, fine print |
| `text-sm` | 0.875rem / 14px | 0.875rem | 400 | Labels, badges |
| `text-base` | 1rem / 16px | 1.125rem / 18px | 400 | Body text |
| `text-lg` | 1.125rem / 18px | 1.25rem / 20px | 500 | Subheadings, lead text |
| `text-xl` | 1.25rem / 20px | 1.5rem / 24px | 600 | Section subheadings |
| `text-2xl` | 1.5rem / 24px | 2rem / 32px | 700 | Section headings |
| `text-3xl` | 1.875rem / 30px | 2.5rem / 40px | 700 | Page headings |
| `text-4xl` | 2.25rem / 36px | 3.5rem / 56px | 800 | Hero headline |
| `text-price` | 3rem / 48px | 4.5rem / 72px | 800 | Price display (27 EUR) |

#### Line Heights
- Body text: 1.7 (relaxed, good for long-form Spanish text)
- Headings: 1.2
- Price/display: 1.1

### Spacing Scale
Base unit: 4px. Use Tailwind's default spacing scale.
| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight inline spacing |
| `space-2` | 8px | Icon gaps, badge padding |
| `space-3` | 12px | Button padding-y, card inner padding |
| `space-4` | 16px | Component spacing |
| `space-6` | 24px | Section inner padding (mobile) |
| `space-8` | 32px | Section spacing |
| `space-12` | 48px | Section padding (mobile) |
| `space-16` | 64px | Section padding (desktop) |
| `space-20` | 80px | Large section gaps |
| `space-24` | 96px | Hero vertical padding (desktop) |

### Breakpoints (mobile-first)
| Name | Min-width | Usage |
|---|---|---|
| (default) | 0px | Mobile phones (320px–639px) |
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops, desktops |
| `xl` | 1280px | Large desktops |

Content max-width: `max-w-4xl` (896px) for text sections, `max-w-6xl` (1152px) for grid layouts.

### Component Catalog

#### Button
Three variants, all with `rounded-xl` (12px radius), `font-semibold`, `transition-all duration-200`.

| Variant | Background | Text | Border | Min Height | Use Case |
|---|---|---|---|---|---|
| **primary** | `gradient-cta` | white | none | 56px | CTA buttons (checkout) |
| **secondary** | transparent | `color-accent` | 1px `color-accent` | 48px | Secondary actions |
| **ghost** | transparent | `color-text-secondary` | none | 44px | Tertiary actions, links |

**Primary button states:**
- Default: gradient background with subtle box-shadow glow (`0 0 20px rgba(147,51,234,0.3)`)
- Hover: `gradient-cta-hover`, increased glow (`0 0 30px rgba(147,51,234,0.5)`), slight scale (`scale-[1.02]`)
- Active: scale down (`scale-[0.98]`), no glow
- Focus: 2px outline offset, `color-accent`
- Disabled: opacity 50%, no pointer events

**Primary CTA text pattern:** Always includes price — e.g., "Quiero Mis 275+ Prompts Ahora -- 27 EUR"

#### Accordion (Preact island)
Used for FAQ section and optionally ProductContents.
- Trigger: full-width clickable row with question text + chevron icon
- Chevron rotates 180deg on open (transition 200ms ease)
- Content area: max-height transition for smooth expand/collapse
- `aria-expanded` on trigger, `role="region"` on content panel
- Only one item open at a time (single-expand mode)
- Border-bottom separator between items (`color-card-border`)

#### Card
Used for BenefitsGrid, product content categories.
- Background: `color-card` with `backdrop-blur-sm`
- Border: 1px `color-card-border`
- Border-radius: `rounded-2xl` (16px)
- Padding: `space-6` (24px)
- Hover (optional): subtle border color shift to `color-accent/30`

#### Badge
Inline label for counts, categories, trust signals.
- Background: `color-primary/10` (purple with 10% opacity)
- Text: `color-primary` (purple-600)
- Font-size: `text-sm`, `font-medium`
- Padding: `space-1` vertical, `space-2` horizontal
- Border-radius: `rounded-full`
- Variants: purple (default), blue (accent), green (success/trust)

#### StickyCtaBar (Preact island)
Fixed bottom bar on mobile only.
- Background: `color-surface` with `backdrop-blur-lg` and top border (`color-card-border`)
- Height: 72px
- Contains: price text (left) + primary CTA button (right)
- Shows after scrolling past the hero section (IntersectionObserver)
- Hides when scrolling up near the hero or when another CTA is visible
- `z-50` stacking context
- Hidden on desktop (`lg:hidden`)

#### PromptPreview (terminal-style)
Terminal-aesthetic component for prompt showcase.
- Background: `#0d1117` (GitHub-dark terminal look)
- Border: 1px `color-card-border`, `rounded-xl`
- Top bar: three dots (red/yellow/green circles) simulating terminal window chrome
- Font: JetBrains Mono, `text-sm`
- Prompt text: `color-success` (green)
- Response text: `color-text-secondary` (slate-300)
- Typewriter animation for prompt text (Preact island)
- Fade-in for response text after typewriter completes

### Animations

| Animation | Trigger | Duration | Easing | Details |
|---|---|---|---|---|
| **Fade-in on scroll** | Element enters viewport (IntersectionObserver) | 600ms | ease-out | `opacity: 0 → 1`, `translateY: 20px → 0`. Applied to section containers. |
| **Typewriter** | PromptShowcase section visible | ~50ms per char | linear | Characters appear one by one. Cursor blinks at end. 3 rotating examples with 3s pause between. |
| **CTA glow pulse** | Continuous on primary CTA | 2s | ease-in-out | Box-shadow opacity pulses between 0.2 and 0.4. Subtle, not distracting. |
| **Accordion expand** | User clicks trigger | 200ms | ease | Max-height from 0 to content height. Chevron rotates 180deg. |
| **StickyCtaBar slide** | Scroll past hero | 300ms | ease-out | `translateY: 100% → 0`. |

All animations disabled when `prefers-reduced-motion: reduce` is active.

### Spanish Formatting Conventions
- **Number formatting:** `1.234,56` (dot for thousands, comma for decimals)
- **Currency:** `27 EUR` or `27 euros` (symbol after number, with space)
- **Price display:** Large price uses `text-price` token, EUR symbol in `text-xl`
- **Strikethrough pricing:** Original value in `text-muted` with `line-through`, offer price in `color-text-primary`

---

## Edge Cases

- **320px viewport:** All components must be usable at 320px width. CTA button text may wrap to two lines; ensure button still looks intentional (center-aligned text, adequate padding).
- **Very long Spanish words:** Spanish has long compound words. Test text wrapping in headings and buttons with realistic copy. Use `overflow-wrap: break-word` on text containers.
- **System font fallback:** If Inter or JetBrains Mono fail to load, ensure fallback stack (`system-ui, sans-serif` / `monospace`) does not cause significant CLS. Use `font-display: swap` with `size-adjust` if needed.
- **Dark mode only:** No light mode toggle exists. Users with `prefers-color-scheme: light` still see dark theme. Ensure all colors are hardcoded, not relying on system preference.
- **Transparent/glass effects on older browsers:** `backdrop-blur` is not supported on Firefox < 103. Cards should have a solid fallback background color.
- **High-contrast mode (Windows):** Test that forced-colors media query does not break button visibility. Ensure borders exist (not just background changes) for interactive element distinction.
- **Zoom to 200%:** Content must reflow without horizontal scroll up to 200% browser zoom (WCAG 1.4.10).
- **StickyCtaBar overlap:** Ensure bottom sticky bar does not overlap page footer or cookie consent banner. Add appropriate bottom padding to page content.

---

## Dependencies

- **site-architecture.md** — Project structure, Tailwind 4.x configuration, Astro/Preact setup
- **sales-page-sections.md** — Section-specific component requirements that consume this design system
