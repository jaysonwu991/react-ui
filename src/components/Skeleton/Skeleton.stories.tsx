import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

const meta = {
	title: 'Skeleton',
	component: Skeleton,
	parameters: {
		docs: {
			description: {
				component:
					'A loading placeholder with text, circular and rectangular variants plus pulse and wave animations. Hidden from assistive technology.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'circular', 'rectangular'],
			description: 'Shape variant',
			table: {
				type: { summary: "'text' | 'circular' | 'rectangular'" },
				defaultValue: { summary: "'text'" },
			},
		},
		animation: {
			control: 'select',
			options: ['pulse', 'wave', 'none'],
			description: 'Animation style',
			table: {
				type: { summary: "'pulse' | 'wave' | 'none'" },
				defaultValue: { summary: "'pulse'" },
			},
		},
		width: {
			control: 'text',
			description: 'Width, numbers are treated as pixels',
		},
		height: {
			control: 'text',
			description: 'Height, numbers are treated as pixels',
		},
	},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
	args: {
		variant: 'text',
		width: '100%',
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '360px' }}>
				<Story />
			</div>
		),
	],
};

export const Circular: Story = {
	args: {
		variant: 'circular',
		width: 64,
		height: 64,
	},
};

export const Rectangular: Story = {
	args: {
		variant: 'rectangular',
		width: 320,
		height: 180,
	},
};

export const Wave: Story = {
	args: {
		variant: 'rectangular',
		width: 320,
		height: 120,
		animation: 'wave',
	},
};

export const NoAnimation: Story = {
	args: {
		variant: 'rectangular',
		width: 320,
		height: 120,
		animation: 'none',
	},
};

export const CardPlaceholder: Story = {
	args: {},
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '12px',
				alignItems: 'center',
				maxWidth: '360px',
			}}
		>
			<Skeleton variant="circular" width={48} height={48} />
			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
				}}
			>
				<Skeleton variant="text" width="70%" />
				<Skeleton variant="text" width="40%" />
			</div>
		</div>
	),
};
