import type { HTMLAttributes, ReactNode, FC } from 'react';
import { cx } from '../../utils/cx';
import './Separator.scss';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
	/** Orientation of the separator */
	orientation?: SeparatorOrientation;
	/** Decorative separators are hidden from assistive technology */
	decorative?: boolean;
	/** Optional label rendered between two lines (horizontal only) */
	label?: ReactNode;
	/** Custom CSS class */
	className?: string;
}

const Separator: FC<SeparatorProps> = ({
	orientation = 'horizontal',
	decorative = false,
	label,
	className,
	...props
}) => {
	const showLabel = Boolean(label) && orientation === 'horizontal';
	const classes = cx(
		'separator',
		`separator--${orientation}`,
		showLabel && 'separator--with-label',
		className,
	);

	const ariaProps: HTMLAttributes<HTMLDivElement> = decorative
		? { role: 'none', 'aria-hidden': true }
		: { role: 'separator', 'aria-orientation': orientation };

	if (showLabel) {
		return (
			<div className={classes} {...ariaProps} {...props}>
				<span className="separator__line" />
				<span className="separator__label">{label}</span>
				<span className="separator__line" />
			</div>
		);
	}

	return <div className={classes} {...ariaProps} {...props} />;
};

export default Separator;
