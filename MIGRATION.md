# Tailwind Migration Plan

> **Style approach:** Tailwind-first for all component styling. Plain `<style scoped>` CSS only as fallback for things Tailwind can't express (`:deep()`, complex pseudo-elements, print overrides, Swiper customizations).

## Context

Vue 3 + Vite personal portfolio. Bootstrap 5.3.8 is installed but provides zero value — no Bootstrap classes in templates. The project has a self-contained SCSS system and a CSS custom property theme system registry designed to be extensible (3 themes: default, futuristic, pastel × light/dark). Goal: remove Bootstrap and SCSS entirely, migrate to Tailwind CSS v4.

## Constraints

- **Preserve the theme system** — the `[data-theme]` CSS custom property system and `ThemeRegistry`/`ThemeConfig` must continue working. New themes must remain easy to add.
- **Preserve Swiper integration** — Swiper CSS imports in `main.ts` and scoped overrides in `CarouselLayout.vue` must keep working. Import Swiper CSS into `layer(base)` so it sits below Tailwind utilities in the cascade (see stage 1).
- **Preserve the terminal component** — `DevTerminal.vue` has hardcoded dark theme colors and custom styling that must be maintained.
- **Preserve visual similarity** — the site should look the same after migration. Run `npm run dev` and visually compare.
- **Keep `polished`** — used by `scripts/validate-contrast.ts` for `getLuminance()`.
- **Validation scripts parse SCSS source** — both `scripts/validate-themes.ts` and `scripts/validate-contrast.ts` read `.scss` files directly. They must be updated to read the new CSS source before the SCSS theme files are deleted.

## How to Execute

Each stage is one conversation + one commit. At the start of each stage:
1. Read this file for stage instructions
2. Read all files being modified in that stage
3. Do the work
4. Run the verify steps
5. Commit with the specified message

For component migration stages (4-6): glob `src/**/*.vue`, read each component's `<style>` block, convert SCSS to Tailwind classes in templates. Use `src/styles/_variables.scss` to resolve `map.get()` values to their actual CSS values, then use the corresponding Tailwind utility. Use plain `<style scoped>` (no `lang="scss"`) for anything Tailwind can't express.

---

## Stage 1: Foundation — Install Tailwind, Remove Bootstrap

**Commit: `chore: install tailwind v4, remove bootstrap`**

### Steps
1. `npm uninstall bootstrap`
2. `npm install -D tailwindcss @tailwindcss/vite`
3. Add Tailwind Vite plugin to `vite.config.mjs`
4. Delete `src/styles/_bootstrap-utilities.scss`
5. Remove `@use "bootstrap-utilities"` from `src/styles/main.scss`
6. Remove `silenceDeprecations` from vite.config.mjs SCSS options
7. Create `src/styles/tailwind.css` — import Tailwind and configure `@theme` to map the existing design tokens from `_variables.scss` and the CSS custom properties from the theme files. Use this mapping:
   ```css
   @theme {
     /* Background colors → bg-primary, bg-secondary, bg-tertiary */
     --color-bg-primary: var(--color-bg-primary);
     --color-bg-secondary: var(--color-bg-secondary);
     --color-bg-tertiary: var(--color-bg-tertiary);

     /* Text colors → text-primary, text-secondary */
     --color-text-primary: var(--color-text-primary);
     --color-text-secondary: var(--color-text-secondary);

     /* Accent colors → accent, accent-light, accent-dark, accent-translucent */
     --color-accent: var(--color-accent);
     --color-accent-light: var(--color-accent-light);
     --color-accent-dark: var(--color-accent-dark);
     --color-accent-translucent: var(--color-accent-translucent);

     /* Border colors → border (default), border-light */
     --color-border: var(--color-border);
     --color-border-light: var(--color-border-light);

     /* Dev-mode highlight (static, not themed) */
     --color-dev-highlight: #9c27b0;

     /* Typography (matches _variables.scss, mostly Tailwind defaults) */
     --font-family-base: "Avenir", Helvetica, Arial, sans-serif;
     --font-family-mono: "Courier New", Courier, monospace;

     /* Spacing tokens not in Tailwind defaults */
     --spacing-base: 1rem;

     /* Transition durations */
     --transition-duration-fast: 150ms;
     --transition-duration-base: 300ms;
     --transition-duration-slow: 500ms;
   }
   ```
   This enables classes like `bg-bg-primary`, `text-text-primary`, `text-accent`, `border-border`, `border-border-light`, `font-base`, `font-mono`, `duration-fast`, etc. Most spacing, font-size, border-radius, breakpoint, and z-index values already match Tailwind defaults and don't need custom tokens.
   **Note:** `--color-text` and `--color-bg` are referenced in `RenderCV.vue` and `DebugCarouselPage.vue` but are never defined in any theme — replace those references with `--color-text-primary` and `--color-bg-primary` during component migration (stages 5-6).
