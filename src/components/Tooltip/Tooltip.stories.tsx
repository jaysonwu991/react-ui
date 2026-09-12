import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta = {
	title: 'Tooltip',
	component: Tooltip,
	parameters: {
		docs: {
			description: {
				component:
					'Lightweight tooltip that appears on hover and focus and dismisses on Escape. No portal, no runtime dependencies.',
			},
		},
	},
	argTypes: {
		placement: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Preferred placement relative to the trigger',
			table: {
				type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
				defaultValue: { summary: "'top'" },
			},
		},
		delay: {
			control: { type: 'number', min: 0, step: 50 },
			description: 'Delay before showing the tooltip, in milliseconds',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '200' },
			},
		},
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Hover me',
		content: 'This is a tooltip',
	},
};

export const Placements: Story = {
	args: {
		children: 'Trigger',
		content: 'Tooltip',
	},
	render: function PlacementsStory() {
		return (
			<div
				style={{
					display: 'flex',
					gap: '48px',
					padding: '80px',
					justifyContent: 'center',
				}}
			>
				<Tooltip content="Top tooltip" placement="top">
					Top
				</Tooltip>
				<Tooltip content="Bottom tooltip" placement="bottom">
					Bottom
				</Tooltip>
				<Tooltip content="Left tooltip" placement="left">
					Left
				</Tooltip>
				<Tooltip content="Right tooltip" placement="right">
					Right
				</Tooltip>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'The four supported placements.',
			},
		},
	},
};

export const CustomDelay: Story = {
	args: {
		children: 'Hover for 800ms delay',
		content: 'Delayed tooltip',
		delay: 800,
	},
	parameters: {
		docs: {
			description: {
				story: 'A longer delay before the tooltip appears.',
			},
		},
	},
};
