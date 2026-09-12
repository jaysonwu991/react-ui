import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Modal from './Modal';

describe('Modal Component', () => {
	const mockOnHideModal = vi.fn();

	beforeEach(() => {
		mockOnHideModal.mockClear();
	});

	describe('Rendering', () => {
		it('should render modal with title', () => {
			render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				>
					<p>Test Content</p>
				</Modal>,
			);

			expect(screen.getByText('Test Modal')).toBeInTheDocument();
			expect(screen.getByText('Test Content')).toBeInTheDocument();
		});

		it('should render modal without title', () => {
			render(
				<Modal showModal={true} onHideModal={mockOnHideModal}>
					<p>Test Content</p>
				</Modal>,
			);

			expect(screen.getByText('Test Content')).toBeInTheDocument();
		});

		it('should render modal with empty title when title is provided as empty string', () => {
			render(
				<Modal title="" showModal={true} onHideModal={mockOnHideModal}>
					<p>Test Content</p>
				</Modal>,
			);

			const title = screen.getByRole('heading', { level: 5 });
			expect(title).toBeInTheDocument();
			expect(title).toHaveTextContent('');
		});

		it('should render close button', () => {
			render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const closeButton = screen.getByLabelText('Close');
			expect(closeButton).toBeInTheDocument();
			expect(closeButton).toHaveAttribute('type', 'button');
		});
	});

	describe('Visibility', () => {
		it('should be visible when showModal is true', () => {
			const { container } = render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const modalWrapper = container.firstChild as HTMLElement;
			expect(modalWrapper).toHaveStyle({ visibility: 'visible' });
		});

		it('should be hidden when showModal is false', () => {
			const { container } = render(
				<Modal
					title="Test Modal"
					showModal={false}
					onHideModal={mockOnHideModal}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			// Modal should not render when showModal is false
			expect(container.firstChild).toBeNull();
		});
	});

	describe('Interactions', () => {
		it('should call onHideModal when clicking on backdrop', () => {
			render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const backdrop = screen.getByRole('dialog');
			fireEvent.click(backdrop);

			expect(mockOnHideModal).toHaveBeenCalledTimes(1);
		});

		it('should have close button with proper class', () => {
			render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const closeButton = screen.getByLabelText('Close');

			// Check that close button has proper class name
			expect(closeButton).toHaveClass('modal-close-button');

			// Check that close icon exists
			const closeIcon = closeButton.querySelector('.modal-close-icon');
			expect(closeIcon).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should have proper ARIA attributes', () => {
			render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const dialog = screen.getByRole('dialog');
			expect(dialog).toHaveAttribute('tabIndex', '-1');
			expect(dialog).toHaveAttribute('role', 'dialog');

			const document = screen.getByRole('document');
			expect(document).toBeInTheDocument();

			const closeButton = screen.getByLabelText('Close');
			expect(closeButton).toHaveAttribute('aria-label', 'Close');

			const closeIcon = closeButton.querySelector('span');
			expect(closeIcon).toHaveAttribute('aria-hidden', 'true');
		});
	});

	describe('Children rendering', () => {
		it('should render multiple children', () => {
			render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				>
					<p>First paragraph</p>
					<p>Second paragraph</p>
					<button>Action Button</button>
				</Modal>,
			);

			expect(screen.getByText('First paragraph')).toBeInTheDocument();
			expect(screen.getByText('Second paragraph')).toBeInTheDocument();
			expect(screen.getByText('Action Button')).toBeInTheDocument();
		});

		it('should render complex nested content', () => {
			render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				>
					<div>
						<h3>Nested Title</h3>
						<ul>
							<li>Item 1</li>
							<li>Item 2</li>
						</ul>
					</div>
				</Modal>,
			);

			expect(screen.getByText('Nested Title')).toBeInTheDocument();
			expect(screen.getByText('Item 1')).toBeInTheDocument();
			expect(screen.getByText('Item 2')).toBeInTheDocument();
		});

		it('should handle undefined children', () => {
			const { container } = render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
				/>,
			);

			expect(container).toBeInTheDocument();
		});
	});

	describe('Responsive design', () => {
		it('should render with responsive classes', () => {
			const { container } = render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const modalWrapper = container.querySelector('.modal-wrapper');
			expect(modalWrapper).toBeInTheDocument();
			expect(modalWrapper).toHaveClass('modal-wrapper');
		});

		it('should apply size classes correctly', () => {
			const { container } = render(
				<Modal
					title="Test Modal"
					size="large"
					showModal={true}
					onHideModal={mockOnHideModal}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const modalContent = container.querySelector('.modal-content');
			expect(modalContent).toHaveClass('modal-content--large');
		});
	});

	describe('Animation and lifecycle', () => {
		it('should call onOpen when modal opens', () => {
			const onOpen = vi.fn();

			const { rerender } = render(
				<Modal
					title="Test Modal"
					showModal={false}
					onHideModal={mockOnHideModal}
					onOpen={onOpen}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			rerender(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
					onOpen={onOpen}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			expect(onOpen).toHaveBeenCalledTimes(1);
		});

		it('should call onClose when modal closes', async () => {
			const onClose = vi.fn();

			const { rerender } = render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
					onClose={onClose}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			rerender(
				<Modal
					title="Test Modal"
					showModal={false}
					onHideModal={mockOnHideModal}
					onClose={onClose}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it('should call onAnimationEnd after animation completes', async () => {
			vi.useFakeTimers();
			const onAnimationEnd = vi.fn();

			const { rerender } = render(
				<Modal
					title="Test Modal"
					showModal={false}
					onHideModal={mockOnHideModal}
					onAnimationEnd={onAnimationEnd}
					animated={true}
					animationDuration={300}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			rerender(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
					onAnimationEnd={onAnimationEnd}
					animated={true}
					animationDuration={300}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			expect(onAnimationEnd).not.toHaveBeenCalled();

			act(() => {
				vi.advanceTimersByTime(300);
			});

			expect(onAnimationEnd).toHaveBeenCalledTimes(1);

			vi.useRealTimers();
		});

		it('should handle animation disabled', () => {
			const onAnimationEnd = vi.fn();

			const { rerender } = render(
				<Modal
					title="Test Modal"
					showModal={false}
					onHideModal={mockOnHideModal}
					onAnimationEnd={onAnimationEnd}
					animated={false}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			rerender(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
					onAnimationEnd={onAnimationEnd}
					animated={false}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			expect(onAnimationEnd).toHaveBeenCalledTimes(1);
		});

		it('should apply centered class when centered prop is true', () => {
			const { container } = render(
				<Modal
					title="Test Modal"
					showModal={true}
					onHideModal={mockOnHideModal}
					centered={true}
					usePortal={false}
				>
					<p>Test Content</p>
				</Modal>,
			);

			const modalWrapper = container.querySelector('.modal-wrapper');
			expect(modalWrapper).toHaveClass('modal-wrapper--centered');
		});
	});
});
