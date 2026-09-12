import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Calendar, { type DateRange } from './Calendar';

const meta: Meta<typeof Calendar> = {
	title: 'Calendar',
	component: Calendar,
	parameters: {
		docs: {
			description: {
				component:
					'A fully-featured Calendar component with single date, multiple dates, and date range selection modes. Supports keyboard navigation, date restrictions, highlighting, week numbers, and beautiful responsive UI with dark mode support.',
			},
		},
	},
	argTypes: {
		mode: {
			control: 'radio',
			options: ['single', 'multiple', 'range'],
			description: 'Selection mode',
		},
		firstDayOfWeek: {
			control: 'select',
			options: [0, 1, 2, 3, 4, 5, 6],
			description: 'First day of week (0 = Sunday, 1 = Monday, etc.)',
		},
		showWeekNumbers: {
			control: 'boolean',
			description: 'Show week numbers',
		},
		showTodayButton: {
			control: 'boolean',
			description: 'Show today button',
		},
		showClearButton: {
			control: 'boolean',
			description: 'Show clear button',
		},
		keyboardNavigation: {
			control: 'boolean',
			description: 'Enable keyboard navigation',
		},
		showAdjacentDates: {
			control: 'boolean',
			description: 'Show dates from adjacent months',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable calendar',
		},
		locale: {
			control: 'text',
			description: 'Locale for date formatting',
		},
		onChange: {
			action: 'date changed',
			description: 'Callback when date is selected',
		},
		onViewChange: {
			action: 'view changed',
			description: 'Callback when view changes',
		},
	},
	args: {
		onChange: fn(),
		onViewChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Basic Examples
export const Default: Story = {
	args: {
		mode: 'single',
	},
};

export const WithDefaultValue: Story = {
	args: {
		defaultValue: new Date(2024, 5, 15),
		mode: 'single',
	},
};

export const MondayFirstDay: Story = {
	args: {
		firstDayOfWeek: 1,
		mode: 'single',
	},
};

export const WithWeekNumbers: Story = {
	args: {
		showWeekNumbers: true,
		firstDayOfWeek: 1,
		mode: 'single',
	},
};

// Selection Modes
export const SingleDateSelection: Story = {
	render: function SingleDateSelectionStory() {
		const [value, setValue] = useState<Date | null>(new Date());
		return (
			<div>
				<Calendar
					value={value}
					onChange={(date) => setValue(date as Date)}
					mode="single"
				/>
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Selected: {value ? value.toLocaleDateString() : 'None'}
				</div>
			</div>
		);
	},
};

export const MultipleDateSelection: Story = {
	render: function MultipleDateSelectionStory() {
		const [value, setValue] = useState<Date[]>([
			new Date(),
			new Date(Date.now() + 86400000),
		]);
		return (
			<div>
				<Calendar
					value={value}
					onChange={(dates) => setValue(dates as Date[])}
					mode="multiple"
				/>
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Selected {value.length} date(s):
					<ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
						{value.map((date, i) => (
							<li key={i}>{date.toLocaleDateString()}</li>
						))}
					</ul>
				</div>
			</div>
		);
	},
};

export const DateRangeSelection: Story = {
	render: function DateRangeSelectionStory() {
		const [value, setValue] = useState<DateRange>({
			start: new Date(),
			end: new Date(Date.now() + 7 * 86400000),
		});
		return (
			<div>
				<Calendar
					value={value}
					onChange={(range) => setValue(range as DateRange)}
					mode="range"
				/>
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Range: {value.start.toLocaleDateString()} -{' '}
					{value.end.toLocaleDateString()}
					<br />
					Days:{' '}
					{Math.ceil((value.end.getTime() - value.start.getTime()) / 86400000) +
						1}
				</div>
			</div>
		);
	},
};

// Date Restrictions
export const WithMinMaxDates: Story = {
	render: () => {
		const today = new Date();
		const minDate = new Date(today);
		minDate.setDate(today.getDate() - 7);
		const maxDate = new Date(today);
		maxDate.setDate(today.getDate() + 14);

		return (
			<div>
				<Calendar minDate={minDate} maxDate={maxDate} mode="single" />
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Selectable range: {minDate.toLocaleDateString()} -{' '}
					{maxDate.toLocaleDateString()}
				</div>
			</div>
		);
	},
};

export const WithDisabledDates: Story = {
	render: () => {
		const today = new Date();
		const disabledDates = [
			new Date(today.getFullYear(), today.getMonth(), 10),
			new Date(today.getFullYear(), today.getMonth(), 15),
			new Date(today.getFullYear(), today.getMonth(), 20),
			new Date(today.getFullYear(), today.getMonth(), 25),
		];

		return (
			<div>
				<Calendar disabledDates={disabledDates} mode="single" />
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Disabled dates: 10th, 15th, 20th, 25th of current month
				</div>
			</div>
		);
	},
};

export const DisableWeekends: Story = {
	render: () => {
		const isWeekend = (date: Date) => {
			const day = date.getDay();
			return day === 0 || day === 6;
		};

		return (
			<div>
				<Calendar disabledDates={isWeekend} mode="single" />
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Weekends are disabled
				</div>
			</div>
		);
	},
};

// Highlighting
export const WithHighlightedDates: Story = {
	render: () => {
		const today = new Date();
		const highlightedDates = [
			new Date(today.getFullYear(), today.getMonth(), 5),
			new Date(today.getFullYear(), today.getMonth(), 12),
			new Date(today.getFullYear(), today.getMonth(), 18),
			new Date(today.getFullYear(), today.getMonth(), 24),
		];

		return (
			<div>
				<Calendar highlightedDates={highlightedDates} mode="single" />
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Highlighted dates: 5th, 12th, 18th, 24th (e.g., important dates or
					events)
				</div>
			</div>
		);
	},
};

export const HighlightWeekdays: Story = {
	render: () => {
		const isWeekday = (date: Date) => {
			const day = date.getDay();
			return day !== 0 && day !== 6;
		};

		return (
			<div>
				<Calendar highlightedDates={isWeekday} mode="single" />
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Weekdays are highlighted
				</div>
			</div>
		);
	},
};

// Customization
export const CustomDateClassName: Story = {
	render: () => {
		const getDateClassName = (date: Date) => {
			const day = date.getDate();
			if (day % 5 === 0) return 'custom-date-special';
			return '';
		};

		return (
			<div>
				<style>
					{`
						.custom-date-special {
							background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
							color: white !important;
							font-weight: bold !important;
						}
					`}
				</style>
				<Calendar dateClassName={getDateClassName} mode="single" />
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Every 5th, 10th, 15th, etc. has custom styling
				</div>
			</div>
		);
	},
};

export const CustomDateRender: Story = {
	render: () => {
		const renderDate = (date: Date) => {
			const day = date.getDate();
			const hasEvent = day % 7 === 0;
			return (
				<div style={{ position: 'relative', width: '100%', height: '100%' }}>
					<span>{day}</span>
					{hasEvent && (
						<span
							style={{
								position: 'absolute',
								bottom: '2px',
								left: '50%',
								transform: 'translateX(-50%)',
								width: '4px',
								height: '4px',
								borderRadius: '50%',
								background: '#ef4444',
							}}
						/>
					)}
				</div>
			);
		};

		return (
			<div>
				<Calendar renderDate={renderDate} mode="single" />
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
					Red dots indicate events on every 7th day
				</div>
			</div>
		);
	},
};

// Without Footer Buttons
export const WithoutFooter: Story = {
	args: {
		showTodayButton: false,
		showClearButton: false,
		mode: 'single',
	},
};

// Without Adjacent Dates
export const WithoutAdjacentDates: Story = {
	args: {
		showAdjacentDates: false,
		mode: 'single',
	},
};

// Disabled State
export const DisabledCalendar: Story = {
	args: {
		disabled: true,
		value: new Date(),
		mode: 'single',
	},
};

// Different Locales
export const LocaleEnglish: Story = {
	args: {
		locale: 'en-US',
		mode: 'single',
	},
};

export const LocaleGerman: Story = {
	args: {
		locale: 'de-DE',
		firstDayOfWeek: 1,
		mode: 'single',
	},
};

export const LocaleFrench: Story = {
	args: {
		locale: 'fr-FR',
		firstDayOfWeek: 1,
		mode: 'single',
	},
};

export const LocaleJapanese: Story = {
	args: {
		locale: 'ja-JP',
		mode: 'single',
	},
};

// Real-world Examples
export const BookingCalendar: Story = {
	render: function BookingCalendarStory() {
		const [value, setValue] = useState<DateRange>({
			start: new Date(),
			end: new Date(Date.now() + 3 * 86400000),
		});

		const today = new Date();
		const minDate = today;
		const maxDate = new Date(today);
		maxDate.setMonth(today.getMonth() + 6);

		const calculateNights = () => {
			return Math.ceil(
				(value.end.getTime() - value.start.getTime()) / 86400000,
			);
		};

		const calculatePrice = () => {
			const nights = calculateNights();
			const pricePerNight = 120;
			return nights * pricePerNight;
		};

		return (
			<div>
				<h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: 600 }}>
					Hotel Booking
				</h3>
				<Calendar
					value={value}
					onChange={(range) => setValue(range as DateRange)}
					mode="range"
					minDate={minDate}
					maxDate={maxDate}
					showWeekNumbers={false}
					firstDayOfWeek={1}
				/>
				<div
					style={{
						marginTop: '16px',
						padding: '16px',
						background: '#f3f4f6',
						borderRadius: '8px',
						fontSize: '14px',
					}}
				>
					<div style={{ fontWeight: 600, marginBottom: '8px' }}>
						Booking Summary
					</div>
					<div style={{ color: '#6b7280' }}>
						Check-in: {value.start.toLocaleDateString()}
						<br />
						Check-out: {value.end.toLocaleDateString()}
						<br />
						Nights: {calculateNights()}
						<br />
						<strong style={{ color: '#1f2937', fontSize: '16px' }}>
							Total: ${calculatePrice()}
						</strong>
					</div>
				</div>
			</div>
		);
	},
};

