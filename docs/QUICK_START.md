# Quick Start

Get up and running with `@jayson991/react-ui` in a couple of minutes.

## Installation

```bash
npm install @jayson991/react-ui
# or
pnpm add @jayson991/react-ui
```

React and React DOM (`>=18.0.0`) are peer dependencies.

## Basic Usage

```tsx
import { useState } from 'react';
import { Modal, Button, Input, Calendar } from '@jayson991/react-ui';

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [date, setDate] = useState<Date | null>(null);

	return (
		<>
			<Calendar
				mode="single"
				value={date}
				onChange={(next) => setDate(next as Date)}
				showTodayButton
			/>

			<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

			<Modal
				showModal={isOpen}
				onHideModal={() => setIsOpen(false)}
				title="Hello World"
			>
				<p>This is a modal!</p>
				{date && <p>Selected: {date.toLocaleDateString()}</p>}
			</Modal>
		</>
	);
}
```

Styles are imported automatically with each component.

## Common Patterns

### Form with Validation

```tsx
function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		setError('');
		try {
			await login(email, password);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Input
				label="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="your@email.com"
				fullWidth
			/>

			<Input
				label="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				error={error}
				fullWidth
			/>

			<Button
				onClick={handleSubmit}
				loading={loading}
				disabled={!email || !password}
				fullWidth
			>
				Log In
			</Button>
		</>
	);
}
```

### Confirmation Modal

```tsx
function DeleteButton({ itemName, onDelete }) {
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<>
			<Button variant="danger" onClick={() => setShowConfirm(true)}>
				Delete
			</Button>

			<Modal
				showModal={showConfirm}
				onHideModal={() => setShowConfirm(false)}
				title="Confirm Delete"
				size="small"
				centered
			>
				<p>Are you sure you want to delete "{itemName}"?</p>
				<p>This action cannot be undone.</p>
				<div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
					<Button
						variant="ghost"
						onClick={() => setShowConfirm(false)}
						fullWidth
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							onDelete();
							setShowConfirm(false);
						}}
						fullWidth
					>
						Delete
					</Button>
				</div>
			</Modal>
		</>
	);
}
```

### Input with Prefix/Suffix

```tsx
<Input
	label="Price"
	type="number"
	value={price}
	onChange={(e) => setPrice(e.target.value)}
	prefix={<span>$</span>}
	suffix={<span>USD</span>}
	helperText="Enter the product price"
/>
```

### Date Range Picker

```tsx
import { Calendar, type DateRange } from '@jayson991/react-ui';

function BookingForm() {
	const [dateRange, setDateRange] = useState<DateRange | null>(null);

	const today = new Date();
	const oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(today.getFullYear() + 1);

	return (
		<Calendar
			mode="range"
			value={dateRange}
			onChange={(range) => setDateRange(range as DateRange)}
			minDate={today}
			maxDate={oneYearFromNow}
			showWeekNumbers
			firstDayOfWeek={1}
		/>
	);
}
```

### Multiple Date Selection

```tsx
function EventScheduler() {
	const [dates, setDates] = useState<Date[]>([]);

	return (
		<>
			<Calendar
				mode="multiple"
				value={dates}
				onChange={(next) => setDates(next as Date[])}
				showTodayButton
				showClearButton
			/>
			<p>Selected {dates.length} date(s)</p>
		</>
	);
}
```

## Props Quick Reference

### Modal

| Prop          | Type                                       | Default    | Description                       |
| ------------- | ------------------------------------------ | ---------- | --------------------------------- |
| `showModal`   | `boolean`                                  | —          | **Required.** Controls visibility |
| `onHideModal` | `() => void`                               | —          | **Required.** Called when closing |
| `title`       | `string`                                   | —          | Header title                      |
| `size`        | `'small'\|'medium'\|'large'\|'fullscreen'` | `'medium'` | Modal size                        |
| `centered`    | `boolean`                                  | `false`    | Vertically center                 |
| `animated`    | `boolean`                                  | `true`     | Fade animation                    |
| `scrollable`  | `boolean`                                  | `false`    | Allow page scrolling while open   |

### Button

