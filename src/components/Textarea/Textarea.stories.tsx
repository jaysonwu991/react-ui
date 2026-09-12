import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Textarea from './Textarea';

const meta = {
	title: 'Textarea',
	component: Textarea,
	parameters: {
		docs: {
			description: {
				component:
					'A multiline text field with an optional label, helper text, error messaging, full width support, and configurable resize behavior. Automatically wires up `aria-invalid` and `aria-describedby`.',
			},
		},
	},
	argTypes: {
		resize: {
			control: 'select',
			options: ['none', 'vertical', 'horizontal', 'both'],
			description: 'Resize behavior of the field',
			table: {
				type: { summary: "'none' | 'vertical' | 'horizontal' | 'both'" },
				defaultValue: { summary: "'vertical'" },
			},
		},
		fullWidth: {
			control: 'boolean',
			description: 'Stretch to the available width',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the textarea',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		label: { control: 'text', description: 'Field label' },
		error: { control: 'text', description: 'Error message' },
		helperText: { control: 'text', description: 'Helper text' },
		onChange: { action: 'changed' },
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Write a message...',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Description',
		placeholder: 'Describe the issue',
		helperText: 'Keep it concise and specific.',
	},
};

export const WithError: Story = {
	args: {
		label: 'Description',
		error: 'Description is required',
		placeholder: 'Describe the issue',
	},
};

export const FullWidth: Story = {
	args: {
		label: 'Comment',
		fullWidth: true,
		placeholder: 'Add a comment',
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

export const ResizeOptions: Story = {
	args: {
		placeholder: 'Resize me',
	},
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			<Textarea label="None" resize="none" />
			<Textarea label="Vertical" resize="vertical" />
			<Textarea label="Horizontal" resize="horizontal" />
			<Textarea label="Both" resize="both" />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		disabled: true,
		value: 'Read only content',
	},
};
