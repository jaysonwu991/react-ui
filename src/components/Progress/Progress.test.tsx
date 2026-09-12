import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Progress from './Progress';

describe('Progress Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Progress />);
			const progressbar = screen.getByRole('progressbar');
			expect(progressbar).toBeInTheDocument();
			expect(progressbar).toHaveClass('progress__track');
			expect(progressbar.parentElement).toHaveClass(
				'progress',
				'progress--primary',
				'progress--medium',
			);
		});

		it('should render the track and bar elements', () => {
			const { container } = render(<Progress value={25} />);
			expect(container.querySelector('.progress__track')).toBeInTheDocument();
			expect(container.querySelector('.progress__bar')).toBeInTheDocument();
		});

		it('should apply a custom className', () => {
			render(<Progress className="custom-class" />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'custom-class',
			);
		});

		it('should forward native div attributes', () => {
			render(<Progress data-testid="progress" />);
			expect(screen.getByTestId('progress')).toBeInTheDocument();
		});
	});

	describe('Values', () => {
		it('should expose aria value attributes', () => {
			render(<Progress value={40} max={200} />);
			const progressbar = screen.getByRole('progressbar');
			expect(progressbar).toHaveAttribute('aria-valuenow', '40');
			expect(progressbar).toHaveAttribute('aria-valuemin', '0');
			expect(progressbar).toHaveAttribute('aria-valuemax', '200');
		});

		it('should default max to 100 and value to 0', () => {
			render(<Progress />);
			const progressbar = screen.getByRole('progressbar');
			expect(progressbar).toHaveAttribute('aria-valuenow', '0');
			expect(progressbar).toHaveAttribute('aria-valuemax', '100');
		});

		it('should set the bar width from the percentage', () => {
			const { container } = render(<Progress value={30} />);
			expect(container.querySelector('.progress__bar')).toHaveStyle({
				width: '30%',
			});
		});

		it('should clamp values above max', () => {
			render(<Progress value={150} max={100} />);
			expect(screen.getByRole('progressbar')).toHaveAttribute(
				'aria-valuenow',
				'100',
			);
		});

		it('should clamp negative values', () => {
			render(<Progress value={-20} />);
			expect(screen.getByRole('progressbar')).toHaveAttribute(
				'aria-valuenow',
				'0',
			);
		});
	});

	describe('Variants', () => {
		it('should render the primary variant by default', () => {
			render(<Progress />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--primary',
			);
		});

		it('should render the success variant', () => {
			render(<Progress variant="success" />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--success',
			);
		});

		it('should render the warning variant', () => {
			render(<Progress variant="warning" />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--warning',
			);
		});

		it('should render the danger variant', () => {
			render(<Progress variant="danger" />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--danger',
			);
		});
	});

	describe('Sizes', () => {
		it('should render the small size', () => {
			render(<Progress size="small" />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--small',
			);
		});

		it('should render the medium size by default', () => {
			render(<Progress />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--medium',
			);
		});

		it('should render the large size', () => {
			render(<Progress size="large" />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--large',
			);
		});
	});

	describe('Label', () => {
		it('should set the aria-label', () => {
			render(<Progress label="Upload" />);
			expect(
				screen.getByRole('progressbar', { name: 'Upload' }),
			).toBeInTheDocument();
		});

		it('should show the percentage when showLabel is set', () => {
			render(<Progress value={45} showLabel />);
			expect(screen.getByText('45%')).toBeInTheDocument();
		});

		it('should not show a label by default', () => {
			render(<Progress value={45} />);
			expect(screen.queryByText('45%')).not.toBeInTheDocument();
		});
	});

	describe('Indeterminate', () => {
		it('should omit aria-valuenow and set aria-busy', () => {
			render(<Progress indeterminate label="Loading" />);
			const progressbar = screen.getByRole('progressbar');
			expect(progressbar).not.toHaveAttribute('aria-valuenow');
			expect(progressbar).toHaveAttribute('aria-busy', 'true');
		});

		it('should add the indeterminate class', () => {
			render(<Progress indeterminate />);
			expect(screen.getByRole('progressbar').parentElement).toHaveClass(
				'progress--indeterminate',
			);
		});

		it('should not set an inline bar width', () => {
			const { container } = render(<Progress indeterminate />);
			const bar = container.querySelector('.progress__bar') as HTMLElement;
			expect(bar.style.width).toBe('');
		});

		it('should not show the percentage label', () => {
			render(<Progress indeterminate showLabel />);
			expect(screen.queryByText(/%/)).not.toBeInTheDocument();
		});
	});
});
