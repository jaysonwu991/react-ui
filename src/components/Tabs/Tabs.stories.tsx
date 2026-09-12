import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Tabs, { TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta = {
	title: 'Tabs',
	component: Tabs,
	parameters: {
		docs: {
			description: {
				component:
					'Accessible tabs built on ARIA roles. Supports controlled and uncontrolled state, horizontal and vertical orientation, and full keyboard navigation with arrow keys plus Home/End.',
			},
		},
	},
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
			description: 'Layout orientation of the tab list',
			table: {
				type: { summary: "'horizontal' | 'vertical'" },
				defaultValue: { summary: "'horizontal'" },
			},
		},
		value: {
			control: 'text',
			description: 'Controlled active tab value',
		},
		defaultValue: {
			control: 'text',
			description: 'Initial active tab value for uncontrolled usage',
		},
		onValueChange: {
			action: 'valueChanged',
			description: 'Called with the next value when the active tab changes',
		},
	},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: null,
		defaultValue: 'account',
		onValueChange: fn(),
	},
	render: function DefaultStory() {
		return (
			<Tabs defaultValue="account">
				<TabsList>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>
				<TabsContent value="account">Manage your account details.</TabsContent>
				<TabsContent value="password">Change your password here.</TabsContent>
				<TabsContent value="settings">Configure your preferences.</TabsContent>
			</Tabs>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Uncontrolled tabs with an initial value of `account`.',
			},
		},
	},
};

export const Controlled: Story = {
	args: {
		children: null,
		value: 'account',
		onValueChange: fn(),
	},
	render: function ControlledStory() {
		const [value, setValue] = useState('account');
		return (
			<Tabs value={value} onValueChange={setValue}>
				<TabsList>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					Currently selected: <strong>{value}</strong>
				</TabsContent>
				<TabsContent value="password">Change your password here.</TabsContent>
			</Tabs>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Controlled tabs driven by external React state.',
			},
		},
	},
};

export const Vertical: Story = {
	args: {
		children: null,
		defaultValue: 'profile',
		orientation: 'vertical',
	},
	render: function VerticalStory() {
		return (
			<Tabs defaultValue="profile" orientation="vertical">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
					<TabsTrigger value="billing">Billing</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">Your public profile.</TabsContent>
				<TabsContent value="notifications">Notification settings.</TabsContent>
				<TabsContent value="billing">Invoices and payment methods.</TabsContent>
			</Tabs>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					'Vertical orientation uses ArrowUp/ArrowDown instead of left/right.',
			},
		},
	},
};
