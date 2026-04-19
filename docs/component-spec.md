# Clean Shopper — Component Specification
**Version:** 1.0 | **Last updated:** 2026-04-10

All visual values reference Tailwind theme tokens defined in `tailwind.config.js`. No hex colors, pixel sizes, or raw spacing values are permitted in component implementations. See `docs/design-system.md` for design rationale and `src/lib/tokens.js` for the JS token mirror.

---

## ProductCard

**Purpose:** Displays a single product with its name, safety rating, category, and description. The primary content unit in the product library, search results, and comparison views.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Product name |
| `safetyScore` | `'clean' \| 'caution' \| 'avoid'` | Yes | Determines badge variant |
| `category` | `string` | Yes | Product category label |
| `description` | `string` | Yes | Short product description (1–2 sentences) |
| `onClick` | `() => void` | No | Handler for card selection |
| `action` | `ReactNode` | No | Optional element rendered at the bottom of the card, separated by a divider (e.g. a Save button) |

### Visual Structure

```
article.bg-surface-card.rounded-lg.shadow-sm.border.border-neutral-200.p-6
  div.flex.items-start.justify-between.gap-4        ← header row
    h3.text-h3.font-semibold.text-neutral-800.leading-subheading.tracking-heading
    <SafetyBadge safetyScore={safetyScore} />
  <CategoryTag label={category} />
  p.text-body.font-regular.text-neutral-600.leading-body.mt-1
```

### States

| State | Treatment |
|-------|-----------|
| Default | `shadow-sm`, `border-neutral-200` |
| Hover | `shadow-md`, transition `duration-fast ease-default` |
| Focused | `outline` using focus ring: `2px solid` `primary`, `2px` offset |

### Usage Rules

- **Use** in search results, the saved product library, and comparison view.
- **Do not use** for ingredient-level items — use `IngredientTag` instead.
- **Do not** nest ProductCards inside one another.
- Description should be 1–2 sentences maximum. Truncate longer copy with `line-clamp-2`.

---

## SafetyBadge

**Purpose:** A small labeled pill that communicates a product's clean/caution/avoid safety score at a glance. Used inside ProductCard and inline within chat messages.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `score` | `'clean' \| 'caution' \| 'avoid'` | Yes | Controls color and label |

### Visual Structure

```
span.text-caption.font-medium.leading-caption.tracking-caps.uppercase.px-2.py-1.rounded-sm

— clean:   bg-primary/10   text-primary-dark    label: "Clean"
— caution: bg-warning/10   text-warning         label: "Caution"
— avoid:   bg-error/10     text-error           label: "Avoid"
```

### States

SafetyBadge is display-only and has no interactive states.

### Usage Rules

- **Use** inside ProductCard, inline in ChatBubble output, and in comparison tables.
- **Do not** use SafetyBadge as an interactive filter control — use CategoryTag for that.
- Always pair with a text label; do not rely on color alone (accessibility).
- The `uppercase` + `tracking-caps` treatment is reserved for this component only.

---

## SearchBar

**Purpose:** The primary input for product research queries. Appears at the top of the main view and anchors the conversational interface.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | Controlled input value |
| `onChange` | `(value: string) => void` | Yes | Input change handler |
| `onSubmit` | `() => void` | Yes | Submit handler (Enter key or button) |
| `placeholder` | `string` | No | Input placeholder text |
| `isLoading` | `boolean` | No | Disables input and shows spinner on button |

### Visual Structure

```
div.flex.items-center.gap-3.bg-surface-card.border.border-neutral-200.rounded-md.px-4.py-3.shadow-sm

  input.flex-1.text-body.font-regular.text-neutral-800.leading-body.placeholder:text-neutral-400.bg-transparent.outline-none

  button.shrink-0.bg-primary.text-surface-card.text-small.font-medium
         .rounded-md.px-4.py-2.transition-colors.duration-fast.ease-default
         disabled:opacity-50
```

### States

| State | Treatment |
|-------|-----------|
| Default | `border-neutral-200`, `shadow-sm` |
| Focus | Container border becomes `primary`, focus ring `2px solid primary` `2px offset` |
| Loading | Submit button shows spinner, `disabled:opacity-50`, input `disabled` |
| Error | Container border `error`, helper text `text-error.text-small` below |

### Usage Rules

- **Use** as the single entry point for product queries on the research view.
- **Do not** use SearchBar for filtering the library — use CategoryTag filters with a plain InputField for that.
- Placeholder should be a concrete example query, not generic text like "Search…".

---

## CategoryTag

**Purpose:** A small interactive chip used to label and filter products by category. Appears as a read-only label on ProductCard and as a toggleable filter in the library view.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Category name |
| `selected` | `boolean` | No | Active filter state (default `false`) |
| `onClick` | `() => void` | No | Makes the tag interactive; omit for display-only |