export const EventCalendar: Story = {
	render: function EventCalendarStory() {
		const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

		const events: Record<string, string[]> = {
			[new Date(2024, 11, 15).toDateString()]: ['Team Meeting', 'Code Review'],
			[new Date(2024, 11, 18).toDateString()]: ['Project Deadline'],
			[new Date(2024, 11, 20).toDateString()]: [
				'Client Call',
				'Sprint Planning',
			],
			[new Date(2024, 11, 25).toDateString()]: ['Holiday Party'],
		};

		const hasEvent = (date: Date) => {
			return events[date.toDateString()] !== undefined;
		};

		const renderDate = (date: Date) => {
			const hasEvents = hasEvent(date);
			return (
				<div style={{ position: 'relative', width: '100%', height: '100%' }}>
					<span>{date.getDate()}</span>
					{hasEvents && (
						<span
							style={{
								position: 'absolute',
								bottom: '2px',
								left: '50%',
								transform: 'translateX(-50%)',
								width: '5px',
								height: '5px',
								borderRadius: '50%',
								background: '#10b981',
							}}
						/>
					)}
				</div>
			);
		};

		const dateEvents = selectedDate
			? events[selectedDate.toDateString()]
			: null;

		return (
			<div>
				<h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: 600 }}>
					Event Calendar
				</h3>
				<Calendar
					value={selectedDate}
					onChange={(date) => setSelectedDate(date as Date)}
					mode="single"
					renderDate={renderDate}
					highlightedDates={hasEvent}
				/>
				<div
					style={{
						marginTop: '16px',
						padding: '16px',
						background: '#f3f4f6',
						borderRadius: '8px',
						fontSize: '14px',
					}}
				>
					<div style={{ fontWeight: 600, marginBottom: '8px' }}>
						{selectedDate
							? selectedDate.toLocaleDateString('en-US', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})
							: 'No date selected'}
					</div>
					{dateEvents && dateEvents.length > 0 ? (
						<ul
							style={{ margin: '8px 0', paddingLeft: '20px', color: '#6b7280' }}
						>
							{dateEvents.map((event, i) => (
								<li key={i}>{event}</li>
							))}
						</ul>
					) : (
						<div style={{ color: '#9ca3af' }}>No events scheduled</div>
					)}
				</div>
			</div>
		);
	},
};

