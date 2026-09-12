# @jayson991/react-ui

A modern, responsive, and accessible React UI component library built with TypeScript and Sass.

[![npm version](https://img.shields.io/npm/v/@jayson991/react-ui.svg)](https://www.npmjs.com/package/@jayson991/react-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6.svg)](https://www.typescriptlang.org/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Bundle size](https://img.shields.io/badge/bundle-~10%20kB%20gzip-blueviolet.svg)](#bundle-size)

## Features

- **22 components** — forms, overlays, feedback, navigation, and more
- **Responsive** — optimized for mobile, tablet, and desktop
- **Accessible** — ARIA attributes, keyboard navigation, focus management
- **TypeScript** — full type definitions included
- **Sass + BEM** — clean, overridable styles with CSS-variable theming
- **Zero runtime dependencies** — only React as a peer dependency
- **Dual format** — ESM and CommonJS builds, tree-shakeable
- **Icons** — Iconfont.cn / Icomoon.io icon fonts and SVG symbols
- **Playground** — interactive Storybook with a live overview

## Installation

```bash
npm install @jayson991/react-ui
# or
yarn add @jayson991/react-ui
# or
pnpm add @jayson991/react-ui
```

React and React DOM are peer dependencies (`>=18.0.0`).

## Quick Start

```tsx
import { useState } from 'react';
import { Modal, Button, Input, Icon, Calendar } from '@jayson991/react-ui';

function App() {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [date, setDate] = useState<Date | null>(null);

	return (
		<div>
			<Input
				label="Your Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Enter your name"
			/>

			<Calendar
				mode="single"
				value={date}
				onChange={(next) => setDate(next as Date)}
			/>

			<Button onClick={() => setShowModal(true)}>
				<Icon name="user" size={16} />
				Open Modal
			</Button>

			<Modal
				title="Welcome"
				showModal={showModal}
				onHideModal={() => setShowModal(false)}
			>
				<p>Hello, {name || 'Guest'}!</p>
				{date && <p>Selected date: {date.toLocaleDateString()}</p>}
			</Modal>
		</div>
	);
}
```

Each component imports its own Sass, so no separate CSS import is required.

## Playground

Run the interactive Storybook to explore every component, its variants, and props:

```bash
pnpm storybook
```

The **Introduction** story is a live overview of the whole library.

## Components

| Component              | Description                               |
| ---------------------- | ----------------------------------------- |
| `Accordion`            | Vertically stacked, collapsible sections  |
| `Alert`                | Contextual feedback messages              |
| `Avatar`               | Image or initials with presence status    |
| `Badge`                | Compact status or count labels            |
| `Button`               | Actions and triggers                      |
| `Calendar`             | Date selection (single, multiple, range)  |
| `Card`                 | Content container with header and footer  |
| `Checkbox`             | Binary and indeterminate selection        |
| `Icon`                 | Iconfont and SVG icons                    |
| `Input`                | Single-line text field                    |
| `Label`                | Accessible form label                     |
| `Modal`                | Dialog overlay                            |
| `Progress`             | Determinate and indeterminate progress    |
| `Radio` / `RadioGroup` | Single choice from a set                  |
| `Select`               | Native select with label and error states |
| `Separator`            | Visual divider                            |
| `Skeleton`             | Loading placeholders                      |
| `Spinner`              | Loading indicator                         |
| `Switch`               | On/off toggle                             |
| `Tabs`                 | Layered content sections                  |
| `Textarea`             | Multi-line text field                     |
| `Tooltip`              | Contextual hint on hover and focus        |

The original five components are documented in full below. For every prop of the
rest, open Storybook (`pnpm storybook`) — each component ships an autodocs page.

### Modal

```tsx
import { Modal } from '@jayson991/react-ui';

<Modal
	title="My Modal"
	showModal={isOpen}
	onHideModal={() => setIsOpen(false)}
	size="medium"
	centered
>
	<p>Modal content</p>
</Modal>;
```

| Prop                   | Type                                       | Default         | Description                         |
| ---------------------- | ------------------------------------------ | --------------- | ----------------------------------- |
| `showModal`            | `boolean`                                  | —               | **Required.** Controls visibility   |
| `onHideModal`          | `() => void`                               | —               | **Required.** Called when closing   |
| `title`                | `string`                                   | —               | Header title                        |
| `size`                 | `'small'\|'medium'\|'large'\|'fullscreen'` | `'medium'`      | Size variant                        |
| `children`             | `ReactNode`                                | —               | Modal body                          |
| `header`               | `ReactNode`                                | —               | Custom header (overrides `title`)   |
| `footer`               | `ReactNode`                                | —               | Custom footer                       |
| `closeOnBackdropClick` | `boolean`                                  | `true`          | Close when the backdrop is clicked  |
| `closeOnEscape`        | `boolean`                                  | `true`          | Close on Escape                     |
| `showCloseButton`      | `boolean`                                  | `true`          | Show the close button               |
| `showHeader`           | `boolean`                                  | `true`          | Show the header                     |
| `animated`             | `boolean`                                  | `true`          | Fade animation                      |
| `animationDuration`    | `number`                                   | `300`           | Animation duration (ms)             |
| `centered`             | `boolean`                                  | `false`         | Vertically center the modal         |
| `scrollable`           | `boolean`                                  | `false`         | Allow page scrolling while open     |
| `usePortal`            | `boolean`                                  | `true`          | Render through a React portal       |
| `portalContainer`      | `HTMLElement`                              | `document.body` | Portal target                       |
| `zIndex`               | `number`                                   | `1000`          | Backdrop z-index                    |
| `className`            | `string`                                   | —               | Class on the modal container        |
| `contentStyle`         | `CSSProperties`                            | —               | Inline styles for the content       |
| `backdropStyle`        | `CSSProperties`                            | —               | Inline styles for the backdrop      |
| `onOpen` / `onClose`   | `() => void`                               | —               | Lifecycle callbacks                 |
| `onAnimationEnd`       | `() => void`                               | —               | Fires after the animation completes |

### Button

```tsx
import { Button } from '@jayson991/react-ui';

<Button variant="primary" size="medium">
	Click Me
</Button>;
```

| Prop        | Type                                        | Default     | Description                  |
| ----------- | ------------------------------------------- | ----------- | ---------------------------- |
| `children`  | `ReactNode`                                 | —           | **Required.** Button content |
| `variant`   | `'primary'\|'secondary'\|'danger'\|'ghost'` | `'primary'` | Visual style                 |
| `size`      | `'small'\|'medium'\|'large'`                | `'medium'`  | Button size                  |
| `fullWidth` | `boolean`                                   | `false`     | Stretch to full width        |
| `loading`   | `boolean`                                   | `false`     | Show a spinner and disable   |
| `className` | `string`                                    | `''`        | Custom class                 |

Also accepts all standard `<button>` HTML attributes.

### Input

```tsx
import { Input } from '@jayson991/react-ui';

<Input
	label="Email"
	type="email"
	placeholder="your@email.com"
	error="Invalid email"
/>;
```

| Prop         | Type                         | Default    | Description                 |
| ------------ | ---------------------------- | ---------- | --------------------------- |
| `label`      | `string`                     | —          | Label text                  |
| `error`      | `string`                     | —          | Error message               |
| `helperText` | `string`                     | —          | Helper text below the input |
| `inputSize`  | `'small'\|'medium'\|'large'` | `'medium'` | Input size                  |
| `fullWidth`  | `boolean`                    | `false`    | Stretch to full width       |
| `prefix`     | `ReactNode`                  | —          | Element before the input    |
| `suffix`     | `ReactNode`                  | —          | Element after the input     |
| `className`  | `string`                     | `''`       | Custom class                |

Also accepts all standard `<input>` attributes except `size` and `prefix` (overridden by `inputSize` and `prefix`).

### Icon

```tsx
import { Icon } from '@jayson991/react-ui';

<Icon name="home" size={24} color="#3b82f6" />

<Icon type="svg" name="user" size={32} color="red" />

<Icon name="arrow-right" rotate={90} />

<Icon name="bell" badge={5} />
```

| Prop             | Type               | Default      | Description                                           |
| ---------------- | ------------------ | ------------ | ----------------------------------------------------- |
| `name`           | `string`           | —            | **Required.** Icon name without the `icon-` prefix    |
| `type`           | `'font'\|'svg'`    | `'font'`     | Rendering mode                                        |
| `size`           | `number \| string` | `16px` (CSS) | Size in pixels, or any CSS length                     |
| `color`          | `string`           | —            | Any valid CSS color; bare hex is normalized to `#hex` |
| `rotate`         | `number`           | —            | Rotation in degrees                                   |
| `flipHorizontal` | `boolean`          | —            | Flip horizontally                                     |
| `flipVertical`   | `boolean`          | —            | Flip vertically                                       |
| `spin`           | `boolean`          | —            | Continuous spin                                       |
| `pulse`          | `boolean`          | —            | Pulse animation                                       |
| `loading`        | `boolean`          | —            | Show the loading spinner                              |
| `disabled`       | `boolean`          | —            | Dim and disable interactions                          |
| `badge`          | `string \| number` | —            | Badge overlay                                         |
| `badgeColor`     | `string`           | `'#ef4444'`  | Badge background                                      |
| `title`          | `string`           | —            | Native tooltip                                        |
| `ariaLabel`      | `string`           | —            | Accessible label (defaults to `name`)                 |
| `onClick`        | `(event) => void`  | —            | Click handler; makes the icon focusable               |
| `onKeyDown`      | `(event) => void`  | —            | Key handler                                           |
| `className`      | `string`           | `''`         | Custom class                                          |
| `style`          | `CSSProperties`    | `{}`         | Inline styles                                         |

Icon assets are not bundled. Load them once with the exported loaders:

```tsx
import { loadIconFont, loadIconSvg, loadAllIcons } from '@jayson991/react-ui';

loadIconFont(); // type="font" icons
loadIconSvg(); // type="svg" icons
loadAllIcons(); // both at once
```

The loaders are idempotent, so calling them more than once is safe.

### Calendar

```tsx
import { Calendar, type DateRange } from '@jayson991/react-ui';

<Calendar
	mode="single"
	value={date}
	onChange={(next) => setDate(next as Date)}
	showTodayButton
	showWeekNumbers
/>;
```

| Prop                  | Type                                  | Default    | Description                     |
| --------------------- | ------------------------------------- | ---------- | ------------------------------- |
| `value`               | `Date \| Date[] \| DateRange \| null` | `null`     | Selected date(s)                |
| `defaultValue`        | `Date`                                | —          | Initial month to display        |
| `onChange`            | `(date) => void`                      | —          | Selection callback              |
| `mode`                | `'single'\|'multiple'\|'range'`       | `'single'` | Selection mode                  |
| `minDate` / `maxDate` | `Date`                                | —          | Selectable range                |
| `disabledDates`       | `Date[] \| ((date) => boolean)`       | —          | Disabled dates                  |
| `highlightedDates`    | `Date[] \| ((date) => boolean)`       | —          | Highlighted dates               |
| `firstDayOfWeek`      | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`     | `0`        | 0 = Sunday, 1 = Monday, …       |
| `showWeekNumbers`     | `boolean`                             | `false`    | Display week numbers            |
| `showTodayButton`     | `boolean`                             | `true`     | Show the “today” button         |
| `showClearButton`     | `boolean`                             | `true`     | Show the “clear” button         |
| `keyboardNavigation`  | `boolean`                             | `true`     | Enable keyboard controls        |
| `showAdjacentDates`   | `boolean`                             | `true`     | Show dates from adjacent months |
| `view`                | `'month' \| 'year'`                   | `'month'`  | Controlled view                 |
| `onViewChange`        | `(view) => void`                      | —          | View change callback            |
| `renderDate`          | `(date) => ReactNode`                 | —          | Custom date cell                |
| `renderHeader`        | `(date, changeMonth) => ReactNode`    | —          | Custom header                   |
| `dateClassName`       | `(date) => string`                    | —          | Extra class per date            |
| `locale`              | `string`                              | `'en-US'`  | Locale for date formatting      |
| `className`           | `string`                              | `''`       | Custom class                    |
| `disabled`            | `boolean`                             | `false`    | Disable the whole calendar      |

Selection modes:

```tsx
<Calendar mode="single" value={date} onChange={setDate} />
<Calendar mode="multiple" value={dates} onChange={setDates} />
<Calendar mode="range" value={{ start, end }} onChange={setRange} />
```

## Styling

Components use BEM class names (`.btn`, `.btn--primary`, `.input__label`, `.modal-content`, …) and accept `className` and `style` for overrides.

```tsx
<Button className="my-button">Custom Button</Button>

<Input style={{ borderColor: 'blue' }} label="Custom Input" />
```

The compiled stylesheet is also available as `@jayson991/react-ui/styles` if you prefer to load CSS yourself.

### Theming

Colors, radii, and surfaces resolve through CSS custom properties with Sass
fallbacks, so you can retheme the whole library without rebuilding:

```css
:root {
	--rui-primary: #7c3aed;
	--rui-primary-hover: #6d28d9;
	--rui-radius: 10px;
	--rui-bg: #ffffff;
	--rui-fg: #111827;
	--rui-muted: #6b7280;
	--rui-border: #e5e7eb;
	--rui-surface: #f9fafb;
}
```

Available tokens: `--rui-primary`, `--rui-primary-hover`, `--rui-success`,
`--rui-warning`, `--rui-danger`, `--rui-info`, `--rui-radius`, `--rui-bg`,
`--rui-fg`, `--rui-muted`, `--rui-border`, `--rui-surface`. The
`rui-theme-dark` Sass mixin sets the dark values for a scope.

## Responsive Design

Breakpoints: mobile `≤ 480px`, tablet `481–768px`, desktop `≥ 1024px`.

| Device      | Optimizations                                                                    |
| ----------- | -------------------------------------------------------------------------------- |
| **Mobile**  | 44px minimum touch targets, tighter spacing, 16px input font to prevent iOS zoom |
| **Tablet**  | Balanced sizing and spacing                                                      |
| **Desktop** | Full-featured experience with hover states                                       |

Additional behavior: touch-device tap feedback, high-contrast support, reduced-motion support, and dark-mode media queries.

## Bundle Size

Current build output (`pnpm build`):

| File              | Raw     | Gzipped |
| ----------------- | ------- | ------- |
| `index.js` (ESM)  | 35.2 kB | 10.5 kB |
| `index.cjs` (CJS) | 31.4 kB | 10.2 kB |
| `react-ui.css`    | 52.4 kB | 18.1 kB |

The icon SVG symbols are emitted as a separate lazy-loaded chunk; the icon font CSS is included in the main stylesheet.

## Tree-Shaking & Imports

Import everything from the package root. The build is ESM, so bundlers can drop unused component code:

```tsx
import { Button, Calendar } from '@jayson991/react-ui';
```

Each component statically imports its own stylesheet, and the package marks `*.scss`/`*.css` as side effects, so a component's styles travel with the component. Import from the package root, or load the compiled stylesheet directly via `@jayson991/react-ui/styles`.

## TypeScript

All public types are exported, including every component's props and variant
unions, plus the `cx` class-name helper and the `ClassValue` type. For example:

```tsx
import type {
	ModalProps,
	ModalSize,
	ButtonProps,
	ButtonVariant,
	ButtonSize,
	InputProps,
	InputSize,
	IconProps,
	CalendarProps,
	CalendarView,
	DayOfWeek,
	DateRange,
} from '@jayson991/react-ui';
```

## Development

```bash
pnpm install        # install dependencies
pnpm storybook      # Storybook dev server on port 6006
pnpm test           # run tests once
pnpm test:watch     # tests in watch mode
pnpm test:coverage  # coverage report
pnpm typecheck      # tsc --noEmit
pnpm lint           # oxlint
pnpm lint:sass      # stylelint
pnpm format         # oxfmt (write)
pnpm format:check   # oxfmt (check only)
pnpm build          # build the library
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Browser Support

Modern browsers with ES2015+ support: Chrome, Firefox, Safari, Edge, and their mobile counterparts.

## Tech Stack

React 19, TypeScript 7, Sass, Vite 8, Vitest 5, Storybook 10, Oxlint, Oxfmt, Stylelint.

## Documentation

- [Quick Start](docs/QUICK_START.md)
- [Bundle Optimization](docs/BUNDLE_OPTIMIZATION.md)
- [Project Summary](docs/PROJECT_SUMMARY.md)

## License

MIT © [jayson991](https://github.com/jaysonwu991)
