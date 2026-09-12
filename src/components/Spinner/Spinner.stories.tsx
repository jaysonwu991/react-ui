import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = {
	title: 'Spinner',
	component: Spinner,
	parameters: {
		docs: {
			description: {
				component:
					'An animated loading spinner with size and colour variants. Exposes a status role with a visually hidden label for screen readers.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size of the spinner',
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		variant: {
			control: 'select',
			options: ['primary', 'current', 'white'],
			description: 'Colour variant',
			table: {
				type: { summary: "'primary' | 'current' | 'white'" },
				defaultValue: { summary: "'primary'" },
			},
		},
		label: {
			control: 'text',
			description: 'Accessible label announced to screen readers',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'Loading'" },
			},
		},
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Sizes: Story = {
	args: {},
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '24px',
				alignItems: 'center',
			}}
		>
			<Spinner size="small" />
			<Spinner size="medium" />
			<Spinner size="large" />
		</div>
	),
};

export const Variants: Story = {
	args: {},
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '24px',
				alignItems: 'center',
			}}
		>
			<Spinner variant="primary" />
			<Spinner variant="current" />
			<span style={{ color: '#1f2937' }}>
				<Spinner variant="current" />
			</span>
			<span
				style={{
					display: 'inline-flex',
					padding: '8px',
					background: '#3b82f6',
					borderRadius: '6px',
				}}
			>
				<Spinner variant="white" />
			</span>
		</div>
	),
};

export const CustomLabel: Story = {
	args: {
		label: 'Saving changes',
	},
};
