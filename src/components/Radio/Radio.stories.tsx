import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Radio, { RadioGroup } from './Radio';

const meta = {
	title: 'Radio',
	component: RadioGroup,
	parameters: {
		docs: {
			description: {
				component:
					'A compound radio group built on native inputs for keyboard navigation. RadioGroup shares the name, value and disabled state with its Radio children through context.',
			},
		},
	},
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
			description: 'Layout direction',
			table: {
				type: { summary: "'horizontal' | 'vertical'" },
				defaultValue: { summary: "'vertical'" },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disable every radio in the group',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onValueChange: {
			action: 'valueChanged',
			description: 'Called when the selected value changes',
		},
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'fruit',
		label: 'Favourite fruit',
		children: null,
	},
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="apple" label="Apple" />
			<Radio value="banana" label="Banana" />
			<Radio value="cherry" label="Cherry" />
		</RadioGroup>
	),
};

export const Horizontal: Story = {
	args: {
		name: 'size',
		label: 'T-shirt size',
		orientation: 'horizontal',
		children: null,
	},
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="small" label="Small" />
			<Radio value="medium" label="Medium" />
			<Radio value="large" label="Large" />
		</RadioGroup>
	),
};

export const WithDefaultValue: Story = {
	args: {
		name: 'plan',
		label: 'Plan',
		defaultValue: 'pro',
		children: null,
	},
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="free" label="Free" />
			<Radio value="pro" label="Pro" />
			<Radio value="enterprise" label="Enterprise" />
		</RadioGroup>
	),
};

export const Disabled: Story = {
	args: {
		name: 'disabled',
		label: 'Disabled group',
		disabled: true,
		children: null,
	},
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="a" label="Option A" />
			<Radio value="b" label="Option B" />
		</RadioGroup>
	),
};

export const WithDisabledOption: Story = {
	args: {
		name: 'mixed',
		label: 'Mixed',
		children: null,
	},
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="a" label="Available" />
			<Radio value="b" label="Unavailable" disabled />
		</RadioGroup>
	),
};

export const WithError: Story = {
	args: {
		name: 'required',
		label: 'Required choice',
		error: 'Please select an option',
		children: null,
	},
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="a" label="Option A" />
			<Radio value="b" label="Option B" />
		</RadioGroup>
	),
};

export const Controlled: Story = {
	args: {
		name: 'controlled',
		label: 'Controlled',
		children: null,
	},
	render: function ControlledRadioGroup(args) {
		return (
			<RadioGroup
				{...args}
				value="b"
				onValueChange={fn()}
				orientation="horizontal"
			>
				<Radio value="a" label="Option A" />
				<Radio value="b" label="Option B" />
				<Radio value="c" label="Option C" />
			</RadioGroup>
		);
	},
};
