import {
	useId,
	type SelectHTMLAttributes,
	type ReactNode,
	type FC,
} from 'react';
import { cx } from '../../utils/cx';
import './Select.scss';

export interface SelectOption {
	/** Option value */
	value: string;
	/** Visible option label */
	label: string;
	/** Disable the option */
	disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	/** Label rendered above the field */
	label?: ReactNode;
	/** Error message */
	error?: string;
	/** Helper text shown when there is no error */
	helperText?: string;
	/** Placeholder option shown while no value is selected */
	placeholder?: string;
	/** Options to render as native `<option>` elements */
	options?: SelectOption[];
	/** Stretch the select to fill its container */
	fullWidth?: boolean;
	/** Custom CSS class applied to the wrapper */
	className?: string;
}

const Select: FC<SelectProps> = ({
	label,
	error,
	helperText,
	placeholder,
	options,
	fullWidth = false,
	className,
	id,
	children,
	...props
}) => {
	const generatedId = useId();
	const selectId = id || generatedId;
	const errorId = `${selectId}-error`;
	const helperId = `${selectId}-helper`;
	const describedBy = error ? errorId : helperText ? helperId : undefined;

	const wrapperClasses = cx(
		'select-wrapper',
		fullWidth && 'select-wrapper--full-width',
		className,
	);

	const fieldClasses = cx('select__field', error && 'select__field--error');

	return (
		<div className={wrapperClasses}>
			{label && (
				<label htmlFor={selectId} className="select__label">
					{label}
				</label>
			)}
			<div className="select__container">
				<select
					id={selectId}
					className={fieldClasses}
					aria-invalid={error ? true : undefined}
					aria-describedby={describedBy}
					{...props}
				>
					{options ? (
						<>
							{placeholder && (
								<option value="" disabled>
									{placeholder}
								</option>
							)}
							{options.map((option) => (
								<option
									key={option.value}
									value={option.value}
									disabled={option.disabled}
								>
									{option.label}
								</option>
							))}
						</>
					) : (
						children
					)}
				</select>
				<span className="select__chevron" aria-hidden="true" />
			</div>
			{error ? (
				<span id={errorId} className="select__error">
					{error}
				</span>
			) : (
				helperText && (
					<span id={helperId} className="select__helper">
						{helperText}
					</span>
				)
			)}
		</div>
	);
};

export default Select;
