import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import Input from './Input';

describe('Input Component', () => {
	describe('Rendering', () => {
		it('should render input with default props', () => {
			render(<Input />);
			const input = screen.getByRole('textbox');
			expect(input).toBeInTheDocument();
			expect(input).toHaveClass('input', 'input--medium');
		});

		it('should render with placeholder', () => {
			render(<Input placeholder="Enter text" />);
			expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			render(<Input className="custom-class" />);
			expect(screen.getByRole('textbox').closest('.input-wrapper')).toHaveClass(
				'custom-class',
			);
		});
	});

	describe('Label', () => {
		it('should render with label', () => {
			render(<Input label="Username" />);
			expect(screen.getByLabelText('Username')).toBeInTheDocument();
			expect(screen.getByText('Username')).toHaveClass('input__label');
		});

		it('should not render label when not provided', () => {
			const { container } = render(<Input />);
			expect(container.querySelector('.input__label')).not.toBeInTheDocument();
		});

		it('should associate label with input using id', () => {
			render(<Input label="Email" id="email-input" />);
			const label = screen.getByText('Email');
			const input = screen.getByLabelText('Email');
			expect(label).toHaveAttribute('for', 'email-input');
			expect(input).toHaveAttribute('id', 'email-input');
		});

		it('should generate unique id when not provided', () => {
			render(
				<>
					<Input label="First" />
					<Input label="Second" />
				</>,
			);
			const firstId = screen.getByLabelText('First').getAttribute('id');
			const secondId = screen.getByLabelText('Second').getAttribute('id');

			expect(firstId).not.toBe(secondId);
		});
	});

	describe('Error Handling', () => {
		it('should display error message', () => {
			render(<Input error="This field is required" />);
			expect(screen.getByText('This field is required')).toBeInTheDocument();
			expect(screen.getByText('This field is required')).toHaveClass(
				'input__error',
			);
		});

		it('should add error class to input', () => {
			render(<Input error="Error message" />);
			expect(screen.getByRole('textbox')).toHaveClass('input--error');
		});

		it('should not display error when not provided', () => {
			const { container } = render(<Input />);
			expect(container.querySelector('.input__error')).not.toBeInTheDocument();
		});

		it('should prioritize error over helper text', () => {
			render(<Input error="Error message" helperText="Helper text" />);
			expect(screen.getByText('Error message')).toBeInTheDocument();
			expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
		});
	});

	describe('Helper Text', () => {
		it('should display helper text', () => {
			render(<Input helperText="Enter your email address" />);
			expect(screen.getByText('Enter your email address')).toBeInTheDocument();
			expect(screen.getByText('Enter your email address')).toHaveClass(
				'input__helper',
			);
		});

		it('should not display helper text when not provided', () => {
			const { container } = render(<Input />);
			expect(container.querySelector('.input__helper')).not.toBeInTheDocument();
		});

		it('should not display helper text when error is present', () => {
			render(<Input error="Error" helperText="Helper" />);
			expect(screen.queryByText('Helper')).not.toBeInTheDocument();
		});
	});

	describe('Sizes', () => {
		it('should render small size', () => {
			render(<Input inputSize="small" />);
			expect(screen.getByRole('textbox')).toHaveClass('input--small');
		});

		it('should render medium size (default)', () => {
			render(<Input inputSize="medium" />);
			expect(screen.getByRole('textbox')).toHaveClass('input--medium');
		});

		it('should render large size', () => {
			render(<Input inputSize="large" />);
			expect(screen.getByRole('textbox')).toHaveClass('input--large');
		});

		it('should default to medium size when not specified', () => {
			render(<Input />);
			expect(screen.getByRole('textbox')).toHaveClass('input--medium');
		});
	});

	describe('Full Width', () => {
		it('should render full width input', () => {
			render(<Input fullWidth />);
			expect(screen.getByRole('textbox').closest('.input-wrapper')).toHaveClass(
				'input-wrapper--full-width',
			);
		});

		it('should not be full width by default', () => {
			render(<Input />);
			expect(
				screen.getByRole('textbox').closest('.input-wrapper'),
			).not.toHaveClass('input-wrapper--full-width');
		});
	});

	describe('Prefix and Suffix', () => {
		it('should render with prefix', () => {
			const { container } = render(<Input prefix={<span>$</span>} />);
			const prefix = container.querySelector('.input__prefix');
			expect(prefix).toBeInTheDocument();
			expect(prefix).toHaveTextContent('$');
			expect(screen.getByRole('textbox')).toHaveClass('input--with-prefix');
		});

		it('should render with suffix', () => {
			const { container } = render(<Input suffix={<span>USD</span>} />);
			const suffix = container.querySelector('.input__suffix');
			expect(suffix).toBeInTheDocument();
			expect(suffix).toHaveTextContent('USD');
			expect(screen.getByRole('textbox')).toHaveClass('input--with-suffix');
		});

		it('should render with both prefix and suffix', () => {
			const { container } = render(
				<Input prefix={<span>https://</span>} suffix={<span>.com</span>} />,
			);
			const prefix = container.querySelector('.input__prefix');
			const suffix = container.querySelector('.input__suffix');
			expect(prefix).toBeInTheDocument();
			expect(suffix).toBeInTheDocument();
			const input = screen.getByRole('textbox');
			expect(input).toHaveClass('input--with-prefix', 'input--with-suffix');
		});

		it('should not render prefix/suffix when not provided', () => {
			const { container } = render(<Input />);
			expect(container.querySelector('.input__prefix')).not.toBeInTheDocument();
			expect(container.querySelector('.input__suffix')).not.toBeInTheDocument();
		});
	});

	describe('Input Types', () => {
		it('should support text type', () => {
			render(<Input type="text" />);
			expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
		});

		it('should support email type', () => {
			render(<Input type="email" />);
			expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
		});

		it('should support password type', () => {
			const { container } = render(<Input type="password" />);
			const input = container.querySelector('input[type="password"]');
			expect(input).toBeInTheDocument();
			expect(input).toHaveAttribute('type', 'password');
		});

		it('should support number type', () => {
			render(<Input type="number" />);
			expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
		});
	});

	describe('Disabled State', () => {
		it('should be disabled when disabled prop is true', () => {
			render(<Input disabled />);
			expect(screen.getByRole('textbox')).toBeDisabled();
		});

		it('should not be disabled by default', () => {
			render(<Input />);
			expect(screen.getByRole('textbox')).not.toBeDisabled();
		});
	});

	describe('Value and onChange', () => {
		it('should render with value', () => {
			render(<Input value="test value" onChange={() => {}} />);
			expect(screen.getByRole('textbox')).toHaveValue('test value');
		});

		it('should call onChange when value changes', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			render(<Input onChange={handleChange} />);
			const input = screen.getByRole('textbox');
			await user.type(input, 'hello');
			expect(handleChange).toHaveBeenCalled();
			expect(handleChange).toHaveBeenCalledTimes(5); // Once per character
		});

		it('should update value when controlled', async () => {
			const ControlledInput = () => {
				const [value, setValue] = useState('');
				return (
					<Input value={value} onChange={(e) => setValue(e.target.value)} />
				);
			};
			const user = userEvent.setup();
			render(<ControlledInput />);
			const input = screen.getByRole('textbox');
			await user.type(input, 'test');
			expect(input).toHaveValue('test');
		});
	});

	describe('HTML Attributes', () => {
		it('should forward HTML input attributes', () => {
			render(<Input name="username" required aria-describedby="help-text" />);
			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('name', 'username');
			expect(input).toHaveAttribute('required');
			expect(input).toHaveAttribute('aria-describedby', 'help-text');
		});

		it('should support data attributes', () => {
			render(<Input data-testid="custom-input" />);
			expect(screen.getByTestId('custom-input')).toBeInTheDocument();
		});

		it('should support maxLength attribute', () => {
			render(<Input maxLength={10} />);
			expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
		});
	});

	describe('Combination of Props', () => {
		it('should render with all props combined', () => {
			const { container } = render(
				<Input
					label="Email"
					error="Invalid email"
					inputSize="large"
					fullWidth
					prefix={<span>@</span>}
					suffix={<span>.com</span>}
					className="custom"
				/>,
			);
			expect(screen.getByLabelText('Email')).toBeInTheDocument();
			expect(screen.getByText('Invalid email')).toBeInTheDocument();
			const input = screen.getByRole('textbox');
			expect(input).toHaveClass(
				'input--large',
				'input--error',
				'input--with-prefix',
				'input--with-suffix',
			);
			expect(input.closest('.input-wrapper')).toHaveClass(
				'input-wrapper--full-width',
				'custom',
			);
			expect(container.querySelector('.input__prefix')).toBeInTheDocument();
			expect(container.querySelector('.input__suffix')).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should be accessible with label', () => {
			render(<Input label="Username" />);
			const input = screen.getByRole('textbox', { name: /username/i });
			expect(input).toBeInTheDocument();
		});

		it('should have proper ARIA attributes with error', () => {
			render(<Input label="Email" error="Invalid email" />);
			const input = screen.getByRole('textbox');
			expect(input).toHaveClass('input--error');
		});
	});
});
