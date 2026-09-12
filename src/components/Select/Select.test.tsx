import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Select from './Select';

const options = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c', label: 'Option C', disabled: true },
];

describe('Select Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Select options={options} />);
			const select = screen.getByRole('combobox');
			expect(select).toBeInTheDocument();
			expect(select).toHaveClass('select__field');
		});

		it('should render options from the options prop', () => {
			render(<Select options={options} />);
			expect(screen.getAllByRole('option')).toHaveLength(3);
		});

		it('should render children when options are not provided', () => {
			render(
				<Select>
					<option value="x">X</option>
				</Select>,
			);
			expect(screen.getByRole('option', { name: 'X' })).toBeInTheDocument();
		});

		it('should render a label associated with the select', () => {
			render(<Select label="Country" options={options} />);
			const select = screen.getByRole('combobox', { name: 'Country' });
			expect(select).toBeInTheDocument();
			expect(screen.getByText('Country')).toHaveAttribute('for', select.id);
		});

		it('should apply a custom className to the wrapper', () => {
			render(<Select className="custom-class" options={options} />);
			expect(
				screen.getByRole('combobox').closest('.select-wrapper'),
			).toHaveClass('custom-class');
		});

		it('should forward the id to the native select', () => {
			render(<Select id="my-select" options={options} />);
			expect(screen.getByRole('combobox')).toHaveAttribute('id', 'my-select');
		});
	});

	describe('Placeholder', () => {
		it('should render a disabled placeholder option', () => {
			render(<Select placeholder="Choose one" options={options} />);
			const placeholder = screen.getByRole('option', { name: 'Choose one' });
			expect(placeholder).toBeDisabled();
			expect(placeholder).toHaveValue('');
		});

		it('should not render a placeholder option when not provided', () => {
			render(<Select options={options} />);
			expect(
				screen.queryByRole('option', { name: 'Choose one' }),
			).not.toBeInTheDocument();
		});
	});

	describe('States', () => {
		it('should render error state with aria attributes', () => {
			render(<Select label="Country" error="Required" options={options} />);
			const select = screen.getByRole('combobox');
			expect(select).toHaveClass('select__field--error');
			expect(select).toHaveAttribute('aria-invalid', 'true');
			expect(select).toHaveAccessibleDescription('Required');
		});

		it('should render helper text as the accessible description', () => {
			render(
				<Select label="Country" helperText="Pick one" options={options} />,
			);
			const select = screen.getByRole('combobox');
			expect(select).not.toHaveAttribute('aria-invalid');
			expect(select).toHaveAccessibleDescription('Pick one');
		});

		it('should prefer the error over helper text', () => {
			render(
				<Select
					label="Country"
					error="Required"
					helperText="Pick one"
					options={options}
				/>,
			);
			expect(screen.queryByText('Pick one')).not.toBeInTheDocument();
			expect(screen.getByText('Required')).toBeInTheDocument();
		});

		it('should render full width when fullWidth is set', () => {
			render(<Select fullWidth options={options} />);
			expect(
				screen.getByRole('combobox').closest('.select-wrapper'),
			).toHaveClass('select-wrapper--full-width');
		});

		it('should not be full width by default', () => {
			render(<Select options={options} />);
			expect(
				screen.getByRole('combobox').closest('.select-wrapper'),
			).not.toHaveClass('select-wrapper--full-width');
		});

		it('should be disabled when disabled is set', () => {
			render(<Select disabled options={options} />);
			expect(screen.getByRole('combobox')).toBeDisabled();
		});

		it('should be enabled by default', () => {
			render(<Select options={options} />);
			expect(screen.getByRole('combobox')).not.toBeDisabled();
		});

		it('should disable individual options', () => {
			render(<Select options={options} />);
			expect(screen.getByRole('option', { name: 'Option C' })).toBeDisabled();
		});
	});

	describe('Interaction', () => {
		it('should call onChange when a value is selected', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			render(<Select onChange={handleChange} options={options} />);
			await user.selectOptions(screen.getByRole('combobox'), 'b');
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		it('should support a controlled value', () => {
			render(<Select value="b" onChange={() => {}} options={options} />);
			expect(screen.getByRole('combobox')).toHaveValue('b');
		});

		it('should forward native select attributes', () => {
			render(<Select name="country" required options={options} />);
			const select = screen.getByRole('combobox');
			expect(select).toHaveAttribute('name', 'country');
			expect(select).toBeRequired();
		});
	});
});
