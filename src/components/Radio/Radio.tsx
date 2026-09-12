import {
	createContext,
	useContext,
	useId,
	useState,
	type ChangeEventHandler,
	type FC,
	type InputHTMLAttributes,
	type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import './Radio.scss';

export type RadioOrientation = 'horizontal' | 'vertical';

interface RadioGroupContextValue {
	/** Shared name for the radio inputs */
	name: string;
	/** Currently selected value */
	value?: string;
	/** Called when a radio is selected */
	onChange: (value: string) => void;
	/** Whether the whole group is disabled */
	disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
	/** Shared name for the radio inputs */
	name: string;
	/** Controlled selected value */
	value?: string;
	/** Initial selected value when uncontrolled */
	defaultValue?: string;
	/** Called when the selected value changes */
	onValueChange?: (value: string) => void;
	/** Radio children */
	children: ReactNode;
	/** Layout direction */
	orientation?: RadioOrientation;
	/** Disable every radio in the group */
	disabled?: boolean;
	/** Legend rendered above the group */
	label?: ReactNode;
	/** Error message */
	error?: string;
	/** Custom CSS class applied to the fieldset */
	className?: string;
}

export interface RadioProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'name'
> {
	/** Value represented by this radio */
	value: string;
	/** Label rendered next to the radio */
	label?: ReactNode;
	/** Disable this radio */
	disabled?: boolean;
	/** Custom CSS class applied to the label */
	className?: string;
}

export const RadioGroup: FC<RadioGroupProps> = ({
	name,
	value,
	defaultValue,
	onValueChange,
	children,
	orientation = 'vertical',
	disabled = false,
	label,
	error,
	className,
}) => {
	const generatedId = useId();
	const errorId = `${generatedId}-error`;
	const [internalValue, setInternalValue] = useState(defaultValue);
	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalValue;

	const handleChange = (nextValue: string) => {
		if (!isControlled) {
			setInternalValue(nextValue);
		}
		onValueChange?.(nextValue);
	};

	const classes = cx(
		'radio-group',
		`radio-group--${orientation}`,
		error && 'radio-group--error',
		className,
	);

	return (
		<RadioGroupContext.Provider
			value={{
				name,
				value: currentValue,
				onChange: handleChange,
				disabled,
			}}
		>
			<fieldset
				className={classes}
				role="radiogroup"
				aria-orientation={orientation}
				aria-invalid={error ? true : undefined}
				aria-describedby={error ? errorId : undefined}
				disabled={disabled}
			>
				{label && <legend className="radio-group__legend">{label}</legend>}
				<div className="radio-group__items">{children}</div>
				{error && (
					<span id={errorId} className="radio-group__error">
						{error}
					</span>
				)}
			</fieldset>
		</RadioGroupContext.Provider>
	);
};

const Radio: FC<RadioProps> = ({
	value,
	label,
	disabled: disabledProp = false,
	className,
	id,
	checked: checkedProp,
	onChange,
	...props
}) => {
	const group = useContext(RadioGroupContext);
	const generatedId = useId();
	const radioId = id || generatedId;
	const disabled = disabledProp || group?.disabled || false;
	const checked = group ? group.value === value : checkedProp;

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		onChange?.(event);
		group?.onChange(value);
	};

	const classes = cx(
		'radio',
		checked && 'radio--checked',
		disabled && 'radio--disabled',
		className,
	);

	return (
		<label htmlFor={radioId} className={classes}>
			<input
				{...props}
				id={radioId}
				type="radio"
				name={group?.name}
				value={value}
				checked={checked}
				disabled={disabled}
				onChange={handleChange}
				className="radio__input"
			/>
			<span className="radio__marker" aria-hidden="true" />
			{label && <span className="radio__label">{label}</span>}
		</label>
	);
};

export default Radio;
