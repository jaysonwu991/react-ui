import { useMemo } from 'react';
import type { CSSProperties, FC, KeyboardEvent, MouseEvent } from 'react';
import './Icon.scss';

export interface IconProps {
	/**
	 * Icon name (without the 'icon-' prefix)
	 * @example 'circle-checked', 'home', 'user'
	 */
	name: string;

	/**
	 * Rendering type: 'font' for CSS-based icons, 'svg' for SVG symbols
	 * @default 'font'
	 */
	type?: 'font' | 'svg';

	/**
	 * Icon size in pixels (without 'px' suffix)
	 * @example 16, 24, 32
	 */
	size?: number | string;

	/**
	 * Icon color (hex code without '#' prefix, or any valid CSS color)
	 * @example 'f00', 'ff0000', 'red', '#ff0000'
	 */
	color?: string;

	/**
	 * Rotation angle in degrees
	 * @example 90, 180, 270, 45
	 */
	rotate?: number;

	/**
	 * Flip the icon horizontally
	 */
	flipHorizontal?: boolean;

	/**
	 * Flip the icon vertically
	 */
	flipVertical?: boolean;

	/**
	 * Enable continuous spinning animation
	 */
	spin?: boolean;

	/**
	 * Enable pulse animation (scale up and down)
	 */
	pulse?: boolean;

	/**
	 * Disable the icon (reduces opacity and prevents interactions)
	 */
	disabled?: boolean;

	/**
	 * Show loading state with spinner
	 */
	loading?: boolean;

	/**
	 * Badge content to display as overlay (number or text)
	 */
	badge?: string | number;

	/**
	 * Badge color
	 * @default '#ef4444'
	 */
	badgeColor?: string;

	/**
	 * Native tooltip text
	 */
	title?: string;

	/**
	 * Additional CSS class name
	 */
	className?: string;

	/**
	 * Inline styles
	 */
	style?: CSSProperties;

	/**
	 * ARIA label for accessibility
	 */
	ariaLabel?: string;

	/**
	 * Click handler
	 */
	onClick?: (event: MouseEvent<HTMLSpanElement>) => void;

	/**
	 * Keyboard handler
	 */
	onKeyDown?: (event: KeyboardEvent<HTMLSpanElement>) => void;
}

/**
 * Icon component for rendering icon fonts from Iconfont.cn or Icomoon.io
 *
 * Supports two rendering modes:
 * - `font`: Uses CSS class-based icon fonts (requires iconfont.css)
 * - `svg`: Uses SVG symbol references (requires iconfont.js)
 *
 * @example
 * ```tsx
 * // Font mode (default)
 * <Icon name="home" size={24} color="primary" />
 *
 * // SVG mode
 * <Icon type="svg" name="user" size={20} color="#ff0000" />
 *
 * // With transformations
 * <Icon name="arrow-right" rotate={90} flipHorizontal />
 *
 * // With animations
 * <Icon name="spinner" spin />
 *
 * // With badge
 * <Icon name="bell" badge={5} />
 *
 * // Loading state
 * <Icon name="save" loading />
 * ```
 */
const Icon: FC<IconProps> = ({
	name,
	type = 'font',
	size,
	color,
	rotate,
	flipHorizontal,
	flipVertical,
	spin,
	pulse,
	disabled,
	loading,
	badge,
	badgeColor = '#ef4444',
	title,
	className = '',
	style = {},
	ariaLabel,
	onClick,
	onKeyDown,
}) => {
	// Normalize color to include # prefix if it looks like a hex color
	const normalizedColor = useMemo(() => {
		if (!color) return undefined;

		// If it's already a valid CSS color (contains # or is a named color)
		if (
			color.startsWith('#') ||
			color.startsWith('rgb') ||
			/^[a-z]+$/i.test(color)
		) {
			return color;
		}

		// Assume it's a hex code without #
		return `#${color}`;
	}, [color]);

	// Normalize size to include px suffix
	const normalizedSize = useMemo(() => {
		if (!size) return undefined;
		return typeof size === 'number' ? `${size}px` : size;
	}, [size]);

	// Build transform string for rotations and flips
	const transform = useMemo(() => {
		const transforms: string[] = [];

		if (rotate) {
			transforms.push(`rotate(${rotate}deg)`);
		}

		if (flipHorizontal) {
			transforms.push('scaleX(-1)');
		}

		if (flipVertical) {
			transforms.push('scaleY(-1)');
		}

		return transforms.length > 0 ? transforms.join(' ') : undefined;
	}, [rotate, flipHorizontal, flipVertical]);

	const iconStyle: CSSProperties = {
		...style,
		...(normalizedColor && { color: normalizedColor }),
		...(normalizedSize && { fontSize: normalizedSize }),
		...(transform && { transform }),
		...(disabled && { opacity: 0.5, pointerEvents: 'none' }),
	};

	const classes = [
		'icon-wrapper',
		spin && 'icon-spin',
		pulse && 'icon-pulse',
		loading && 'icon-loading',
		disabled && 'icon-disabled',
		badge !== undefined && 'icon-with-badge',
		className,
	]
		.filter(Boolean)
		.join(' ');

	// Handle keyboard interactions
	const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
		if (disabled || loading) return;

		if (onKeyDown) {
			onKeyDown(event);
		}

		// Trigger onClick on Enter or Space
		if ((event.key === 'Enter' || event.key === ' ') && onClick) {
			event.preventDefault();
			onClick(event as unknown as MouseEvent<HTMLSpanElement>);
		}
	};

	// Handle click with disabled check
	const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
		if (disabled || loading) return;
		onClick?.(event);
	};

	// Determine the actual icon to render (loading overrides name)
	const iconName = loading ? 'loading' : name;

	const iconContent =
		type === 'svg' ? (
			<svg className="icon-svg" style={iconStyle} aria-hidden={!ariaLabel}>
				<use xlinkHref={`#icon-${iconName}`} />
			</svg>
		) : (
			<span
				className={`iconfont icon-${iconName}`}
				style={iconStyle}
				aria-hidden={!ariaLabel}
			/>
		);

	return (
		<span
			className={classes}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role={onClick ? 'button' : undefined}
			tabIndex={onClick && !disabled && !loading ? 0 : undefined}
			aria-label={ariaLabel || name}
			aria-disabled={disabled || loading}
			title={title}
		>
			{iconContent}
			{badge !== undefined && (
				<span
					className="icon-badge"
					style={{ backgroundColor: badgeColor }}
					aria-label={`${badge} notifications`}
				>
					{badge}
				</span>
			)}
		</span>
	);
};

export default Icon;
