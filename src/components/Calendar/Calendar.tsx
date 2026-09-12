import { useState, useMemo, useCallback, type FC } from 'react';
import './Calendar.scss';

export type CalendarView = 'month' | 'year';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DateRange {
	start: Date;
	end: Date;
}

export interface CalendarProps {
	/** Selected date(s) */
	value?: Date | Date[] | DateRange | null;
	/** Default date to display when no value is set */
	defaultValue?: Date;
	/** Callback when date is selected */
	onChange?: (date: Date | Date[] | DateRange | null) => void;
	/** Selection mode */
	mode?: 'single' | 'multiple' | 'range';
	/** Minimum selectable date */
	minDate?: Date;
	/** Maximum selectable date */
	maxDate?: Date;
	/** Disabled dates */
	disabledDates?: Date[] | ((date: Date) => boolean);
	/** Highlighted dates */
	highlightedDates?: Date[] | ((date: Date) => boolean);
	/** First day of week (0 = Sunday, 1 = Monday, etc.) */
	firstDayOfWeek?: DayOfWeek;
	/** Show week numbers */
	showWeekNumbers?: boolean;
	/** Show today button */
	showTodayButton?: boolean;
	/** Show clear button */
	showClearButton?: boolean;
	/** Allow keyboard navigation */
	keyboardNavigation?: boolean;
	/** Custom class names for dates */
	dateClassName?: (date: Date) => string;
	/** Custom render function for date cells */
	renderDate?: (date: Date) => React.ReactNode;
	/** Custom render function for header */
	renderHeader?: (
		date: Date,
		changeMonth: (direction: number) => void,
	) => React.ReactNode;
	/** Month/Year view toggle */
	view?: CalendarView;
	/** Callback when view changes */
	onViewChange?: (view: CalendarView) => void;
	/** Custom CSS class */
	className?: string;
	/** Locale for date formatting */
	locale?: string;
	/** Show adjacent month dates */
	showAdjacentDates?: boolean;
	/** Disable component */
	disabled?: boolean;
}

const isSameDay = (date1: Date, date2: Date): boolean => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

