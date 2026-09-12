import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	parameters: {
		docs: {
			description: {
				component:
					'Icon component for rendering icon fonts from Iconfont.cn or Icomoon.io. Supports both CSS class-based fonts and SVG symbols, with powerful features like animations, transformations, badges, and more.',
			},
		},
	},
	argTypes: {
		name: {
			control: 'text',
			description: 'Icon name (without the icon- prefix)',
		},
		type: {
			control: 'radio',
			options: ['font', 'svg'],
			description: 'Rendering type',
		},
		size: {
			control: { type: 'number', min: 8, max: 128, step: 4 },
			description: 'Icon size in pixels',
		},
		color: {
			control: 'color',
			description: 'Icon color (hex, rgb, or named color)',
		},
		rotate: {
			control: { type: 'number', min: 0, max: 360, step: 45 },
			description: 'Rotation angle in degrees',
		},
		flipHorizontal: {
			control: 'boolean',
			description: 'Flip icon horizontally',
		},
		flipVertical: {
			control: 'boolean',
			description: 'Flip icon vertically',
		},
		spin: {
			control: 'boolean',
			description: 'Enable spinning animation',
		},
		pulse: {
			control: 'boolean',
			description: 'Enable pulse animation',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the icon',
		},
		loading: {
			control: 'boolean',
			description: 'Show loading state',
		},
		badge: {
			control: 'text',
			description: 'Badge content (number or text)',
		},
		badgeColor: {
			control: 'color',
			description: 'Badge background color',
		},
		title: {
			control: 'text',
			description: 'Native tooltip text',
		},
		ariaLabel: {
			control: 'text',
			description: 'ARIA label for accessibility',
		},
		onClick: {
			action: 'clicked',
			description: 'Click handler',
		},
	},
	args: {
		onClick: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Basic Examples
export const Default: Story = {
	args: {
		name: 'home',
		size: 24,
	},
};

export const WithColor: Story = {
	args: {
		name: 'heart', // heart icon
		size: 32,
		color: '#ff0000',
	},
};

export const SVGType: Story = {
	args: {
		name: 'user',
		type: 'svg',
		size: 28,
		color: '#3b82f6',
	},
};

export const Clickable: Story = {
	args: {
		name: 'settings',
		size: 24,
		color: '#6b7280',
		ariaLabel: 'Settings',
	},
};

// Size Variants
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
			<Icon name="star" size={16} color="#fbbf24" title="star icon" />
			<Icon name="star" size={24} color="#fbbf24" title="star icon" />
			<Icon name="star" size={32} color="#fbbf24" title="star icon" />
			<Icon name="star" size={48} color="#fbbf24" title="star icon" />
			<Icon name="star" size={64} color="#fbbf24" title="star icon" />
		</div>
	),
};

// Color Variants
export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
			<Icon name="star" size={32} color="#ef4444" />
			<Icon name="star" size={32} color="#f59e0b" />
			<Icon name="star" size={32} color="#10b981" />
			<Icon name="star" size={32} color="#3b82f6" />
			<Icon name="star" size={32} color="#8b5cf6" />
			<Icon name="star" size={32} color="#ec4899" />
		</div>
	),
};

// Common Icons - All icons from iconfont.json
export const CommonIcons: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(6, 1fr)',
				gap: '24px',
			}}
		>
			{[
				'upload',
				'user',
				'star',
				'trash',
				'close',
				'home',
				'bell',
				'calendar',
				'heart', // heart
				'camera',
				'download',
				'edit',
				'mail',
				'arrow-left',
				'settings',
				'arrow-right',
				'search',
				'check',
			].map((icon) => (
				<div key={icon} style={{ textAlign: 'center' }}>
					<Icon name={icon} size={32} color="#1f2937" />
					<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
						{icon === 'heart' ? 'heart' : icon}
					</div>
				</div>
			))}
		</div>
	),
};

