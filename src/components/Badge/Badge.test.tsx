import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from './Badge';

describe('Badge Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Badge>New</Badge>);
			const badge = screen.getByText('New');
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass('badge', 'badge--primary', 'badge--medium');
		});

		it('should render children content', () => {
			render(<Badge>Label</Badge>);
			expect(screen.getByText('Label')).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			render(<Badge className="custom-class">Badge</Badge>);
			expect(screen.getByText('Badge')).toHaveClass('custom-class');
		});

		it('should forward HTML attributes', () => {
			render(
				<Badge role="status" aria-label="Unread count">
					3
				</Badge>,
			);
			expect(screen.getByRole('status', { name: 'Unread count' })).toHaveClass(
				'badge',
			);
		});
	});

	describe('Variants', () => {
		it.each([
			['primary', 'badge--primary'],
			['secondary', 'badge--secondary'],
			['success', 'badge--success'],
			['warning', 'badge--warning'],
			['danger', 'badge--danger'],
			['info', 'badge--info'],
			['outline', 'badge--outline'],
		] as const)('should render %s variant', (variant, expectedClass) => {
			render(<Badge variant={variant}>{variant}</Badge>);
			expect(screen.getByText(variant)).toHaveClass(expectedClass);
		});
	});

	describe('Sizes', () => {
		it.each([
			['small', 'badge--small'],
			['medium', 'badge--medium'],
			['large', 'badge--large'],
		] as const)('should render %s size', (size, expectedClass) => {
			render(<Badge size={size}>{size}</Badge>);
			expect(screen.getByText(size)).toHaveClass(expectedClass);
		});
	});

	describe('Dot', () => {
		it('should render a dot when dot is true', () => {
			const { container } = render(<Badge dot>Status</Badge>);
			const dot = container.querySelector('.badge__dot');
			expect(dot).toBeInTheDocument();
			expect(dot).toHaveAttribute('aria-hidden', 'true');
		});

		it('should not render a dot by default', () => {
			const { container } = render(<Badge>Status</Badge>);
			expect(container.querySelector('.badge__dot')).not.toBeInTheDocument();
		});
	});
});