### Visual Structure

```
— Display-only (on ProductCard):
  span.text-small.font-medium.text-neutral-500.bg-neutral-100.px-3.py-1.rounded-full.leading-small

— Interactive (filter row):
  button.text-small.font-medium.px-3.py-1.rounded-full.leading-small
         .transition-colors.duration-fast.ease-default

  — unselected: bg-neutral-100  text-neutral-500
  — selected:   bg-primary/10   text-primary-dark  ring-1 ring-primary
```

### States

| State | Treatment |
|-------|-----------|
| Default (unselected) | `bg-neutral-100 text-neutral-500` |
| Selected | `bg-primary/10 text-primary-dark ring-1 ring-primary` |
| Hover (interactive) | `bg-neutral-200 text-neutral-600` |
| Focused | Focus ring: `2px solid primary`, `2px` offset |

### Usage Rules

- **Use** as a display label on ProductCard (no `onClick`).
- **Use** as an interactive filter in the library view (with `onClick` and `selected`).
- **Do not** use CategoryTag for safety scores — use SafetyBadge.
- Filter tags should appear in a single `flex.flex-wrap.gap-2` row.

---

## NavBar

**Purpose:** The persistent top navigation bar that provides the app name/logo and access to top-level navigation. Appears on every screen.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `activeRoute` | `string` | Yes | Current route key for active link styling |
| `onSignOut` | `() => void` | No | When provided, renders a "Sign out" button in the nav. Omit when the user is not signed in. |

### Visual Structure

```
header.bg-surface-card.border-b.border-neutral-200.shadow-sm
  nav.max-w-wide.mx-auto.px-8.flex.items-center.justify-between.h-16

    — Wordmark
    span.text-h4.font-semibold.text-primary.leading-heading

    — Nav links
    div.flex.items-center.gap-6
      a.text-small.font-medium.transition-colors.duration-fast.ease-default

      — inactive: text-neutral-500  hover:text-neutral-800
      — active:   text-primary      border-b-2 border-primary pb-0.5
```

### States

| State | Treatment |
|-------|-----------|
| Default | `bg-surface-card`, `shadow-sm` |
| Link active | `text-primary`, `border-b-2 border-primary` |
| Link hover | `text-neutral-800`, transition `duration-fast` |

### Usage Rules

- **Use** once, at the top of PageShell. Never render more than one NavBar.
- Nav link labels should be single words or short phrases — no icons without labels.
- **Do not** place action buttons (e.g. "Add to cart") in the NavBar — those belong in the Sidebar or inline with content.
- On `sm` breakpoint, collapse nav links into a drawer triggered by a menu button.

---

## Button

**Purpose:** The standard action trigger, available in primary and secondary variants. Used for form submission, saving items, confirming actions, and navigation CTAs throughout the app.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Button text |
| `variant` | `'primary' \| 'secondary'` | No | Visual weight (default `'primary'`) |
| `onClick` | `() => void` | No | Click handler |
| `type` | `'button' \| 'submit'` | No | HTML button type (default `'button'`) |
| `isLoading` | `boolean` | No | Shows spinner, disables interaction |
| `disabled` | `boolean` | No | Disables button |
| `size` | `'sm' \| 'md'` | No | Size variant (default `'md'`) |

### Visual Structure

```
— Primary (md):
  button.bg-primary.text-surface-card.text-small.font-medium.leading-small
         .rounded-md.px-6.py-3
         .transition-colors.duration-fast.ease-default
         hover:bg-primary-light
         active:bg-primary-dark
         disabled:opacity-50.disabled:cursor-not-allowed

— Secondary (md):
  button.bg-transparent.text-primary.border.border-primary.text-small.font-medium.leading-small
         .rounded-md.px-6.py-3
         .transition-colors.duration-fast.ease-default
         hover:bg-primary/10
         active:bg-primary/20
         disabled:opacity-50.disabled:cursor-not-allowed

— Size sm: px-4.py-2  (both variants)
— Size md: px-6.py-3  (both variants)
```

### States

| State | Primary | Secondary |
|-------|---------|-----------|
| Default | `bg-primary text-surface-card` | `border-primary text-primary` |
| Hover | `bg-primary-light` | `bg-primary/10` |
| Active/Pressed | `bg-primary-dark` | `bg-primary/20` |
| Loading | Spinner replaces label, `disabled:opacity-50` | Same |
| Disabled | `opacity-50 cursor-not-allowed` | Same |
| Focused | Focus ring: `2px solid primary`, `2px` offset | Same |

### Usage Rules

