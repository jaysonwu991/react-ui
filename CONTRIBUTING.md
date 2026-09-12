# Contributing to @jayson991/react-ui

Thanks for your interest in improving @jayson991/react-ui!

## Code of Conduct

Be professional and respectful in all project interactions.

## Reporting Bugs & Suggesting Enhancements

Search existing issues first to avoid duplicates. When opening an issue, include a clear title, steps to reproduce (or a detailed proposal), expected vs. actual behavior, and your environment (OS, browser, Node version).

## Pull Requests

1. Fork the repo and branch from `main`.
2. Install dependencies with `pnpm install`.
3. Make your changes following the guidelines below.
4. Add or update tests.
5. Run the full check suite (see [Testing Requirements](#testing-requirements)).
6. Update documentation if behavior changed.
7. Commit with a [Conventional Commit](#commit-messages) message and open a pull request.

## Development Setup

Requires Node.js 20+ and pnpm.

```bash
git clone https://github.com/YOUR_USERNAME/react-ui.git
cd react-ui
pnpm install

pnpm test           # run tests once
pnpm test:watch     # watch mode
pnpm test:coverage  # coverage report
pnpm typecheck      # tsc --noEmit
pnpm lint           # oxlint
pnpm lint:sass      # stylelint
pnpm format         # oxfmt (writes)
pnpm format:check   # oxfmt (check only)
pnpm build          # build the library
pnpm storybook      # Storybook on port 6006
```

## Coding Guidelines

### TypeScript

- Type all new code; avoid `any`.
- TypeScript is strict with `noUnusedLocals` and `noUnusedParameters` — remove unused code.

### React

- Use function components with hooks.
- Keep components focused and single-purpose.
- Name props clearly and document them with JSDoc comments.

### Styling

- Use Sass (`.scss`) and BEM class names.
- Keep styles component-scoped; import the component stylesheet from its `.tsx`.
- Reuse the variables, breakpoints, and mixins in `src/styles/_utilities.scss`.
- Ensure responsive and accessible output (WCAG 2.1 AA).

### Formatting & Linting

- **oxfmt** formats all code (`pnpm format`); tabs, single quotes, 80-column width.
- **oxlint** lints JS/TS (`pnpm lint`, `pnpm lint:fix`).
- **stylelint** lints Sass (`pnpm lint:sass`, `pnpm format:sass`).
- Do not hand-format around these tools.

### Testing

- Write tests for new features with React Testing Library.
- Test user interactions and accessibility, not implementation details.
- Coverage thresholds are enforced at **70%** (branches, functions, lines, statements) in `vite.config.mts`.

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

Examples:

```
feat(Button): add icon support
fix(Modal): prevent body scroll while open
docs(README): correct Calendar props
```

## Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx          # Component implementation
│   │   ├── Button.scss         # Component styles
│   │   ├── Button.test.tsx     # Tests
│   │   ├── Button.stories.tsx  # Storybook stories
│   │   └── index.ts            # Public exports
│   ├── Input/  Icon/  Modal/  Calendar/
│   └── index.ts                # Component barrel
├── styles/_utilities.scss      # Shared variables, breakpoints, mixins
├── assets/icons/               # Icon fonts, SVG symbols, loader
└── index.ts                    # Library entry point
```

Every component follows the same five-file layout.

## Testing Requirements

All pull requests must:

- Pass the existing test suite and include tests for new behavior.
- Pass `pnpm typecheck`.
- Pass `pnpm lint` and `pnpm lint:sass`.
- Be formatted with `pnpm format`.

CI runs these checks on every push and pull request to `main`; keep them green locally before pushing.

## Documentation

- Update `README.md` for user-facing changes.
- Add Storybook stories for new components or props.
- Record notable changes in `CHANGELOG.md` (Keep a Changelog format).

## Questions?

Open an issue for questions about the codebase or contribution process.
