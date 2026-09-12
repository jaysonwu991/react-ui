import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Modal from './Modal';

const meta = {
	title: 'Modal',
	component: Modal,
	parameters: {
		docs: {
			description: {
				component:
					'A modern, responsive, and accessible React modal component with TypeScript, Sass, and full mobile support. Features automatic CSS import, size variants, animations, and comprehensive accessibility support.',
			},
		},
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'Title displayed in the modal header',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'undefined' },
			},
		},
		showModal: {
			control: 'boolean',
			description: 'Controls whether the modal is visible',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onHideModal: {
			action: 'onHideModal',
			description: 'Callback function when modal should be hidden',
			table: {
				type: { summary: '() => void' },
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large', 'fullscreen'],
			description: 'Modal size variant',
			table: {
				type: { summary: "'small' | 'medium' | 'large' | 'fullscreen'" },
				defaultValue: { summary: "'medium'" },
			},
		},
		centered: {
			control: 'boolean',
			description: 'Center the modal vertically',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		animated: {
			control: 'boolean',
			description: 'Enable fade animation',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		animationDuration: {
			control: 'number',
			description: 'Animation duration in milliseconds',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '300' },
			},
		},
		closeOnBackdropClick: {
			control: 'boolean',
			description: 'Whether clicking the backdrop closes the modal',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		closeOnEscape: {
			control: 'boolean',
			description: 'Whether pressing Escape closes the modal',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		showCloseButton: {
			control: 'boolean',
			description: 'Whether to show the close button',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		showHeader: {
			control: 'boolean',
			description: 'Whether to show the header',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		scrollable: {
			control: 'boolean',
			description: 'Allow page scrolling when modal is open',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		usePortal: {
			control: 'boolean',
			description: 'Render using React Portal',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		zIndex: {
			control: 'number',
			description: 'Custom z-index for the modal',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1000' },
			},
		},
		className: {
			control: 'text',
			description: 'Custom CSS class for the modal container',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'undefined' },
			},
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for realistic usage
const InteractiveModal = (
	args: Omit<React.ComponentProps<typeof Modal>, 'showModal' | 'onHideModal'>,
) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div style={{ padding: '20px' }}>
			<button
				onClick={() => setShowModal(true)}
				style={{
					padding: '12px 24px',
					fontSize: '16px',
					backgroundColor: '#3b82f6',
					color: 'white',
					border: 'none',
					borderRadius: '6px',
					cursor: 'pointer',
				}}
			>
				Open Modal
			</button>
			<Modal
				{...args}
				showModal={showModal}
				onHideModal={() => setShowModal(false)}
			/>
		</div>
	);
};

// 1. Default - Most common use case
export const Default: Story = {
	args: {
		title: 'Welcome',
		showModal: true,
		onHideModal: fn(),
		children: (
			<div>
				<p>This is a basic modal with default settings.</p>
				<p>Click the backdrop or close button to dismiss.</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'The default modal with standard settings. It includes a title, close button, and supports closing via backdrop click or Escape key.',
			},
		},
	},
};

// 2. Interactive - Real-world usage
export const Interactive: Story = {
	args: {
		title: 'Interactive Modal',
		showModal: false,
		onHideModal: fn(),
	},
	render: () => (
		<InteractiveModal title="Interactive Modal">
			<div>
				<h3 style={{ marginTop: 0 }}>Try It Out</h3>
				<p>Click the button to open, then:</p>
				<ul>
					<li>Press Escape to close</li>
					<li>Click the backdrop to close</li>
					<li>Use the × button to close</li>
				</ul>
			</div>
		</InteractiveModal>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Interactive example showing real-world usage with a button trigger. Demonstrates all three ways to close the modal: Escape key, backdrop click, and close button.',
			},
		},
	},
};

// 3. Sizes - Show all size options
export const Sizes: Story = {
	args: {
		title: 'Sizes',
		showModal: false,
		onHideModal: fn(),
	},
	render: () => (
		<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
			<InteractiveModal size="small" title="Small Modal">
				<p>400px wide - Perfect for confirmations</p>
			</InteractiveModal>
			<InteractiveModal size="medium" title="Medium Modal">
				<p>680px wide - Default size</p>
			</InteractiveModal>
			<InteractiveModal size="large" title="Large Modal">
				<p>900px wide - For more content</p>
			</InteractiveModal>
			<InteractiveModal size="fullscreen" title="Fullscreen">
				<p>Takes entire viewport</p>
			</InteractiveModal>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Four size variants: `small` (400px), `medium` (680px - default), `large` (900px), and `fullscreen` (100% viewport). All sizes automatically adapt to mobile screens.',
			},
		},
	},
};