| Prop        | Type                                        | Default     | Description                  |
| ----------- | ------------------------------------------- | ----------- | ---------------------------- |
| `variant`   | `'primary'\|'secondary'\|'danger'\|'ghost'` | `'primary'` | Button style                 |
| `size`      | `'small'\|'medium'\|'large'`                | `'medium'`  | Button size                  |
| `loading`   | `boolean`                                   | `false`     | Show spinner, disable button |
| `fullWidth` | `boolean`                                   | `false`     | Stretch to full width        |
| `disabled`  | `boolean`                                   | `false`     | Disable button               |

### Input

| Prop         | Type                         | Default    | Description             |
| ------------ | ---------------------------- | ---------- | ----------------------- |
| `label`      | `string`                     | —          | Input label text        |
| `error`      | `string`                     | —          | Error message           |
| `helperText` | `string`                     | —          | Helper text below input |
| `inputSize`  | `'small'\|'medium'\|'large'` | `'medium'` | Input size              |
| `fullWidth`  | `boolean`                    | `false`    | Stretch to full width   |
| `prefix`     | `ReactNode`                  | —          | Element before input    |
| `suffix`     | `ReactNode`                  | —          | Element after input     |

### Icon

| Prop        | Type               | Default      | Description                               |
| ----------- | ------------------ | ------------ | ----------------------------------------- |
| `name`      | `string`           | —            | **Required.** Name without `icon-` prefix |
| `type`      | `'font'\|'svg'`    | `'font'`     | Icon type                                 |
| `size`      | `number \| string` | `16px` (CSS) | Icon size                                 |
| `color`     | `string`           | —            | Any valid CSS color                       |
| `rotate`    | `number`           | —            | Rotation in degrees                       |
| `spin`      | `boolean`          | —            | Continuous spin                           |
| `pulse`     | `boolean`          | —            | Pulse animation                           |
| `badge`     | `string \| number` | —            | Badge overlay                             |
| `onClick`   | `(event) => void`  | —            | Click handler                             |
| `ariaLabel` | `string`           | —            | Accessible label                          |

### Calendar

| Prop                  | Type                            | Default    | Description                  |
| --------------------- | ------------------------------- | ---------- | ---------------------------- |
| `value`               | `Date\|Date[]\|DateRange\|null` | `null`     | Selected date(s)             |
| `onChange`            | `(date) => void`                | —          | Called when a date is chosen |
| `mode`                | `'single'\|'multiple'\|'range'` | `'single'` | Selection mode               |
| `minDate` / `maxDate` | `Date`                          | —          | Selectable range             |
| `firstDayOfWeek`      | `0-6`                           | `0`        | First day of week (0=Sunday) |
| `showWeekNumbers`     | `boolean`                       | `false`    | Display week numbers         |
| `showTodayButton`     | `boolean`                       | `true`     | Show today button            |
| `showClearButton`     | `boolean`                       | `true`     | Show clear button            |
| `keyboardNavigation`  | `boolean`                       | `true`     | Enable keyboard navigation   |
| `locale`              | `string`                        | `'en-US'`  | Locale for date formatting   |
| `disabled`            | `boolean`                       | `false`    | Disable the calendar         |

## Custom Styling

All components accept `className` and `style`:

```tsx
<Button className="my-button">Click</Button>

<Input style={{ borderColor: 'blue' }} label="Custom Input" />
```

## TypeScript

```tsx
import type {
	ButtonProps,
	InputProps,
	ModalProps,
	CalendarProps,
	DateRange,
} from '@jayson991/react-ui';

const MyButton: React.FC<ButtonProps> = (props) => <Button {...props} />;

const [range, setRange] = useState<DateRange | null>(null);
```

## Troubleshooting

**Styles not appearing?** Ensure your bundler handles CSS imports. Each component imports its own Sass, so no extra setup is required in Vite or webpack.

**Type errors?** Install the React types: `pnpm add -D @types/react @types/react-dom`.

## Next Steps

- Read the [README](../README.md)
- Browse [Bundle Optimization](BUNDLE_OPTIMIZATION.md)
- Read the [Project Summary](PROJECT_SUMMARY.md)
- [Contribute](../CONTRIBUTING.md)
- Report [issues](https://github.com/jaysonwu991/react-ui/issues)
