import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import {
	Alert,
	Avatar,
	Badge,
	Button,
	Calendar,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Checkbox,
	Icon,
	Input,
	Modal,
	Progress,
	Spinner,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Tooltip,
} from '../components';

const meta: Meta = {
	title: 'Introduction',
	parameters: {
		layout: 'fullscreen',
		options: { showPanel: false },
	},
};

export default meta;
type Story = StoryObj;

const page: CSSProperties = {
	maxWidth: 960,
	margin: '0 auto',
	padding: '48px 24px 72px',
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
	color: '#111827',
};

const hero: CSSProperties = {
	padding: '40px 32px',
	borderRadius: 20,
	background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
	color: '#ffffff',
};

const grid: CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
	gap: 16,
	marginTop: 32,
};

const card: CSSProperties = {
	padding: 20,
	border: '1px solid #e5e7eb',
	borderRadius: 14,
	background: '#ffffff',
};

const sectionTitle: CSSProperties = {
	margin: '48px 0 16px',
	fontSize: 22,
	fontWeight: 700,
};

const row: CSSProperties = {
	display: 'flex',
	gap: 12,
	alignItems: 'center',
	flexWrap: 'wrap',
};

const features = [
	{
		icon: 'home',
		title: '22 components',
		text: 'Forms, overlays, feedback, navigation and more.',
	},
	{
		icon: 'check',
		title: 'Accessible',
		text: 'ARIA, keyboard navigation, focus management.',
	},
	{
		icon: 'settings',
		title: 'Themed',
		text: 'Sass + BEM with runtime CSS variables.',
	},
	{
		icon: 'download',
		title: 'Typed & tiny',
		text: 'TypeScript, tree-shakeable, zero runtime deps.',
	},
] as const;

function Showcase() {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [date, setDate] = useState<Date | null>(null);
	const [notifications, setNotifications] = useState(true);
	const [progress, setProgress] = useState(40);

	return (
		<div style={page}>
			<header style={hero}>
				<p style={{ margin: 0, opacity: 0.85, fontWeight: 600 }}>
					@jayson991/react-ui
				</p>
				<h1 style={{ margin: '8px 0 12px', fontSize: 40, lineHeight: 1.1 }}>
					React components that look good everywhere
				</h1>
				<p style={{ margin: 0, maxWidth: 560, fontSize: 17, opacity: 0.9 }}>
					A modern, responsive and accessible component library built with
					TypeScript and Sass.
				</p>
			</header>

			<div style={grid}>
				{features.map((feature) => (
					<div key={feature.title} style={card}>
						<Icon name={feature.icon} size={22} color="#3b82f6" />
						<h3 style={{ margin: '12px 0 4px', fontSize: 16 }}>
							{feature.title}
						</h3>
						<p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
							{feature.text}
						</p>
					</div>
				))}
			</div>

			<h2 style={sectionTitle}>Live playground</h2>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
					gap: 20,
				}}
			>
				<Card>
					<CardHeader>
						<CardTitle>Form controls</CardTitle>
						<CardDescription>
							Inputs, toggles and progress in one place.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div style={{ display: 'grid', gap: 20 }}>
							<Input
								label="Your name"
								placeholder="Enter your name"
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
							<div style={{ ...row, justifyContent: 'space-between' }}>
								<Switch
									checked={notifications}
									onCheckedChange={setNotifications}
									label="Notifications"
								/>
								<Badge variant={notifications ? 'success' : 'secondary'} dot>
									{notifications ? 'On' : 'Off'}
								</Badge>
							</div>
							<Checkbox label="Remember me" defaultChecked />
							<Progress value={progress} showLabel label="Upload" />
							<div style={row}>
								<Button
									size="small"
									variant="secondary"
									onClick={() =>
										setProgress((value) => Math.max(0, value - 20))
									}
								>
									-
								</Button>
								<Button
									size="small"
									onClick={() =>
										setProgress((value) => Math.min(100, value + 20))
									}
								>
									+
								</Button>
								<Spinner size="small" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Feedback &amp; navigation</CardTitle>
						<CardDescription>
							Alerts, avatars, tabs and tooltips.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div style={{ display: 'grid', gap: 20 }}>
							<Alert variant="success" title="Saved">
								Your changes were stored successfully.
							</Alert>
							<div style={row}>
								<Avatar name="Jane Doe" status="online" />
								<Avatar name="Sam Lee" shape="square" size="large" />
								<Tooltip content="Open the docs">
									<Badge variant="outline">Hover me</Badge>
								</Tooltip>
							</div>
							<Tabs defaultValue="preview">
								<TabsList>
									<TabsTrigger value="preview">Preview</TabsTrigger>
									<TabsTrigger value="code">Code</TabsTrigger>
								</TabsList>
								<TabsContent value="preview">
									<p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
										Live preview of the component.
									</p>
								</TabsContent>
								<TabsContent value="code">
									<p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
										Copy-ready source code.
									</p>
								</TabsContent>
							</Tabs>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Calendar</CardTitle>
						<CardDescription>Single, multiple and range modes.</CardDescription>
					</CardHeader>
					<CardContent>
						<Calendar
							mode="single"
							value={date}
							onChange={(next) => setDate(next as Date)}
						/>
						<div style={{ ...row, marginTop: 16 }}>
							<Button onClick={() => setShowModal(true)}>
								<Icon name="user" size={16} />
								Open modal
							</Button>
							<Button variant="ghost" loading>
								Loading
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<Modal
				title="Welcome"
				showModal={showModal}
				onHideModal={() => setShowModal(false)}
			>
				<p style={{ margin: 0 }}>
					Hello, {name || 'Guest'}!
					{date && ` Selected date: ${date.toLocaleDateString()}.`}
				</p>
			</Modal>

			<p style={{ marginTop: 48, color: '#6b7280', fontSize: 14 }}>
				Explore each component from the sidebar, or read the README for the full
				API.
			</p>
		</div>
	);
}

export const Overview: Story = {
	render: () => <Showcase />,
};
