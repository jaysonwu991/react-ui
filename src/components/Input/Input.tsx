import {
	useId,
	type InputHTMLAttributes,
	type ReactNode,
	type FC,
} from 'react';
import './Input.scss';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size' | 'prefix'
> {
	/** Label for the input */
	label?: string;
	/** Error message */
	error?: string;
	/** Helper text */
	helperText?: string;
	/** Size of the input */
	inputSize?: InputSize;
	/** Full width input */
	fullWidth?: boolean;
	/** Prefix icon or element */
	prefix?: ReactNode;
	/** Suffix icon or element */
	suffix?: ReactNode;
	/** Custom CSS class */
	className?: string;
}

const Input: FC<InputProps> = ({
	label,
	error,
	helperText,
	inputSize = 'medium',
	fullWidth = false,
	prefix,
	suffix,
	className = '',
	id,
	...props
}) => {
	const generatedId = useId();
	const inputId = id || generatedId;

	const wrapperClasses = [
		'input-wrapper',
		fullWidth && 'input-wrapper--full-width',
		className,
	]
		.filter(Boolean)
		.join(' ');

	const inputClasses = [
		'input',
		`input--${inputSize}`,
		error && 'input--error',
		prefix && 'input--with-prefix',
		suffix && 'input--with-suffix',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={wrapperClasses}>
			{label && (
				<label htmlFor={inputId} className="input__label">
					{label}
				</label>
			)}
			<div className="input__container">
				{prefix && <span className="input__prefix">{prefix}</span>}
				<input id={inputId} className={inputClasses} {...props} />
				{suffix && <span className="input__suffix">{suffix}</span>}
			</div>
			{error && <span className="input__error">{error}</span>}
			{!error && helperText && (
				<span className="input__helper">{helperText}</span>
			)}
		</div>
	);
};

export default Input;
