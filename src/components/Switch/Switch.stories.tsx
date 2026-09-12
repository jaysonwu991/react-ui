import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Switch from './Switch';

const meta = {
	title: 'Switch',
	component: Switch,
	parameters: {
		docs: {
			description: {
				component:
					'An accessible toggle built on a native button with `role="switch"`. Supports controlled and uncontrolled usage, three sizes, an optional adjacent label, and keyboard activation via Enter or Space.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size of the switch',
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		checked: {
			control: 'boolean',
			description: 'Controlled checked state',
		},
		defaultChecked: {
			control: 'boolean',
			description: 'Initial checked state for uncontrolled usage',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the switch',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		label: {
			control: 'text',
			description: 'Label displayed next to the switch',
		},
		onCheckedChange: { action: 'checkedChanged' },
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Enable notifications',
		onCheckedChange: fn(),
	},
};

export const Checked: Story = {
	args: {
		label: 'Enabled by default',
		defaultChecked: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Unavailable setting',
		disabled: true,
	},
};

export const Sizes: Story = {
	args: {
		label: 'Switch',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<Switch size="small" label="Small" defaultChecked />
			<Switch size="medium" label="Medium" defaultChecked />
			<Switch size="large" label="Large" defaultChecked />
		</div>
	),
};

export const Controlled: Story = {
	args: {
		label: 'Dark mode',
	},
	render: function ControlledSwitchStory() {
		const [checked, setChecked] = useState(false);
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<Switch
					label="Dark mode"
					checked={checked}
					onCheckedChange={setChecked}
				/>
				<span>Value: {checked ? 'on' : 'off'}</span>
			</div>
		);
	},
};
