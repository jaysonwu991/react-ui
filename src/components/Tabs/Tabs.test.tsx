import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Tabs, { TabsList, TabsTrigger, TabsContent } from './Tabs';

interface TestTabsProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	orientation?: 'horizontal' | 'vertical';
	className?: string;
}

const renderTabs = (props: TestTabsProps = {}) =>
	render(
		<Tabs {...props}>
			<TabsList>
				<TabsTrigger value="one">One</TabsTrigger>
				<TabsTrigger value="two">Two</TabsTrigger>
				<TabsTrigger value="three">Three</TabsTrigger>
			</TabsList>
			<TabsContent value="one">Panel one</TabsContent>
			<TabsContent value="two">Panel two</TabsContent>
			<TabsContent value="three">Panel three</TabsContent>
		</Tabs>,
	);

describe('Tabs Component', () => {
	describe('Rendering', () => {
		it('should render a tablist with three tabs', () => {
			renderTabs({ defaultValue: 'one' });
			expect(screen.getByRole('tablist')).toBeInTheDocument();
			expect(screen.getAllByRole('tab')).toHaveLength(3);
		});

		it('should mark the default value as selected', () => {
			renderTabs({ defaultValue: 'two' });
			expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
				'aria-selected',
				'true',
			);
			expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
				'aria-selected',
				'false',
			);
		});

		it('should only expose the active panel', () => {
			renderTabs({ defaultValue: 'one' });
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel one');
			expect(screen.queryByText('Panel two')).not.toBeVisible();
		});

		it('should apply a custom className', () => {
			renderTabs({ defaultValue: 'one', className: 'custom-tabs' });
			expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
				'custom-tabs',
			);
		});
	});

	describe('Accessibility', () => {
		it('should link each trigger to its panel', () => {
			renderTabs({ defaultValue: 'one' });
			const trigger = screen.getByRole('tab', { name: 'One' });
			const panel = screen.getByRole('tabpanel');
			expect(trigger).toHaveAttribute('aria-controls', panel.id);
			expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
		});

		it('should expose the panel accessible name from the trigger', () => {
			renderTabs({ defaultValue: 'two' });
			expect(screen.getByRole('tabpanel', { name: 'Two' })).toBeInTheDocument();
		});

		it('should set aria-orientation on the tablist', () => {
			renderTabs({ defaultValue: 'one', orientation: 'vertical' });
			expect(screen.getByRole('tablist')).toHaveAttribute(
				'aria-orientation',
				'vertical',
			);
		});
	});

	describe('Interaction', () => {
		it('should activate a tab on click (uncontrolled)', async () => {
			const user = userEvent.setup();
			const onValueChange = vi.fn();
			renderTabs({ defaultValue: 'one', onValueChange });

			await user.click(screen.getByRole('tab', { name: 'Two' }));

			expect(onValueChange).toHaveBeenCalledWith('two');
			expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
				'aria-selected',
				'true',
			);
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel two');
		});

		it('should respect controlled value', async () => {
			const user = userEvent.setup();
			const onValueChange = vi.fn();
			renderTabs({ value: 'one', onValueChange });

			await user.click(screen.getByRole('tab', { name: 'Three' }));

			expect(onValueChange).toHaveBeenCalledWith('three');
			expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
				'aria-selected',
				'true',
			);
		});
	});

	describe('Keyboard navigation', () => {
		it('should move focus and activate with ArrowRight', async () => {
			const user = userEvent.setup();
			renderTabs({ defaultValue: 'one' });

			screen.getByRole('tab', { name: 'One' }).focus();
			await user.keyboard('{ArrowRight}');

			const two = screen.getByRole('tab', { name: 'Two' });
			expect(two).toHaveFocus();
			expect(two).toHaveAttribute('aria-selected', 'true');
		});

		it('should wrap with ArrowLeft from the first tab', async () => {
			const user = userEvent.setup();
			renderTabs({ defaultValue: 'one' });

			screen.getByRole('tab', { name: 'One' }).focus();
			await user.keyboard('{ArrowLeft}');

			expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
		});

		it('should jump to first and last with Home/End', async () => {
			const user = userEvent.setup();
			renderTabs({ defaultValue: 'two' });

			screen.getByRole('tab', { name: 'Two' }).focus();
			await user.keyboard('{End}');
			expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();

			await user.keyboard('{Home}');
			expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
		});

		it('should use ArrowUp/ArrowDown in vertical orientation', async () => {
			const user = userEvent.setup();
			renderTabs({ defaultValue: 'one', orientation: 'vertical' });

			screen.getByRole('tab', { name: 'One' }).focus();
			await user.keyboard('{ArrowDown}');
			expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();

			await user.keyboard('{ArrowUp}');
			expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
		});

		it('should ignore unrelated keys', async () => {
			const user = userEvent.setup();
			renderTabs({ defaultValue: 'one' });

			screen.getByRole('tab', { name: 'One' }).focus();
			await user.keyboard('a');

			expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
		});
	});
});
