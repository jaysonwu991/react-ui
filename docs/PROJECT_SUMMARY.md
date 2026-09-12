# Project Summary: @jayson991/react-ui

## Overview

**@jayson991/react-ui** is a modern, lightweight React UI component library built with TypeScript and Sass. It ships 22 accessible, responsive components — form controls (`Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`), overlays (`Modal`, `Tooltip`), feedback (`Alert`, `Progress`, `Skeleton`, `Spinner`), navigation (`Tabs`, `Accordion`), and data display (`Card`, `Badge`, `Avatar`, `Calendar`, `Icon`, `Separator`, `Label`, `Button`).

## Statistics

- **Version**: 1.0.0
- **Components**: 22
- **Source**: ~3,300 lines of TS/TSX and ~3,450 lines of SCSS
- **Tests**: 474 tests across 22 files
- **Coverage threshold**: 70% (branches, functions, lines, statements)
- **Bundle**: 35.5 kB ESM (10.6 kB gzipped) + 52.4 kB CSS (18.1 kB gzipped)

## Project Structure

```
@jayson991/react-ui/
├── src/
│   ├── components/
│   │   ├── Accordion/ Alert/ Avatar/ Badge/ Button/ Calendar/ Card/
│   │   ├── Checkbox/ Icon/ Input/ Label/ Modal/ Progress/ Radio/
│   │   ├── Select/ Separator/ Skeleton/ Spinner/ Switch/ Tabs/
│   │   ├── Textarea/ Tooltip/
│   │   │   ├── <Name>.tsx          # Component
│   │   │   ├── <Name>.scss         # Styles
│   │   │   ├── <Name>.test.tsx     # Tests
│   │   │   ├── <Name>.stories.tsx  # Storybook
│   │   │   └── index.ts            # Exports
│   │   └── index.ts                # Component barrel
│   ├── utils/cx.ts                 # Class-name helper
│   ├── styles/_utilities.scss      # Shared variables, tokens, breakpoints, mixins
│   ├── assets/icons/               # Icon fonts, SVG symbols, loader
│   └── index.ts                    # Library entry
├── docs/                           # Long-form documentation
│   ├── BUNDLE_OPTIMIZATION.md
│   ├── PROJECT_SUMMARY.md
│   └── QUICK_START.md
├── .storybook/                     # Storybook config
├── lib/                            # Build output (gitignored)
└── config files (package.json, tsconfig.json, vite.config.mts, …)
```

## Technology Stack

| Area         | Tools                                                    |
| ------------ | -------------------------------------------------------- |
| Runtime      | React 19 (peer), React DOM 19 (peer)                     |
| Build        | Vite 8, TypeScript 7, Sass 1.104, vite-plugin-dts 5      |
| Testing      | Vitest 5, Testing Library, jsdom 30, @vitest/coverage-v8 |
| Docs         | Storybook 10.6                                           |
| Code quality | Oxlint 1.82, Oxfmt 0.67, Stylelint 17 (standard-scss)    |

## Component Features

### Modal

Sizes `small`/`medium`/`large`/`fullscreen`; centered or top-aligned; fade animations; custom header and footer; backdrop and Escape close; focus trap; scroll lock; optional React portal.

### Button

Variants `primary`/`secondary`/`danger`/`ghost`; sizes `small`/`medium`/`large`; loading spinner; full width; disabled state; all native button attributes.

### Input

Label with auto-generated ID; error and helper text; sizes `small`/`medium`/`large`; prefix/suffix slots; full width; all native input types.

### Icon

Font (`type="font"`) and SVG (`type="svg"`) modes; size, color, rotation, flips; spin and pulse animations; loading state; badge overlay; keyboard activation; lazy-loadable assets.

### Calendar

Modes `single`/`multiple`/`range`; month and year views; min/max dates; disabled and highlighted dates; week numbers; configurable first day of week; today/clear buttons; keyboard navigation; locale support; custom date rendering and styling.

### Card, Badge, Avatar, Separator

`Card` is a compound container (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) with `elevated`/`outlined`/`filled` variants. `Badge` supports seven variants, three sizes, and a dot indicator. `Avatar` renders an image with initials fallback, four sizes, two shapes, and a presence status. `Separator` draws horizontal or vertical dividers with an optional label.

### Form controls

