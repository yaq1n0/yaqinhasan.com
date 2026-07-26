# yaqinhasan.com

> Personal portfolio website built with Vue 3 & TypeScript

## Quick Start

### Cloning & npm install

```bash
git clone https://github.com/yaq1n0/yaqinhasan.com.git
cd yaqinhasan.com
npm ci
```

### Package.json scripts

```bash
# Build
npm run build

# Run dev server
npm run dev

# Testing
npm run test
npm run test:watch
npm run test:coverage

# Code quality
npm run lint
npm run lint:fix

# Formatting
npm run prettier
npm run prettier:fix

```

## Feature breakdown

### JSON -> Web CV

- Displays cv.json dynamically using Vue.
- Allows generation of cv.pdf using `render-cv.ts` (requires playwright setup with `npm run setup:playwright`):
  - `npm run render:cv` → **public, scrubbed** `public/cv.pdf` (no contact info) — this is the one that's committed and served on the site.
  - `npm run render:cv:contact` → **private** `cv-private.pdf` (gitignored) **with** contact info, for sending to recruiters / job sites.

#### Contact info (email & phone)

Contact details are never committed to the repo or shipped on the deployed site. `cvData.ts`
reads them from `VITE_CV_EMAIL` / `VITE_CV_PHONE`, which you set in a **gitignored `.env.local`**
(see `.env.example`). With those vars unset, every consumer (web CV, `cv.json`, `cv.pdf`, the
"Email" button, terminal `whoami`) simply omits them. The live site is scrubbed by default and
only shows contact info if those env vars are explicitly added to the deploy workflow. See
[`scripts/SCRIPTS.md`](scripts/SCRIPTS.md#contact-info-gating-email-and-phone)
for the full gating table and caveats.

### Interactive "Terminal"

- Allows users to interact with the website via a "terminal" interface
- Allows power-users to configure things like dev-mode and themes
- Unix commands for navigating the site
- Is quite fun (supposedly)

### Theme System

- Users can pick from various themes
- Themes come from `ThemeRegistry.ts`
- Themes have light and dark modes
- Theme preference is stored in localStorage
- Default theme light|dark mode detected from system prefers-dark

## CI/CD

There is a barebones CI pipeline in `ci.yaml` which does

- Unit testing
- Validation of themes, including WCAG compliance
- Linting
- Formatting

The build process generates a `dist/` folder with:

- Static HTML files for each route
- Optimized JavaScript and CSS bundles
- All public assets with proper paths
- 404.html for fallback handling

Currently deployed to Github Pages using `deploy.yml`

## Links

- **Live Site**: [yaqinhasan.com](https://yaqinhasan.com)
- **GitHub**: [github.com/yaq1n0/yaqinhasan.com](https://github.com/yaq1n0/yaqinhasan.com)
- **LinkedIn**: [linkedin.com/in/yaqinhasan](https://linkedin.com/in/yaqinhasan)
