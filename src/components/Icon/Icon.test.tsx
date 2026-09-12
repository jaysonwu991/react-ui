import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Icon from './Icon';

describe('Icon Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			const { container } = render(<Icon name="home" />);
			const icon = container.querySelector('.iconfont.icon-home');
			expect(icon).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			const { container } = render(
				<Icon name="home" className="custom-class" />,
			);
			const icon = container.querySelector('.icon-wrapper');
			expect(icon).toHaveClass('custom-class');
		});

		it('should render with inline styles', () => {
			const { container } = render(
				<Icon name="home" style={{ margin: '10px' }} />,
			);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ margin: '10px' });
		});
	});

	describe('Icon Name', () => {
		it('should apply correct icon class based on name', () => {
			const { container } = render(<Icon name="user" />);
			const icon = container.querySelector('.icon-user');
			expect(icon).toBeInTheDocument();
		});

		it('should handle icon names with hyphens', () => {
			const { container } = render(<Icon name="circle-checked" />);
			const icon = container.querySelector('.icon-circle-checked');
			expect(icon).toBeInTheDocument();
		});

		it('should handle icon names with underscores', () => {
			const { container } = render(<Icon name="user_profile" />);
			const icon = container.querySelector('.icon-user_profile');
			expect(icon).toBeInTheDocument();
		});
	});

	describe('Rendering Types', () => {
		it('should render font type by default', () => {
			const { container } = render(<Icon name="home" />);
			const icon = container.querySelector('.iconfont.icon-home');
			expect(icon).toBeInTheDocument();
			expect(container.querySelector('svg')).not.toBeInTheDocument();
		});

		it('should render font type explicitly', () => {
			const { container } = render(<Icon name="home" type="font" />);
			const icon = container.querySelector('.iconfont.icon-home');
			expect(icon).toBeInTheDocument();
		});

		it('should render SVG type', () => {
			const { container } = render(<Icon name="home" type="svg" />);
			const svg = container.querySelector('svg');
			const use = container.querySelector('use');
			expect(svg).toBeInTheDocument();
			expect(use).toBeInTheDocument();
		});

		it('should not have iconfont class in SVG mode', () => {
			const { container } = render(<Icon name="home" type="svg" />);
			expect(container.querySelector('.iconfont')).not.toBeInTheDocument();
		});
	});

	describe('Size Prop', () => {
		it('should apply size as number', () => {
			const { container } = render(<Icon name="home" size={24} />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ fontSize: '24px' });
		});

		it('should apply size as string with px', () => {
			const { container } = render(<Icon name="home" size="32px" />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ fontSize: '32px' });
		});

		it('should apply size as string with em', () => {
			const { container } = render(<Icon name="home" size="2em" />);
			const icon = container.querySelector<HTMLElement>('.iconfont');
			expect(icon?.style.fontSize).toBe('2em');
		});

		it('should apply size in SVG mode', () => {
			const { container } = render(<Icon name="home" type="svg" size={20} />);
			const svg = container.querySelector('svg');
			expect(svg).toHaveStyle({ fontSize: '20px' });
		});
	});

	describe('Color Prop', () => {
		it('should apply color with # prefix', () => {
			const { container } = render(<Icon name="home" color="#ff0000" />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ color: '#ff0000' });
		});

		it('should add # prefix to hex color without it', () => {
			const { container } = render(<Icon name="home" color="ff0000" />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ color: '#ff0000' });
		});

		it('should handle short hex colors', () => {
			const { container } = render(<Icon name="home" color="f00" />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ color: '#f00' });
		});

		it('should handle rgb colors', () => {
			const { container } = render(<Icon name="home" color="rgb(255, 0, 0)" />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ color: 'rgb(255, 0, 0)' });
		});

		it('should apply color in SVG mode', () => {
			const { container } = render(
				<Icon name="home" type="svg" color="#00ff00" />,
			);
			const svg = container.querySelector('svg');
			expect(svg).toHaveStyle({ color: '#00ff00' });
		});
	});

	describe('Click Handler', () => {
		it('should call onClick when clicked', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(<Icon name="home" onClick={handleClick} />);
			const wrapper = container.querySelector('.icon-wrapper');
			await user.click(wrapper!);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('should have button role when onClick is provided', () => {
			const handleClick = vi.fn();
			const { container } = render(<Icon name="home" onClick={handleClick} />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveAttribute('role', 'button');
		});

		it('should have tabindex when onClick is provided', () => {
			const handleClick = vi.fn();
			const { container } = render(<Icon name="home" onClick={handleClick} />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveAttribute('tabindex', '0');
		});

		it('should not have button role when onClick is not provided', () => {
			const { container } = render(<Icon name="home" />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).not.toHaveAttribute('role');
		});

		it('should work with SVG type', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(
				<Icon name="home" type="svg" onClick={handleClick} />,
			);
			const wrapper = container.querySelector('.icon-wrapper');
			await user.click(wrapper!);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Accessibility', () => {
		it('should have aria-label from ariaLabel prop', () => {
			const { container } = render(<Icon name="home" ariaLabel="Home Icon" />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveAttribute('aria-label', 'Home Icon');
		});

		it('should use icon name as aria-label when not provided', () => {
			const { container } = render(<Icon name="home" />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveAttribute('aria-label', 'home');
		});

		it('should have aria-hidden on SVG when no ariaLabel', () => {
			const { container } = render(<Icon name="home" type="svg" />);
			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('aria-hidden', 'true');
		});

		it('should not have aria-hidden on SVG when ariaLabel provided', () => {
			const { container } = render(
				<Icon name="home" type="svg" ariaLabel="Home" />,
			);
			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('aria-hidden', 'false');
		});
	});

	describe('Combined Props', () => {
		it('should handle all props together', () => {
			const handleClick = vi.fn();
			const { container } = render(
				<Icon
					name="user"
					type="font"
					size={24}
					color="#3b82f6"
					className="custom"
					style={{ margin: '8px' }}
					ariaLabel="User Profile"
					onClick={handleClick}
				/>,
			);

			const wrapper = container.querySelector('.icon-wrapper');
			const icon = container.querySelector('.iconfont');
			expect(wrapper).toHaveClass('icon-wrapper', 'custom');
			expect(icon).toHaveClass('iconfont', 'icon-user');
			expect(icon).toHaveStyle({
				fontSize: '24px',
				color: '#3b82f6',
				margin: '8px',
			});
			expect(wrapper).toHaveAttribute('aria-label', 'User Profile');
			expect(wrapper).toHaveAttribute('role', 'button');
		});
	});

	describe('Rotation', () => {
		it('should apply rotate transform', () => {
			const { container } = render(<Icon name="arrow-right" rotate={90} />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ transform: 'rotate(90deg)' });
		});

		it('should apply custom rotation angles', () => {
			const { container } = render(<Icon name="arrow-right" rotate={45} />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ transform: 'rotate(45deg)' });
		});
	});

	describe('Flips', () => {
		it('should flip horizontally', () => {
			const { container } = render(<Icon name="arrow-right" flipHorizontal />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ transform: 'scaleX(-1)' });
		});

		it('should flip vertically', () => {
			const { container } = render(<Icon name="arrow-right" flipVertical />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ transform: 'scaleY(-1)' });
		});

		it('should flip both horizontally and vertically', () => {
			const { container } = render(
				<Icon name="arrow-right" flipHorizontal flipVertical />,
			);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ transform: 'scaleX(-1) scaleY(-1)' });
		});

		it('should combine rotation and flip', () => {
			const { container } = render(
				<Icon name="arrow-right" rotate={90} flipHorizontal />,
			);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ transform: 'rotate(90deg) scaleX(-1)' });
		});
	});

	describe('Animations', () => {
		it('should apply spin class', () => {
			const { container } = render(<Icon name="loading" spin />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveClass('icon-spin');
		});

		it('should apply pulse class', () => {
			const { container } = render(<Icon name="heart" pulse />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveClass('icon-pulse');
		});

		it('should not apply animation classes when false', () => {
			const { container } = render(<Icon name="home" />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).not.toHaveClass('icon-spin');
			expect(wrapper).not.toHaveClass('icon-pulse');
		});
	});

	describe('Disabled State', () => {
		it('should apply disabled class', () => {
			const { container } = render(<Icon name="home" disabled />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveClass('icon-disabled');
		});

		it('should apply disabled styles', () => {
			const { container } = render(<Icon name="home" disabled />);
			const icon = container.querySelector('.iconfont');
			expect(icon).toHaveStyle({ opacity: 0.5, pointerEvents: 'none' });
		});

		it('should not call onClick when disabled', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(
				<Icon name="home" onClick={handleClick} disabled />,
			);
			const wrapper = container.querySelector('.icon-wrapper');
			await user.click(wrapper!);
			expect(handleClick).not.toHaveBeenCalled();
		});

		it('should have aria-disabled attribute', () => {
			const { container } = render(<Icon name="home" disabled />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveAttribute('aria-disabled', 'true');
		});

		it('should not have tabindex when disabled', () => {
			const handleClick = vi.fn();
			const { container } = render(
				<Icon name="home" onClick={handleClick} disabled />,
			);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).not.toHaveAttribute('tabindex');
		});
	});

	describe('Loading State', () => {
		it('should apply loading class', () => {
			const { container } = render(<Icon name="save" loading />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveClass('icon-loading');
		});

		it('should override icon name with loading', () => {
			const { container } = render(<Icon name="save" loading />);
			const icon = container.querySelector('.icon-loading');
			expect(icon).toBeInTheDocument();
		});

		it('should not call onClick when loading', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(
				<Icon name="save" onClick={handleClick} loading />,
			);
			const wrapper = container.querySelector('.icon-wrapper');
			await user.click(wrapper!);
			expect(handleClick).not.toHaveBeenCalled();
		});

		it('should have aria-disabled when loading', () => {
			const { container } = render(<Icon name="save" loading />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveAttribute('aria-disabled', 'true');
		});

		it('should not have tabindex when loading', () => {
			const handleClick = vi.fn();
			const { container } = render(
				<Icon name="save" onClick={handleClick} loading />,
			);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).not.toHaveAttribute('tabindex');
		});
	});

	describe('Badge', () => {
		it('should render badge with number', () => {
			const { container } = render(<Icon name="bell" badge={5} />);
			const badge = container.querySelector('.icon-badge');
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveTextContent('5');
		});

		it('should render badge with string', () => {
			const { container } = render(<Icon name="bell" badge="NEW" />);
			const badge = container.querySelector('.icon-badge');
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveTextContent('NEW');
		});

		it('should apply badge-with-badge class to wrapper', () => {
			const { container } = render(<Icon name="bell" badge={5} />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveClass('icon-with-badge');
		});

		it('should apply custom badge color', () => {
			const { container } = render(
				<Icon name="bell" badge={5} badgeColor="#10b981" />,
			);
			const badge = container.querySelector('.icon-badge');
			expect(badge).toHaveStyle({ backgroundColor: '#10b981' });
		});

		it('should apply default badge color', () => {
			const { container } = render(<Icon name="bell" badge={5} />);
			const badge = container.querySelector('.icon-badge');
			expect(badge).toHaveStyle({ backgroundColor: '#ef4444' });
		});

		it('should not render badge when not provided', () => {
			const { container } = render(<Icon name="bell" />);
			const badge = container.querySelector('.icon-badge');
			expect(badge).not.toBeInTheDocument();
		});
	});

	describe('Title/Tooltip', () => {
		it('should apply title attribute', () => {
			const { container } = render(<Icon name="home" title="Go home" />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).toHaveAttribute('title', 'Go home');
		});

		it('should not have title when not provided', () => {
			const { container } = render(<Icon name="home" />);
			const wrapper = container.querySelector('.icon-wrapper');
			expect(wrapper).not.toHaveAttribute('title');
		});
	});

	describe('Keyboard Navigation', () => {
		it('should call onClick on Enter key', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(<Icon name="home" onClick={handleClick} />);
			const wrapper = container.querySelector<HTMLElement>('.icon-wrapper');
			wrapper!.focus();
			await user.keyboard('{Enter}');
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('should call onClick on Space key', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(<Icon name="home" onClick={handleClick} />);
			const wrapper = container.querySelector<HTMLElement>('.icon-wrapper');
			wrapper!.focus();
			await user.keyboard(' ');
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('should call custom onKeyDown handler', async () => {
			const handleKeyDown = vi.fn();
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(
				<Icon name="home" onClick={handleClick} onKeyDown={handleKeyDown} />,
			);
			const wrapper = container.querySelector<HTMLElement>('.icon-wrapper');
			wrapper!.focus();
			await user.keyboard('a');
			expect(handleKeyDown).toHaveBeenCalledTimes(1);
		});

		it('should not trigger onClick on other keys', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			const { container } = render(<Icon name="home" onClick={handleClick} />);
			const wrapper = container.querySelector<HTMLElement>('.icon-wrapper');
			wrapper!.focus();
			await user.keyboard('a');
			expect(handleClick).not.toHaveBeenCalled();
		});

		it('should not trigger keyboard events when disabled', async () => {
			const handleClick = vi.fn();
			const handleKeyDown = vi.fn();
			const user = userEvent.setup();
			const { container } = render(
				<Icon
					name="home"
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					disabled
				/>,
			);
			const wrapper = container.querySelector<HTMLElement>('.icon-wrapper');
			wrapper!.focus();
			await user.keyboard('{Enter}');
			expect(handleClick).not.toHaveBeenCalled();
			expect(handleKeyDown).not.toHaveBeenCalled();
		});
	});
});
