import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta = {
	title: 'Badge',
	component: Badge,
	parameters: {
		docs: {
			description: {
				component:
					'A compact label for statuses, counts, and categories. Available in seven variants and three sizes, with an optional leading dot.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'success',
				'warning',
				'danger',
				'info',
				'outline',
			],
			description: 'Visual style variant',
			table: {
				type: {
					summary:
						"'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'",
				},
				defaultValue: { summary: "'primary'" },
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size of the badge',
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		dot: {
			control: 'boolean',
			description: 'Show a small colored dot before the content',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Badge',
	},
};

export const Variants: Story = {
	args: {
		children: 'Badge',
	},
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="danger">Danger</Badge>
			<Badge variant="info">Info</Badge>
			<Badge variant="outline">Outline</Badge>
		</div>
	),
};

export const Sizes: Story = {
	args: {
		children: 'Badge',
	},
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
			<Badge size="small">Small</Badge>
			<Badge size="medium">Medium</Badge>
			<Badge size="large">Large</Badge>
		</div>
	),
};

export const WithDot: Story = {
	args: {
		children: 'Online',
		variant: 'success',
		dot: true,
	},
};

export const StatusList: Story = {
	args: {
		children: 'Badge',
	},
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			<Badge variant="success" dot>
				Active
			</Badge>
			<Badge variant="warning" dot>
				Pending
			</Badge>
			<Badge variant="danger" dot>
				Failed
			</Badge>
			<Badge variant="secondary" dot>
				Archived
			</Badge>
		</div>
	),
};
