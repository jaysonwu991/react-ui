import {
	useId,
	type TextareaHTMLAttributes,
	type ReactNode,
	type FC,
} from 'react';
import { cx } from '../../utils/cx';
import './Textarea.scss';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	/** Label for the textarea */
	label?: ReactNode;
	/** Error message */
	error?: string;
	/** Helper text */
	helperText?: string;
	/** Full width textarea */
	fullWidth?: boolean;
	/** Resize behavior */
	resize?: TextareaResize;
	/** Custom CSS class */
	className?: string;
}

const Textarea: FC<TextareaProps> = ({
	label,
	error,
	helperText,
	fullWidth = false,
	resize = 'vertical',
	className = '',
	id,
	...props
}) => {
	const generatedId = useId();
	const textareaId = id || generatedId;
	const errorId = `${textareaId}-error`;
	const helperId = `${textareaId}-helper`;

	const wrapperClasses = cx(
		'textarea',
		fullWidth && 'textarea--full-width',
		className,
	);

	const fieldClasses = cx(
		'textarea__field',
		`textarea__field--resize-${resize}`,
		error && 'textarea__field--error',
	);

	const describedBy = [error && errorId, !error && helperText && helperId]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={wrapperClasses}>
			{label && (
				<label htmlFor={textareaId} className="textarea__label">
					{label}
				</label>
			)}
			<textarea
				id={textareaId}
				className={fieldClasses}
				aria-invalid={error ? true : undefined}
				aria-describedby={describedBy || undefined}
				{...props}
			/>
			{error && (
				<span id={errorId} className="textarea__error" role="alert">
					{error}
				</span>
			)}
			{!error && helperText && (
				<span id={helperId} className="textarea__helper">
					{helperText}
				</span>
			)}
		</div>
	);
};

export default Textarea;
