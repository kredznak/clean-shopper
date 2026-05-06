# Design System: Clean Shopper
**Date:** 2026-03-30  |  **Version:** 1.0  |  **Platform:** Web

---

## Design Direction

Clean Shopper should feel like a trusted wellness brand — generous, approachable, and credible without being clinical. The reference points are Thrive Market and Grove Collaborative: clean layouts with an organic sensibility, confident use of color that feels natural rather than decorative, and a tone that informs rather than sells.

The experience is closer to consulting a knowledgeable friend than browsing a store. There is no urgency, no pressure, no conversion tactics. Information appears when you need it — enough to be informed, never overwhelmed. The visual environment should feel like walking in nature: soft light, earthy tones, soothing and calming.

Everything should be spacious, visual, and simple. Text is warm and readable. Accessibility is a core value, not a checkbox — strong contrast and readability are baked into the palette, not bolted on after.

## Design Principles

**Let the content breathe.** Generous whitespace is not wasted space — it creates calm. Every element earns its place by serving the user, not filling a layout.

**Earn trust through restraint.** No selling, no urgency, no visual noise. Confidence comes from saying less, not more. The interface recedes so the information can lead.

**Nature as reference.** Color, texture, and rhythm draw from the natural world — earthy, muted, organic. Nothing synthetic, nothing neon, nothing that demands attention.

**Show only what's needed.** Information is progressive, not exhaustive. The default state is simple. Depth is available when the user asks for it.

**Accessible by nature.** Strong contrast and readability are not accommodations — they are the foundation. The calm palette and the accessibility commitment reinforce each other.

## Color System

### Palette Philosophy

The palette is drawn from nature — forest greens, warm stones, soft earth. Colors are muted and grounded, never saturated or loud. The primary green connects directly to the product's mission (clean, natural, healthy) without feeling clinical. Pops of a warm accent color (inspired by Monocle's editorial confidence) provide moments of personality in an otherwise quiet palette.

### Primary Colors

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| color-primary | Sage | #6B8F71 | Primary actions, links, active states. A muted forest green — natural and trustworthy. |
| color-primary-light | Soft Sage | #8FB396 | Hover states, selected backgrounds, subtle highlights. |
| color-primary-dark | Deep Forest | #4A6B50 | Pressed states, high-emphasis text on light backgrounds. |
| color-accent | Soft Teal | #4AADA8 | Accents, interactive highlights, featured content. A calm blue-green that complements the primary green without competing. |

### Semantic Colors

| Role | Hex | Usage |
|------|-----|-------|
| Success | #6B8F71 | Clean ingredient confirmed, preference saved. Shares the primary green — "clean" IS success here. |
| Warning | #C4944A | Ingredient caution, unverified claim, partial match. Warm amber, not alarming. |
| Error | #B85C5C | Harmful ingredient flagged, action failed. Muted red — serious but not aggressive. |
| Info | #7B8FA1 | Contextual tips, explanations, supplementary detail. Cool slate, recedes naturally. |

### Neutral Scale

| Token | Hex | Usage |
|-------|-----|-------|
| neutral-50 | #F7F5F2 | Page background. Warm off-white with a hint of stone. |
| neutral-100 | #EFECE7 | Secondary backgrounds, subtle section breaks. |
| neutral-200 | #E2DDD5 | Borders, dividers, input backgrounds. |
| neutral-300 | #CFC8BD | Disabled backgrounds, subtle UI elements. |
| neutral-400 | #A89F93 | Placeholder text, disabled text, tertiary icons. |
| neutral-500 | #857C71 | Secondary text, metadata, captions. |
| neutral-600 | #655D53 | Body text. Warm dark brown — high readability on light surfaces. |
| neutral-700 | #4A443C | Emphasized body text, subheadings. |
| neutral-800 | #332E28 | Headings, primary text, high-emphasis labels. |
| neutral-900 | #1E1B17 | Maximum emphasis. Rarely used — reserved for display text. |

