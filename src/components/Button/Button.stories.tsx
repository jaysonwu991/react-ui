import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Button from './Button';

const meta = {
	title: 'Button',
	component: Button,
	parameters: {
		docs: {
			description: {
				component:
					'A versatile button component with multiple variants, sizes, and states. Supports loading state, full width, and all standard HTML button attributes.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'danger', 'ghost'],
			description: 'Visual style variant',
			table: {
				type: { summary: "'primary' | 'secondary' | 'danger' | 'ghost'" },
				defaultValue: { summary: "'primary'" },
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size of the button',
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		fullWidth: {
			control: 'boolean',
			description: 'Make button full width',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		loading: {
			control: 'boolean',
			description: 'Show loading spinner',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the button',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Click handler',
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Primary Button
export const Primary: Story = {
	args: {
		children: 'Primary Button',
		variant: 'primary',
		onClick: fn(),
	},
	parameters: {
		docs: {
			description: {
				story:
					'The default primary button style. Used for main call-to-action buttons.',
			},
		},
	},
};

// Variants
export const Variants: Story = {
	args: {
		children: 'Button',
		onClick: fn(),
	},
	render: () => (
		<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
			<Button variant="primary" onClick={fn()}>
				Primary
			</Button>
			<Button variant="secondary" onClick={fn()}>
				Secondary
			</Button>
			<Button variant="danger" onClick={fn()}>
				Danger
			</Button>
			<Button variant="ghost" onClick={fn()}>
				Ghost
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Four visual variants: `primary` (main actions), `secondary` (alternative actions), `danger` (destructive actions), and `ghost` (subtle actions).',
			},
		},
	},
};

// Sizes
export const Sizes: Story = {
	args: {
		children: 'Button',
		onClick: fn(),
	},
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '12px',
				alignItems: 'center',
				flexWrap: 'wrap',
			}}
		>
			<Button size="small" onClick={fn()}>
				Small
			</Button>
			<Button size="medium" onClick={fn()}>
				Medium
			</Button>
			<Button size="large" onClick={fn()}>
				Large
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Three size options: `small` (32px), `medium` (40px - default), and `large` (48px). Automatically optimized for mobile devices.',
			},
		},
	},
};

// Loading State
export const Loading: Story = {
	args: {
		children: 'Loading Button',
		loading: true,
		onClick: fn(),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Loading state with spinner animation. The button is automatically disabled while loading.',
			},
		},
	},
};

// Disabled State
export const Disabled: Story = {
	args: {
		children: 'Disabled Button',
		disabled: true,
		onClick: fn(),
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled state with reduced opacity and no pointer events.',
			},
		},
	},
};

// Full Width
export const FullWidth: Story = {
	args: {
		children: 'Full Width Button',
		fullWidth: true,
		onClick: fn(),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Button that stretches to fill the available width. Useful for mobile layouts.',
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: '100%', maxWidth: '400px' }}>
				<Story />
			</div>
		),
	],
};

// With Icons (example)
export const WithIcons: Story = {
	args: {
		children: 'Button',
	},
	render: () => (
		<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
			<Button onClick={fn()}>
				<span>⬅</span> Back
			</Button>
			<Button variant="primary" onClick={fn()}>
				Next <span>➡</span>
			</Button>
			<Button variant="danger" onClick={fn()}>
				<span>🗑️</span> Delete
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Buttons can contain icons or emojis alongside text. Use gap in children for spacing.',
			},
		},
	},
};

// All Variants and States
export const AllVariantsAndStates: Story = {
	args: {
		children: 'Button',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div>
				<h3 style={{ marginTop: 0, marginBottom: '12px' }}>Normal State</h3>
				<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
					<Button variant="primary" onClick={fn()}>
						Primary
					</Button>
					<Button variant="secondary" onClick={fn()}>
						Secondary
					</Button>
					<Button variant="danger" onClick={fn()}>
						Danger
					</Button>
					<Button variant="ghost" onClick={fn()}>
						Ghost
					</Button>
				</div>
			</div>

			<div>
				<h3 style={{ marginTop: 0, marginBottom: '12px' }}>Loading State</h3>
				<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
					<Button variant="primary" loading onClick={fn()}>
						Primary
					</Button>
					<Button variant="secondary" loading onClick={fn()}>
						Secondary
					</Button>
					<Button variant="danger" loading onClick={fn()}>
						Danger
					</Button>
					<Button variant="ghost" loading onClick={fn()}>
						Ghost
					</Button>
				</div>
			</div>

			<div>
				<h3 style={{ marginTop: 0, marginBottom: '12px' }}>Disabled State</h3>
				<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
					<Button variant="primary" disabled onClick={fn()}>
						Primary
					</Button>
					<Button variant="secondary" disabled onClick={fn()}>
						Secondary
					</Button>
					<Button variant="danger" disabled onClick={fn()}>
						Danger
					</Button>
					<Button variant="ghost" disabled onClick={fn()}>
						Ghost
					</Button>
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Overview of all button variants in different states: normal, loading, and disabled.',
			},
		},
	},
};
