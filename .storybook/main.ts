import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-docs'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {},
	viteFinal(config) {
		// Storybook's own iframe and docs-renderer bundles are larger than
		// Vite's 500 kB default. The library's own chunks are tiny, so raise the
		// limit instead of splitting Storybook internals.
		config.build = config.build ?? {};
		config.build.chunkSizeWarningLimit = 1200;
		return config;
	},
};

export default config;
