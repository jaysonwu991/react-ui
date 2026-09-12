import type { HTMLAttributes, ReactNode, FC } from 'react';
import { cx } from '../../utils/cx';
import './Alert.scss';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'title'
> {
	/** Alert content */
	children: ReactNode;
	/** Visual style variant */
	variant?: AlertVariant;
	/** Optional title displayed above the content */
	title?: ReactNode;
	/** Optional icon displayed before the content */
	icon?: ReactNode;
	/** Whether the alert can be dismissed */
	dismissible?: boolean;
	/** Callback fired when the alert is dismissed */
	onDismiss?: () => void;
	/** Custom CSS class */
	className?: string;
}

const Alert: FC<AlertProps> = ({
	children,
	variant = 'info',
	title,
	icon,
	dismissible = false,
	onDismiss,
	className,
	role = 'alert',
	...props
}) => {
	const classes = cx('alert', `alert--${variant}`, className);

	return (
		<div className={classes} role={role} {...props}>
			{icon && (
				<span className="alert__icon" aria-hidden="true">
					{icon}
				</span>
			)}
			<div className="alert__body">
				{title && <div className="alert__title">{title}</div>}
				<div className="alert__content">{children}</div>
			</div>
			{dismissible && (
				<button
					type="button"
					className="alert__close"
					aria-label="Dismiss"
					onClick={onDismiss}
				>
					&times;
				</button>
			)}
		</div>
	);
};

export default Alert;
