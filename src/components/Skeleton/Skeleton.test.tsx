import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skeleton from './Skeleton';

describe('Skeleton Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			const { container } = render(<Skeleton />);
			const skeleton = container.querySelector('.skeleton');
			expect(skeleton).toBeInTheDocument();
			expect(skeleton).toHaveClass('skeleton--text', 'skeleton--pulse');
		});

		it('should be hidden from assistive technology', () => {
			const { container } = render(<Skeleton />);
			expect(container.querySelector('.skeleton')).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});

		it('should apply a custom className', () => {
			const { container } = render(<Skeleton className="custom-class" />);
			expect(container.querySelector('.skeleton')).toHaveClass('custom-class');
		});

		it('should forward native div attributes', () => {
			const { container } = render(<Skeleton data-testid="skeleton" />);
			expect(
				container.querySelector('[data-testid="skeleton"]'),
			).toBeInTheDocument();
		});
	});

	describe('Variants', () => {
		it('should render the text variant by default', () => {
			const { container } = render(<Skeleton />);
			expect(container.querySelector('.skeleton')).toHaveClass(
				'skeleton--text',
			);
		});

		it('should render the circular variant', () => {
			const { container } = render(<Skeleton variant="circular" />);
			expect(container.querySelector('.skeleton')).toHaveClass(
				'skeleton--circular',
			);
		});

		it('should render the rectangular variant', () => {
			const { container } = render(<Skeleton variant="rectangular" />);
			expect(container.querySelector('.skeleton')).toHaveClass(
				'skeleton--rectangular',
			);
		});
	});

	describe('Animations', () => {
		it('should render the pulse animation by default', () => {
			const { container } = render(<Skeleton />);
			expect(container.querySelector('.skeleton')).toHaveClass(
				'skeleton--pulse',
			);
		});

		it('should render the wave animation', () => {
			const { container } = render(<Skeleton animation="wave" />);
			expect(container.querySelector('.skeleton')).toHaveClass(
				'skeleton--wave',
			);
		});

		it('should render without animation', () => {
			const { container } = render(<Skeleton animation="none" />);
			expect(container.querySelector('.skeleton')).toHaveClass(
				'skeleton--none',
			);
		});
	});

	describe('Sizing', () => {
		it('should convert numeric width and height to pixels', () => {
			const { container } = render(<Skeleton width={120} height={16} />);
			const skeleton = container.querySelector('.skeleton') as HTMLElement;
			expect(skeleton.style.width).toBe('120px');
			expect(skeleton.style.height).toBe('16px');
		});

		it('should pass through string dimensions', () => {
			const { container } = render(<Skeleton width="50%" height="2rem" />);
			const skeleton = container.querySelector('.skeleton') as HTMLElement;
			expect(skeleton.style.width).toBe('50%');
			expect(skeleton.style.height).toBe('2rem');
		});

		it('should merge a custom style prop', () => {
			const { container } = render(
				<Skeleton width={100} style={{ marginTop: 8 }} />,
			);
			const skeleton = container.querySelector('.skeleton') as HTMLElement;
			expect(skeleton.style.width).toBe('100px');
			expect(skeleton.style.marginTop).toBe('8px');
		});

		it('should not set dimensions when omitted', () => {
			const { container } = render(<Skeleton />);
			const skeleton = container.querySelector('.skeleton') as HTMLElement;
			expect(skeleton.style.width).toBe('');
			expect(skeleton.style.height).toBe('');
		});
	});
});
