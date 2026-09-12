# AGENTS.md

Single-package React component library (`@jayson991/react-ui`). No monorepo, no CI, no `opencode.json`. pnpm is the package manager (`pnpm-lock.yaml`).

## Commands

- Install: `pnpm install`
- `pnpm build` → `lib/` (ESM `index.js`, CJS `index.cjs`, rolled-up `index.d.ts`, `react-ui.css`, async `iconfont-*` chunks, plus type-only `lib/components/**/*.d.ts`); `lib/` is gitignored and may be absent.
- `pnpm typecheck` (`tsc --noEmit`), `pnpm lint` (oxlint), `pnpm lint:fix`, `pnpm lint:sass` (stylelint), `pnpm test` (vitest run), `pnpm test:watch`, `pnpm test:coverage`.
- `pnpm format` (oxfmt, writes), `pnpm format:check` (oxfmt, check only), `pnpm format:sass` (stylelint --fix).
- Single test: `pnpm test src/components/Button/Button.test.tsx` (or `-t "name"`).
- `pnpm storybook` (dev server, port 6006), `pnpm build-storybook` (static output → `storybook-static/`, gitignored).
- pnpm 11 blocks postinstall scripts by default; `pnpm-workspace.yaml` `allowBuilds` whitelists `esbuild`/`@parcel/watcher`. If a fresh clone fails with `ERR_PNPM_IGNORED_BUILDS`, run `pnpm approve-builds`, or prefix a script with `pnpm --config.verify-deps-before-run=false <script>`.
- Run scripts as plain `pnpm <script>` (e.g. `pnpm lint`). Do **not** prefix with bare `rtk`: `rtk` is the sandbox output-filter proxy, and `rtk lint` wrongly forwards to `eslint` (not installed) and fails. If proxying, use `rtk pnpm lint`.

## Formatting

- **oxfmt** (`oxfmt`) is the formatter, configured by `.oxfmtrc.json`: tabs, single quotes, 80-column width, no import/package.json sorting. `.editorconfig` also declares `indent_style = tab`.
- oxfmt covers TS/TSX, JSON, Markdown, YAML, and SCSS. Generated icon assets are ignored via `ignorePatterns` (`iconfont.js`/`.css`/`.json`, `demo.*`).
- The repo was historically inconsistent (some files 2-space); `pnpm format` normalizes to tabs. Run it before committing.

## Toolchain quirks (do not "clean up")

- TypeScript 7 removed the JS Compiler API, so `vite-plugin-dts`/`unplugin-dts` needs the `@typescript/typescript6` devDependency fallback; without it `vite.config.mts` fails to load (breaks both `test` and `build`).
- `vite.config.mts` is intentionally `.mts` (ESM) and uses `import.meta.dirname`; renaming it to `vite.config.ts` or reintroducing `__dirname` re-triggers Vite's `configLoader: 'native'` warning.
- `src/vite-env.d.ts` (`/// <reference types="vite/client" />`) supplies `*.scss` module declarations. TS 7 otherwise errors `TS2882` on side-effect SCSS imports.
- `tsconfig.json` `include` also lists `vitest.setup.ts` so jest-dom v7's Vitest matcher augmentation is in the type program.
- jsdom 30 resolves `em` font sizes to `px` in computed styles; tests asserting unit passthrough check inline `style.fontSize` instead of `toHaveStyle`.
- Shared SCSS is consumed with `@use ... as *` (not `@import`), so `pnpm build` prints no Dart Sass deprecation warnings. Keep it that way.
- Lint config is `.oxlintrc.json` — the leading dot is required, or oxlint silently falls back to defaults. It enables the react plugin, sets `env.browser`, and `ignorePatterns` excludes the generated `src/assets/icons/iconfont.js` (oxlint otherwise reports it as a minified file). `Modal.tsx` locally disables `react/set-state-in-effect` around its enter/exit animation effect.

## Layout

- Public entry `src/index.ts`; barrel `src/components/index.ts`. Each component dir (`Modal`, `Button`, `Input`, `Icon`, `Calendar`) contains `Component.tsx`, `Component.scss`, `Component.test.tsx`, `Component.stories.tsx`, `index.ts`.
- Every `Component.tsx` imports its own `.scss`, so styles load with the component. `package.json` `sideEffects` lists SCSS/CSS.
- Shared SCSS variables, breakpoints, and mixins live in `src/styles/_utilities.scss`; component SCSS imports it via `@use '../../styles/utilities' as *` (namespaced members are flattened with `as *`). Class names follow BEM.
- Icon fonts/SVG live in `src/assets/icons/` (`iconfont.css`/`.js`), lazy-loaded through `src/assets/icons/loader.ts` (`loadIconFont`, `loadIconSvg`, `loadAllIcons`). `.storybook/preview.ts` imports them manually.
- Storybook picks up `src/**/*.stories.tsx`; `src/stories/Introduction.stories.tsx` is a live full-library overview.
- Long-form docs live in `docs/` (`BUNDLE_OPTIMIZATION.md`, `PROJECT_SUMMARY.md`, `QUICK_START.md`); root holds `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`.
- Tests are colocated, use Vitest globals + Testing Library + jsdom (`vitest.setup.ts`). Coverage thresholds are 70% in `vite.config.mts`. `pnpm lint` passes clean.

## Build / publish quirk

`vite build` is single-entry (`src/index.ts`). It emits `lib/index.*`, `lib/react-ui.css`, async `iconfont-*` chunks, and **type declarations only** under `lib/components/**` and `lib/assets/icons/loader.d.ts` (via `vite-plugin-dts`). The `exports` map intentionally exposes only the package root and `./styles` (`lib/react-ui.css`); there are no per-component subpaths, so import everything from the root.

## Conventions

- TypeScript is strict with `noUnusedLocals`/`noUnusedParameters`; `jsx: react-jsx`.
- Commits follow Conventional Commits (`feat(Button): ...`), per `CONTRIBUTING.md`.
