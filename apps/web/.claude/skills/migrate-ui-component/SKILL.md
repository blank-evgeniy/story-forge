---
name: migrate-ui-component
description: Migrate or create a UI component in shared/ui/new based on an existing shared/ui component, restyled with the project's new design system. Use this when the user asks to "create"/"migrate"/"redesign" a component into the new design system, or mentions shared/ui/new.
---

This skill creates a new component under `shared/ui/new/<component>/` based on an existing `shared/ui/<component>.tsx`, keeping the same primitive (base-ui) and API shape, but restyled with the new design system tokens. A Storybook story is mandatory for every component this skill produces.

## Source of truth

- Old components live flat in `apps/web/src/shared/ui/*.tsx` (e.g. `button.tsx`, `avatar.tsx`, `dialog.tsx`). They are built on `@base-ui/react/*` primitives + `class-variance-authority` (cva) + the `cn()` helper from `@/shared/lib/utils`.
- **Important**: the old shadcn color/radius layer (`--primary`, `--background`, `--border`, `--radius`, etc.) has been removed from `apps/web/src/app/styles/index.css` (that whole `@layer base` block is commented out). Old components that reference `bg-primary`, `text-foreground`, `border-border`, `rounded-md` (as a shadcn radius alias), etc. are visually broken right now. When migrating, only reuse the old file's **structure** (primitive used, variant/size keys, prop shape) — never copy its color/radius classes as if they still resolve correctly. Always re-derive colors/shapes from the new design system tokens.
- New components live in `apps/web/src/shared/ui/new/<component>/`, one folder per component, containing `<component>.tsx` and `<component>.stories.tsx`. `shared/ui/new/button/` is the current reference implementation — check it directly before writing a new component, since it reflects the latest conventions.
- Always re-read `apps/web/src/app/styles/index.css` before relying on any token name in this doc — the design system is actively evolving and token names/values can change between sessions.

## Current new design system tokens (verify against index.css `@theme inline` before use)

