import type { HTMLAttributes, ReactNode, FC } from 'react';
import { cx } from '../../utils/cx';
import './Card.scss';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	/** Card content */
	children: ReactNode;
	/** Visual style variant */
	variant?: CardVariant;
	/** Internal padding */
	padding?: CardPadding;
	/** Whether the card shows interactive hover/focus affordances */
	interactive?: boolean;
	/** Custom CSS class */
	className?: string;
}

const Card: FC<CardProps> = ({
	children,
	variant = 'elevated',
	padding = 'medium',
	interactive = false,
	className,
	...props
}) => {
	const classes = cx(
		'card',
		`card--${variant}`,
		`card--${padding}`,
		interactive && 'card--interactive',
		className,
	);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
};

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
	/** Header content */
	children: ReactNode;
	/** Custom CSS class */
	className?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({
	children,
	className,
	...props
}) => (
	<div className={cx('card__header', className)} {...props}>
		{children}
	</div>
);

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	/** Title content */
	children: ReactNode;
	/** Custom CSS class */
	className?: string;
}

export const CardTitle: FC<CardTitleProps> = ({
	children,
	className,
	...props
}) => (
	<h3 className={cx('card__title', className)} {...props}>
		{children}
	</h3>
);

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
	/** Description content */
	children: ReactNode;
	/** Custom CSS class */
	className?: string;
}

export const CardDescription: FC<CardDescriptionProps> = ({
	children,
	className,
	...props
}) => (
	<p className={cx('card__description', className)} {...props}>
		{children}
	</p>
);

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	/** Content */
	children: ReactNode;
	/** Custom CSS class */
	className?: string;
}

export const CardContent: FC<CardContentProps> = ({
	children,
	className,
	...props
}) => (
	<div className={cx('card__content', className)} {...props}>
		{children}
	</div>
);

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
	/** Footer content */
	children: ReactNode;
	/** Custom CSS class */
	className?: string;
}

export const CardFooter: FC<CardFooterProps> = ({
	children,
	className,
	...props
}) => (
	<div className={cx('card__footer', className)} {...props}>
		{children}
	</div>
);

export default Card;