- **Use Primary** for the single most important action on a surface (submit, save, confirm).
- **Use Secondary** for supporting actions alongside a primary button (cancel, view details).
- Never place two Primary buttons side by side — one surface, one primary action.
- For destructive actions (delete, remove), use `text-error border-error` secondary styling — no separate `danger` variant.
- **Do not** use Button for navigation links — use an `<a>` tag with link styling instead.

---

## InputField

**Purpose:** A labeled text input for structured data entry — used in the preferences panel for ingredient blocklists, trusted brands, and any form-style input across the app.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Visible field label |
| `value` | `string` | Yes | Controlled value |
| `onChange` | `(value: string) => void` | Yes | Change handler |
| `placeholder` | `string` | No | Placeholder text |
| `helperText` | `string` | No | Instructional text below the field |
| `errorText` | `string` | No | Validation error message; triggers error state |
| `disabled` | `boolean` | No | Disables the field |
| `type` | `string` | No | HTML input type (default `'text'`) |

### Visual Structure

```
div.flex.flex-col.gap-1

  label.text-small.font-medium.text-neutral-700.leading-small

  input.w-full.bg-neutral-200.text-body.font-regular.text-neutral-800.leading-body
        .rounded-md.px-4.py-3.border.border-neutral-200
        .placeholder:text-neutral-400
        .outline-none.transition-colors.duration-fast.ease-default
        focus:border-primary focus:bg-surface-card
        disabled:opacity-50 disabled:cursor-not-allowed

  — Helper text (no error):
    p.text-small.text-neutral-500.leading-small

  — Error text:
    p.text-small.text-error.leading-small
```

### States

| State | Treatment |
|-------|-----------|
| Default | `bg-neutral-200 border-neutral-200` |
| Focus | `border-primary bg-surface-card`, focus ring `2px solid primary` |
| Error | `border-error`, helper text becomes `text-error` |
| Disabled | `opacity-50 cursor-not-allowed` |
| Filled | `bg-surface-card border-neutral-300` |

### Usage Rules

- **Always** include a visible `label` — never use placeholder as a substitute for a label.
- **Use** `helperText` for formatting hints or constraints (e.g. "Separate multiple entries with a comma").
- **Use** `errorText` only for validation errors; it replaces `helperText` when present.
- **Do not** use InputField inside the main chat interface — use SearchBar there.

---

## EmptyState

**Purpose:** A centered informational block shown when a list or view has no content — used in the product library, cart, search results, and the preferences panel when nothing has been saved yet.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `heading` | `string` | Yes | Short heading (e.g. "Nothing saved yet") |
| `body` | `string` | Yes | One-sentence explanation or prompt |
| `action` | `{ label: string; onClick: () => void }` | No | Optional CTA button |

### Visual Structure

```
div.flex.flex-col.items-center.text-center.gap-4.py-16.px-8

  — Optional illustration slot (icon or SVG, 48×48)

  div.flex.flex-col.items-center.gap-2
    p.text-h4.font-semibold.text-neutral-700.leading-subheading
    p.text-body.font-regular.text-neutral-500.leading-body.max-w-content

  — If action provided:
    <Button variant="primary" label={action.label} onClick={action.onClick} size="sm" />
```

### States

EmptyState is display-only. It has no interactive states beyond the optional Button child, which follows Button's own state rules.

### Usage Rules

- **Use** whenever a list, grid, or panel has zero items to show.
- **Do not** show EmptyState during loading — show a skeleton or spinner instead.
- `heading` should name what is missing, not describe the error (e.g. "Your cart is empty", not "No items found").
- `body` should suggest the next step the user can take.
- The optional `action` CTA should be the single most useful next action (e.g. "Search for a product").
- **Do not** use EmptyState for error conditions — use an error message with `text-error` and a retry action instead.

---

## ChatBubble

**Purpose:** Renders a single message in the AI chat interface. Visually distinguishes user messages (right-aligned, tinted) from AI responses (left-aligned, card surface).

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `role` | `'user' \| 'assistant'` | Yes | Determines alignment and visual style |
| `content` | `string` | Yes | The message text |

### Visual Structure

```
— User message:
  div.flex.justify-end
    div.max-w-[80%].rounded-lg.px-4.py-3.bg-primary/10.text-neutral-800.text-body.font-regular.leading-body

— AI message:
  div.flex.justify-start
    div.max-w-[80%].rounded-lg.px-4.py-3.bg-surface-card.border.border-neutral-200.shadow-sm.text-neutral-800.text-body.font-regular.leading-body
```

### States

ChatBubble is display-only and has no interactive states.

### Usage Rules

- **Use** only inside the chat message thread in ChatPage.
- **Do not** use ChatBubble for system notifications or toasts — use inline error text instead.
- Content is rendered as plain text. SafetyBadge components may be composed alongside ChatBubble output when the AI response references a specific product.
- Do not truncate content — chat messages should always be fully visible.
