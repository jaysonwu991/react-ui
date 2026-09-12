import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Separator from './Separator';

describe('Separator Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Separator data-testid="separator" />);
			const separator = screen.getByTestId('separator');
			expect(separator).toHaveClass('separator', 'separator--horizontal');
		});

		it('should render with custom className', () => {
			render(<Separator className="custom-class" data-testid="separator" />);
			expect(screen.getByTestId('separator')).toHaveClass('custom-class');
		});

		it('should forward HTML attributes', () => {
			render(<Separator data-testid="separator" id="sep-1" />);
			expect(screen.getByTestId('separator')).toHaveAttribute('id', 'sep-1');
		});
	});

	describe('Accessibility', () => {
		it('should expose the separator role by default', () => {
			render(<Separator />);
			const separator = screen.getByRole('separator');
			expect(separator).toBeInTheDocument();
			expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
		});

		it('should set aria-orientation for vertical orientation', () => {
			render(<Separator orientation="vertical" />);
			const separator = screen.getByRole('separator');
			expect(separator).toHaveAttribute('aria-orientation', 'vertical');
			expect(separator).toHaveClass('separator--vertical');
		});

		it('should hide decorative separators from assistive technology', () => {
			render(<Separator decorative data-testid="separator" />);
			const separator = screen.getByTestId('separator');
			expect(separator).toHaveAttribute('aria-hidden', 'true');
			expect(separator).toHaveAttribute('role', 'none');
			expect(screen.queryByRole('separator')).not.toBeInTheDocument();
		});
	});

	describe('Label', () => {
		it('should render a centered label between two lines', () => {
			const { container } = render(<Separator label="OR" />);
			const label = screen.getByText('OR');
			expect(label).toHaveClass('separator__label');
			expect(container.querySelectorAll('.separator__line')).toHaveLength(2);
			expect(screen.getByRole('separator')).toHaveClass(
				'separator--with-label',
			);
		});

		it('should ignore the label for vertical orientation', () => {
			const { container } = render(
				<Separator orientation="vertical" label="OR" />,
			);
			expect(screen.queryByText('OR')).not.toBeInTheDocument();
			expect(container.querySelector('.separator__label')).toBeNull();
		});

		it('should not render lines when there is no label', () => {
			const { container } = render(<Separator />);
			expect(container.querySelector('.separator__line')).toBeNull();
		});
	});
});
