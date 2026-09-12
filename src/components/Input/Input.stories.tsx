import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from './Input';
import Icon from '../Icon/Icon';

const meta = {
	title: 'Input',
	component: Input,
	parameters: {
		docs: {
			description: {
				component:
					'A styled input component with label, error handling, helper text, and prefix/suffix support. Fully responsive with mobile optimization.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label text displayed above input',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'undefined' },
			},
		},
		error: {
			control: 'text',
			description: 'Error message to display',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'undefined' },
			},
		},
		helperText: {
			control: 'text',
			description: 'Helper text below input',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'undefined' },
			},
		},
		inputSize: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size of the input',
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		fullWidth: {
			control: 'boolean',
			description: 'Make input full width',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the input',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text',
		},
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number', 'tel', 'url'],
			description: 'HTML input type',
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for controlled inputs
const InteractiveInput = (props: any) => {
	const [value, setValue] = useState('');
	return (
		<Input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

// Default - Basic Input
export const Default: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'Enter your email',
		type: 'email',
	},
	parameters: {
		docs: {
			description: {
				story: 'A basic input with label and placeholder.',
			},
		},
	},
};

// With Helper Text
export const WithHelperText: Story = {
	args: {
		label: 'Password',
		type: 'password',
		placeholder: 'Enter password',
		helperText: 'Must be at least 8 characters long',
	},
	parameters: {
		docs: {
			description: {
				story: 'Input with helper text to provide additional guidance.',
			},
		},
	},
};

// With Error
export const WithError: Story = {
	args: {
		label: 'Email',
		type: 'email',
		value: 'invalid-email',
		error: 'Please enter a valid email address',
	},
	parameters: {
		docs: {
			description: {
				story: 'Input showing an error state with error message.',
			},
		},
	},
};

// Sizes
export const Sizes: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				width: '100%',
			}}
		>
			<Input label="Small Input" inputSize="small" placeholder="Small size" />
			<Input
				label="Medium Input"
				inputSize="medium"
				placeholder="Medium size (default)"
			/>
			<Input label="Large Input" inputSize="large" placeholder="Large size" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Three size options: `small` (32px), `medium` (40px - default), and `large` (48px). Automatically optimized for mobile devices.',
			},
		},
	},
};

// With Prefix
export const WithPrefix: Story = {
	args: {
		label: 'Search',
		placeholder: 'Search...',
		prefix: <Icon name="search" size={16} color="#6b7280" />,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Input with an icon prefix. Perfect for search boxes, URLs, etc.',
			},
		},
	},
};

// With Suffix
export const WithSuffix: Story = {
	args: {
		label: 'Email',
		type: 'email',
		placeholder: 'your@email.com',
		suffix: <Icon name="mail" size={16} color="#6b7280" />,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Input with an icon suffix. Useful for visual indicators, actions, etc.',
			},
		},
	},
};

// With Both Prefix and Suffix
export const WithPrefixAndSuffix: Story = {
	args: {
		label: 'Website URL',
		placeholder: 'example.com',
		prefix: <Icon name="link" size={16} color="#6b7280" />,
		suffix: <Icon name="check" size={16} color="#10b981" />,
	},
	parameters: {
		docs: {
			description: {
				story: 'Input with both prefix and suffix icons.',
			},
		},
	},
};

// Disabled
export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		value: 'This input is disabled',
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled input with reduced opacity.',
			},
		},
	},
};

// Full Width
export const FullWidth: Story = {
	args: {
		label: 'Full Width Input',
		placeholder: 'This input stretches to fill available width',
		fullWidth: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Input that stretches to fill the available width.',
			},
		},
	},
};

// Interactive Example
export const Interactive: Story = {
	render: () => (
		<InteractiveInput label="Type something" placeholder="Start typing..." />
	),
	parameters: {
		docs: {
			description: {
				story:
					'Interactive input with controlled state. Try typing to see it in action.',
			},
		},
	},
};

// Form Example
export const FormExample: Story = {
	render: function FormExampleStory() {
		const [formData, setFormData] = useState({
			name: '',
			email: '',
			password: '',
		});
		const [errors, setErrors] = useState<Record<string, string>>({});

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			const newErrors: Record<string, string> = {};

			if (!formData.name) newErrors.name = 'Name is required';
			if (!formData.email) newErrors.email = 'Email is required';
			if (formData.password.length < 8)
				newErrors.password = 'Password must be at least 8 characters';

			setErrors(newErrors);

			if (Object.keys(newErrors).length === 0) {
				alert('Form submitted successfully!');
			}
		};

		return (
			<form
				onSubmit={handleSubmit}
				style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
			>
				<Input
					label="Full Name"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					error={errors.name}
					placeholder="John Doe"
					fullWidth
				/>
				<Input
					label="Email"
					type="email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					error={errors.email}
					placeholder="john@example.com"
					fullWidth
				/>
				<Input
					label="Password"
					type="password"
					value={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
					error={errors.password}
					helperText="Must be at least 8 characters"
					placeholder="Enter password"
					fullWidth
				/>
				<button
					type="submit"
					style={{
						padding: '10px',
						backgroundColor: '#3b82f6',
						color: 'white',
						border: 'none',
						borderRadius: '6px',
						cursor: 'pointer',
						marginTop: '8px',
					}}
				>
					Submit
				</button>
			</form>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Complete form example with validation and error handling.',
			},
		},
	},
};

// All Input Types
export const AllTypes: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				width: '100%',
			}}
		>
			<Input label="Text" type="text" placeholder="Text input" />
			<Input label="Email" type="email" placeholder="email@example.com" />
			<Input label="Password" type="password" placeholder="••••••••" />
			<Input label="Number" type="number" placeholder="123" />
			<Input label="Telephone" type="tel" placeholder="+1 (555) 000-0000" />
			<Input label="URL" type="url" placeholder="https://example.com" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Examples of different HTML input types supported.',
			},
		},
	},
};

// With Icon Examples
export const WithIcons: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				width: '100%',
			}}
		>
			<Input
				label="Search"
				placeholder="Search anything..."
				prefix={<Icon name="search" size={16} color="#6b7280" />}
			/>
			<Input
				label="Email Address"
				type="email"
				placeholder="your@email.com"
				prefix={<Icon name="mail" size={16} color="#6b7280" />}
			/>
			<Input
				label="Password"
				type="password"
				placeholder="Enter password"
				prefix={<Icon name="lock" size={16} color="#6b7280" />}
				suffix={<Icon name="eye" size={16} color="#6b7280" />}
			/>
			<Input
				label="Phone Number"
				type="tel"
				placeholder="+1 (555) 000-0000"
				prefix={<Icon name="phone" size={16} color="#6b7280" />}
			/>
			<Input
				label="Location"
				placeholder="Enter your address"
				prefix={<Icon name="location" size={16} color="#6b7280" />}
			/>
			<Input
				label="Calendar"
				type="date"
				prefix={<Icon name="calendar" size={16} color="#6b7280" />}
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Input fields with various icon prefixes and suffixes. Icons provide visual context for different input types.',
			},
		},
	},
};