// 4. With Form - Common use case
export const FormModal: Story = {
	args: {
		title: 'User Registration',
		showModal: false,
		onHideModal: fn(),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Common pattern for form modals with a custom footer containing action buttons. Perfect for user input, registrations, and confirmations.',
			},
		},
	},
	render: () => (
		<InteractiveModal
			title="User Registration"
			footer={
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: '8px',
						padding: '16px',
						borderTop: '1px solid #e5e7eb',
					}}
				>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#e5e7eb',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						Cancel
					</button>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#3b82f6',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						Submit
					</button>
				</div>
			}
		>
			<form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<div>
					<label
						style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}
					>
						Name
					</label>
					<input
						type="text"
						placeholder="Enter your name"
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #d1d5db',
							borderRadius: '4px',
						}}
					/>
				</div>
				<div>
					<label
						style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}
					>
						Email
					</label>
					<input
						type="email"
						placeholder="your@email.com"
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #d1d5db',
							borderRadius: '4px',
						}}
					/>
				</div>
			</form>
		</InteractiveModal>
	),
};

// 5. Custom Styling - Show customization options
export const CustomStyling: Story = {
	args: {
		title: 'Custom Styled Modal',
		showModal: true,
		onHideModal: fn(),
		contentStyle: {
			backgroundColor: '#fef3c7',
			border: '2px solid #f59e0b',
			borderRadius: '12px',
		},
		backdropStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.7)',
		},
		children: (
			<div>
				<p>This modal has custom colors and styling.</p>
				<p style={{ color: '#92400e' }}>
					You can customize both content and backdrop!
				</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Customize the modal appearance using `contentStyle` and `backdropStyle` props. You can override colors, borders, spacing, and more.',
			},
		},
	},
};

// 6. Advanced Options - For power users
export const AdvancedOptions: Story = {
	args: {
		showModal: true,
		onHideModal: fn(),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Advanced configuration options including: vertical centering, custom animation duration, hiding header, and disabling backdrop/escape close.',
			},
		},
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<InteractiveModal
				title="Centered Modal"
				centered
				animated
				animationDuration={500}
			>
				<p>This modal is vertically centered with slow animation.</p>
			</InteractiveModal>

			<InteractiveModal title="No Header" showHeader={false}>
				<p>This modal has no header section.</p>
			</InteractiveModal>

			<InteractiveModal
				title="No Backdrop Close"
				closeOnBackdropClick={false}
				closeOnEscape={false}
			>
				<p>This modal can only be closed with the × button.</p>
			</InteractiveModal>
		</div>
	),
};

// 7. Responsive Preview - Show how it looks on different screens
export const ResponsivePreview: Story = {
	args: {
		title: 'Responsive Modal',
		showModal: true,
		onHideModal: fn(),
		children: (
			<div>
				<h3 style={{ marginTop: 0 }}>Responsive Design</h3>
				<p>This modal automatically adapts to screen size:</p>
				<ul>
					<li>
						<strong>Mobile (≤480px):</strong> 95% width, larger touch targets
					</li>
					<li>
						<strong>Tablet (481-768px):</strong> 85-90% width
					</li>
					<li>
						<strong>Desktop (≥1024px):</strong> Fixed widths
					</li>
				</ul>
				<p style={{ fontSize: '14px', color: '#6b7280' }}>
					Try resizing your browser window or opening DevTools responsive mode!
				</p>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'The modal automatically adjusts to different screen sizes with optimized padding, widths, and touch targets. Test by resizing your browser or using responsive mode in DevTools.',
			},
		},
		viewport: {
			defaultViewport: 'responsive',
		},
	},
};
