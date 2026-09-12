import { useRef, useState, useEffect } from 'react';
import type { ReactNode, CSSProperties, FC, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export interface ModalProps {
	/** Title displayed in the modal header */
	title?: string;
	/** Controls whether the modal is visible */
	showModal: boolean;
	/** Callback when modal should be hidden */
	onHideModal: () => void;
	/** Content to display in the modal body */
	children?: ReactNode;
	/** Size variant of the modal */
	size?: ModalSize;
	/** Whether clicking the backdrop closes the modal */
	closeOnBackdropClick?: boolean;
	/** Whether pressing Escape closes the modal */
	closeOnEscape?: boolean;
	/** Whether to show the close button */
	showCloseButton?: boolean;
	/** Whether to show the header */
	showHeader?: boolean;
	/** Custom className for the modal container */
	className?: string;
	/** Custom styles for the modal content */
	contentStyle?: CSSProperties;
	/** Custom styles for the backdrop */
	backdropStyle?: CSSProperties;
	/** Whether to use React Portal (render outside parent DOM) */
	usePortal?: boolean;
	/** Portal container element (defaults to document.body) */
	portalContainer?: HTMLElement;
	/** Enable fade animation */
	animated?: boolean;
	/** Animation duration in milliseconds */
	animationDuration?: number;
	/** Callback when modal opens */
	onOpen?: () => void;
	/** Callback when modal closes */
	onClose?: () => void;
	/** Callback after modal animation completes */
	onAnimationEnd?: () => void;
	/** Custom header content (overrides title) */
	header?: ReactNode;
	/** Custom footer content */
	footer?: ReactNode;
	/** z-index for the modal */
	zIndex?: number;
	/** Center the modal vertically */
	centered?: boolean;
	/** Allow scrolling when modal is open */
	scrollable?: boolean;
}

const Modal: FC<ModalProps> = ({
	title,
	showModal,
	onHideModal,
	children,
	size = 'medium',
	closeOnBackdropClick = true,
	closeOnEscape = true,
	showCloseButton = true,
	showHeader = true,
	className,
	contentStyle,
	backdropStyle,
	usePortal = true,
	portalContainer,
	animated = true,
	animationDuration = 300,
	onOpen,
	onClose,
	onAnimationEnd,
	header,
	footer,
	zIndex = 1000,
	centered = false,
	scrollable = false,
}) => {
	const modalContent = useRef<HTMLDivElement>(null);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const shouldRender = showModal || isAnimating;
	const previousShowModal = useRef<boolean>(showModal);

	// Handle animation and lifecycle. The enter/exit transitions toggle a CSS
	// class after mount, so state is intentionally updated from this effect.
	/* oxlint-disable react/set-state-in-effect */
	useEffect(() => {
		if (showModal !== previousShowModal.current) {
			previousShowModal.current = showModal;

			if (showModal) {
				setIsAnimating(true);
				onOpen?.();

				if (animated) {
					setTimeout(() => {
						setIsAnimating(false);
						onAnimationEnd?.();
					}, animationDuration);
				} else {
					setIsAnimating(false);
					onAnimationEnd?.();
				}
			} else {
				setIsAnimating(true);
				onClose?.();

				if (animated) {
					setTimeout(() => {
						setIsAnimating(false);
						onAnimationEnd?.();
					}, animationDuration);
				} else {
					setIsAnimating(false);
					onAnimationEnd?.();
				}
			}
		}
	}, [showModal, animated, animationDuration, onOpen, onClose, onAnimationEnd]);
	/* oxlint-enable react/set-state-in-effect */

	// Handle escape key
	useEffect(() => {
		if (!closeOnEscape || !showModal) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onHideModal();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [closeOnEscape, showModal, onHideModal]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (showModal && !scrollable) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
		return undefined;
	}, [showModal, scrollable]);

	// Focus trap - focus first focusable element
	useEffect(() => {
		if (showModal && modalContent.current) {
			const focusableElements = modalContent.current.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			);
			const firstElement = focusableElements[0] as HTMLElement;
			firstElement?.focus();
		}
		return undefined;
	}, [showModal]);

	const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
		if (closeOnBackdropClick && e.target === e.currentTarget) {
			onHideModal();
		}
	};

	if (!shouldRender) return null;

	// Build wrapper class names
	const wrapperClasses = [
		'modal-wrapper',
		centered && 'modal-wrapper--centered',
		!showModal && 'modal-wrapper--hidden',
		animated && 'modal-wrapper--animated',
		animated && showModal && 'modal-wrapper--visible',
		className,
	]
		.filter(Boolean)
		.join(' ');

	// Build content class names
	const contentClasses = [
		'modal-content',
		`modal-content--${size}`,
		animated && 'modal-content--animated',
		animated && showModal && !isAnimating && 'modal-content--visible',
	]
		.filter(Boolean)
		.join(' ');

	// Build body class names
	const bodyClasses = [
		'modal-body',
		size === 'fullscreen' && 'modal-body--fullscreen',
	]
		.filter(Boolean)
		.join(' ');

	const modalElement = (
		<div
			className={wrapperClasses}
			style={{
				zIndex,
				animationDuration: animated ? `${animationDuration}ms` : undefined,
				...backdropStyle,
			}}
			onClick={handleBackdropClick}
		>
			<div
				className="modal-dialog"
				role="dialog"
				tabIndex={-1}
				aria-modal="true"
				aria-labelledby={title ? 'modal-title' : undefined}
				onClick={handleBackdropClick}
			>
				<div className="modal-document" role="document">
					<div
						ref={modalContent}
						className={contentClasses}
						style={{
							animationDuration: animated
								? `${animationDuration}ms`
								: undefined,
							...contentStyle,
						}}
					>
						{showHeader && (
							<div className="modal-header">
								{header ? (
									<div className="modal-custom-header">{header}</div>
								) : (
									<>
										<h5 id="modal-title" className="modal-title">
											{title || ''}
										</h5>
										{showCloseButton && (
											<button
												type="button"
												className="modal-close-button"
												aria-label="Close"
												onClick={onHideModal}
											>
												<span className="modal-close-icon" aria-hidden="true" />
											</button>
										)}
									</>
								)}
							</div>
						)}
						<div className={bodyClasses}>{children}</div>
						{footer && <div className="modal-footer">{footer}</div>}
					</div>
				</div>
			</div>
		</div>
	);

	if (usePortal) {
		return createPortal(modalElement, portalContainer || document.body);
	}

	return modalElement;
};

export default Modal;
