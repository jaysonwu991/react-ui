import { useState } from 'react';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Avatar.scss';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	/** Image source URL */
	src?: string;
	/** Alternative text used for the accessible label */
	alt?: string;
	/** Person name used for the label and initials fallback */
	name?: string;
	/** Size of the avatar */
	size?: AvatarSize;
	/** Shape of the avatar */
	shape?: AvatarShape;
	/** Presence status indicator */
	status?: AvatarStatus;
	/** Custom fallback content, overrides the generated initials */
	fallback?: ReactNode;
	/** Custom CSS class */
	className?: string;
}

/**
 * Derives up to two uppercase initials from a person's name.
 *
 * @example
 * getInitials('Jane Doe'); // 'JD'
 * getInitials('Prince'); // 'P'
 */
export const getInitials = (name?: string): string => {
	if (!name) {
		return '';
	}
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) {
		return '';
	}
	return parts
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join('');
};

const Avatar: FC<AvatarProps> = ({
	src,
	alt,
	name,
	size = 'medium',
	shape = 'circle',
	status,
	fallback,
	className,
	...props
}) => {
	const [imageError, setImageError] = useState(false);
	const showImage = Boolean(src) && !imageError;
	const label = alt ?? name ?? 'Avatar';
	const initials = getInitials(name);

	return (
		<span
			{...props}
			role="img"
			aria-label={label}
			className={cx('avatar', `avatar--${size}`, `avatar--${shape}`, className)}
		>
			{showImage ? (
				<img
					className="avatar__image"
					src={src}
					alt=""
					onError={() => setImageError(true)}
				/>
			) : (
				<span className="avatar__fallback" aria-hidden="true">
					{fallback ?? initials}
				</span>
			)}
			{status && (
				<span
					className={cx('avatar__status', `avatar__status--${status}`)}
					aria-hidden="true"
				/>
			)}
		</span>
	);
};

export default Avatar;
