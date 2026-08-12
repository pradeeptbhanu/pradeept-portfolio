# Pradeept Bhanu — Developer Portfolio

Modern static portfolio website for **Pradeept Bhanu Sabat**, focused on Laravel, PHP, WordPress, MySQL, e-commerce, web applications, and mobile development.

The site is built with **Astro + TypeScript + CSS** and deployed as a static site to **GitHub Pages**.

## Tech Stack

- [Astro](https://astro.build/) — static site framework
- TypeScript — project data and type-safe configuration
- HTML / CSS — custom portfolio UI and responsive styling
- JavaScript — lightweight client-side interactions
- GitHub Actions — automated build and deployment
- GitHub Pages — hosting

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       ├── astro-check.yml       # Astro type-check/build validation
│       └── astro-deploy.yml      # GitHub Pages deployment
│
├── public/
│   └── ...                       # Static public assets
│
├── src/
│   ├── components/               # Reusable Astro components
│   ├── data/
│   │   └── projects.ts           # Portfolio project data
│   ├── layouts/
│   │   └── MainLayout.astro      # Shared page layout
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   └── sudoku-brain-saga/
│   │       ├── index.astro       # Game project page
│   │       └── privacy-policy/
│   │           └── index.astro   # Game privacy policy
│   └── styles.css                # Shared portfolio styles
│
├── sudoku-brain-saga/
│   ├── logo.png                  # Game logo
│   └── banner.png                # Game promotional banner
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CNAME                         # Custom domain configuration
└── README.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The site will normally be available at:

```text
http://localhost:4321/
```

Run Astro validation:

```bash
npm run check
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Clean URLs

The portfolio uses Astro's directory-based routing, so source pages use `.astro` files while the generated website uses clean URLs without `.html` extensions.

Examples:

```text
https://pradeeptbhanu.com/
https://pradeeptbhanu.com/sudoku-brain-saga/
https://pradeeptbhanu.com/sudoku-brain-saga/privacy-policy/
```

The old standalone `.html` portfolio pages are no longer used by the Astro migration.

## GitHub Pages Deployment

The site is hosted on GitHub Pages and deployed using GitHub Actions.

The deployment workflow:

1. Checks out the repository.
2. Installs Node.js dependencies.
3. Builds the Astro site.
4. Copies the required GitHub Pages assets and custom-domain `CNAME` file into the build output.
5. Uploads the generated `dist` directory as the Pages artifact.
6. Deploys the artifact to GitHub Pages.

The production deployment is intentionally separated from development/migration work. The `astro-migration` branch can be tested without replacing the live production site.

## Portfolio Content

Project information is centralized in:

```text
src/data/projects.ts
```

This keeps project cards/filtering data separate from the homepage markup and makes it easier to add or update projects without duplicating HTML.

The portfolio currently includes projects covering areas such as:

- Laravel / PHP applications
- WordPress websites
- WooCommerce
- Shopify
- Automation and scraping
- Business websites
- Education websites
- E-commerce
- Flutter / Android

## Sudoku Brain Saga

The portfolio includes a dedicated project page for **Sudoku Brain Saga**, a Flutter-based Sudoku game.

```text
/sudoku-brain-saga/
```

The project assets are stored in:

```text
sudoku-brain-saga/logo.png
sudoku-brain-saga/banner.png
```

The privacy policy is available at:

```text
/sudoku-brain-saga/privacy-policy/
```

## Custom Domain

The portfolio is configured for:

```text
https://pradeeptbhanu.com/
```

The `CNAME` file is preserved during the Astro build/deployment process so GitHub Pages continues to use the custom domain.

If the repository or deployment configuration is changed, verify the following in GitHub:

**Settings → Pages → Build and deployment**

The repository's GitHub Pages configuration should use the GitHub Actions deployment workflow.

## Branches

The repository uses separate branches for development and migration work.

- `dev-chatgpt` — development branch containing the previous static-site implementation
- `astro-migration` — current Astro migration and modernization branch
- `main` — production deployment branch

Do not merge the Astro migration into production until the generated site has been reviewed and the GitHub Pages deployment has been verified.

## Migration Notes

The Astro migration keeps the existing portfolio's visual identity and content while improving the underlying architecture.

Key improvements include:

- Component-based page structure
- Centralized project data
- Clean URLs
- Shared metadata/layout handling
- Better maintainability
- Static generation for fast page delivery
- GitHub Actions build validation
- GitHub Pages deployment
- Dedicated project pages
- SEO and social sharing metadata
- Responsive navigation and client-side interactions

## License

This repository contains a personal portfolio website and project presentation. Unless otherwise stated, the portfolio content, branding, images, and project materials are the property of Pradeept Bhanu Sabat and should not be reused without permission.
