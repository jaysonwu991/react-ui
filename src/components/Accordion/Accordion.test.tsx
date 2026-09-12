import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Accordion, {
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from './Accordion';

interface TestAccordionProps {
	type?: 'single' | 'multiple';
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
	collapsible?: boolean;
	className?: string;
}

const renderAccordion = (props: TestAccordionProps = {}) =>
	render(
		<Accordion {...props}>
			<AccordionItem value="a">
				<AccordionTrigger>Section A</AccordionTrigger>
				<AccordionContent>Content A</AccordionContent>
			</AccordionItem>
			<AccordionItem value="b">
				<AccordionTrigger>Section B</AccordionTrigger>
				<AccordionContent>Content B</AccordionContent>
			</AccordionItem>
			<AccordionItem value="c">
				<AccordionTrigger>Section C</AccordionTrigger>
				<AccordionContent>Content C</AccordionContent>
			</AccordionItem>
		</Accordion>,
	);

describe('Accordion Component', () => {
	describe('Rendering', () => {
		it('should render triggers for each item', () => {
			renderAccordion();
			expect(screen.getAllByRole('button')).toHaveLength(3);
		});

		it('should open the item from defaultValue', () => {
			renderAccordion({ defaultValue: ['a'] });
			expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
				'aria-expanded',
				'true',
			);
			expect(screen.getByRole('region')).toHaveTextContent('Content A');
		});

		it('should set data-state on items', () => {
			renderAccordion({ defaultValue: ['a'] });
			const item = screen
				.getByRole('button', { name: 'Section A' })
				.closest('.accordion__item');
			expect(item).toHaveAttribute('data-state', 'open');
			expect(
				screen
					.getByRole('button', { name: 'Section B' })
					.closest('.accordion__item'),
			).toHaveAttribute('data-state', 'closed');
		});

		it('should apply a custom className', () => {
			renderAccordion({ className: 'custom-accordion' });
			expect(
				screen.getAllByRole('button')[0].closest('.accordion'),
			).toHaveClass('custom-accordion');
		});
	});

	describe('Accessibility', () => {
		it('should link trigger and region', () => {
			renderAccordion({ defaultValue: ['a'] });
			const trigger = screen.getByRole('button', { name: 'Section A' });
			const region = screen.getByRole('region');
			expect(trigger).toHaveAttribute('aria-controls', region.id);
			expect(region).toHaveAttribute('aria-labelledby', trigger.id);
		});

		it('should expose the region accessible name', () => {
			renderAccordion({ defaultValue: ['b'] });
			expect(
				screen.getByRole('region', { name: 'Section B' }),
			).toBeInTheDocument();
		});
	});

	describe('Single type', () => {
		it('should switch the open item on click', async () => {
			const user = userEvent.setup();
			const onValueChange = vi.fn();
			renderAccordion({ defaultValue: ['a'], onValueChange });

			await user.click(screen.getByRole('button', { name: 'Section B' }));

			expect(onValueChange).toHaveBeenCalledWith(['b']);
			expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
				'aria-expanded',
				'false',
			);
			expect(screen.getByRole('button', { name: 'Section B' })).toHaveAttribute(
				'aria-expanded',
				'true',
			);
		});

		it('should collapse the open item when collapsible', async () => {
			const user = userEvent.setup();
			const onValueChange = vi.fn();
			renderAccordion({ defaultValue: ['a'], onValueChange });

			await user.click(screen.getByRole('button', { name: 'Section A' }));

			expect(onValueChange).toHaveBeenCalledWith([]);
			expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
				'aria-expanded',
				'false',
			);
		});

		it('should keep the item open when collapsible is false', async () => {
			const user = userEvent.setup();
			renderAccordion({ defaultValue: ['a'], collapsible: false });

			await user.click(screen.getByRole('button', { name: 'Section A' }));

			expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
				'aria-expanded',
				'true',
			);
		});
	});

	describe('Multiple type', () => {
		it('should allow several items to be open', async () => {
			const user = userEvent.setup();
			const onValueChange = vi.fn();
			renderAccordion({ type: 'multiple', defaultValue: ['a'], onValueChange });

			await user.click(screen.getByRole('button', { name: 'Section B' }));

			expect(onValueChange).toHaveBeenCalledWith(['a', 'b']);
			expect(screen.getAllByRole('region')).toHaveLength(2);
		});
	});

	describe('Controlled', () => {
		it('should respect the controlled value', async () => {
			const user = userEvent.setup();
			const onValueChange = vi.fn();
			renderAccordion({ value: ['a'], onValueChange });

			await user.click(screen.getByRole('button', { name: 'Section B' }));

			expect(onValueChange).toHaveBeenCalledWith(['b']);
			expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
				'aria-expanded',
				'true',
			);
		});
	});

	describe('Keyboard navigation', () => {
		it('should move focus with ArrowDown/ArrowUp', async () => {
			const user = userEvent.setup();
			renderAccordion();

			screen.getByRole('button', { name: 'Section A' }).focus();
			await user.keyboard('{ArrowDown}');
			expect(screen.getByRole('button', { name: 'Section B' })).toHaveFocus();

			await user.keyboard('{ArrowUp}');
			expect(screen.getByRole('button', { name: 'Section A' })).toHaveFocus();
		});

		it('should jump to first and last with Home/End', async () => {
			const user = userEvent.setup();
			renderAccordion();

			screen.getByRole('button', { name: 'Section B' }).focus();
			await user.keyboard('{End}');
			expect(screen.getByRole('button', { name: 'Section C' })).toHaveFocus();

			await user.keyboard('{Home}');
			expect(screen.getByRole('button', { name: 'Section A' })).toHaveFocus();
		});
	});
});