8. Move Swiper CSS imports from `main.ts` JS imports to `tailwind.css` using `@import` with `layer(base)` — this places Swiper styles below Tailwind utilities in the cascade, preventing Preflight from breaking Swiper's navigation/pagination, while still allowing Tailwind classes to override Swiper when needed:
   ```css
   @import "swiper/css" layer(base);
   @import "swiper/css/navigation" layer(base);
   @import "swiper/css/pagination" layer(base);
   @import "swiper/css/effect-fade" layer(base);
   ```
   Remove the corresponding `import "swiper/css"` lines from `main.ts`.
9. Import `tailwind.css` in `src/main.ts` (before other styles)
10. Rename `src/styles/_utilities.scss` → `src/styles/_utilities.reference.scss` and remove `@use "utilities"` from `src/styles/main.scss` — disconnects it from the build to avoid cascade conflicts with Tailwind's identically-named classes (`text-xs`, `flex`, `items-center`, etc.), but keeps it as a reference during migration. No component template uses these generated classes. Will be deleted in stage 7.
11. Disable Tailwind Preflight initially (project has custom reset in `main.scss` — reconcile in stage 2)

### Verify
- `npm run build` succeeds
- Site looks identical visually
- Swiper carousel navigation arrows and pagination dots render correctly

---

## Stage 2: Migrate Global Styles & Themes

**Commit: `refactor: migrate global styles and themes from SCSS to tailwind base layer`**

### Steps
1. Read `src/styles/main.scss` and all `src/styles/themes/*.scss` files
2. Move the base reset, scrollbar styles, `:root` variables, dev-mode styles, and print styles into `tailwind.css` `@layer base` as plain CSS
3. The theme files are pure `[data-theme]` CSS variable blocks with no SCSS features — convert to plain CSS in `@layer base`
4. Add `--color-border-light` to all 6 theme `[data-theme]` blocks (already referenced by `ProjectCard.vue` and `CarouselDetail.vue` but currently undefined). Derive at ~50% opacity of `--color-border`:
   | Theme | `--color-border` | `--color-border-light` |
   |---|---|---|
   | default-light | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.06)` |
   | default-dark | `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.08)` |
   | futuristic-light | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.06)` |
   | futuristic-dark | `rgba(0,229,255,0.25)` | `rgba(0,229,255,0.12)` |
   | pastel-light | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.05)` |
   | pastel-dark | `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.08)` |
   Add `--color-border-light` to `ThemeConfig`'s `requiredVars` array so the validation script catches future omissions.
5. Reconcile custom reset with Tailwind Preflight — enable Preflight, remove duplicate rules
6. Delete `src/styles/main.scss` and `src/styles/themes/` SCSS files
7. Update `App.vue` — remove `@forward "@/styles/main"`. Note: App.vue has an **unscoped** `<style lang="scss">` block (not scoped) containing global print styles (`.print-mode-app`, `@media print` overrides). These are global styles that must be migrated into `tailwind.css` `@layer base`, not just deleted. The print styles are critical for `RenderCV.vue` and `scripts/render-pdf.ts` which renders `cv.pdf` via Playwright — the `.print-mode` class on `.cv-container` controls print layout.

### Notes
- Breakpoint values in `_variables.scss` (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px) already match Tailwind's defaults — no custom breakpoint config needed.
- After enabling Preflight and moving styles to `@layer base`, verify that no component styles are unintentionally overridden by layer specificity changes. Spot-check NavBar, GButton, and CarouselLayout which have the most complex selector hierarchies.

### Verify
- All 6 theme variants render correctly (`npm run dev`, toggle themes)
- Scrollbar styling intact
- Print view of CV page correct — run `npm run render:pdf` and compare output

---

## Stage 3: Update Validation Scripts & Remove SCSS Utilities

**Commit: `refactor: update validation scripts for CSS source, remove SCSS utilities and mixins`**

### Steps
1. Read `scripts/validate-themes.ts` and `scripts/validate-contrast.ts` fully
2. **`validate-themes.ts` rewrite:**
   - Replace `fs.existsSync` checks for individual `.scss` theme files → check that `tailwind.css` exists and contains a `[data-theme="<id>"]` block for each registered theme
   - Remove the `main.scss` `@use` import validation (no longer applicable)
   - Update the "expected files" list / file-existence checks to point at `tailwind.css`
   - Keep the CSS variable extraction logic — the regex parsing `--color-*: #hex` is format-agnostic
   - Keep the `ThemeConfig`/`ThemeRegistry` consistency checks as-is
3. **`validate-contrast.ts` rewrite:**
   - Update file glob/path to read `[data-theme]` blocks from `tailwind.css` instead of `src/styles/themes/*.scss`
   - The hex-extraction regex should work as-is — verify it still correctly parses values from the new plain CSS format
   - Keep `polished` `getLuminance()` usage unchanged
5. Delete `src/styles/_mixins.scss` — no component uses `@include` for any mixin (note: `_utilities.scss` was already deleted in stage 1)
7. Keep `src/styles/_variables.scss` temporarily — still needed by components that use `map.get()` (will be removed in stage 7)
8. Update vite.config.mjs `additionalData` — remove `_mixins.scss` reference, keep only `_variables.scss`

