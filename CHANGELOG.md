# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Calendar component with single, multiple, and range selection modes
- Calendar keyboard navigation, month/year views, min/max constraints, disabled/highlighted dates, week numbers, locale support, and custom date rendering
- Calendar Storybook stories and test suite
- Tree-shakeable Calendar export
- Global SCSS utilities and mixins in `src/styles/`
- Icon fonts and assets in `src/assets/icons/`
- **oxfmt** formatter with `.oxfmtrc.json` and `pnpm format` / `pnpm format:check` scripts
- `src/vite-env.d.ts` for SCSS module declarations under TypeScript 7
- Storybook **Introduction** story with a live component overview
- `loadAllIcons` and `DayOfWeek` public exports

### Changed

- Simplified the public API: removed the redundant per-component `styles.ts` loaders (components already import their own SCSS) and the non-functional per-component subpath exports; only the package root and `./styles` are exposed
- Upgraded dependencies to latest majors: React 19.3, TypeScript 7, Vite 8, Vitest 5, Storybook 10.6, Stylelint 17, Oxlint 1.82, jsdom 30, and others
- Moved long-form docs into `docs/` (`BUNDLE_OPTIMIZATION.md`, `PROJECT_SUMMARY.md`, `QUICK_START.md`)
- Reformatted the codebase with oxfmt (tabs, single quotes)
- Renamed the `type-check` script to `typecheck` and `vite.config.ts` to `vite.config.mts` (ESM), clearing Vite's `configLoader: 'native'` warning
- Improved `PROJECT_SUMMARY.md` with current statistics
- Refreshed `QUICK_START.md` with Calendar examples
- Named the Storybook `render` functions that use hooks so `react-hooks/rules-of-hooks` passes

### Fixed

- TypeScript 7 build/test compatibility via the `@typescript/typescript6` compiler fallback
- jest-dom v7 matcher types by including `vitest.setup.ts` in the TypeScript program
- Icon test font-size assertions under jsdom 30
- Stylelint empty-line rule violations in `Calendar.scss`
- Removed stray `.DS_Store` and backup files
- Repaired the oxlint config: renamed `oxlintrc.json` to `.oxlintrc.json` so it is actually discovered, removed rule names not present in oxlint 1.82, added `env.browser`, and ignored the generated `src/assets/icons/iconfont.js` (clears the "minified file" warning)
- `Input` now derives its fallback id with `useId` instead of `Math.random()` during render, so the id stays stable across re-renders
- `Modal` derives `shouldRender` from `showModal || isAnimating` instead of storing it in state
- Migrated `Calendar.scss` from the deprecated Sass `@import` to `@use '../../styles/utilities' as *`, clearing the Dart Sass 3.0 deprecation warning from `pnpm build`

## [1.0.0] - 2025-12-14

### Added

- Initial release of @jayson991/react-ui
- Modal component with multiple sizes (small, medium, large, fullscreen)
- Button component with 4 variants (primary, secondary, danger, ghost)
- Input component with label, error, and helper text support
- Full TypeScript support with complete type definitions
- Comprehensive test suites with 84 tests and 88.57% coverage
- Responsive design for mobile (≤480px), tablet (481-768px), and desktop (≥1024px)
- Accessibility features including ARIA attributes and keyboard navigation
- Touch device optimizations with 44px minimum touch targets
- High contrast mode support
- Reduced motion support for accessibility
- Sass-based styling with BEM naming convention
- Storybook documentation for all components
- Tree-shakeable ESM and CJS builds
- Bundle size: 19.68 kB (6.12 kB gzipped)

### Features

#### Modal Component

- Flexible sizes: small (400px), medium (680px), large (900px), fullscreen
- Centered and non-centered positioning options
- Smooth fade animations with customizable duration
- Custom header and footer support
- Backdrop click and ESC key to close
- Focus trap for accessibility
- Scroll lock when modal is open
- Responsive padding and dimensions

#### Button Component

- 4 variants: primary, secondary, danger, ghost
- 3 sizes: small, medium, large
- Loading state with spinner
- Full width option
- Disabled state handling
- All standard HTML button attributes
- Responsive sizing for different screen sizes

#### Input Component

- Label support with automatic ID generation
- Error message display
- Helper text support
- 3 sizes: small, medium, large
- Full width option
- Prefix and suffix icon support
- All standard HTML input types
- Responsive sizing and touch-optimized inputs

### Technical Details

- React 19.2.3
- TypeScript 5.9.3
- Sass 1.96.0
- Vite 7.2.7 for building
- Vitest 4.0.15 for testing
- Storybook 10.1.8 for documentation
- Oxlint 1.32.0 for linting
- Stylelint 16.26.1 for Sass linting

[1.0.0]: https://github.com/jaysonwu991/react-ui/releases/tag/v1.0.0
