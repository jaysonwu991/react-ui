import { useEffect, useId, useRef, useState } from 'react';
import type { FC, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Tooltip.scss';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
	/** Element that triggers the tooltip */
	children: ReactNode;
	/** Tooltip content */
	content: ReactNode;
	/** Preferred placement relative to the trigger */
	placement?: TooltipPlacement;
	/** Delay before showing the tooltip, in milliseconds */
	delay?: number;
	/** Custom CSS class */
	className?: string;
}

const Tooltip: FC<TooltipProps> = ({
	children,
	content,
	placement = 'top',
	delay = 200,
	className,
}) => {
	const [open, setOpen] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const tooltipId = useId();

	useEffect(() => {
		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const clearTimer = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const show = () => {
		clearTimer();
		timeoutRef.current = setTimeout(() => setOpen(true), delay);
	};

	const hide = () => {
		clearTimer();
		setOpen(false);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
		if (event.key === 'Escape') {
			hide();
		}
	};

	return (
		<span className={cx('tooltip', className)}>
			<span
				className="tooltip__trigger"
				tabIndex={0}
				aria-describedby={tooltipId}
				onPointerEnter={show}
				onPointerLeave={hide}
				onFocus={show}
				onBlur={hide}
				onKeyDown={handleKeyDown}
			>
				{children}
			</span>
			<span
				role="tooltip"
				id={tooltipId}
				hidden={!open}
				className={cx(
					'tooltip__content',
					`tooltip__content--${placement}`,
					open && 'tooltip__content--visible',
				)}
			>
				{content}
			</span>
		</span>
	);
};

export default Tooltip;
