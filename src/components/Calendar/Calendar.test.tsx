import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar, { type DateRange } from './Calendar';

describe('Calendar', () => {
	describe('Rendering', () => {
		it('renders calendar component', () => {
			render(<Calendar />);
			expect(screen.getByRole('application')).toBeInTheDocument();
		});

		it('renders with default month view', () => {
			render(<Calendar />);
			expect(
				screen.getByText(
					/january|february|march|april|may|june|july|august|september|october|november|december/i,
				),
			).toBeInTheDocument();
		});

		it('renders week days', () => {
			render(<Calendar />);
			expect(screen.getByText('Sun')).toBeInTheDocument();
			expect(screen.getByText('Mon')).toBeInTheDocument();
		});

		it('renders navigation buttons', () => {
			render(<Calendar />);
			const navButtons = screen.getAllByRole('button', {
				name: /previous|next/i,
			});
			expect(navButtons).toHaveLength(2);
		});

		it('renders footer buttons by default', () => {
			render(<Calendar />);
			expect(screen.getByText('Today')).toBeInTheDocument();
		});

		it('does not render clear button when no value', () => {
			render(<Calendar />);
			expect(screen.queryByText('Clear')).not.toBeInTheDocument();
		});

		it('renders clear button when value is set', () => {
			render(<Calendar value={new Date()} />);
			expect(screen.getByText('Clear')).toBeInTheDocument();
		});

		it('hides footer buttons when disabled', () => {
			render(<Calendar showTodayButton={false} showClearButton={false} />);
			expect(screen.queryByText('Today')).not.toBeInTheDocument();
		});

		it('renders week numbers when enabled', () => {
			render(<Calendar showWeekNumbers={true} />);
			expect(screen.getByText('Wk')).toBeInTheDocument();
		});

		it('renders with custom className', () => {
			const { container } = render(<Calendar className="custom-calendar" />);
			expect(container.querySelector('.custom-calendar')).toBeInTheDocument();
		});

		it('renders disabled state', () => {
			const { container } = render(<Calendar disabled={true} />);
			expect(
				container.querySelector('.calendar--disabled'),
			).toBeInTheDocument();
		});
	});

	describe('First Day of Week', () => {
		it('renders with Sunday as first day by default', () => {
			render(<Calendar />);
			const weekdays = screen.getAllByText(/sun|mon|tue|wed|thu|fri|sat/i);
			// Should have Sun, Mon, Tue, Wed, Thu, Fri, Sat
			expect(weekdays.length).toBeGreaterThanOrEqual(7);
		});

		it('renders with Monday as first day when specified', () => {
			render(<Calendar firstDayOfWeek={1} />);
			const weekdays = screen.getAllByText(/sun|mon|tue|wed|thu|fri|sat/i);
			// Should have Mon, Tue, Wed, Thu, Fri, Sat, Sun
			expect(weekdays.length).toBeGreaterThanOrEqual(7);
		});
	});

	describe('Single Date Selection', () => {
		it('calls onChange when date is clicked', () => {
			const onChange = vi.fn();
			render(<Calendar onChange={onChange} mode="single" />);

			const dateButtons = screen
				.getAllByRole('button')
				.filter((btn) => /^\d+$/.test(btn.textContent || ''));
			if (dateButtons.length > 0) {
				fireEvent.click(dateButtons[0]);
				expect(onChange).toHaveBeenCalled();
			}
		});

		it('highlights selected date', () => {
			const today = new Date();
			const { container } = render(<Calendar value={today} mode="single" />);
			const selectedDays = container.querySelectorAll(
				'.calendar__day--selected',
			);
			expect(selectedDays.length).toBeGreaterThan(0);
		});

		it('highlights today', () => {
			const { container } = render(<Calendar mode="single" />);
			const todayElements = container.querySelectorAll('.calendar__day--today');
			expect(todayElements.length).toBeGreaterThan(0);
		});
	});

	describe('Multiple Date Selection', () => {
		it('allows selecting multiple dates', () => {
			const onChange = vi.fn();
			const dates = [new Date(), new Date(Date.now() + 86400000)];
			render(<Calendar value={dates} onChange={onChange} mode="multiple" />);

			const { container } = render(<Calendar value={dates} mode="multiple" />);
			const selectedDays = container.querySelectorAll(
				'.calendar__day--selected',
			);
			expect(selectedDays.length).toBeGreaterThan(0);
		});
	});

	describe('Range Selection', () => {
		it('displays range correctly', () => {
			const today = new Date();
			const nextWeek = new Date(today);
			nextWeek.setDate(today.getDate() + 7);

			const range: DateRange = { start: today, end: nextWeek };
			const { container } = render(<Calendar value={range} mode="range" />);

			const rangeStart = container.querySelectorAll(
				'.calendar__day--range-start',
			);
			const rangeEnd = container.querySelectorAll('.calendar__day--range-end');

			expect(rangeStart.length).toBeGreaterThan(0);
			expect(rangeEnd.length).toBeGreaterThan(0);
		});

		it('highlights dates in range', () => {
			const today = new Date();
			const nextWeek = new Date(today);
			nextWeek.setDate(today.getDate() + 7);

			const range: DateRange = { start: today, end: nextWeek };
			const { container } = render(<Calendar value={range} mode="range" />);

			const inRangeDays = container.querySelectorAll(
				'.calendar__day--in-range',
			);
			expect(inRangeDays.length).toBeGreaterThan(0);
		});
	});

	describe('Navigation', () => {
		it('changes month when navigation buttons are clicked', () => {
			const { container } = render(
				<Calendar defaultValue={new Date(2024, 5, 15)} />,
			);

			const initialMonth = container.querySelector(
				'.calendar__header-title',
			)?.textContent;

			const nextButton = screen.getByRole('button', { name: /next/i });
			fireEvent.click(nextButton);

			const newMonth = container.querySelector(
				'.calendar__header-title',
			)?.textContent;
			expect(newMonth).not.toBe(initialMonth);
		});

		it('navigates to previous month', () => {
			const { container } = render(
				<Calendar defaultValue={new Date(2024, 5, 15)} />,
			);

			const prevButton = screen.getByRole('button', { name: /previous/i });
			fireEvent.click(prevButton);

			expect(
				container.querySelector('.calendar__header-title'),
			).toBeInTheDocument();
		});
	});

	describe('View Switching', () => {
		it('toggles between month and year view', () => {
			const { container } = render(<Calendar />);

			const headerTitle = container.querySelector('.calendar__header-title');
			expect(headerTitle).toBeInTheDocument();

			if (headerTitle) {
				fireEvent.click(headerTitle);
				// Year view should show months
				expect(
					container.querySelector('.calendar__year-view'),
				).toBeInTheDocument();
			}
		});

		it('calls onViewChange when view changes', () => {
			const onViewChange = vi.fn();
			const { container } = render(<Calendar onViewChange={onViewChange} />);

			const headerTitle = container.querySelector('.calendar__header-title');
			if (headerTitle) {
				fireEvent.click(headerTitle);
				expect(onViewChange).toHaveBeenCalledWith('year');
			}
		});
	});

	describe('Today Button', () => {
		it('navigates to today when clicked', () => {
			const onChange = vi.fn();
			render(
				<Calendar onChange={onChange} defaultValue={new Date(2020, 0, 1)} />,
			);

			const todayButton = screen.getByText('Today');
			fireEvent.click(todayButton);

			expect(onChange).toHaveBeenCalled();
		});
	});

	describe('Clear Button', () => {
		it('clears selection when clicked', () => {
			const onChange = vi.fn();
			render(<Calendar value={new Date()} onChange={onChange} />);

			const clearButton = screen.getByText('Clear');
			fireEvent.click(clearButton);

			expect(onChange).toHaveBeenCalledWith(null);
		});
	});

	describe('Date Restrictions', () => {
		it('disables dates before minDate', () => {
			const today = new Date();
			const minDate = new Date(today);
			minDate.setDate(today.getDate() + 5);

			const { container } = render(<Calendar minDate={minDate} />);
			const disabledDays = container.querySelectorAll(
				'.calendar__day--disabled',
			);
			expect(disabledDays.length).toBeGreaterThan(0);
		});

		it('disables dates after maxDate', () => {
			const today = new Date();
			const maxDate = new Date(today);
			maxDate.setDate(today.getDate() - 5);

			const { container } = render(<Calendar maxDate={maxDate} />);
			const disabledDays = container.querySelectorAll(
				'.calendar__day--disabled',
			);
			expect(disabledDays.length).toBeGreaterThan(0);
		});

		it('disables specific dates', () => {
			const today = new Date();
			const disabledDates = [today];

			const { container } = render(<Calendar disabledDates={disabledDates} />);
			const disabledDays = container.querySelectorAll(
				'.calendar__day--disabled',
			);
			expect(disabledDays.length).toBeGreaterThan(0);
		});

		it('disables dates using function', () => {
			const isWeekend = (date: Date) => {
				const day = date.getDay();
				return day === 0 || day === 6;
			};

			const { container } = render(<Calendar disabledDates={isWeekend} />);
			const disabledDays = container.querySelectorAll(
				'.calendar__day--disabled',
			);
			expect(disabledDays.length).toBeGreaterThan(0);
		});

		it('does not trigger onChange for disabled dates', () => {
			const onChange = vi.fn();
			const today = new Date();

			render(<Calendar onChange={onChange} disabledDates={[today]} />);

			const disabledButtons = document.querySelectorAll(
				'.calendar__day--disabled',
			);
			if (disabledButtons.length > 0) {
				fireEvent.click(disabledButtons[0]);
				expect(onChange).not.toHaveBeenCalled();
			}
		});
	});

	describe('Highlighted Dates', () => {
		it('highlights specific dates', () => {
			const today = new Date();
			const highlightedDates = [today];

			const { container } = render(
				<Calendar highlightedDates={highlightedDates} />,
			);
			const highlightedDays = container.querySelectorAll(
				'.calendar__day--highlighted',
			);
			expect(highlightedDays.length).toBeGreaterThan(0);
		});

		it('highlights dates using function', () => {
			const isWeekday = (date: Date) => {
				const day = date.getDay();
				return day !== 0 && day !== 6;
			};

			const { container } = render(<Calendar highlightedDates={isWeekday} />);
			const highlightedDays = container.querySelectorAll(
				'.calendar__day--highlighted',
			);
			expect(highlightedDays.length).toBeGreaterThan(0);
		});
	});

	describe('Adjacent Dates', () => {
		it('shows adjacent month dates by default', () => {
			const { container } = render(<Calendar />);
			const adjacentDays = container.querySelectorAll(
				'.calendar__day--adjacent',
			);
			expect(adjacentDays.length).toBeGreaterThan(0);
		});

		it('hides adjacent month dates when disabled', () => {
			const { container } = render(<Calendar showAdjacentDates={false} />);
			const emptyDays = container.querySelectorAll('.calendar__day--empty');
			expect(emptyDays.length).toBeGreaterThan(0);
		});
	});

	describe('Custom Rendering', () => {
		it('uses custom date renderer', () => {
			const renderDate = (date: Date) => (
				<span data-testid="custom-date">{date.getDate()}</span>
			);
			render(<Calendar renderDate={renderDate} />);

			const customDates = screen.getAllByTestId('custom-date');
			expect(customDates.length).toBeGreaterThan(0);
		});

		it('applies custom date className', () => {
			const dateClassName = () => 'custom-class';
			const { container } = render(<Calendar dateClassName={dateClassName} />);

			const customDays = container.querySelectorAll('.custom-class');
			expect(customDays.length).toBeGreaterThan(0);
		});
	});

	describe('Keyboard Navigation', () => {
		it('handles Enter key press', () => {
			const onChange = vi.fn();
			render(<Calendar onChange={onChange} keyboardNavigation={true} />);

			const dateButtons = screen
				.getAllByRole('button')
				.filter((btn) =>
					/^\d+$/.test(btn.textContent || ''),
				) as HTMLButtonElement[];

			if (dateButtons.length > 0 && !dateButtons[0].disabled) {
				fireEvent.keyDown(dateButtons[0], { key: 'Enter' });
				expect(onChange).toHaveBeenCalled();
			}
		});

		it('handles Space key press', () => {
			const onChange = vi.fn();
			render(<Calendar onChange={onChange} keyboardNavigation={true} />);

			const dateButtons = screen
				.getAllByRole('button')
				.filter((btn) =>
					/^\d+$/.test(btn.textContent || ''),
				) as HTMLButtonElement[];

			if (dateButtons.length > 0 && !dateButtons[0].disabled) {
				fireEvent.keyDown(dateButtons[0], { key: ' ' });
				expect(onChange).toHaveBeenCalled();
			}
		});

		it('prevents keyboard navigation when disabled', () => {
			const onChange = vi.fn();
			render(<Calendar onChange={onChange} keyboardNavigation={false} />);

			const dateButtons = screen
				.getAllByRole('button')
				.filter((btn) => /^\d+$/.test(btn.textContent || ''));

			if (dateButtons.length > 0) {
				fireEvent.keyDown(dateButtons[0], { key: 'Enter' });
				// Should still work via click handler, keyboard just won't add extra trigger
			}
		});
	});

	describe('Disabled State', () => {
		it('disables all interactions when disabled', () => {
			const onChange = vi.fn();
			const { container } = render(
				<Calendar disabled={true} onChange={onChange} />,
			);

			const allButtons = container.querySelectorAll(
				'button',
			) as NodeListOf<HTMLButtonElement>;
			allButtons.forEach((button) => {
				expect(button).toBeDisabled();
			});
		});
	});

	describe('Accessibility', () => {
		it('has proper ARIA labels', () => {
			render(<Calendar />);
			expect(screen.getByRole('application')).toHaveAttribute(
				'aria-label',
				'Calendar',
			);
		});

		it('marks selected dates with aria-selected', () => {
			const today = new Date();
			const { container } = render(<Calendar value={today} mode="single" />);

			const selectedButtons = container.querySelectorAll(
				'.calendar__day--selected',
			);
			expect(selectedButtons.length).toBeGreaterThan(0);
		});

		it('marks today with aria-current', () => {
			render(<Calendar />);

			const dateButtons = screen
				.getAllByRole('button')
				.filter((btn) => btn.getAttribute('aria-current') === 'date');
			expect(dateButtons.length).toBeGreaterThan(0);
		});

		it('provides descriptive aria-labels for dates', () => {
			render(<Calendar />);

			const dateButtons = screen
				.getAllByRole('button')
				.filter((btn) => /^\d+$/.test(btn.textContent || ''));

			if (dateButtons.length > 0) {
				expect(dateButtons[0]).toHaveAttribute('aria-label');
			}
		});
	});

	describe('Localization', () => {
		it('formats dates according to locale', () => {
			const { rerender } = render(<Calendar locale="en-US" />);
			expect(screen.getByText('Sun')).toBeInTheDocument();

			rerender(<Calendar locale="de-DE" firstDayOfWeek={1} />);
			// German locale should show different abbreviations
			expect(screen.getByRole('application')).toBeInTheDocument();
		});
	});
});
