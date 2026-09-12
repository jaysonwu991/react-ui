import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import Switch from './Switch';

describe('Switch Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Switch aria-label="Toggle" />);
			const switchEl = screen.getByRole('switch');
			expect(switchEl).toBeInTheDocument();
			expect(switchEl).toHaveAttribute('type', 'button');
			expect(switchEl).toHaveClass('switch', 'switch--medium');
			expect(switchEl).toHaveAttribute('aria-checked', 'false');
		});

		it('should render a thumb', () => {
			const { container } = render(<Switch aria-label="Toggle" />);
			expect(container.querySelector('.switch__thumb')).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			render(<Switch aria-label="Toggle" className="custom-class" />);
			expect(screen.getByRole('switch')).toHaveClass('custom-class');
		});
	});

	describe('Sizes', () => {
		it('should render small size', () => {
			render(<Switch aria-label="Toggle" size="small" />);
			expect(screen.getByRole('switch')).toHaveClass('switch--small');
		});

		it('should render medium size (default)', () => {
			render(<Switch aria-label="Toggle" />);
			expect(screen.getByRole('switch')).toHaveClass('switch--medium');
		});

		it('should render large size', () => {
			render(<Switch aria-label="Toggle" size="large" />);
			expect(screen.getByRole('switch')).toHaveClass('switch--large');
		});
	});

	describe('Label', () => {
		it('should render a label and expose it as the accessible name', () => {
			render(<Switch label="Enable notifications" />);
			const switchEl = screen.getByRole('switch', {
				name: /enable notifications/i,
			});
			expect(switchEl).toBeInTheDocument();
			expect(screen.getByText('Enable notifications')).toHaveClass(
				'switch__label',
			);
		});

		it('should not render a label when omitted', () => {
			const { container } = render(<Switch aria-label="Toggle" />);
			expect(container.querySelector('.switch__label')).not.toBeInTheDocument();
		});
	});

	describe('Checked State', () => {
		it('should support defaultChecked for uncontrolled usage', () => {
			render(<Switch aria-label="Toggle" defaultChecked />);
			expect(screen.getByRole('switch')).toHaveAttribute(
				'aria-checked',
				'true',
			);
		});

		it('should support a controlled checked prop', () => {
			render(<Switch aria-label="Toggle" checked onCheckedChange={vi.fn()} />);
			expect(screen.getByRole('switch')).toHaveAttribute(
				'aria-checked',
				'true',
			);
		});

		it('should toggle when uncontrolled', async () => {
			const user = userEvent.setup();
			render(<Switch aria-label="Toggle" />);
			const switchEl = screen.getByRole('switch');
			await user.click(switchEl);
			expect(switchEl).toHaveAttribute('aria-checked', 'true');
			await user.click(switchEl);
			expect(switchEl).toHaveAttribute('aria-checked', 'false');
		});

		it('should not change on its own when controlled', async () => {
			const user = userEvent.setup();
			render(<Switch aria-label="Toggle" checked onCheckedChange={vi.fn()} />);
			const switchEl = screen.getByRole('switch');
			await user.click(switchEl);
			expect(switchEl).toHaveAttribute('aria-checked', 'true');
		});

		it('should update when controlled by state', async () => {
			const ControlledSwitch = () => {
				const [checked, setChecked] = useState(false);
				return (
					<Switch
						label="Controlled"
						checked={checked}
						onCheckedChange={setChecked}
					/>
				);
			};
			const user = userEvent.setup();
			render(<ControlledSwitch />);
			const switchEl = screen.getByRole('switch');
			await user.click(switchEl);
			expect(switchEl).toHaveAttribute('aria-checked', 'true');
		});
	});

	describe('Callbacks', () => {
		it('should call onCheckedChange with the next value', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			render(<Switch aria-label="Toggle" onCheckedChange={handleChange} />);
			const switchEl = screen.getByRole('switch');
			await user.click(switchEl);
			expect(handleChange).toHaveBeenCalledWith(true);
			await user.click(switchEl);
			expect(handleChange).toHaveBeenLastCalledWith(false);
		});

		it('should call onClick when clicked', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			render(<Switch aria-label="Toggle" onClick={handleClick} />);
			await user.click(screen.getByRole('switch'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Keyboard', () => {
		it('should toggle with the space key', async () => {
			const user = userEvent.setup();
			render(<Switch label="Keyboard" />);
			const switchEl = screen.getByRole('switch');
			switchEl.focus();
			await user.keyboard(' ');
			expect(switchEl).toHaveAttribute('aria-checked', 'true');
		});

		it('should toggle with the enter key', async () => {
			const user = userEvent.setup();
			render(<Switch label="Keyboard" />);
			const switchEl = screen.getByRole('switch');
			switchEl.focus();
			await user.keyboard('{Enter}');
			expect(switchEl).toHaveAttribute('aria-checked', 'true');
		});
	});

	describe('Disabled State', () => {
		it('should be disabled when disabled is true', () => {
			render(<Switch aria-label="Toggle" disabled />);
			expect(screen.getByRole('switch')).toBeDisabled();
			expect(screen.getByRole('switch')).toHaveClass('switch--disabled');
		});

		it('should not toggle when disabled', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(
				<Switch aria-label="Toggle" disabled onCheckedChange={handleChange} />,
			);
			await user.click(screen.getByRole('switch'));
			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe('HTML Attributes', () => {
		it('should forward HTML button attributes', () => {
			render(<Switch aria-label="Toggle" name="notifications" value="on" />);
			const switchEl = screen.getByRole('switch');
			expect(switchEl).toHaveAttribute('name', 'notifications');
			expect(switchEl).toHaveAttribute('value', 'on');
		});

		it('should support data attributes', () => {
			render(<Switch aria-label="Toggle" data-testid="custom-switch" />);
			expect(screen.getByTestId('custom-switch')).toBeInTheDocument();
		});
	});
});
