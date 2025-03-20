# Better Snails App

Better Snails is a Vue 3 application designed to showcase better snails. It leverages modern tools and libraries like Vite, Vue Router, Pinia, and more to deliver a seamless user experience.

## Features

- **Vue 3**: Built with the latest Vue 3 framework.
- **Vite**: Lightning-fast development and build tool.
- **Pinia**: State management for Vue applications.
- **Vue Router**: Routing for single-page applications.
- **Internationalization**: Powered by `vue-i18n`.
- **Dark Mode Support**: Dynamic theme switching.
- **Head Management**: Using `@vueuse/head` for document head manipulation.
- **Component Libraries**: Includes `vue3-carousel`, `vue-star-rating`, and `@vueform/slider`.
- **CSS Utilities**: Styled with UnoCSS.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [pnpm](https://pnpm.io/) (used as the package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd better-snails-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Development

Start the development server:

```bash
pnpm dev
```

The app will be available at [http://localhost:3333](http://localhost:3333).

### Build

To build the app for production:

```bash
pnpm build
```

The production-ready files will be in the `dist` directory.

### Preview

To preview the production build:

```bash
pnpm preview
```

To preview with HTTPS:

```bash
pnpm preview-https
```

### Testing

- **Unit Tests**: Run unit tests with Vitest:

  ```bash
  pnpm test:unit
  ```

- **End-to-End Tests**: Open Cypress for E2E testing:

  ```bash
  pnpm test:e2e
  ```

- **All Tests**: Run all tests:

  ```bash
  pnpm test
  ```

### Linting

Lint the codebase:

```bash
pnpm lint
```

### Type Checking

Run TypeScript type checks:

```bash
pnpm typecheck
```

### Updating Dependencies

To update dependencies:

```bash
pnpm up
```

## Project Structure

- **`src/`**: Contains the source code.
- **`public/`**: Static assets.
- **`dist/`**: Production build output.
- **`pnpm-lock.yaml`**: Dependency lock file.
- **`vite.config.ts`**: Vite configuration.

## Scripts

The following scripts are available in the `package.json`:

| Script           | Description                   |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Start the development server. |
| `pnpm build`     | Build the app for production. |
| `pnpm preview`   | Preview the production build. |
| `pnpm lint`      | Lint the codebase.            |
| `pnpm test`      | Run all tests.                |
| `pnpm typecheck` | Run TypeScript type checks.   |
| `pnpm up`        | Update dependencies.          |

## Dependencies

### Core Dependencies

- `vue`: ^3.5.13
- `vue-router`: ^4.5.0
- `pinia`: ^2.3.0
- `@vueuse/core`: ^12.4.0
- `@vueuse/head`: ^2.0.0

### Dev Dependencies

- `vite`: ^6.0.7
- `vitest`: ^2.1.8
- `eslint`: ^9.18.0
- `typescript`: ^5.7.3
- `cypress`: ^13.17.0
