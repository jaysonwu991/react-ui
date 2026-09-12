import {
	createContext,
	useCallback,
	useContext,
	useId,
	useRef,
	useState,
} from 'react';
import type {
	ButtonHTMLAttributes,
	FC,
	HTMLAttributes,
	KeyboardEvent,
	MouseEventHandler,
	ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import './Tabs.scss';

export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
	/** Controlled active tab value */
	value?: string;
	/** Initial active tab value for uncontrolled usage */
	defaultValue?: string;
	/** Called with the next value when the active tab changes */
	onValueChange?: (value: string) => void;
	/** Tab list and panels */
	children: ReactNode;
	/** Layout orientation of the tab list */
	orientation?: TabsOrientation;
	/** Custom CSS class */
	className?: string;
}

interface TabsContextValue {
	value: string;
	setValue: (value: string) => void;
	baseId: string;
	orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = (): TabsContextValue => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('Tabs components must be used within a <Tabs>');
	}
	return context;
};

const toIdPart = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '-');

const Tabs: FC<TabsProps> = ({
	value: controlledValue,
	defaultValue,
	onValueChange,
	children,
	orientation = 'horizontal',
	className,
}) => {
	const [uncontrolledValue, setUncontrolledValue] = useState(
		defaultValue ?? '',
	);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : uncontrolledValue;
	const baseId = useId();

	const setValue = useCallback(
		(nextValue: string) => {
			if (!isControlled) {
				setUncontrolledValue(nextValue);
			}
			onValueChange?.(nextValue);
		},
		[isControlled, onValueChange],
	);

	return (
		<TabsContext.Provider value={{ value, setValue, baseId, orientation }}>
			<div className={cx('tabs', `tabs--${orientation}`, className)}>
				{children}
			</div>
		</TabsContext.Provider>
	);
};

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
	/** Tab triggers */
	children: ReactNode;
}

export const TabsList: FC<TabsListProps> = ({
	children,
	className,
	...props
}) => {
	const { orientation } = useTabsContext();
	const listRef = useRef<HTMLDivElement>(null);

	return (
		<div
			{...props}
			ref={listRef}
			role="tablist"
			aria-orientation={orientation}
			className={cx('tabs__list', className)}
		>
			{children}
		</div>
	);
};

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Value linking this trigger to its panel */
	value: string;
	/** Trigger label */
	children: ReactNode;
}

export const TabsTrigger: FC<TabsTriggerProps> = ({
	value,
	children,
	className,
	onClick,
	onKeyDown,
	...props
}) => {
	const {
		value: activeValue,
		setValue,
		baseId,
		orientation,
	} = useTabsContext();
	const isActive = activeValue === value;
	const idPart = toIdPart(value);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		setValue(value);
		onClick?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		onKeyDown?.(event);
		if (event.defaultPrevented) {
			return;
		}

		const isHorizontal = orientation === 'horizontal';
		const isNext = isHorizontal
			? event.key === 'ArrowRight'
			: event.key === 'ArrowDown';
		const isPrevious = isHorizontal
			? event.key === 'ArrowLeft'
			: event.key === 'ArrowUp';
		const isHome = event.key === 'Home';
		const isEnd = event.key === 'End';

		if (!isNext && !isPrevious && !isHome && !isEnd) {
			return;
		}

		event.preventDefault();
		const list = event.currentTarget.closest('[role="tablist"]');
		const tabs = Array.from(
			list?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
		);
		if (tabs.length === 0) {
			return;
		}

		const currentIndex = tabs.indexOf(event.currentTarget);
		let nextIndex = currentIndex;
		if (isHome) {
			nextIndex = 0;
		} else if (isEnd) {
			nextIndex = tabs.length - 1;
		} else if (isNext) {
			nextIndex = (currentIndex + 1) % tabs.length;
		} else {
			nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
		}

		const nextTab = tabs[nextIndex];
		if (!nextTab) {
			return;
		}
		nextTab.focus();
		const nextValue = nextTab.dataset.value;
		if (nextValue !== undefined) {
			setValue(nextValue);
		}
	};

	return (
		<button
			{...props}
			type="button"
			role="tab"
			id={`${baseId}-trigger-${idPart}`}
			data-value={value}
			aria-selected={isActive}
			aria-controls={`${baseId}-panel-${idPart}`}
			tabIndex={isActive ? 0 : -1}
			className={cx(
				'tabs__trigger',
				isActive && 'tabs__trigger--active',
				className,
			)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{children}
		</button>
	);
};

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
	/** Value linking this panel to its trigger */
	value: string;
	/** Panel content */
	children: ReactNode;
}

export const TabsContent: FC<TabsContentProps> = ({
	value,
	children,
	className,
	...props
}) => {
	const { value: activeValue, baseId } = useTabsContext();
	const isActive = activeValue === value;
	const idPart = toIdPart(value);

	return (
		<div
			{...props}
			role="tabpanel"
			id={`${baseId}-panel-${idPart}`}
			aria-labelledby={`${baseId}-trigger-${idPart}`}
			hidden={!isActive}
			tabIndex={0}
			className={cx('tabs__content', className)}
		>
			{children}
		</div>
	);
};

export default Tabs;
