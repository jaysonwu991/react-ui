import {
	useState,
	useId,
	type ButtonHTMLAttributes,
	type MouseEvent,
	type ReactNode,
	type FC,
} from 'react';
import { cx } from '../../utils/cx';
import './Switch.scss';

export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps extends Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'onChange' | 'type'
> {
	/** Controlled checked state */
	checked?: boolean;
	/** Initial checked state for uncontrolled usage */
	defaultChecked?: boolean;
	/** Callback fired when the checked state changes */
	onCheckedChange?: (checked: boolean) => void;
	/** Label displayed next to the switch */
	label?: ReactNode;
	/** Whether the switch is disabled */
	disabled?: boolean;
	/** Size of the switch */
	size?: SwitchSize;
	/** Custom CSS class */
	className?: string;
}

const Switch: FC<SwitchProps> = ({
	checked,
	defaultChecked = false,
	onCheckedChange,
	label,
	disabled = false,
	size = 'medium',
	className = '',
	id,
	onClick,
	...props
}) => {
	const generatedId = useId();
	const buttonId = id || generatedId;
	const isControlled = checked !== undefined;
	const [internalChecked, setInternalChecked] = useState(defaultChecked);
	const isChecked = isControlled ? checked : internalChecked;

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event);
		if (event.defaultPrevented || disabled) return;

		const nextChecked = !isChecked;
		if (!isControlled) {
			setInternalChecked(nextChecked);
		}
		onCheckedChange?.(nextChecked);
	};

	const buttonClasses = cx(
		'switch',
		`switch--${size}`,
		isChecked && 'switch--checked',
		disabled && 'switch--disabled',
		className,
	);

	const button = (
		<button
			{...props}
			id={buttonId}
			type="button"
			role="switch"
			aria-checked={isChecked}
			className={buttonClasses}
			disabled={disabled}
			onClick={handleClick}
		>
			<span className="switch__thumb" aria-hidden="true" />
		</button>
	);

	if (label == null) {
		return button;
	}

	return (
		<span className="switch-wrapper">
			{button}
			<label className="switch__label" htmlFor={buttonId}>
				{label}
			</label>
		</span>
	);
};

export default Switch;
