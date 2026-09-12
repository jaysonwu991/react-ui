import type { Meta, StoryObj } from '@storybook/react';
import Separator from './Separator';

const meta = {
	title: 'Separator',
	component: Separator,
	parameters: {
		docs: {
			description: {
				component:
					'A visual divider between sections of content. Supports horizontal and vertical orientations, an optional centered label, and a decorative mode that hides it from assistive technology.',
			},
		},
	},
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
			description: 'Orientation of the separator',
			table: {
				type: { summary: "'horizontal' | 'vertical'" },
				defaultValue: { summary: "'horizontal'" },
			},
		},
		decorative: {
			control: 'boolean',
			description: 'Hide the separator from assistive technology',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		label: {
			control: 'text',
			description: 'Optional label rendered between two lines',
		},
	},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
};

export const WithLabel: Story = {
	args: {
		label: 'OR',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
	},
	decorators: [
		(Story) => (
			<div style={{ display: 'flex', alignItems: 'center', height: '48px' }}>
				<span>Left</span>
				<Story />
				<span>Right</span>
			</div>
		),
	],
};

export const Decorative: Story = {
	args: {
		decorative: true,
	},
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
};
