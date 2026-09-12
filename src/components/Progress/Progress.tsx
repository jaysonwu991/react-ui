import type { HTMLAttributes, FC } from 'react';
import { cx } from '../../utils/cx';
import './Progress.scss';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';
export type ProgressSize = 'small' | 'medium' | 'large';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	/** Current value, clamped between 0 and `max` */
	value?: number;
	/** Maximum value */
	max?: number;
	/** Colour variant */
	variant?: ProgressVariant;
	/** Track thickness */
	size?: ProgressSize;
	/** Render an animated, indeterminate bar */
	indeterminate?: boolean;
	/** Show the percentage next to the bar */
	showLabel?: boolean;
	/** Accessible label for the progress bar */
	label?: string;
	/** Custom CSS class */
	className?: string;
}

const Progress: FC<ProgressProps> = ({
	value = 0,
	max = 100,
	variant = 'primary',
	size = 'medium',
	indeterminate = false,
	showLabel = false,
	label,
	className,
	...props
}) => {
	const clamped = Math.min(Math.max(value, 0), max);
	const percentage = max > 0 ? (clamped / max) * 100 : 0;

	const classes = cx(
		'progress',
		`progress--${variant}`,
		`progress--${size}`,
		indeterminate && 'progress--indeterminate',
		className,
	);

	return (
		<div className={classes} {...props}>
			<div
				className="progress__track"
				role="progressbar"
				aria-label={label}
				aria-valuemin={indeterminate ? undefined : 0}
				aria-valuemax={indeterminate ? undefined : max}
				aria-valuenow={indeterminate ? undefined : clamped}
				aria-busy={indeterminate ? true : undefined}
			>
				<div
					className="progress__bar"
					style={indeterminate ? undefined : { width: `${percentage}%` }}
				/>
			</div>
			{showLabel && !indeterminate && (
				<span className="progress__label">{Math.round(percentage)}%</span>
			)}
		</div>
	);
};

export default Progress;
