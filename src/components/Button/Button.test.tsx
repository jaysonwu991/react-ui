import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Button>Click me</Button>);
			const button = screen.getByRole('button', { name: /click me/i });
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass('btn', 'btn--primary', 'btn--medium');
		});

		it('should render children content', () => {
			render(<Button>Test Button</Button>);
			expect(screen.getByText('Test Button')).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			render(<Button className="custom-class">Button</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('custom-class');
		});
	});

	describe('Variants', () => {
		it('should render primary variant', () => {
			render(<Button variant="primary">Primary</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--primary');
		});

		it('should render secondary variant', () => {
			render(<Button variant="secondary">Secondary</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--secondary');
		});

		it('should render danger variant', () => {
			render(<Button variant="danger">Danger</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--danger');
		});

		it('should render ghost variant', () => {
			render(<Button variant="ghost">Ghost</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--ghost');
		});
	});

	describe('Sizes', () => {
		it('should render small size', () => {
			render(<Button size="small">Small</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--small');
		});

		it('should render medium size (default)', () => {
			render(<Button size="medium">Medium</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--medium');
		});

		it('should render large size', () => {
			render(<Button size="large">Large</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--large');
		});
	});

	describe('Full Width', () => {
		it('should render full width button', () => {
			render(<Button fullWidth>Full Width</Button>);
			expect(screen.getByRole('button')).toHaveClass('btn--full-width');
		});

		it('should not have full width class by default', () => {
			render(<Button>Normal</Button>);
			expect(screen.getByRole('button')).not.toHaveClass('btn--full-width');
		});
	});

	describe('Loading State', () => {
		it('should show spinner when loading', () => {
			render(<Button loading>Loading</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('btn--loading');
			expect(button.querySelector('.btn__spinner')).toBeInTheDocument();
		});

		it('should hide children content when loading', () => {
			render(<Button loading>Click me</Button>);
			expect(screen.queryByText('Click me')).not.toBeInTheDocument();
		});

		it('should be disabled when loading', () => {
			render(<Button loading>Loading</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('should not show spinner when not loading', () => {
			render(<Button>Normal</Button>);
			const button = screen.getByRole('button');
			expect(button.querySelector('.btn__spinner')).not.toBeInTheDocument();
		});
	});

	describe('Disabled State', () => {
		it('should be disabled when disabled prop is true', () => {
			render(<Button disabled>Disabled</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('should not be disabled by default', () => {
			render(<Button>Enabled</Button>);
			expect(screen.getByRole('button')).not.toBeDisabled();
		});

		it('should be disabled when both disabled and loading are true', () => {
			render(
				<Button disabled loading>
					Both
				</Button>,
			);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('Click Handler', () => {
		it('should call onClick when clicked', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			render(<Button onClick={handleClick}>Click</Button>);
			await user.click(screen.getByRole('button'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('should not call onClick when disabled', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			render(
				<Button onClick={handleClick} disabled>
					Disabled
				</Button>,
			);
			await user.click(screen.getByRole('button'));
			expect(handleClick).not.toHaveBeenCalled();
		});

		it('should not call onClick when loading', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			render(
				<Button onClick={handleClick} loading>
					Loading
				</Button>,
			);
			await user.click(screen.getByRole('button'));
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe('HTML Attributes', () => {
		it('should forward HTML button attributes', () => {
			render(
				<Button type="submit" aria-label="Submit form">
					Submit
				</Button>,
			);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('type', 'submit');
			expect(button).toHaveAttribute('aria-label', 'Submit form');
		});

		it('should support data attributes', () => {
			render(<Button data-testid="custom-button">Button</Button>);
			expect(screen.getByTestId('custom-button')).toBeInTheDocument();
		});
	});

	describe('Combination of Props', () => {
		it('should render with variant, size, and fullWidth', () => {
			render(
				<Button variant="danger" size="large" fullWidth>
					Danger Large Full
				</Button>,
			);
			const button = screen.getByRole('button');
			expect(button).toHaveClass(
				'btn--danger',
				'btn--large',
				'btn--full-width',
			);
		});

		it('should combine all classes correctly', () => {
			render(
				<Button
					variant="secondary"
					size="small"
					fullWidth
					loading
					className="custom"
				>
					Complex
				</Button>,
			);
			const button = screen.getByRole('button');
			expect(button).toHaveClass(
				'btn',
				'btn--secondary',
				'btn--small',
				'btn--full-width',
				'btn--loading',
				'custom',
			);
		});
	});
});
