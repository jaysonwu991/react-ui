import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from './Spinner';

describe('Spinner Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Spinner />);
			const spinner = screen.getByRole('status');
			expect(spinner).toBeInTheDocument();
			expect(spinner).toHaveClass(
				'spinner',
				'spinner--medium',
				'spinner--primary',
			);
		});

		it('should render the animated circle', () => {
			const { container } = render(<Spinner />);
			expect(container.querySelector('.spinner__circle')).toBeInTheDocument();
		});

		it('should apply a custom className', () => {
			render(<Spinner className="custom-class" />);
			expect(screen.getByRole('status')).toHaveClass('custom-class');
		});

		it('should forward native span attributes', () => {
			render(<Spinner data-testid="spinner" />);
			expect(screen.getByTestId('spinner')).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should expose a default accessible label', () => {
			render(<Spinner />);
			expect(
				screen.getByRole('status', { name: 'Loading' }),
			).toBeInTheDocument();
		});

		it('should render a visually hidden label', () => {
			const { container } = render(<Spinner />);
			expect(container.querySelector('.spinner__label')).toHaveTextContent(
				'Loading',
			);
		});

		it('should support a custom label', () => {
			render(<Spinner label="Saving" />);
			const spinner = screen.getByRole('status', { name: 'Saving' });
			expect(spinner).toBeInTheDocument();
			expect(spinner.querySelector('.spinner__label')).toHaveTextContent(
				'Saving',
			);
		});

		it('should hide the circle from assistive technology', () => {
			const { container } = render(<Spinner />);
			expect(container.querySelector('.spinner__circle')).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});
	});

	describe('Sizes', () => {
		it('should render the small size', () => {
			render(<Spinner size="small" />);
			expect(screen.getByRole('status')).toHaveClass('spinner--small');
		});

		it('should render the medium size by default', () => {
			render(<Spinner />);
			expect(screen.getByRole('status')).toHaveClass('spinner--medium');
		});

		it('should render the large size', () => {
			render(<Spinner size="large" />);
			expect(screen.getByRole('status')).toHaveClass('spinner--large');
		});
	});

	describe('Variants', () => {
		it('should render the primary variant by default', () => {
			render(<Spinner />);
			expect(screen.getByRole('status')).toHaveClass('spinner--primary');
		});

		it('should render the current variant', () => {
			render(<Spinner variant="current" />);
			expect(screen.getByRole('status')).toHaveClass('spinner--current');
		});

		it('should render the white variant', () => {
			render(<Spinner variant="white" />);
			expect(screen.getByRole('status')).toHaveClass('spinner--white');
		});
	});
});
