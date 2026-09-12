import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Checkbox from './Checkbox';

const meta = {
	title: 'Checkbox',
	component: Checkbox,
	parameters: {
		docs: {
			description: {
				component:
					'A checkbox built on a native input for full keyboard and form support. Ships a styled indicator, optional label, indeterminate state, and inline error messaging.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed next to the checkbox',
		},
		indeterminate: {
			control: 'boolean',
			description: 'Render the indeterminate (mixed) state',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		error: { control: 'text', description: 'Error message' },
		disabled: {
			control: 'boolean',
			description: 'Disable the checkbox',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onChange: { action: 'changed' },
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Accept terms and conditions',
		onChange: fn(),
	},
};

export const Checked: Story = {
	args: {
		label: 'Checked by default',
		defaultChecked: true,
	},
};

export const Indeterminate: Story = {
	args: {
		label: 'Select all',
		indeterminate: true,
	},
};

export const WithError: Story = {
	args: {
		label: 'I agree to the privacy policy',
		error: 'You must accept before continuing',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Unavailable option',
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		label: 'Locked selection',
		disabled: true,
		defaultChecked: true,
	},
};

export const States: Story = {
	args: {
		label: 'Checkbox',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<Checkbox label="Unchecked" />
			<Checkbox label="Checked" defaultChecked />
			<Checkbox label="Indeterminate" indeterminate />
			<Checkbox label="Disabled" disabled />
			<Checkbox label="Disabled checked" disabled defaultChecked />
			<Checkbox label="With error" error="Something went wrong" />
		</div>
	),
};
