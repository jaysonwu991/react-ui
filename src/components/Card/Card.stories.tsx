import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Card, {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from './Card';

const meta = {
	title: 'Card',
	component: Card,
	parameters: {
		docs: {
			description: {
				component:
					'A flexible container for grouping related content. Supports elevated, outlined, and filled variants, configurable padding, and an interactive state. Compose it with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['elevated', 'outlined', 'filled'],
			description: 'Visual style variant',
			table: {
				type: { summary: "'elevated' | 'outlined' | 'filled'" },
				defaultValue: { summary: "'elevated'" },
			},
		},
		padding: {
			control: 'select',
			options: ['none', 'small', 'medium', 'large'],
			description: 'Internal padding',
			table: {
				type: { summary: "'none' | 'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		interactive: {
			control: 'boolean',
			description: 'Show interactive hover and focus affordances',
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'This is a card with some content inside.',
	},
};

export const Variants: Story = {
	args: {
		children: 'Card content',
	},
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '16px',
			}}
		>
			<Card variant="elevated">
				<CardTitle>Elevated</CardTitle>
				<CardDescription>Shadow based card.</CardDescription>
			</Card>
			<Card variant="outlined">
				<CardTitle>Outlined</CardTitle>
				<CardDescription>Border based card.</CardDescription>
			</Card>
			<Card variant="filled">
				<CardTitle>Filled</CardTitle>
				<CardDescription>Background based card.</CardDescription>
			</Card>
		</div>
	),
};

export const Paddings: Story = {
	args: {
		children: 'Card content',
	},
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gap: '16px',
			}}
		>
			<Card padding="none">
				<CardTitle>None</CardTitle>
			</Card>
			<Card padding="small">
				<CardTitle>Small</CardTitle>
			</Card>
			<Card padding="medium">
				<CardTitle>Medium</CardTitle>
			</Card>
			<Card padding="large">
				<CardTitle>Large</CardTitle>
			</Card>
		</div>
	),
};

export const Interactive: Story = {
	args: {
		children: 'Clickable card',
		interactive: true,
		onClick: fn(),
	},
};

export const Composition: Story = {
	args: {
		children: 'Card content',
	},
	render: () => (
		<div style={{ maxWidth: '360px' }}>
			<Card variant="outlined" padding="large">
				<CardHeader>
					<CardTitle>Create project</CardTitle>
					<CardDescription>
						Deploy your new project in one click.
					</CardDescription>
				</CardHeader>
				<CardContent>
					Your project will be created with a default configuration that you can
					change at any time.
				</CardContent>
				<CardFooter>
					<button type="button">Cancel</button>
					<button type="button">Deploy</button>
				</CardFooter>
			</Card>
		</div>
	),
};

export const InteractiveGrid: Story = {
	args: {
		children: 'Card content',
	},
	render: function InteractiveGridStory() {
		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '16px',
				}}
			>
				{['Analytics', 'Reports', 'Settings'].map((title) => (
					<Card key={title} interactive onClick={fn()} variant="elevated">
						<CardTitle>{title}</CardTitle>
						<CardDescription>
							Open the {title.toLowerCase()} panel.
						</CardDescription>
					</Card>
				))}
			</div>
		);
	},
};
