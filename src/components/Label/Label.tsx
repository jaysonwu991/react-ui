import type { LabelHTMLAttributes, ReactNode, FC } from 'react';
import { cx } from '../../utils/cx';
import './Label.scss';

export type LabelSize = 'small' | 'medium' | 'large';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	/** Label content */
	children: ReactNode;
	/** Whether the associated field is required */
	required?: boolean;
	/** Whether the associated field is disabled */
	disabled?: boolean;
	/** Size of the label */
	size?: LabelSize;
	/** Custom CSS class */
	className?: string;
}

const Label: FC<LabelProps> = ({
	children,
	required = false,
	disabled = false,
	size = 'medium',
	className = '',
	...props
}) => {
	const classes = cx(
		'label',
		`label--${size}`,
		required && 'label--required',
		disabled && 'label--disabled',
		className,
	);

	return (
		<label className={classes} {...props}>
			{children}
			{required && (
				<span className="label__required" aria-hidden="true">
					*
				</span>
			)}
		</label>
	);
};

export default Label;
