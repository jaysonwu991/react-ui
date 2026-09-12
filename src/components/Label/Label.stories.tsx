import type { Meta, StoryObj } from '@storybook/react';
import Label from './Label';

const meta = {
	title: 'Label',
	component: Label,
	parameters: {
		docs: {
			description: {
				component:
					'A form label with optional required indicator, disabled state, and three sizes. Associates with a form control via the standard `htmlFor` attribute.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size of the label',
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		required: {
			control: 'boolean',
			description: 'Show a required indicator',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Render the disabled style',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		htmlFor: {
			control: 'text',
			description: 'Id of the associated form control',
		},
	},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Username',
	},
};

export const Required: Story = {
	args: {
		children: 'Email address',
		required: true,
	},
};

export const Disabled: Story = {
	args: {
		children: 'Account number',
		disabled: true,
	},
};

export const Sizes: Story = {
	args: {
		children: 'Label',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Label size="small">Small label</Label>
			<Label size="medium">Medium label</Label>
			<Label size="large">Large label</Label>
		</div>
	),
};

export const WithFormControl: Story = {
	args: {
		children: 'Email',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
			<Label htmlFor="label-demo-input" required>
				Email
			</Label>
			<input id="label-demo-input" type="email" placeholder="you@example.com" />
		</div>
	),
};
