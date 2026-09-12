import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Accordion, {
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from './Accordion';

const meta = {
	title: 'Accordion',
	component: Accordion,
	parameters: {
		docs: {
			description: {
				component:
					'Accessible accordion with single and multiple selection modes, controlled or uncontrolled state, and keyboard navigation between triggers.',
			},
		},
	},
	argTypes: {
		type: {
			control: 'select',
			options: ['single', 'multiple'],
			description: 'Whether one or many items can be open at once',
			table: {
				type: { summary: "'single' | 'multiple'" },
				defaultValue: { summary: "'single'" },
			},
		},
		collapsible: {
			control: 'boolean',
			description: 'Allow closing the open item when type is single',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		onValueChange: {
			action: 'valueChanged',
			description: 'Called with the next open values',
		},
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
	args: {
		children: null,
		defaultValue: ['item-1'],
		onValueChange: fn(),
	},
	render: function SingleStory() {
		return (
			<Accordion defaultValue={['item-1']}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA accordion pattern.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it unstyled?</AccordionTrigger>
					<AccordionContent>
						It ships with sensible defaults and CSS custom properties.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Can it be controlled?</AccordionTrigger>
					<AccordionContent>
						Yes, pass the value and onValueChange props.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Single selection mode with the first item open by default.',
			},
		},
	},
};

export const Multiple: Story = {
	args: {
		children: null,
		type: 'multiple',
		defaultValue: ['item-1', 'item-3'],
		onValueChange: fn(),
	},
	render: function MultipleStory() {
		return (
			<Accordion type="multiple" defaultValue={['item-1', 'item-3']}>
				<AccordionItem value="item-1">
					<AccordionTrigger>First section</AccordionTrigger>
					<AccordionContent>First section content.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Second section</AccordionTrigger>
					<AccordionContent>Second section content.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Third section</AccordionTrigger>
					<AccordionContent>Third section content.</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Multiple selection mode with two items open at once.',
			},
		},
	},
};

export const NonCollapsible: Story = {
	args: {
		children: null,
		collapsible: false,
		defaultValue: ['item-1'],
		onValueChange: fn(),
	},
	render: function NonCollapsibleStory() {
		return (
			<Accordion collapsible={false} defaultValue={['item-1']}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Always open</AccordionTrigger>
					<AccordionContent>
						This item cannot be collapsed while it is the active one.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Another section</AccordionTrigger>
					<AccordionContent>Selecting this closes the first.</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Single mode with `collapsible` disabled.',
			},
		},
	},
};
