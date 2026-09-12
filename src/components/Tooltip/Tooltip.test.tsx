import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import type { ComponentProps } from 'react';
import Tooltip from './Tooltip';

const renderTooltip = (props: Partial<ComponentProps<typeof Tooltip>> = {}) =>
	render(
		<Tooltip content="Tooltip text" delay={0} {...props}>
			Hover me
		</Tooltip>,
	);

describe('Tooltip Component', () => {
	describe('Rendering', () => {
		it('should render the trigger', () => {
			renderTooltip();
			expect(screen.getByText('Hover me')).toBeInTheDocument();
		});

		it('should not expose the tooltip before it opens', () => {
			renderTooltip();
			expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
		});

		it('should apply a custom className', () => {
			const { container } = renderTooltip({ className: 'custom-tooltip' });
			expect(container.querySelector('.tooltip')).toHaveClass('custom-tooltip');
		});
	});

	describe('Accessibility', () => {
		it('should link the trigger to the tooltip via aria-describedby', async () => {
			const user = userEvent.setup();
			renderTooltip();

			const trigger = screen.getByText('Hover me');
			const tooltipId = trigger.getAttribute('aria-describedby');
			expect(tooltipId).toBeTruthy();

			await user.hover(trigger);
			const tooltip = await screen.findByRole('tooltip');
			expect(tooltip).toHaveAttribute('id', tooltipId);
		});
	});

	describe('Pointer interaction', () => {
		it('should show on pointer enter and hide on pointer leave', async () => {
			const user = userEvent.setup();
			renderTooltip();

			const trigger = screen.getByText('Hover me');
			await user.hover(trigger);
			expect(await screen.findByRole('tooltip')).toBeInTheDocument();

			await user.unhover(trigger);
			await waitFor(() =>
				expect(screen.queryByRole('tooltip')).not.toBeInTheDocument(),
			);
		});
	});

	describe('Focus interaction', () => {
		it('should show on focus and hide on blur', async () => {
			const user = userEvent.setup();
			renderTooltip();

			const trigger = screen.getByText('Hover me');
			await user.tab();
			expect(trigger).toHaveFocus();
			expect(await screen.findByRole('tooltip')).toBeInTheDocument();

			await user.tab();
			await waitFor(() =>
				expect(screen.queryByRole('tooltip')).not.toBeInTheDocument(),
			);
		});

		it('should hide on Escape', async () => {
			const user = userEvent.setup();
			renderTooltip();

			await user.tab();
			expect(await screen.findByRole('tooltip')).toBeInTheDocument();

			await user.keyboard('{Escape}');
			await waitFor(() =>
				expect(screen.queryByRole('tooltip')).not.toBeInTheDocument(),
			);
		});
	});

	describe('Placement', () => {
		it('should apply the placement modifier class', async () => {
			const user = userEvent.setup();
			renderTooltip({ placement: 'right' });

			await user.hover(screen.getByText('Hover me'));
			const tooltip = await screen.findByRole('tooltip');
			expect(tooltip).toHaveClass('tooltip__content--right');
		});
	});
});