// Font vs SVG Comparison
export const FontVsSVG: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '48px' }}>
			<div>
				<h4 style={{ marginTop: 0 }}>Font Mode</h4>
				<div style={{ display: 'flex', gap: '16px' }}>
					<Icon name="home" type="font" size={32} color="#3b82f6" />
					<Icon name="user" type="font" size={32} color="#10b981" />
					<Icon name="heart" type="font" size={32} color="#ef4444" />
				</div>
			</div>
			<div>
				<h4 style={{ marginTop: 0 }}>SVG Mode</h4>
				<div style={{ display: 'flex', gap: '16px' }}>
					<Icon name="home" type="svg" size={32} color="#3b82f6" />
					<Icon name="user" type="svg" size={32} color="#10b981" />
					<Icon name="heart" type="svg" size={32} color="#ef4444" />
				</div>
			</div>
		</div>
	),
};

// Interactive Icons
export const InteractiveIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px' }}>
			<Icon
				name="heart"
				size={32}
				color="#ef4444"
				onClick={() => alert('Heart clicked!')}
				ariaLabel="Like"
				title="Like"
			/>
			<Icon
				name="star"
				size={32}
				color="#fbbf24"
				onClick={() => alert('Star clicked!')}
				ariaLabel="Favorite"
				title="Favorite"
			/>
			<Icon
				name="upload"
				size={32}
				color="#3b82f6"
				onClick={() => alert('Upload clicked!')}
				ariaLabel="Upload"
				title="Upload"
			/>
			<Icon
				name="download"
				size={32}
				color="#8b5cf6"
				onClick={() => alert('Download clicked!')}
				ariaLabel="Download"
				title="Download"
			/>
		</div>
	),
};

// In Button Context
export const InButtons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '12px' }}>
			<button
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '8px 16px',
					backgroundColor: '#3b82f6',
					color: 'white',
					border: 'none',
					borderRadius: '6px',
					cursor: 'pointer',
				}}
			>
				<Icon name="upload" size={16} color="#ffffff" />
				<span>Upload</span>
			</button>

			<button
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '8px 16px',
					backgroundColor: '#ef4444',
					color: 'white',
					border: 'none',
					borderRadius: '6px',
					cursor: 'pointer',
				}}
			>
				<Icon name="trash" size={16} color="#ffffff" />
				<span>Delete</span>
			</button>

			<button
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '8px 16px',
					backgroundColor: '#10b981',
					color: 'white',
					border: 'none',
					borderRadius: '6px',
					cursor: 'pointer',
				}}
			>
				<Icon name="check" size={16} color="#ffffff" />
				<span>Confirm</span>
			</button>
		</div>
	),
};

// Icon States
export const IconStates: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '24px',
			}}
		>
			<div>
				<h4 style={{ marginTop: 0, fontSize: '14px' }}>Default</h4>
				<Icon name="bell" size={32} color="#6b7280" />
			</div>
			<div>
				<h4 style={{ marginTop: 0, fontSize: '14px' }}>Active/Primary</h4>
				<Icon name="bell" size={32} color="#3b82f6" />
			</div>
			<div>
				<h4 style={{ marginTop: 0, fontSize: '14px' }}>Disabled</h4>
				<Icon name="bell" size={32} color="#d1d5db" />
			</div>
		</div>
	),
};

// All Props Combined
export const AllProps: Story = {
	args: {
		name: 'settings',
		type: 'font',
		size: 40,
		color: '#8b5cf6',
		ariaLabel: 'Application Settings',
		className: 'custom-icon',
	},
};

// Rotation Examples
export const Rotations: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#3b82f6" />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					0°
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#3b82f6" rotate={45} />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					45°
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#3b82f6" rotate={90} />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					90°
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#3b82f6" rotate={180} />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					180°
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#3b82f6" rotate={270} />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					270°
				</div>
			</div>
		</div>
	),
};

