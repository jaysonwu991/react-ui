import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Alert from './Alert';

describe('Alert Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Alert>Something happened</Alert>);
			const alert = screen.getByRole('alert');
			expect(alert).toBeInTheDocument();
			expect(alert).toHaveClass('alert', 'alert--info');
		});

		it('should render children content', () => {
			render(<Alert>Message body</Alert>);
			expect(screen.getByText('Message body')).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			render(<Alert className="custom-class">Message</Alert>);
			expect(screen.getByRole('alert')).toHaveClass('custom-class');
		});

		it('should render the title when provided', () => {
			render(<Alert title="Heads up">Details</Alert>);
			expect(screen.getByText('Heads up')).toBeInTheDocument();
			expect(screen.getByText('Heads up')).toHaveClass('alert__title');
		});

		it('should render the icon when provided', () => {
			render(<Alert icon={<span data-testid="icon">!</span>}>Details</Alert>);
			const icon = screen.getByTestId('icon');
			expect(icon.parentElement).toHaveClass('alert__icon');
		});

		it('should not render an icon by default', () => {
			const { container } = render(<Alert>Details</Alert>);
			expect(container.querySelector('.alert__icon')).not.toBeInTheDocument();
		});
	});

	describe('Variants', () => {
		it.each([
			['info', 'alert--info'],
			['success', 'alert--success'],
			['warning', 'alert--warning'],
			['danger', 'alert--danger'],
		] as const)('should render %s variant', (variant, expectedClass) => {
			render(<Alert variant={variant}>{variant}</Alert>);
			expect(screen.getByRole('alert')).toHaveClass(expectedClass);
		});
	});

	describe('Dismissible', () => {
		it('should not render a close button by default', () => {
			render(<Alert>Details</Alert>);
			expect(
				screen.queryByRole('button', { name: /dismiss/i }),
			).not.toBeInTheDocument();
		});

		it('should render a close button when dismissible', () => {
			render(<Alert dismissible>Details</Alert>);
			const closeButton = screen.getByRole('button', { name: /dismiss/i });
			expect(closeButton).toBeInTheDocument();
			expect(closeButton).toHaveClass('alert__close');
			expect(closeButton).toHaveAttribute('type', 'button');
		});

		it('should call onDismiss when the close button is clicked', async () => {
			const handleDismiss = vi.fn();
			const user = userEvent.setup();
			render(
				<Alert dismissible onDismiss={handleDismiss}>
					Details
				</Alert>,
			);
			await user.click(screen.getByRole('button', { name: /dismiss/i }));
			expect(handleDismiss).toHaveBeenCalledTimes(1);
		});
	});

	describe('Accessibility', () => {
		it('should use role alert by default', () => {
			render(<Alert>Details</Alert>);
			expect(screen.getByRole('alert')).toBeInTheDocument();
		});

		it('should allow overriding the role', () => {
			render(<Alert role="status">Details</Alert>);
			expect(screen.getByRole('status')).toBeInTheDocument();
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		});

		it('should forward HTML attributes', () => {
			render(<Alert aria-label="Notice">Details</Alert>);
			expect(screen.getByRole('alert')).toHaveAttribute('aria-label', 'Notice');
		});
	});
});
