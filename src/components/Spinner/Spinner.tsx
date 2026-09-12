import type { HTMLAttributes, FC } from 'react';
import { cx } from '../../utils/cx';
import './Spinner.scss';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerVariant = 'primary' | 'current' | 'white';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
	/** Size of the spinner */
	size?: SpinnerSize;
	/** Colour variant */
	variant?: SpinnerVariant;
	/** Accessible label announced to screen readers */
	label?: string;
	/** Custom CSS class */
	className?: string;
}

const Spinner: FC<SpinnerProps> = ({
	size = 'medium',
	variant = 'primary',
	label = 'Loading',
	className,
	...props
}) => {
	const classes = cx(
		'spinner',
		`spinner--${size}`,
		`spinner--${variant}`,
		className,
	);

	return (
		<span className={classes} role="status" aria-label={label} {...props}>
			<span className="spinner__circle" aria-hidden="true" />
			<span className="spinner__label">{label}</span>
		</span>
	);
};

export default Spinner;