// Flip Examples
export const Flips: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#10b981" />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Default
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#10b981" flipHorizontal />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Horizontal
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="arrow-right" size={32} color="#10b981" flipVertical />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Vertical
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon
					name="arrow-right"
					size={32}
					color="#10b981"
					flipHorizontal
					flipVertical
				/>
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Both
				</div>
			</div>
		</div>
	),
};

// Animation Examples
export const Animations: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
			<div style={{ textAlign: 'center' }}>
				<Icon name="settings" size={32} color="#3b82f6" spin />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Spin
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="heart" size={32} color="#ef4444" pulse />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Pulse
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="star" size={32} color="#fbbf24" spin />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Custom Spin
				</div>
			</div>
		</div>
	),
};

// Loading State
export const LoadingState: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
			<button
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '8px 16px',
					backgroundColor: '#3b82f6',
					color: 'white',
					border: 'none',
					borderRadius: '6px',
				}}
			>
				<Icon name="check" size={16} color="#ffffff" />
				<span>Save</span>
			</button>

			<button
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '8px 16px',
					backgroundColor: '#3b82f6',
					color: 'white',
					border: 'none',
					borderRadius: '6px',
					opacity: 0.7,
					cursor: 'wait',
				}}
			>
				<Icon name="upload" size={16} color="#ffffff" loading />
				<span>Saving...</span>
			</button>
		</div>
	),
};

// Badge Examples
export const Badges: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
			<div style={{ textAlign: 'center' }}>
				<Icon name="bell" size={32} color="#6b7280" badge={5} />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Notifications
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon name="mail" size={32} color="#6b7280" badge={99} />
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Messages
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon
					name="download"
					size={32}
					color="#6b7280"
					badge={3}
					badgeColor="#10b981"
				/>
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Downloads
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Icon
					name="user"
					size={32}
					color="#6b7280"
					badge="NEW"
					badgeColor="#8b5cf6"
				/>
				<div style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>
					Profile
				</div>
			</div>
		</div>
	),
};

// Disabled State
export const DisabledState: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
			<Icon
				name="heart"
				size={32}
				color="#ef4444"
				onClick={() => alert('Liked!')}
				ariaLabel="Like"
			/>
			<Icon
				name="heart"
				size={32}
				color="#ef4444"
				onClick={() => alert('This should not fire')}
				ariaLabel="Like"
				disabled
			/>
			<Icon
				name="trash"
				size={32}
				color="#6b7280"
				onClick={() => alert('Delete')}
				ariaLabel="Delete"
			/>
			<Icon
				name="trash"
				size={32}
				color="#6b7280"
				onClick={() => alert('This should not fire')}
				ariaLabel="Delete"
				disabled
			/>
		</div>
	),
};

// With Tooltips
export const WithTooltips: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
			<Icon name="home" size={32} color="#6b7280" title="Go to home page" />
			<Icon name="search" size={32} color="#6b7280" title="Search" />
			<Icon name="settings" size={32} color="#6b7280" title="Open settings" />
			<Icon name="bell" size={32} color="#6b7280" title="Get notifications" />
		</div>
	),
};

// Complex Example
export const ComplexExample: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
				<Icon
					name="bell"
					size={28}
					color="#3b82f6"
					badge={12}
					onClick={() => alert('View notifications')}
					title="Notifications"
					ariaLabel="12 unread notifications"
				/>
				<Icon
					name="mail"
					size={28}
					color="#3b82f6"
					badge={5}
					badgeColor="#10b981"
					onClick={() => alert('View messages')}
					title="Messages"
				/>
				<Icon
					name="user"
					size={28}
					color="#3b82f6"
					onClick={() => alert('View profile')}
					title="Profile"
				/>
			</div>

			<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
				<Icon
					name="settings"
					size={24}
					color="#6b7280"
					spin
					title="Syncing..."
				/>
				<Icon
					name="download"
					size={24}
					color="#10b981"
					rotate={180}
					title="Upload file"
				/>
				<Icon
					name="arrow-left"
					size={24}
					color="#6b7280"
					flipHorizontal
					title="Go forward"
				/>
			</div>
		</div>
	),
};
