import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Select from './Select';

const options = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'angular', label: 'Angular', disabled: true },
];

const meta = {
	title: 'Select',
	component: Select,
	parameters: {
		docs: {
			description: {
				component:
					'An accessible native select with a custom chevron, optional label, error and helper text. Options can be supplied declaratively or as children.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label rendered above the field',
		},
		error: {
			control: 'text',
			description: 'Error message',
		},
		helperText: {
			control: 'text',
			description: 'Helper text shown when there is no error',
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder option shown while no value is selected',
		},
		fullWidth: {
			control: 'boolean',
			description: 'Stretch the select to fill its container',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the select',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onChange: {
			action: 'changed',
			description: 'Change handler',
		},
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		options,
		onChange: fn(),
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Framework',
		options,
		onChange: fn(),
	},
};

export const WithPlaceholder: Story = {
	args: {
		label: 'Framework',
		placeholder: 'Select a framework',
		options,
		onChange: fn(),
	},
};

export const WithHelperText: Story = {
	args: {
		label: 'Framework',
		helperText: 'Choose the framework you use most',
		options,
		onChange: fn(),
	},
};

export const WithError: Story = {
	args: {
		label: 'Framework',
		error: 'Please select a framework',
		options,
		onChange: fn(),
	},
};

export const Disabled: Story = {
	args: {
		label: 'Framework',
		disabled: true,
		options,
		onChange: fn(),
	},
};

export const FullWidth: Story = {
	args: {
		label: 'Framework',
		fullWidth: true,
		options,
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '100%', maxWidth: '420px' }}>
				<Story />
			</div>
		),
	],
};

export const WithChildren: Story = {
	args: {
		label: 'Framework',
		onChange: fn(),
	},
	render: (args) => (
		<Select {...args}>
			<option value="react">React</option>
			<option value="vue">Vue</option>
			<option value="svelte">Svelte</option>
		</Select>
	),
};
