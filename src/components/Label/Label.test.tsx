import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Label from './Label';

describe('Label Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Label>Username</Label>);
			const label = screen.getByText('Username');
			expect(label).toBeInTheDocument();
			expect(label.tagName).toBe('LABEL');
			expect(label).toHaveClass('label', 'label--medium');
		});

		it('should render children content', () => {
			render(<Label>Email address</Label>);
			expect(screen.getByText('Email address')).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			render(<Label className="custom-class">Name</Label>);
			expect(screen.getByText('Name')).toHaveClass('custom-class');
		});

		it('should forward HTML label attributes', () => {
			render(
				<Label htmlFor="field-id" data-testid="label">
					Name
				</Label>,
			);
			expect(screen.getByTestId('label')).toHaveAttribute('for', 'field-id');
		});
	});

	describe('Sizes', () => {
		it('should render small size', () => {
			render(<Label size="small">Small</Label>);
			expect(screen.getByText('Small')).toHaveClass('label--small');
		});

		it('should render medium size (default)', () => {
			render(<Label>Medium</Label>);
			expect(screen.getByText('Medium')).toHaveClass('label--medium');
		});

		it('should render large size', () => {
			render(<Label size="large">Large</Label>);
			expect(screen.getByText('Large')).toHaveClass('label--large');
		});
	});

	describe('Required', () => {
		it('should render required indicator and modifier', () => {
			render(<Label required>Required</Label>);
			const label = screen.getByText('Required');
			expect(label).toHaveClass('label--required');
			expect(label.querySelector('.label__required')).toBeInTheDocument();
		});

		it('should hide the required indicator from assistive technology', () => {
			render(<Label required>Required</Label>);
			expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
		});

		it('should not render the required indicator by default', () => {
			render(<Label>Optional</Label>);
			expect(screen.queryByText('*')).not.toBeInTheDocument();
		});
	});

	describe('Disabled', () => {
		it('should render the disabled state', () => {
			render(<Label disabled>Disabled</Label>);
			expect(screen.getByText('Disabled')).toHaveClass('label--disabled');
		});

		it('should not be disabled by default', () => {
			render(<Label>Enabled</Label>);
			expect(screen.getByText('Enabled')).not.toHaveClass('label--disabled');
		});
	});

	describe('Accessibility', () => {
		it('should associate with an input via htmlFor', () => {
			render(
				<>
					<Label htmlFor="username">Username</Label>
					<input id="username" />
				</>,
			);
			expect(screen.getByLabelText('Username')).toBeInTheDocument();
		});
	});

	describe('Combination of Props', () => {
		it('should combine size, required, disabled and className', () => {
			render(
				<Label size="large" required disabled className="custom">
					Complex
				</Label>,
			);
			expect(screen.getByText('Complex')).toHaveClass(
				'label',
				'label--large',
				'label--required',
				'label--disabled',
				'custom',
			);
		});
	});
});
