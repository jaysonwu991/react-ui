import type { Preview } from '@storybook/react';
import '../src/assets/icons/iconfont.css';
import '../src/assets/icons/iconfont.js';
import '../src/components/Modal/Modal.scss';
import '../src/components/Button/Button.scss';
import '../src/components/Input/Input.scss';
import '../src/components/Icon/Icon.scss';

const preview: Preview = {
	parameters: {
		layout: 'centered',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: '#ffffff',
				},
				{
					name: 'dark',
					value: '#333333',
				},
			],
		},
	},
	tags: ['autodocs'],
};

export default preview;
