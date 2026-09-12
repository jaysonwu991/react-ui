import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

const meta = {
	title: 'Progress',
	component: Progress,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A determinate or indeterminate progress bar with colour variants, sizes and an optional percentage label.',
			},
		},
	},
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Current value, clamped between 0 and max',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' },
			},
		},
		max: {
			control: 'number',
			description: 'Maximum value',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '100' },
			},
		},
		variant: {
			control: 'select',
			options: ['primary', 'success', 'warning', 'danger'],
			description: 'Colour variant',
			table: {
				type: { summary: "'primary' | 'success' | 'warning' | 'danger'" },
				defaultValue: { summary: "'primary'" },
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Track thickness',
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		indeterminate: {
			control: 'boolean',
			description: 'Render an animated, indeterminate bar',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		showLabel: {
			control: 'boolean',
			description: 'Show the percentage next to the bar',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		label: {
			control: 'text',
			description: 'Accessible label for the progress bar',
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 40,
		label: 'Progress',
	},
};

export const WithLabel: Story = {
	args: {
		value: 65,
		showLabel: true,
		label: 'Upload progress',
	},
};

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
		label: 'Loading',
	},
};

export const Variants: Story = {
	args: {
		value: 60,
	},
	render: (args) => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Progress {...args} variant="primary" />
			<Progress {...args} variant="success" />
			<Progress {...args} variant="warning" />
			<Progress {...args} variant="danger" />
		</div>
	),
};

export const Sizes: Story = {
	args: {
		value: 50,
	},
	render: (args) => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Progress {...args} size="small" />
			<Progress {...args} size="medium" />
			<Progress {...args} size="large" />
		</div>
	),
};

export const CustomMax: Story = {
	args: {
		value: 3,
		max: 10,
		showLabel: true,
		label: 'Steps',
	},
};