`Label`, `Textarea`, `Checkbox`, `Switch`, `Select`, and `Radio`/`RadioGroup` cover labels, multi-line input, binary and indeterminate selection, toggles, native select with error states, and single-choice groups. All support error/helper text, disabled states, and accessible labelling.

### Feedback

`Alert` (info/success/warning/danger, dismissible), `Progress` (determinate and indeterminate, four variants), `Skeleton` (text/circular/rectangular placeholders), and `Spinner` (three sizes) cover loading and status feedback.

### Navigation

`Tabs` (`TabsList`, `TabsTrigger`, `TabsContent`) and `Accordion` (`AccordionItem`, `AccordionTrigger`, `AccordionContent`) implement roving focus, arrow/Home/End keyboard navigation, and full ARIA wiring. `Tooltip` shows contextual hints on hover and focus, dismissible with Escape.

## Responsive Design

Breakpoints: mobile `≤ 480px`, tablet `481–768px`, desktop `≥ 1024px`. Includes 44px touch targets, high-contrast and reduced-motion support, and 16px mobile input font to prevent iOS zoom.

## Build Output

| File              | Raw     | Gzipped |
| ----------------- | ------- | ------- |
| `index.js` (ESM)  | 35.5 kB | 10.6 kB |
| `index.cjs` (CJS) | 31.8 kB | 10.3 kB |
| `react-ui.css`    | 52.4 kB | 18.1 kB |
| `iconfont-*.js`   | 18.1 kB | 7.2 kB  |

The build also emits `lib/index.d.ts` (rolled up) plus `lib/components/**/*.d.ts` type declarations.

### Package Exports

`package.json` exposes the package root (ESM + CJS + types) and `./styles` (the compiled stylesheet). Components are imported from the root so bundlers can tree-shake. See [BUNDLE_OPTIMIZATION.md](BUNDLE_OPTIMIZATION.md).

## Quality Metrics

| Component | Tests   |
| --------- | ------- |
| Accordion | 13      |
| Alert     | 16      |
| Avatar    | 15      |
| Badge     | 16      |
| Button    | 26      |
| Calendar  | 45      |
| Card      | 21      |
| Checkbox  | 22      |
| Icon      | 61      |
| Input     | 39      |
| Label     | 14      |
| Modal     | 20      |
| Progress  | 23      |
| Radio     | 16      |
| Select    | 19      |
| Separator | 9       |
| Skeleton  | 14      |
| Spinner   | 14      |
| Switch    | 21      |
| Tabs      | 14      |
| Textarea  | 28      |
| Tooltip   | 8       |
| **Total** | **474** |

The project uses TypeScript strict mode, has no lint errors, and no type errors.

## Scripts

```bash
pnpm storybook        # Storybook dev server (port 6006)
pnpm test             # run tests once
pnpm test:watch       # tests in watch mode
pnpm test:coverage    # coverage report
pnpm test:ui          # Vitest UI
pnpm typecheck        # TypeScript checking
pnpm lint             # oxlint
pnpm lint:sass        # stylelint
pnpm lint:fix         # oxlint --fix
pnpm format           # oxfmt (writes)
pnpm format:check     # oxfmt (check only)
pnpm format:sass      # stylelint --fix
pnpm build            # build the library
pnpm build-storybook  # build the Storybook site
```

## Configuration

- **TypeScript** (`tsconfig.json`): target ES2015, module ESNext, `jsx: react-jsx`, strict with `noUnusedLocals`/`noUnusedParameters`; includes `src/**/*` and `vitest.setup.ts`.
- **Vite** (`vite.config.mts`): library mode, ESM + CJS, React external, Terser minification, sourcemaps, `vite-plugin-dts` with rolled-up types.
- **Vitest**: jsdom environment, globals enabled, V8 coverage with 70% thresholds.
- **Stylelint**: extends `stylelint-config-standard-scss`; ignores icon assets.

## Browser Support

Modern browsers with ES2015+ support: Chrome, Firefox, Safari, Edge, and mobile equivalents.

## Repository

- **GitHub**: https://github.com/jaysonwu991/react-ui
- **npm**: https://www.npmjs.com/package/@jayson991/react-ui
- **Issues**: https://github.com/jaysonwu991/react-ui/issues
- **License**: MIT

## Future Enhancements

Additional components (DataTable, Toast, Command palette, …), a built-in dark-mode toggle, RTL support, and form validation utilities.