const Calendar: FC<CalendarProps> = ({
	value = null,
	defaultValue,
	onChange,
	mode = 'single',
	minDate,
	maxDate,
	disabledDates,
	highlightedDates,
	firstDayOfWeek = 0,
	showWeekNumbers = false,
	showTodayButton = true,
	showClearButton = true,
	keyboardNavigation = true,
	dateClassName,
	renderDate,
	renderHeader,
	view: controlledView,
	onViewChange,
	className = '',
	locale = 'en-US',
	showAdjacentDates = true,
	disabled = false,
}) => {
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(
		defaultValue ||
			(value && !Array.isArray(value) && 'start' in value
				? value.start
				: value instanceof Date
					? value
					: today) ||
			today,
	);
	const [internalView, setInternalView] = useState<CalendarView>('month');
	const activeView = controlledView ?? internalView;

	const isDateDisabled = useCallback(
		(date: Date): boolean => {
			if (disabled) return true;
			if (minDate && date < minDate) return true;
			if (maxDate && date > maxDate) return true;
			if (!disabledDates) return false;
			if (typeof disabledDates === 'function') return disabledDates(date);
			return disabledDates.some((d) => isSameDay(d, date));
		},
		[disabled, minDate, maxDate, disabledDates],
	);

	const isDateHighlighted = useCallback(
		(date: Date): boolean => {
			if (!highlightedDates) return false;
			if (typeof highlightedDates === 'function') return highlightedDates(date);
			return highlightedDates.some((d) => isSameDay(d, date));
		},
		[highlightedDates],
	);

	const isDateSelected = useCallback(
		(date: Date): boolean => {
			if (!value) return false;
			if (value instanceof Date) return isSameDay(value, date);
			if (Array.isArray(value)) return value.some((d) => isSameDay(d, date));
			if ('start' in value && 'end' in value) {
				return date >= value.start && date <= value.end;
			}
			return false;
		},
		[value],
	);

	const isDateInRange = useCallback(
		(date: Date): boolean => {
			if (!value || !('start' in value)) return false;
			return date > value.start && date < value.end;
		},
		[value],
	);

	const isRangeStart = useCallback(
		(date: Date): boolean => {
			if (!value || !('start' in value)) return false;
			return isSameDay(date, value.start);
		},
		[value],
	);

	const isRangeEnd = useCallback(
		(date: Date): boolean => {
			if (!value || !('end' in value)) return false;
			return isSameDay(date, value.end);
		},
		[value],
	);

	// Generate calendar days for current month
	const calendarDays = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();

		// Calculate starting day offset
		let startOffset = firstDay.getDay() - firstDayOfWeek;
		if (startOffset < 0) startOffset += 7;

		// Calculate ending day offset
		const endOffset = 6 - ((lastDay.getDay() - firstDayOfWeek + 7) % 7);

		const days: Date[] = [];

		// Previous month days
		if (showAdjacentDates && startOffset > 0) {
			const prevMonthLastDay = new Date(year, month, 0).getDate();
			for (let i = startOffset - 1; i >= 0; i--) {
				days.push(new Date(year, month - 1, prevMonthLastDay - i));
			}
		} else {
			for (let i = 0; i < startOffset; i++) {
				days.push(null as unknown as Date);
			}
		}

		// Current month days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(new Date(year, month, i));
		}

		// Next month days
		if (showAdjacentDates && endOffset > 0) {
			for (let i = 1; i <= endOffset; i++) {
				days.push(new Date(year, month + 1, i));
			}
		}

		return days;
	}, [currentDate, firstDayOfWeek, showAdjacentDates]);

	// Generate years for year view
	const years = useMemo(() => {
		const currentYear = currentDate.getFullYear();
		const startYear = Math.floor(currentYear / 12) * 12;
		return Array.from({ length: 12 }, (_, i) => startYear + i);
	}, [currentDate]);

	// Week day names
	const weekDays = useMemo(() => {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const rotated = [
			...days.slice(firstDayOfWeek),
			...days.slice(0, firstDayOfWeek),
		];
		return rotated.map((day) =>
			new Date(2024, 0, days.indexOf(day) + 1).toLocaleDateString(locale, {
				weekday: 'short',
			}),
		);
	}, [firstDayOfWeek, locale]);

	// Get week number
	const getWeekNumber = (date: Date): number => {
		const d = new Date(
			Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
		);
		const dayNum = d.getUTCDay() || 7;
		d.setUTCDate(d.getUTCDate() + 4 - dayNum);
		const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
		return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
	};

	// Handlers
	const handleDateClick = (date: Date) => {
		if (!date || isDateDisabled(date)) return;

		if (mode === 'single') {
			onChange?.(date);
		} else if (mode === 'multiple') {
			const currentValue = (value as Date[]) || [];
			const isSelected = currentValue.some((d) => isSameDay(d, date));
			const newValue = isSelected
				? currentValue.filter((d) => !isSameDay(d, date))
				: [...currentValue, date];
			onChange?.(newValue);
		} else if (mode === 'range') {
			const currentRange = value as DateRange | null;
			if (!currentRange || (currentRange.start && currentRange.end)) {
				onChange?.({ start: date, end: date });
			} else if (currentRange.start && !currentRange.end) {
				if (date >= currentRange.start) {
					onChange?.({ start: currentRange.start, end: date });
				} else {
					onChange?.({ start: date, end: currentRange.start });
				}
			}
		}
	};

	const changeMonth = (direction: number) => {
		setCurrentDate(
			new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() + direction,
				1,
			),
		);
	};

	const changeYearView = (direction: number) => {
		setCurrentDate(
			new Date(
				currentDate.getFullYear() + direction * 12,
				currentDate.getMonth(),
				1,
			),
		);
	};

	const selectMonth = (month: number) => {
		setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
		const newView = 'month';
		if (controlledView === undefined) {
			setInternalView(newView);
		}
		onViewChange?.(newView);
	};

	const goToToday = () => {
		setCurrentDate(new Date());
		onChange?.(new Date());
	};

	const clearSelection = () => {
		onChange?.(null);
	};

	const toggleView = () => {
		const newView = activeView === 'month' ? 'year' : 'month';
		if (controlledView === undefined) {
			setInternalView(newView);
		}
		onViewChange?.(newView);
	};

	// Keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
		if (!keyboardNavigation || isDateDisabled(date)) return;

		let newDate: Date | null = null;

		switch (e.key) {
			case 'ArrowLeft':
				newDate = new Date(date);
				newDate.setDate(date.getDate() - 1);
				e.preventDefault();
				break;
			case 'ArrowRight':
				newDate = new Date(date);
				newDate.setDate(date.getDate() + 1);
				e.preventDefault();
				break;
			case 'ArrowUp':
				newDate = new Date(date);
				newDate.setDate(date.getDate() - 7);
				e.preventDefault();
				break;
			case 'ArrowDown':
				newDate = new Date(date);
				newDate.setDate(date.getDate() + 7);
				e.preventDefault();
				break;
			case 'Enter':
			case ' ':
				handleDateClick(date);
				e.preventDefault();
				break;
		}

		if (newDate && !isDateDisabled(newDate)) {
			if (newDate.getMonth() !== date.getMonth()) {
				setCurrentDate(newDate);
			}
		}
	};

	const classes = ['calendar', disabled && 'calendar--disabled', className]
		.filter(Boolean)
		.join(' ');

	// Render month view
	const renderMonthView = () => (
		<div className="calendar__month-view">
			<div className="calendar__weekdays">
				{showWeekNumbers && (
					<div className="calendar__weekday calendar__weekday--week-number">
						Wk
					</div>
				)}
				{weekDays.map((day, index) => (
					<div key={index} className="calendar__weekday">
						{day}
					</div>
				))}
			</div>
			<div className="calendar__days">
				{Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
					(_, weekIndex) => (
						<div key={weekIndex} className="calendar__week">
							{showWeekNumbers && (
								<div className="calendar__week-number">
									{calendarDays[weekIndex * 7] &&
										getWeekNumber(calendarDays[weekIndex * 7])}
								</div>
							)}
							{calendarDays
								.slice(weekIndex * 7, (weekIndex + 1) * 7)
								.map((date, dayIndex) => {
									if (!date) {
										return (
											<div
												key={dayIndex}
												className="calendar__day calendar__day--empty"
											/>
										);
									}

									const isToday = isSameDay(date, today);
									const isSelected = isDateSelected(date);
									const isDisabled = isDateDisabled(date);
									const isHighlighted = isDateHighlighted(date);
									const isAdjacent = date.getMonth() !== currentDate.getMonth();
									const inRange = isDateInRange(date);
									const rangeStart = isRangeStart(date);
									const rangeEnd = isRangeEnd(date);

									const dayClasses = [
										'calendar__day',
										isToday && 'calendar__day--today',
										isSelected && 'calendar__day--selected',
										isDisabled && 'calendar__day--disabled',
										isHighlighted && 'calendar__day--highlighted',
										isAdjacent && 'calendar__day--adjacent',
										inRange && 'calendar__day--in-range',
										rangeStart && 'calendar__day--range-start',
										rangeEnd && 'calendar__day--range-end',
										dateClassName?.(date),
									]
										.filter(Boolean)
										.join(' ');

									return (
										<button
											key={dayIndex}
											type="button"
											className={dayClasses}
											onClick={() => handleDateClick(date)}
											onKeyDown={(e) => handleKeyDown(e, date)}
											disabled={isDisabled}
											aria-label={date.toLocaleDateString(locale, {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
											aria-selected={isSelected}
											aria-current={isToday ? 'date' : undefined}
										>
											{renderDate ? renderDate(date) : date.getDate()}
										</button>
									);
								})}
						</div>
					),
				)}
			</div>
		</div>
	);

	// Render year view (month selection)
	const renderYearView = () => {
		const months = Array.from({ length: 12 }, (_, i) => i);
		const monthNames = months.map((m) =>
			new Date(currentDate.getFullYear(), m, 1).toLocaleDateString(locale, {
				month: 'short',
			}),
		);

		return (
			<div className="calendar__year-view">
				<div className="calendar__months">
					{months.map((month) => {
						const isCurrentMonth =
							month === today.getMonth() &&
							currentDate.getFullYear() === today.getFullYear();
						const isSelectedMonth = month === currentDate.getMonth();

						const monthClasses = [
							'calendar__month',
							isCurrentMonth && 'calendar__month--current',
							isSelectedMonth && 'calendar__month--selected',
						]
							.filter(Boolean)
							.join(' ');

						return (
							<button
								key={month}
								type="button"
								className={monthClasses}
								onClick={() => selectMonth(month)}
								disabled={disabled}
							>
								{monthNames[month]}
							</button>
						);
					})}
				</div>
			</div>
		);
	};

	// Render header
	const header = renderHeader ? (
		renderHeader(currentDate, changeMonth)
	) : (
		<div className="calendar__header">
			<div className="calendar__header-nav">
				<button
					type="button"
					className="calendar__nav-button"
					onClick={() =>
						activeView === 'month' ? changeMonth(-1) : changeYearView(-1)
					}
					disabled={disabled}
					aria-label="Previous"
				>
					‹
				</button>
				<button
					type="button"
					className="calendar__header-title"
					onClick={toggleView}
					disabled={disabled}
				>
					{activeView === 'month'
						? currentDate.toLocaleDateString(locale, {
								year: 'numeric',
								month: 'long',
							})
						: `${years[0]} - ${years[years.length - 1]}`}
				</button>
				<button
					type="button"
					className="calendar__nav-button"
					onClick={() =>
						activeView === 'month' ? changeMonth(1) : changeYearView(1)
					}
					disabled={disabled}
					aria-label="Next"
				>
					›
				</button>
			</div>
		</div>
	);

	return (
		<div className={classes} role="application" aria-label="Calendar">
			{header}
			<div className="calendar__body">
				{activeView === 'month' ? renderMonthView() : renderYearView()}
			</div>
			{(showTodayButton || showClearButton) && (
				<div className="calendar__footer">
					{showTodayButton && (
						<button
							type="button"
							className="calendar__footer-button"
							onClick={goToToday}
							disabled={disabled}
						>
							Today
						</button>
					)}
					{showClearButton && value && (
						<button
							type="button"
							className="calendar__footer-button calendar__footer-button--clear"
							onClick={clearSelection}
							disabled={disabled}
						>
							Clear
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Calendar;