### Surface Colors

| Surface | Hex | Usage |
|---------|-----|-------|
| Page background | #F7F5F2 (neutral-50) | Main canvas. Warm stone-white. |
| Card / elevated | #EFECE7 (neutral-100) | Product cards, chat bubbles (AI), comparison panels. Warm stone — slightly deeper than the page background. |
| Sidebar / secondary | #EDE3CB (warm sand) | Preferences panel, cart sidebar, secondary surfaces. Distinct from the stone-white page background — adds warmth. |
| Overlay backdrop | rgba(30, 27, 23, 0.4) | Modal and drawer backdrops. Warm black at low opacity. |

### Accessibility

**Target:** WCAG AAA where achievable, AA as the absolute minimum.

Key contrast ratios:
- neutral-600 (#655D53) on neutral-50 (#F7F5F2): **5.2:1** — passes AA, body text
- neutral-800 (#332E28) on white (#FFFFFF): **13.8:1** — passes AAA, headings
- neutral-900 (#1E1B17) on neutral-50 (#F7F5F2): **14.1:1** — passes AAA, display text
- color-primary-dark (#4A6B50) on white (#FFFFFF): **5.5:1** — passes AA, link text
- Error (#B85C5C) on white (#FFFFFF): **4.6:1** — passes AA for large text; pair with icon for normal text

Accessibility is not an afterthought. The muted, earthy palette was built with these ratios in mind — the calm aesthetic and readability reinforce each other.

## Typography

### Type Philosophy

Text should feel warm and readable — like a well-edited magazine, not a technical manual. The typeface is humanist, with subtle organic character that connects to the natural theme without feeling decorative. Reading should feel effortless, even for ingredient lists and comparison data.

### Font Stack

| Role | Font | Fallback | Rationale |
|------|------|----------|-----------|
| Primary | Poppins | system-ui, -apple-system, sans-serif | A geometric sans-serif that reads as modern and friendly — accessible and confident without feeling clinical. Sufficient weight range (300–700) to cover the full type scale without a second typeface. |
| Monospace | JetBrains Mono | ui-monospace, 'Cascadia Code', monospace | Ingredient lists, EWG scores, data-heavy comparisons. Clear at small sizes. |

Poppins handles all type roles — display, headings, body, labels, and metadata. No secondary typeface is needed.

### Type Scale

Scale ratio: 1.25 (major third)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| display | 2.441rem (39px) | 300 | 1.15 | Hero moments, landing headline. Light weight for elegance. Poppins. |
| h1 | 1.953rem (31px) | 400 | 1.2 | Page titles. Poppins. |
| h2 | 1.563rem (25px) | 600 | 1.25 | Section headings. Poppins. |
| h3 | 1.25rem (20px) | 600 | 1.3 | Card titles, subsection heads. Poppins. |
| h4 | 1rem (16px) | 600 | 1.35 | Label headings, sidebar titles. Poppins. |
| body | 1rem (16px) | 400 | 1.7 | Paragraphs, chat messages, descriptions. Generous line-height for readability. Poppins. |
| small | 0.875rem (14px) | 400 | 1.5 | Captions, metadata, helper text. Poppins. |
| caption | 0.75rem (12px) | 500 | 1.4 | Badges, tags, timestamps. Poppins. |

### Letter Spacing

- Display: `-0.02em` — slight tightening at large sizes for elegance
- H1: `-0.01em`
- All-caps text (rare — badges only): `0.08em`
- Body and below: `0` (default)

## Spacing System

### Spacing Philosophy

Spacious and gallery-like. The user asked for breathing room, and the product's conversational interface benefits from generous spacing — it creates the calm, unpressured feeling of consulting a friend rather than scrolling a crowded marketplace. White space signals confidence and trust.

### Base Unit

**4px.** Small enough for fine-tuning, scales cleanly to the larger steps.

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Icon-to-text micro gap, inline adjustments. |
| space-2 | 8px | Tight element pairs, tag padding, badge spacing. |
| space-3 | 12px | Related element gaps, input icon inset. |
| space-4 | 16px | Default gap between related items, card internal padding. |
| space-6 | 24px | Card-to-card gap, form field spacing. |
| space-8 | 32px | Section padding, sidebar internal margins. |
| space-10 | 40px | Major content breaks within a section. |
| space-12 | 48px | Section-to-section spacing. |
| space-16 | 64px | Page section vertical rhythm, hero spacing. |

### Layout Metrics

| Property | Value |
|----------|-------|
| Content max-width | 720px (conversational focus — narrow for readability) |
| Wide max-width | 1080px (comparison views, when needed) |
| Page margin (desktop) | 32px (space-8) |
| Page margin (mobile) | 16px (space-4) |
| Section spacing | 48px (space-12) |

## Shape and Borders

### Shape Philosophy

Soft and organic. Rounded shapes reinforce the natural, approachable feel. Nothing is sharp or angular — edges are always eased, like river stones. The roundness increases with element size, creating a consistent but not monotonous rhythm.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 6px | Badges, tags, small chips. |
| radius-md | 10px | Buttons, inputs, dropdowns. |
| radius-lg | 14px | Cards, panels, chat bubbles. |
| radius-xl | 20px | Featured cards, hero elements. |
| radius-full | 9999px | Avatars, pills, toggle tracks. |

### Borders

| Type | Value |
|------|-------|
| Default | 1px solid #E2DDD5 (neutral-200) |
| Subtle | 1px solid #EFECE7 (neutral-100) |
| Focus ring | 2px solid #6B8F71 (primary), 2px offset |

### Shadows

| Level | Value | Usage |
|-------|-------|-------|
| shadow-sm | 0 1px 3px rgba(30, 27, 23, 0.06), 0 1px 2px rgba(30, 27, 23, 0.04) | Cards, subtle elevation. |
| shadow-md | 0 4px 12px rgba(30, 27, 23, 0.08), 0 2px 4px rgba(30, 27, 23, 0.04) | Popovers, floating elements. |
| shadow-lg | 0 12px 28px rgba(30, 27, 23, 0.12), 0 4px 8px rgba(30, 27, 23, 0.06) | Modals, dialogs. |

## Motion

### Motion Philosophy

Smooth and polished but never showy. Motion exists to make transitions feel crafted and intentional — things ease in gently, settle naturally, and never bounce or overshoot. The pace matches the calm environment: nothing snaps, nothing races. Content speaks for itself; motion just makes the experience feel considered.

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| duration-fast | 120ms | Hover states, color transitions, micro-interactions. |
| duration-normal | 220ms | Dropdowns, tooltips, tab switches. |
| duration-slow | 380ms | Modals, sidebars, page transitions. |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| ease-default | cubic-bezier(0.25, 0.1, 0.25, 1) | General transitions — smooth and natural. |
| ease-in | cubic-bezier(0.42, 0, 1, 1) | Elements leaving the viewport. |
| ease-out | cubic-bezier(0, 0, 0.58, 1) | Elements entering — arrives gently. |

### Reduced Motion

All motion wrapped in `@media (prefers-reduced-motion: no-preference)`. With reduced motion enabled, transitions are instant (opacity crossfade only, 0ms duration). Accessibility commitment extends to motion sensitivity.

## Dark Mode

Not included in V1. The warm, earthy light-mode palette is the primary experience and aligns with the natural, soft-light aesthetic the user described. Dark mode may be explored in V2 once the foundational system is validated.

## Responsive Breakpoints

| Name | Value | Behavior |
|------|-------|----------|
| sm | 640px | Single column. Chat full-width. Cards stack vertically. Sidebar becomes full-screen drawer. |
| md | 768px | Chat narrows to max-width. Product cards in 2-column grid where applicable. |
| lg | 1024px | Sidebar can persist alongside main content. Two-panel layouts available. |
| xl | 1280px | Max-width container centered with generous margins. Comparison views expand. |

## Design Tokens (CSS Custom Properties)

```css
:root {
  /* --- Colors: Primary --- */
  --color-primary: #6B8F71;
  --color-primary-light: #8FB396;
  --color-primary-dark: #4A6B50;
  --color-accent: #4AADA8;

  /* --- Colors: Semantic --- */
  --color-success: #6B8F71;
  --color-warning: #C4944A;
  --color-error: #B85C5C;
  --color-info: #7B8FA1;

  /* --- Colors: Neutrals --- */
  --neutral-50: #F7F5F2;
  --neutral-100: #EFECE7;
  --neutral-200: #E2DDD5;
  --neutral-300: #CFC8BD;
  --neutral-400: #A89F93;
  --neutral-500: #857C71;
  --neutral-600: #655D53;
  --neutral-700: #4A443C;
  --neutral-800: #332E28;
  --neutral-900: #1E1B17;

  /* --- Colors: Surfaces --- */
  --surface-page: #F7F5F2;
  --surface-card: #EFECE7;
  --surface-secondary: #EDE3CB;
  --surface-overlay: rgba(30, 27, 23, 0.4);

  /* --- Typography --- */
  --font-primary: 'Poppins', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace;

  --text-display: 2.441rem;
  --text-h1: 1.953rem;
  --text-h2: 1.563rem;
  --text-h3: 1.25rem;
  --text-h4: 1rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-caption: 0.75rem;

  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;

  --leading-display: 1.15;
  --leading-heading: 1.2;
  --leading-subheading: 1.3;
  --leading-body: 1.7;
  --leading-small: 1.5;
  --leading-caption: 1.4;

  --tracking-display: -0.02em;
  --tracking-heading: -0.01em;
  --tracking-caps: 0.08em;

  /* --- Spacing --- */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* --- Layout --- */
  --max-width-content: 720px;
  --max-width-wide: 1080px;
  --page-margin-desktop: 32px;
  --page-margin-mobile: 16px;

  /* --- Shape --- */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* --- Borders --- */
  --border-default: 1px solid #E2DDD5;
  --border-subtle: 1px solid #EFECE7;
  --focus-ring: 2px solid #6B8F71;
  --focus-offset: 2px;

  /* --- Shadows --- */
  --shadow-sm: 0 1px 3px rgba(30,27,23,0.06), 0 1px 2px rgba(30,27,23,0.04);
  --shadow-md: 0 4px 12px rgba(30,27,23,0.08), 0 2px 4px rgba(30,27,23,0.04);
  --shadow-lg: 0 12px 28px rgba(30,27,23,0.12), 0 4px 8px rgba(30,27,23,0.06);

  /* --- Motion --- */
  --duration-fast: 120ms;
  --duration-normal: 220ms;
  --duration-slow: 380ms;
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in: cubic-bezier(0.42, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.58, 1);
}
```

## Open Decisions

1. **Poppins across all type roles.** Confirmed. Single typeface simplifies implementation and keeps the system lightweight. If additional contrast is needed between headings and body at a later stage, a secondary serif could be revisited — but start with Poppins only.

2. **Accent color frequency.** Soft teal (#4AADA8) is positioned for interactive highlights and accents — but how often and where needs real screens to test. Too much and it competes with the primary green; too little and the warmth of the sand surface carries all the work.

3. **Content max-width at 720px.** Optimized for conversational readability. Comparison views may need the wider 1080px container — the trigger for switching needs definition.

4. **Ingredient data typography.** Monospace (JetBrains Mono) is specified for scores and data, but ingredient lists might read better in the secondary sans-serif. Needs testing with real product data.

5. **Illustration and imagery style.** Not covered in this foundational system. Photography treatment (desaturated? warm-filtered?), empty state illustrations, and iconography style need a separate pass once the base is validated.