As of the last verification:
- Colors: `brand-50/200/400/500/700/900`, `deep-400/700`, `ink`, `ink-muted`, `surface`, `surface-2`, `line`, `glass`, `glass-strong`, `glass-border`, `success(-50/-700)`, `warning(-50/-700)`, `danger(-50/-700)`.
- Typography scale tokens: `text-caption`, `text-small`, `text-body`, `text-h3`, `text-h2`, `text-h1`, `text-display`. **Reserved for actual text/typography components only** — see the rule below.
- Shadows: `shadow-card`, `shadow-pop`, `shadow-brand` (defined in `@theme inline`, also registered in `cn()`'s `extendTailwindMerge` config).
- Radius: **not currently customized** — `rounded-sm/md/lg/xl/2xl/...` are plain Tailwind defaults right now. Do not assume a `rounded-pill` token exists; it was removed. Check `index.css` for a `--radius-*` block before assuming otherwise.
- Utilities: `bg-app` (the page gradient, `deep-400` → `brand-400`), `glass` / `glass-strong` (frosted glass surfaces using the `glass*` colors).

## Design direction

The product is a game (a social/party game site), not a SaaS dashboard. Every new component must read as playful and creative, not corporate:
- Prefer bold, saturated brand colors (`brand-*`, `deep-*`, `danger`, `success`, `warning`) over neutral grays for primary actions.
- Use confident weights (`font-extrabold`/`font-bold`) for interactive elements; avoid timid, thin type.
- Use the available shadows (`shadow-card`, `shadow-pop`, `shadow-brand`) to add depth/pop where it strengthens the tactile, game-like feel — but check they're still defined in `index.css` first.
- Avoid generic AI-slop patterns: no default shadcn look-alike, no purple-on-white gradients, no Inter/system-font feel (the project font is Manrope).
- Don't gold-plate. Match the complexity of the effect to the component — a checkbox doesn't need the same flourish as a primary CTA button.

## Critical rule: don't use typography tokens on non-text components

`text-caption` / `text-small` / `text-body` / `text-h1-3` / `text-display` are reserved for actual text/typography components (headings, body copy, labels rendered by a `Text`/`Typography`-style component). They each bundle `font-size` + `line-height` + sometimes `font-weight`/`letter-spacing` as one unit, which fights with independent `font-weight`/`tracking` utilities placed on interactive components (buttons, inputs, badges, etc.) — the combination produces inconsistent-looking text across sizes.

For interactive/structural components, use plain Tailwind size utilities instead: `text-xs`, `text-sm`, `text-base`, `text-lg`, etc., combined with explicit `font-*` weight utilities as needed.

## `cn()` is aware of the custom theme

`@/shared/lib/utils` exports `cn()` built on `extendTailwindMerge`, configured with this project's custom `classGroups` (currently: `font-size` for the typography tokens, `shadow` for `shadow-card/pop/brand`, and a `rounded` group — confirm it still matches index.css). Always import and use `cn()` — never call `clsx`/`twMerge` directly — so conflicting/duplicate custom-theme classes get deduplicated correctly. If you introduce a new custom token group in `index.css`, add it to `extendTailwindMerge`'s `classGroups` in `utils.ts` too.

## Steps

1. **Identify the source component.** Read `apps/web/src/shared/ui/<component>.tsx` (or the currently open file if the user didn't name one). Note:
   - The base-ui primitive(s) it wraps (e.g. `@base-ui/react/button`, `@base-ui/react/dialog`).
   - Its `cva` variants/sizes and prop shape (`VariantProps<typeof xVariants>`, any extra custom props like `isLoading`).
   - Any composed sub-parts (e.g. `Dialog.Trigger`, `Dialog.Content` — multi-export components keep the same export shape).
2. **Re-read `apps/web/src/app/styles/index.css`** to confirm current token names before using any of them — don't trust this doc's token list blindly.
3. **Read `shared/ui/new/button/button.tsx` and `button.stories.tsx`** as the current style reference (structure, `cn()` grouping, story patterns).
4. **Create the new folder**: `apps/web/src/shared/ui/new/<component>/<component>.tsx`.
5. **Port the structure, restyle the visuals**:
   - Keep the same base-ui primitive import and the same exported component/prop names (don't break the API consumers would expect — same prop names, same variant/size keys where they make sense).
   - Build the `cva` base class string using `cn()` with multiple string arguments grouped by concern (layout & shape / typography / interaction & focus / states / icons) — one logical group per line, not one giant string.
   - Replace neutral/corporate or now-broken shadcn classes (`bg-primary`, `border-border`, etc.) with current design-system tokens (`bg-brand-400`, `text-surface`, `border-line`, `bg-surface-2`, etc.) per the design direction above.
   - Replace size-driven typography with plain Tailwind text utilities (see the rule above), not design-system typography tokens.
6. **Write the Storybook story**: `apps/web/src/shared/ui/new/<component>/<component>.stories.tsx`.
   - `title: "New/<ComponentName>"` (PascalCase), `tags: ["autodocs"]`, `satisfies Meta<typeof Component>`.
   - One story per variant and per size at minimum, plus boolean-prop stories (loading/disabled/etc. — truthy and falsy) per the conventions in `.claude/commands/storybook.md`.
   - Add an `AllVariants`-style story that renders a matrix of every variant × every size in one view, similar to `shared/ui/new/button/button.stories.tsx`, so visual regressions are easy to spot at a glance.
   - If the component has icon-only or icon-bearing variants, add dedicated icon stories too (see `Icon`/`IconSmall`/`IconLarge`/`AllIconVariants` in the button stories for the pattern), using an icon from `lucide-react`.
7. **Verify**: run `tsc --noEmit` and `eslint` on both new files from `apps/web/`:
   ```
   node_modules/.bin/tsc --noEmit -p tsconfig.app.json
   node_modules/.bin/eslint src/shared/ui/new/<component>/<component>.tsx src/shared/ui/new/<component>/<component>.stories.tsx
   ```
   Fix any errors before reporting done.
8. **Report** the created file paths. Do not modify or delete the old `shared/ui/<component>.tsx` — both old and new coexist during the redesign migration.
