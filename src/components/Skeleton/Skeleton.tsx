import type { CSSProperties, HTMLAttributes, FC } from 'react';
import { cx } from '../../utils/cx';
import './Skeleton.scss';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
	/** Shape variant */
	variant?: SkeletonVariant;
	/** Width, numbers are treated as pixels */
	width?: string | number;
	/** Height, numbers are treated as pixels */
	height?: string | number;
	/** Animation style */
	animation?: SkeletonAnimation;
	/** Custom CSS class */
	className?: string;
}

const toCssSize = (size?: string | number): string | undefined => {
	if (size === undefined) return undefined;
	return typeof size === 'number' ? `${size}px` : size;
};

const Skeleton: FC<SkeletonProps> = ({
	variant = 'text',
	width,
	height,
	animation = 'pulse',
	className,
	style,
	...props
}) => {
	const mergedStyle: CSSProperties = {
		width: toCssSize(width),
		height: toCssSize(height),
		...style,
	};

	const classes = cx(
		'skeleton',
		`skeleton--${variant}`,
		`skeleton--${animation}`,
		className,
	);

	return (
		<div
			className={classes}
			style={mergedStyle}
			aria-hidden="true"
			{...props}
		/>
	);
};

export default Skeleton;
