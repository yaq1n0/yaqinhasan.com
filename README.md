# yaqinhasan.com

> Personal portfolio website built with Vue 3, TypeScript, and custom Static Site Generation

A modern, responsive portfolio website showcasing projects, skills, and personal interests. Features custom SSG plugins, dark/light themes, and a unique "developer mode" for technical audiences.

## 🚀 Quick Start

```bash
# Install dependencies
npm ci

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Build and serve locally (production preview)
npm run serve
```

## 🛠️ Technology Stack

### Core Framework

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for development and building
- **Vue Router** for client-side routing

### Styling & UI

- **SASS/SCSS** with global variables and mixins
- **FontAwesome** icon library (solid & brands)
- **Swiper.js** for carousel components
- **CSS Custom Properties** for theming

### Development & Testing

- **Vitest** for unit testing with coverage
- **ESLint + Prettier** for code quality
- **Happy DOM** for browser environment testing
- **TypeScript** strict mode configuration

### Custom Features

- **Static Site Generation** via custom Vite plugins
- **Dynamic theming** (dark/light mode)
- **Developer mode** for technical content
- **Responsive design** with mobile-first approach

## 📁 Project Structure

```
yaqinhasan.com/
├── src/
│   ├── components/           # Reusable Vue components
│   │   ├── carousel/        # Carousel layout system
│   │   ├── navbar/          # Navigation components
│   │   ├── GButton.vue      # Main button component
│   │   ├── DarkModeToggle.vue
│   │   └── DevModeToggle.vue
│   ├── pages/               # Main application pages
│   │   ├── HomePage.vue     # Landing page
│   │   ├── AboutPage.vue    # Skills & education
│   │   ├── ProjectsPage.vue # Portfolio showcase
│   │   ├── InterestsPage.vue # Personal interests
│   │   ├── ContactPage.vue  # Contact & CV
│   │   └── dev/            # Development/debug pages
│   ├── styles/             # Global SCSS files
│   │   ├── main.scss       # Main stylesheet
│   │   ├── _variables.scss # Design tokens
│   │   ├── _mixins.scss    # Reusable style functions
│   │   └── _utilities.scss # Utility classes
│   ├── types/              # TypeScript type definitions
│   ├── App.vue             # Root application component
│   ├── main.ts             # Application entry point
│   └── router.ts           # Route configuration
├── plugins/                # Custom Vite plugins
│   ├── staticRouteGenerator.js # SSG implementation
│   └── routeExtractor.js   # Route discovery
├── templates/              # HTML templates for SSG
├── public/                 # Static assets
├── package.json            # Dependencies & scripts
├── vite.config.mjs         # Vite configuration
├── vitest.config.ts        # Testing configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Key Features

### 🎨 Design System

- **Responsive Layout**: Mobile-first design with breakpoint-based responsive behavior
- **Dark/Light Themes**: Automatic system preference detection with manual toggle
- **Custom Component Library**: Reusable button, carousel, and navigation components
- **Typography System**: Consistent font sizes, spacing, and color schemes

### 🔧 Developer Experience

- **Developer Mode**: Hidden technical content revealed via toggle (stored in sessionStorage)
- **Hot Module Reload**: Instant feedback during development
- **Path Aliases**: Clean imports using `@/*` for `src/*`
- **Global SCSS**: Variables and mixins automatically available in all components

### 📱 Static Site Generation

- **Custom SSG Pipeline**: Pre-renders static HTML for each route
- **Route Discovery**: Automatically extracts routes from router configuration
- **Asset Management**: Proper relative path handling for nested routes
- **SEO Ready**: Each route gets its own HTML file for better indexing

### 🎪 Interactive Components

- **Carousel Navigation**: Smooth content transitions using Swiper.js
- **Collapsible Sections**: Expandable content areas
- **Responsive Navigation**: Mobile hamburger menu with overflow handling
- **Contact Integration**: Direct links to LinkedIn, GitHub, email

## 🔧 Development Guide

### Getting Started

1. **Clone and Install**

   ```bash
   git clone https://github.com/yaq1n0/yaqinhasan.com.git
   cd yaqinhasan.com
   npm ci
   ```

2. **Development Server**

   ```bash
   npm run dev
   ```

   Starts Vite dev server on `http://localhost:3000` with HMR

3. **Testing**
   ```bash
   npm run test          # Run tests once
   npm run test:watch    # Watch mode
   npm run test:coverage # With coverage report
   ```

### Making Changes

#### Adding New Pages

1. Create Vue component in `src/pages/`
2. Add route to `src/router.ts`
3. Route will be automatically discovered by SSG plugins

#### Styling Guidelines

- Use SCSS variables from `src/styles/_variables.scss`
- Follow existing breakpoint patterns
- Utilize CSS custom properties for theming
- Add responsive styles using `@media` queries

#### Component Development

- Follow Vue 3 Composition API patterns
- Use TypeScript with proper type definitions
- Implement responsive design considerations
- Test on both light and dark themes

### Build Process

```bash
# Development build
npm run build

# Production preview
npm run serve

# Testing
npm run test
npm run test:coverage

# Code quality
npm run lint
npm run lint:fix
```

## 🗂️ Key Files Breakdown

### Core Application

- **`src/main.ts`**: App initialization, FontAwesome setup, router integration
- **`src/App.vue`**: Root component with navbar and router-view
- **`src/router.ts`**: Route definitions and navigation configuration

### Styling Architecture

- **`src/styles/main.scss`**: Global styles, CSS custom properties, theme definitions
- **`src/styles/_variables.scss`**: Design tokens (colors, spacing, typography, breakpoints)
- **`src/styles/_mixins.scss`**: Reusable SCSS functions and utilities

### Custom Plugins

- **`plugins/staticRouteGenerator.js`**: Generates static HTML files for each route
- **`plugins/routeExtractor.js`**: Discovers routes from router configuration
- **`templates/routeTemplate.html`**: Template for generated static pages

### Configuration

- **`vite.config.mjs`**: Build configuration, plugins, aliases, SCSS setup
- **`vitest.config.ts`**: Testing framework configuration
- **`tsconfig.json`**: TypeScript compiler options and path mappings

## 🎛️ Special Features

### Developer Mode

Toggle reveals additional technical content throughout the site:

- Stored in `sessionStorage` (resets on browser restart)
- Controlled by `DevModeToggle.vue` component
- Shows purple-highlighted technical sections
- Includes implementation details and development notes

### Theme System

- CSS custom properties enable dynamic theming
- Preference stored in `localStorage`
- Automatic system preference detection
- Smooth transitions between themes

### Static Site Generation

- Custom Vite plugins generate individual HTML files
- Proper asset path resolution for any deployment depth
- Automatic route discovery prevents manual maintenance
- SEO-friendly pre-rendered content

## 🚀 Deployment

The build process generates a `dist/` folder with:

- Static HTML files for each route
- Optimized JavaScript and CSS bundles
- All public assets with proper paths
- 404.html for fallback handling

Currently deployed to Github Pages using `deploy.yml`

## 🔗 Links

- **Live Site**: [yaqinhasan.com](https://yaqinhasan.com)
- **GitHub**: [github.com/yaq1n0/yaqinhasan.com](https://github.com/yaq1n0/yaqinhasan.com)
- **LinkedIn**: [linkedin.com/in/yaqinhasan](https://linkedin.com/in/yaqinhasan)
