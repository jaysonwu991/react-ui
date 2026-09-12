import {
	useCallback,
	useId,
	type InputHTMLAttributes,
	type ReactNode,
	type FC,
} from 'react';
import { cx } from '../../utils/cx';
import './Checkbox.scss';

export interface CheckboxProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type'
> {
	/** Label displayed next to the checkbox */
	label?: ReactNode;
	/** Whether the checkbox is in an indeterminate state */
	indeterminate?: boolean;
	/** Error message */
	error?: string;
	/** Custom CSS class */
	className?: string;
}

const Checkbox: FC<CheckboxProps> = ({
	label,
	indeterminate = false,
	error,
	className = '',
	id,
	disabled,
	...props
}) => {
	const generatedId = useId();
	const inputId = id || generatedId;
	const errorId = `${inputId}-error`;

	const setInputRef = useCallback(
		(node: HTMLInputElement | null) => {
			if (node) {
				node.indeterminate = indeterminate;
			}
		},
		[indeterminate],
	);

	const wrapperClasses = cx(
		'checkbox',
		error && 'checkbox--error',
		disabled && 'checkbox--disabled',
		className,
	);

	return (
		<div className={wrapperClasses}>
			<label className="checkbox__control">
				<input
					id={inputId}
					type="checkbox"
					className="checkbox__input"
					ref={setInputRef}
					disabled={disabled}
					aria-invalid={error ? true : undefined}
					aria-describedby={error ? errorId : undefined}
					{...props}
				/>
				<span className="checkbox__box" aria-hidden="true" />
				{label != null && <span className="checkbox__label">{label}</span>}
			</label>
			{error && (
				<span id={errorId} className="checkbox__error" role="alert">
					{error}
				</span>
			)}
		</div>
	);
};

export default Checkbox;
