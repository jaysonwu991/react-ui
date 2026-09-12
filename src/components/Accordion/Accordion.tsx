import { createContext, useCallback, useContext, useId, useState } from 'react';
import type {
	ButtonHTMLAttributes,
	FC,
	HTMLAttributes,
	KeyboardEvent,
	MouseEventHandler,
	ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import './Accordion.scss';

export type AccordionType = 'single' | 'multiple';

export interface AccordionProps {
	/** Accordion items */
	children: ReactNode;
	/** Whether one or many items can be open at once */
	type?: AccordionType;
	/** Controlled list of open item values */
	value?: string[];
	/** Initial open item values for uncontrolled usage */
	defaultValue?: string[];
	/** Called with the next open values when they change */
	onValueChange?: (value: string[]) => void;
	/** Allow closing the open item when type is single */
	collapsible?: boolean;
	/** Custom CSS class */
	className?: string;
}

interface AccordionContextValue {
	type: AccordionType;
	value: string[];
	toggle: (value: string) => void;
	baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = (): AccordionContextValue => {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error('Accordion components must be used within an <Accordion>');
	}
	return context;
};

interface AccordionItemContextValue {
	value: string;
	open: boolean;
	triggerId: string;
	panelId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
	null,
);

const useAccordionItemContext = (): AccordionItemContextValue => {
	const context = useContext(AccordionItemContext);
	if (!context) {
		throw new Error(
			'Accordion components must be used within an <AccordionItem>',
		);
	}
	return context;
};

const toIdPart = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '-');

const Accordion: FC<AccordionProps> = ({
	children,
	type = 'single',
	value: controlledValue,
	defaultValue = [],
	onValueChange,
	collapsible = true,
	className,
}) => {
	const [uncontrolledValue, setUncontrolledValue] =
		useState<string[]>(defaultValue);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : uncontrolledValue;
	const baseId = useId();

	const toggle = useCallback(
		(itemValue: string) => {
			const isOpen = value.indexOf(itemValue) !== -1;
			let nextValue: string[];

			if (type === 'single') {
				nextValue = isOpen ? (collapsible ? [] : value) : [itemValue];
			} else {
				nextValue = isOpen
					? value.filter((entry) => entry !== itemValue)
					: [...value, itemValue];
			}

			if (!isControlled) {
				setUncontrolledValue(nextValue);
			}
			onValueChange?.(nextValue);
		},
		[value, type, collapsible, isControlled, onValueChange],
	);

	return (
		<AccordionContext.Provider value={{ type, value, toggle, baseId }}>
			<div data-accordion-root className={cx('accordion', className)}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
};

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
	/** Unique value identifying this item */
	value: string;
	/** Item content */
	children: ReactNode;
}

export const AccordionItem: FC<AccordionItemProps> = ({
	value,
	children,
	className,
	...props
}) => {
	const { value: openValues, baseId } = useAccordionContext();
	const open = openValues.indexOf(value) !== -1;
	const idPart = toIdPart(value);

	return (
		<AccordionItemContext.Provider
			value={{
				value,
				open,
				triggerId: `${baseId}-trigger-${idPart}`,
				panelId: `${baseId}-panel-${idPart}`,
			}}
		>
			<div
				{...props}
				data-state={open ? 'open' : 'closed'}
				className={cx('accordion__item', className)}
			>
				{children}
			</div>
		</AccordionItemContext.Provider>
	);
};

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Trigger label */
	children: ReactNode;
}

export const AccordionTrigger: FC<AccordionTriggerProps> = ({
	children,
	className,
	onClick,
	onKeyDown,
	...props
}) => {
	const { toggle } = useAccordionContext();
	const { value, open, triggerId, panelId } = useAccordionItemContext();

	const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		toggle(value);
		onClick?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		onKeyDown?.(event);
		if (event.defaultPrevented) {
			return;
		}

		const handledKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End'];
		if (handledKeys.indexOf(event.key) === -1) {
			return;
		}

		event.preventDefault();
		const root = event.currentTarget.closest('[data-accordion-root]');
		const triggers = Array.from(
			root?.querySelectorAll<HTMLButtonElement>('button[aria-expanded]') ?? [],
		);
		if (triggers.length === 0) {
			return;
		}

		const currentIndex = triggers.indexOf(event.currentTarget);
		let nextIndex = currentIndex;
		if (event.key === 'Home') {
			nextIndex = 0;
		} else if (event.key === 'End') {
			nextIndex = triggers.length - 1;
		} else if (event.key === 'ArrowDown') {
			nextIndex = (currentIndex + 1) % triggers.length;
		} else {
			nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
		}

		triggers[nextIndex]?.focus();
	};

	return (
		<button
			{...props}
			type="button"
			id={triggerId}
			aria-expanded={open}
			aria-controls={panelId}
			className={cx('accordion__trigger', className)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<span className="accordion__trigger-text">{children}</span>
			<span className="accordion__chevron" aria-hidden="true" />
		</button>
	);
};

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
	/** Panel content */
	children: ReactNode;
}

export const AccordionContent: FC<AccordionContentProps> = ({
	children,
	className,
	...props
}) => {
	const { open, triggerId, panelId } = useAccordionItemContext();

	return (
		<div
			{...props}
			role="region"
			id={panelId}
			aria-labelledby={triggerId}
			hidden={!open}
			className={cx('accordion__content', className)}
		>
			{children}
		</div>
	);
};

export default Accordion;
