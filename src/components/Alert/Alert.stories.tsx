import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Alert from './Alert';

const meta = {
	title: 'Alert',
	component: Alert,
	parameters: {
		docs: {
			description: {
				component:
					'A contextual feedback message for important information. Supports four semantic variants, an optional title and icon, and an optional dismiss action.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['info', 'success', 'warning', 'danger'],
			description: 'Visual style variant',
			table: {
				type: { summary: "'info' | 'success' | 'warning' | 'danger'" },
				defaultValue: { summary: "'info'" },
			},
		},
		title: {
			control: 'text',
			description: 'Optional title displayed above the content',
		},
		dismissible: {
			control: 'boolean',
			description: 'Whether the alert can be dismissed',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onDismiss: {
			action: 'dismissed',
			description: 'Callback fired when the alert is dismissed',
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'This is an informational alert.',
	},
};

export const Variants: Story = {
	args: {
		children: 'Alert content',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<Alert variant="info" title="Info">
				A new version is available.
			</Alert>
			<Alert variant="success" title="Success">
				Your changes have been saved.
			</Alert>
			<Alert variant="warning" title="Warning">
				Your subscription expires soon.
			</Alert>
			<Alert variant="danger" title="Error">
				Something went wrong while processing your request.
			</Alert>
		</div>
	),
};

export const WithIcon: Story = {
	args: {
		children: 'Your changes have been saved.',
		variant: 'success',
		title: 'Success',
		icon: <span>✓</span>,
	},
};

export const Dismissible: Story = {
	args: {
		children: 'You can dismiss this alert.',
		variant: 'warning',
		title: 'Warning',
		dismissible: true,
		onDismiss: fn(),
	},
};

export const DismissibleWithIcon: Story = {
	args: {
		children: 'Something went wrong while processing your request.',
		variant: 'danger',
		title: 'Error',
		icon: <span>!</span>,
		dismissible: true,
		onDismiss: fn(),
	},
};
