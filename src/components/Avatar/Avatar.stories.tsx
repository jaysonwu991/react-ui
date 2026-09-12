import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta = {
	title: 'Avatar',
	component: Avatar,
	parameters: {
		docs: {
			description: {
				component:
					'Avatar for representing a user with an image, generated initials, or custom fallback content, plus an optional presence status.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large', 'xlarge'],
			description: 'Size of the avatar',
			table: {
				type: { summary: "'small' | 'medium' | 'large' | 'xlarge'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		shape: {
			control: 'select',
			options: ['circle', 'square'],
			description: 'Shape of the avatar',
			table: {
				type: { summary: "'circle' | 'square'" },
				defaultValue: { summary: "'circle'" },
			},
		},
		status: {
			control: 'select',
			options: ['online', 'offline', 'busy', 'away'],
			description: 'Presence status indicator',
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	args: {
		src: 'https://i.pravatar.cc/150?img=12',
		alt: 'Jane Doe',
		name: 'Jane Doe',
	},
};

export const WithInitials: Story = {
	args: {
		name: 'Jane Doe',
	},
};

export const CustomFallback: Story = {
	args: {
		name: 'Jane Doe',
		fallback: '??',
	},
};

export const Sizes: Story = {
	args: {
		name: 'Jane Doe',
	},
	render: function SizesStory() {
		return (
			<div
				style={{
					display: 'flex',
					gap: '16px',
					alignItems: 'center',
				}}
			>
				<Avatar name="Small User" size="small" />
				<Avatar name="Medium User" size="medium" />
				<Avatar name="Large User" size="large" />
				<Avatar name="Xlarge User" size="xlarge" />
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'The four available sizes.',
			},
		},
	},
};

export const Shapes: Story = {
	args: {
		name: 'Jane Doe',
	},
	render: function ShapesStory() {
		return (
			<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
				<Avatar name="Circle User" shape="circle" size="large" />
				<Avatar name="Square User" shape="square" size="large" />
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Circle and square shapes.',
			},
		},
	},
};

export const Status: Story = {
	args: {
		name: 'Jane Doe',
	},
	render: function StatusStory() {
		return (
			<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
				<Avatar name="Online User" status="online" size="large" />
				<Avatar name="Offline User" status="offline" size="large" />
				<Avatar name="Busy User" status="busy" size="large" />
				<Avatar name="Away User" status="away" size="large" />
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Presence status dots.',
			},
		},
	},
};
