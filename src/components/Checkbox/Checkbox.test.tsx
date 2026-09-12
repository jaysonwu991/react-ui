import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import Checkbox from './Checkbox';

describe('Checkbox Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Checkbox />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toBeInTheDocument();
			expect(checkbox).toHaveClass('checkbox__input');
			expect(checkbox).not.toBeChecked();
		});

		it('should render a styled box', () => {
			const { container } = render(<Checkbox />);
			expect(container.querySelector('.checkbox__box')).toBeInTheDocument();
		});

		it('should render with custom className on the wrapper', () => {
			render(<Checkbox className="custom-class" />);
			expect(screen.getByRole('checkbox').closest('.checkbox')).toHaveClass(
				'custom-class',
			);
		});
	});

	describe('Label', () => {
		it('should render and associate the label', () => {
			render(<Checkbox label="Accept terms" />);
			const checkbox = screen.getByRole('checkbox', {
				name: /accept terms/i,
			});
			expect(checkbox).toBeInTheDocument();
			expect(screen.getByText('Accept terms')).toHaveClass('checkbox__label');
		});

		it('should not render a label when omitted', () => {
			const { container } = render(<Checkbox />);
			expect(
				container.querySelector('.checkbox__label'),
			).not.toBeInTheDocument();
		});
	});

	describe('Checked State', () => {
		it('should support defaultChecked', () => {
			render(<Checkbox defaultChecked />);
			expect(screen.getByRole('checkbox')).toBeChecked();
		});

		it('should support a controlled checked prop', () => {
			render(<Checkbox checked readOnly />);
			expect(screen.getByRole('checkbox')).toBeChecked();
		});

		it('should toggle when uncontrolled', async () => {
			const user = userEvent.setup();
			render(<Checkbox label="Toggle" />);
			const checkbox = screen.getByRole('checkbox');
			await user.click(checkbox);
			expect(checkbox).toBeChecked();
		});

		it('should update when controlled', async () => {
			const ControlledCheckbox = () => {
				const [checked, setChecked] = useState(false);
				return (
					<Checkbox
						label="Controlled"
						checked={checked}
						onChange={(event) => setChecked(event.target.checked)}
					/>
				);
			};
			const user = userEvent.setup();
			render(<ControlledCheckbox />);
			const checkbox = screen.getByRole('checkbox');
			await user.click(checkbox);
			expect(checkbox).toBeChecked();
		});

		it('should toggle with the space key', async () => {
			const user = userEvent.setup();
			render(<Checkbox label="Keyboard" />);
			const checkbox = screen.getByRole('checkbox');
			await user.tab();
			await user.keyboard(' ');
			expect(checkbox).toBeChecked();
		});
	});

	describe('Indeterminate', () => {
		it('should set the indeterminate property', () => {
			render(<Checkbox indeterminate label="Mixed" />);
			expect(screen.getByRole('checkbox')).toBePartiallyChecked();
		});

		it('should not be indeterminate by default', () => {
			render(<Checkbox label="Normal" />);
			expect(screen.getByRole('checkbox')).not.toBePartiallyChecked();
		});
	});

	describe('Error Handling', () => {
		it('should display the error message', () => {
			render(<Checkbox error="You must accept" />);
			const error = screen.getByText('You must accept');
			expect(error).toHaveClass('checkbox__error');
			expect(error).toHaveAttribute('role', 'alert');
		});

		it('should add the error class to the wrapper', () => {
			render(<Checkbox error="Error" />);
			expect(screen.getByRole('checkbox').closest('.checkbox')).toHaveClass(
				'checkbox--error',
			);
		});

		it('should set aria-invalid and aria-describedby', () => {
			render(<Checkbox error="Error" />);
			const checkbox = screen.getByRole('checkbox');
			const error = screen.getByText('Error');
			expect(checkbox).toHaveAttribute('aria-invalid', 'true');
			expect(checkbox).toHaveAttribute('aria-describedby', error.id);
		});

		it('should not set aria-invalid without an error', () => {
			render(<Checkbox />);
			expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid');
		});
	});

	describe('Disabled State', () => {
		it('should be disabled when disabled is true', () => {
			render(<Checkbox disabled />);
			expect(screen.getByRole('checkbox')).toBeDisabled();
		});

		it('should not be disabled by default', () => {
			render(<Checkbox />);
			expect(screen.getByRole('checkbox')).not.toBeDisabled();
		});

		it('should not toggle when disabled', async () => {
			const user = userEvent.setup();
			render(<Checkbox disabled label="Disabled" />);
			const checkbox = screen.getByRole('checkbox');
			await user.click(checkbox);
			expect(checkbox).not.toBeChecked();
		});
	});

	describe('Change Handler', () => {
		it('should call onChange when toggled', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			render(<Checkbox onChange={handleChange} />);
			await user.click(screen.getByRole('checkbox'));
			expect(handleChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('HTML Attributes', () => {
		it('should forward HTML input attributes', () => {
			render(<Checkbox name="terms" value="yes" required />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toHaveAttribute('name', 'terms');
			expect(checkbox).toHaveAttribute('value', 'yes');
			expect(checkbox).toHaveAttribute('required');
		});

		it('should support data attributes', () => {
			render(<Checkbox data-testid="custom-checkbox" />);
			expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument();
		});
	});
});
