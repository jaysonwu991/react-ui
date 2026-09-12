import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Radio, { RadioGroup } from './Radio';

const renderGroup = (props: Record<string, unknown> = {}) =>
	render(
		<RadioGroup name="fruit" label="Fruit" {...props}>
			<Radio value="apple" label="Apple" />
			<Radio value="banana" label="Banana" />
			<Radio value="cherry" label="Cherry" disabled />
		</RadioGroup>,
	);

describe('RadioGroup Component', () => {
	describe('Rendering', () => {
		it('should render a radiogroup with a legend', () => {
			renderGroup();
			const group = screen.getByRole('radiogroup', { name: 'Fruit' });
			expect(group).toBeInTheDocument();
			expect(group.tagName).toBe('FIELDSET');
		});

		it('should render every radio with an accessible name', () => {
			renderGroup();
			expect(screen.getAllByRole('radio')).toHaveLength(3);
			expect(screen.getByRole('radio', { name: 'Apple' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Banana' })).toBeInTheDocument();
		});

		it('should apply a custom className to the fieldset', () => {
			renderGroup({ className: 'custom-group' });
			expect(screen.getByRole('radiogroup')).toHaveClass('custom-group');
		});

		it('should apply a custom className to a radio', () => {
			render(
				<RadioGroup name="x" label="X">
					<Radio value="a" label="A" className="custom-radio" />
				</RadioGroup>,
			);
			expect(screen.getByRole('radio').closest('.radio')).toHaveClass(
				'custom-radio',
			);
		});
	});

	describe('Orientation', () => {
		it('should default to vertical orientation', () => {
			renderGroup();
			const group = screen.getByRole('radiogroup');
			expect(group).toHaveClass('radio-group--vertical');
			expect(group).toHaveAttribute('aria-orientation', 'vertical');
		});

		it('should support horizontal orientation', () => {
			renderGroup({ orientation: 'horizontal' });
			const group = screen.getByRole('radiogroup');
			expect(group).toHaveClass('radio-group--horizontal');
			expect(group).toHaveAttribute('aria-orientation', 'horizontal');
		});
	});

	describe('Value handling', () => {
		it('should share the name across radios', () => {
			renderGroup();
			screen.getAllByRole('radio').forEach((radio) => {
				expect(radio).toHaveAttribute('name', 'fruit');
			});
		});

		it('should select a radio on click and call onValueChange', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			renderGroup({ onValueChange: handleChange });
			await user.click(screen.getByRole('radio', { name: 'Banana' }));
			expect(handleChange).toHaveBeenCalledWith('banana');
			expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
		});

		it('should honour defaultValue when uncontrolled', () => {
			renderGroup({ defaultValue: 'banana' });
			expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
		});

		it('should honour a controlled value', () => {
			renderGroup({ value: 'cherry', onValueChange: vi.fn() });
			expect(screen.getByRole('radio', { name: 'Cherry' })).toBeChecked();
			expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked();
		});

		it('should not update internal state when controlled', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			renderGroup({ value: 'apple', onValueChange: handleChange });
			await user.click(screen.getByRole('radio', { name: 'Banana' }));
			expect(handleChange).toHaveBeenCalledWith('banana');
			expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
		});
	});

	describe('Disabled state', () => {
		it('should disable every radio when the group is disabled', () => {
			renderGroup({ disabled: true });
			screen.getAllByRole('radio').forEach((radio) => {
				expect(radio).toBeDisabled();
			});
		});

		it('should disable an individual radio', () => {
			renderGroup();
			expect(screen.getByRole('radio', { name: 'Cherry' })).toBeDisabled();
			expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeDisabled();
		});

		it('should not call onValueChange when a disabled radio is clicked', async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();
			renderGroup({ onValueChange: handleChange });
			await user.click(screen.getByRole('radio', { name: 'Cherry' }));
			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe('Error state', () => {
		it('should render an error message with aria attributes', () => {
			renderGroup({ error: 'Pick a fruit' });
			const group = screen.getByRole('radiogroup');
			expect(group).toHaveClass('radio-group--error');
			expect(group).toHaveAttribute('aria-invalid', 'true');
			expect(group).toHaveAccessibleDescription('Pick a fruit');
		});

		it('should not set aria-invalid without an error', () => {
			renderGroup();
			expect(screen.getByRole('radiogroup')).not.toHaveAttribute(
				'aria-invalid',
			);
		});
	});
});