export const WorkScheduleCalendar: Story = {
	render: function WorkScheduleCalendarStory() {
		const [selectedDates, setSelectedDates] = useState<Date[]>([]);

		const today = new Date();
		const minDate = today;

		const isWeekend = (date: Date) => {
			const day = date.getDay();
			return day === 0 || day === 6;
		};

		return (
			<div>
				<h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: 600 }}>
					Select Work Days
				</h3>
				<Calendar
					value={selectedDates}
					onChange={(dates) => setSelectedDates(dates as Date[])}
					mode="multiple"
					minDate={minDate}
					disabledDates={isWeekend}
					firstDayOfWeek={1}
					showWeekNumbers={true}
				/>
				<div
					style={{
						marginTop: '16px',
						padding: '16px',
						background: '#f3f4f6',
						borderRadius: '8px',
						fontSize: '14px',
					}}
				>
					<div style={{ fontWeight: 600, marginBottom: '8px' }}>
						Selected Work Days: {selectedDates.length}
					</div>
					{selectedDates.length > 0 ? (
						<div
							style={{
								color: '#6b7280',
								maxHeight: '120px',
								overflowY: 'auto',
							}}
						>
							{selectedDates
								.sort((a, b) => a.getTime() - b.getTime())
								.map((date, i) => (
									<div key={i}>
										{date.toLocaleDateString('en-US', {
											weekday: 'short',
											month: 'short',
											day: 'numeric',
										})}
									</div>
								))}
						</div>
					) : (
						<div style={{ color: '#9ca3af' }}>
							No days selected (weekends disabled)
						</div>
					)}
				</div>
			</div>
		);
	},
};

