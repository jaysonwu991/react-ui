import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import Textarea from './Textarea';

describe('Textarea Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Textarea />);
			const textarea = screen.getByRole('textbox');
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveClass(
				'textarea__field',
				'textarea__field--resize-vertical',
			);
		});

		it('should render with a placeholder', () => {
			render(<Textarea placeholder="Write something" />);
			expect(
				screen.getByPlaceholderText('Write something'),
			).toBeInTheDocument();
		});

		it('should render with custom className on the wrapper', () => {
			render(<Textarea className="custom-class" />);
			expect(screen.getByRole('textbox').closest('.textarea')).toHaveClass(
				'custom-class',
			);
		});
	});

	describe('Label', () => {
		it('should render and associate the label', () => {
			render(<Textarea label="Description" />);
			expect(screen.getByLabelText('Description')).toBeInTheDocument();
			expect(screen.getByText('Description')).toHaveClass('textarea__label');
		});

		it('should associate the label with a provided id', () => {
			render(<Textarea label="Bio" id="bio-field" />);
			const textarea = screen.getByLabelText('Bio');
			expect(textarea).toHaveAttribute('id', 'bio-field');
		});

		it('should generate unique ids when none are provided', () => {
			render(
				<>
					<Textarea label="First" />
					<Textarea label="Second" />
				</>,
			);
			const firstId = screen.getByLabelText('First').getAttribute('id');
			const secondId = screen.getByLabelText('Second').getAttribute('id');
			expect(firstId).not.toBe(secondId);
		});
	});

	describe('Error Handling', () => {
		it('should display the error message', () => {
			render(<Textarea error="This field is required" />);
			const error = screen.getByText('This field is required');
			expect(error).toHaveClass('textarea__error');
			expect(error).toHaveAttribute('role', 'alert');
		});

		it('should add the error class to the field', () => {
			render(<Textarea error="Error" />);
			expect(screen.getByRole('textbox')).toHaveClass('textarea__field--error');
		});

		it('should set aria-invalid when there is an error', () => {
			render(<Textarea error="Error" />);
			expect(screen.getByRole('textbox')).toHaveAttribute(
				'aria-invalid',
				'true',
			);
		});

		it('should point aria-describedby at the error message', () => {
			render(<Textarea error="Error" />);
			const textarea = screen.getByRole('textbox');
			const error = screen.getByText('Error');
			expect(textarea).toHaveAttribute('aria-describedby', error.id);
		});

		it('should not set aria-invalid without an error', () => {
			render(<Textarea />);
			expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
		});
	});

	describe('Helper Text', () => {
		it('should display the helper text', () => {
			render(<Textarea helperText="Maximum 500 characters" />);
			expect(screen.getByText('Maximum 500 characters')).toHaveClass(
				'textarea__helper',
			);
		});

		it('should point aria-describedby at the helper text', () => {
			render(<Textarea helperText="Helper" />);
			const textarea = screen.getByRole('textbox');
			const helper = screen.getByText('Helper');
			expect(textarea).toHaveAttribute('aria-describedby', helper.id);
		});

		it('should prioritize the error over the helper text', () => {
			render(<Textarea error="Error" helperText="Helper" />);
			expect(screen.getByText('Error')).toBeInTheDocument();
			expect(screen.queryByText('Helper')).not.toBeInTheDocument();
		});
	});

	describe('Full Width', () => {
		it('should render full width when requested', () => {
			render(<Textarea fullWidth />);
			expect(screen.getByRole('textbox').closest('.textarea')).toHaveClass(
				'textarea--full-width',
			);
		});

		it('should not be full width by default', () => {
			render(<Textarea />);
			expect(screen.getByRole('textbox').closest('.textarea')).not.toHaveClass(
				'textarea--full-width',
			);
		});
	});

	describe('Resize', () => {
		it('should apply the none resize modifier', () => {
			render(<Textarea resize="none" />);
			expect(screen.getByRole('textbox')).toHaveClass(
				'textarea__field--resize-none',
			);
		});

		it('should apply the vertical resize modifier by default', () => {
			render(<Textarea />);
			expect(screen.getByRole('textbox')).toHaveClass(
				'textarea__field--resize-vertical',
			);
		});

		it('should apply the horizontal resize modifier', () => {
			render(<Textarea resize="horizontal" />);
			expect(screen.getByRole('textbox')).toHaveClass(
				'textarea__field--resize-horizontal',
			);
		});

		it('should apply the both resize modifier', () => {
			render(<Textarea resize="both" />);
			expect(screen.getByRole('textbox')).toHaveClass(
				'textarea__field--resize-both',
			);
		});
	});

	describe('Disabled State', () => {
		it('should be disabled when disabled is true', () => {
			render(<Textarea disabled />);
			expect(screen.getByRole('textbox')).toBeDisabled();
		});

		it('should not be disabled by default', () => {
			render(<Textarea />);
			expect(screen.getByRole('textbox')).not.toBeDisabled();
		});
	});

	describe('Value and onChange', () => {
		it('should render a controlled value', () => {
			render(<Textarea value="hello" onChange={() => {}} />);
			expect(screen.getByRole('textbox')).toHaveValue('hello');
		});

		it('should call onChange when typing', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			render(<Textarea onChange={handleChange} />);
			await user.type(screen.getByRole('textbox'), 'hi');
			expect(handleChange).toHaveBeenCalledTimes(2);
		});

		it('should update value when controlled', async () => {
			const ControlledTextarea = () => {
				const [value, setValue] = useState('');
				return (
					<Textarea
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>
				);
			};
			const user = userEvent.setup();
			render(<ControlledTextarea />);
			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'test');
			expect(textarea).toHaveValue('test');
		});
	});

	describe('HTML Attributes', () => {
		it('should forward HTML textarea attributes', () => {
			render(<Textarea name="bio" rows={4} maxLength={120} required />);
			const textarea = screen.getByRole('textbox');
			expect(textarea).toHaveAttribute('name', 'bio');
			expect(textarea).toHaveAttribute('rows', '4');
			expect(textarea).toHaveAttribute('maxlength', '120');
			expect(textarea).toHaveAttribute('required');
		});

		it('should support data attributes', () => {
			render(<Textarea data-testid="custom-textarea" />);
			expect(screen.getByTestId('custom-textarea')).toBeInTheDocument();
		});
	});

	describe('Combination of Props', () => {
		it('should render all props together', () => {
			render(
				<Textarea
					label="Feedback"
					error="Too long"
					fullWidth
					resize="both"
					className="custom"
				/>,
			);
			expect(screen.getByLabelText('Feedback')).toBeInTheDocument();
			expect(screen.getByText('Too long')).toBeInTheDocument();
			const textarea = screen.getByRole('textbox');
			expect(textarea).toHaveClass(
				'textarea__field--resize-both',
				'textarea__field--error',
			);
			expect(textarea.closest('.textarea')).toHaveClass(
				'textarea--full-width',
				'custom',
			);
		});
	});
});