### Verify
- `npm run validate:themes` passes
- `npm run validate:contrast` passes — confirms `polished` `getLuminance()` still works with the new CSS format
- `npm run build` succeeds

---

## Stage 4: Migrate Simple Components

**Commit: `refactor: migrate simple components from SCSS to tailwind`**

### Components
`App.vue`, `ProjectsPage.vue`, `CVPage.vue`, `CollapsibleSection.vue`, `DevContent.vue`

### Approach
- Read each component, read `_variables.scss` to resolve any `map.get()` calls to actual values
- Replace `<style lang="scss" scoped>` blocks with Tailwind classes in templates
- Use plain `<style scoped>` (no `lang="scss"`) for anything that can't be expressed as Tailwind utilities
- Keep `var(--color-*)` references via the Tailwind theme tokens configured in stage 1

### Verify
- `npm run build` succeeds
- Each component renders correctly
- CollapsibleSection expand/collapse animation works

---

## Stage 5: Migrate Medium Components

**Commit: `refactor: migrate medium-complexity components to tailwind`**

### Components
`GButton.vue`, `CVBox.vue`, `DevTerminal.vue`, `HomePage.vue`, `ExperiencePage.vue`, `ExperienceCard.vue`, `InterestsPage.vue`, `NotFoundPage.vue`, `DebugPage.vue`, `NavBar.vue`, `CarouselDetail.vue`

### Approach
Same as stage 4. Additional notes:
- `:deep()` selectors (DebugPage, NavBar) → keep in plain `<style scoped>` block (`:deep()` is a Vue feature, works without SCSS)
- Vue transition classes (NavBar) → plain CSS in `<style scoped>`
- `::placeholder` (DevTerminal) → Tailwind `placeholder:` variant
- `::before`/`::after` (NavBar) → Tailwind `before:`/`after:` variants or CSS fallback
- `clamp()` fluid typography (HomePage) → Tailwind arbitrary value `text-[clamp(...)]`
- Dynamic CSS variable `--btn-bg-color` (GButton) → preserve via `:style` binding, reference in Tailwind or CSS

### Verify
- `npm run build` succeeds
- Terminal input/output and placeholder render correctly
- NavBar responsive behavior and terminal expand animation work
- GButton renders with all color variants
- Home page fluid typography scales correctly

---

## Stage 6: Migrate Complex Components

**Commit: `refactor: migrate complex components to tailwind`**

### Components
`ProjectCard.vue`, `RenderCV.vue`, `CarouselLayout.vue`, `AboutPage.vue`, `DebugCarouselPage.vue`

### Approach
Same as previous stages. Additional notes:
- **CarouselLayout.vue**: `::before`/`::after` gradient fade overlays and `:deep(.btn)` → plain scoped CSS fallback for these rules. Swiper CSS imports in `main.ts` are unchanged.
- **RenderCV.vue**: Print styles are critical — `scripts/render-pdf.ts` uses Playwright to navigate to `/cv` and generate `public/cv.pdf`. The `.print-mode` class (toggled by `isCVPage` computed property) controls print layout with hardcoded colors (#000, #333, #555), pt-based sizing, and A4-width constraints. These `.print-mode &` nested selectors must be preserved as plain scoped CSS — Tailwind's `print:` variant is for `@media print`, not class-based print modes. Use Tailwind utilities for the non-print styles only.
- **DebugCarouselPage.vue**: `@media (hover: none) and (pointer: coarse)` has no Tailwind variant — use plain CSS.

### Verify
- `npm run build` succeeds
- Carousel picker gradient fades work on all themes
- Carousel touch/swipe behavior unchanged
- `npm run render:pdf` — CV PDF rendering matches previous output
- Project cards with status badges and keyword chips render correctly

---

## Stage 7: Final Cleanup — Remove SCSS Entirely

**Commit: `chore: remove scss dependencies and all remaining scss artifacts`**

### Steps
1. Delete `src/styles/_variables.scss` (should be unreferenced after stages 4-6)
2. Delete `src/styles/_utilities.reference.scss` (migration reference, no longer needed)
3. Remove `src/styles/` directory if empty (tailwind.css may still live here)
4. Remove entire `css.preprocessorOptions.scss` block from `vite.config.mjs`
5. `npm uninstall sass` (note: `sass-loader` is a webpack package, not used by Vite — skip if not in `package.json`)
6. Grep for any remaining `lang="scss"` in `.vue` files — must be zero
7. Grep for any remaining `@use "sass:map"` or `@use "sass:list"` — must be zero

### Verify
- `npm run build` — zero warnings, no SCSS references
- `npm run dev` — full visual check: all pages, all 6 theme variants
- `npm run validate:themes` — passes
- `npm run validate:contrast` — passes
- `npm run render:pdf` — CV PDF matches previous output
- Responsive check at mobile / tablet / desktop breakpoints