// Comparison
export const SideBySideComparison: Story = {
	render: function SideBySideComparisonStory() {
		const [startDate, setStartDate] = useState<Date>(new Date());
		const [endDate, setEndDate] = useState<Date>(
			new Date(Date.now() + 7 * 86400000),
		);

		return (
			<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
				<div>
					<h4
						style={{
							marginTop: 0,
							fontSize: '14px',
							fontWeight: 600,
							marginBottom: '12px',
						}}
					>
						Start Date
					</h4>
					<Calendar
						value={startDate}
						onChange={(date) => setStartDate(date as Date)}
						mode="single"
						maxDate={endDate}
					/>
				</div>
				<div>
					<h4
						style={{
							marginTop: 0,
							fontSize: '14px',
							fontWeight: 600,
							marginBottom: '12px',
						}}
					>
						End Date
					</h4>
					<Calendar
						value={endDate}
						onChange={(date) => setEndDate(date as Date)}
						mode="single"
						minDate={startDate}
					/>
				</div>
			</div>
		);
	},
};

// All Features Combined
export const AllFeatures: Story = {
	render: function AllFeaturesStory() {
		const [value, setValue] = useState<DateRange>({
			start: new Date(),
			end: new Date(Date.now() + 5 * 86400000),
		});

		const today = new Date();
		const highlightedDates = [
			new Date(today.getFullYear(), today.getMonth(), 10),
			new Date(today.getFullYear(), today.getMonth(), 20),
		];

		return (
			<div>
				<h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: 600 }}>
					Full-Featured Calendar
				</h3>
				<Calendar
					value={value}
					onChange={(range) => setValue(range as DateRange)}
					mode="range"
					firstDayOfWeek={1}
					showWeekNumbers={true}
					showTodayButton={true}
					showClearButton={true}
					keyboardNavigation={true}
					highlightedDates={highlightedDates}
					showAdjacentDates={true}
				/>
				<div
					style={{
						marginTop: '16px',
						padding: '16px',
						background: '#f3f4f6',
						borderRadius: '8px',
						fontSize: '14px',
					}}
				>
					<div style={{ fontWeight: 600, marginBottom: '8px' }}>
						Features Enabled:
					</div>
					<ul
						style={{ margin: '8px 0', paddingLeft: '20px', color: '#6b7280' }}
					>
						<li>Range selection mode</li>
						<li>Week starts on Monday</li>
						<li>Week numbers displayed</li>
						<li>Keyboard navigation (arrow keys, Enter, Space)</li>
						<li>Today & Clear buttons</li>
						<li>Highlighted special dates (10th, 20th)</li>
						<li>Adjacent month dates shown</li>
						<li>Responsive & accessible</li>
						<li>Dark mode support</li>
					</ul>
				</div>
			</div>
		);
	},
};
