import type { HTMLAttributes, ReactNode, FC } from 'react';
import { cx } from '../../utils/cx';
import './Badge.scss';

export type BadgeVariant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'outline';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** Badge content */
	children: ReactNode;
	/** Visual style variant */
	variant?: BadgeVariant;
	/** Size of the badge */
	size?: BadgeSize;
	/** Render a small colored dot before the content */
	dot?: boolean;
	/** Custom CSS class */
	className?: string;
}

const Badge: FC<BadgeProps> = ({
	children,
	variant = 'primary',
	size = 'medium',
	dot = false,
	className,
	...props
}) => {
	const classes = cx('badge', `badge--${variant}`, `badge--${size}`, className);

	return (
		<span className={classes} {...props}>
			{dot && <span className="badge__dot" aria-hidden="true" />}
			{children}
		</span>
	);
};

export default Badge;
