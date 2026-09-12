import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar, { getInitials } from './Avatar';

describe('Avatar Component', () => {
	describe('getInitials', () => {
		it('should return two uppercase initials', () => {
			expect(getInitials('Jane Doe')).toBe('JD');
		});

		it('should return a single initial for one word', () => {
			expect(getInitials('Prince')).toBe('P');
		});

		it('should ignore extra words', () => {
			expect(getInitials('Ada Lovelace Byron')).toBe('AL');
		});

		it('should return an empty string when no name is given', () => {
			expect(getInitials()).toBe('');
			expect(getInitials('   ')).toBe('');
		});
	});

	describe('Rendering', () => {
		it('should render initials from the name', () => {
			render(<Avatar name="Jane Doe" />);
			expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
			expect(screen.getByText('JD')).toBeInTheDocument();
		});

		it('should use alt as the accessible label', () => {
			render(<Avatar name="Jane Doe" alt="Profile photo" />);
			expect(
				screen.getByRole('img', { name: 'Profile photo' }),
			).toBeInTheDocument();
		});

		it('should default the accessible label to Avatar', () => {
			render(<Avatar />);
			expect(screen.getByRole('img', { name: 'Avatar' })).toBeInTheDocument();
		});

		it('should apply a custom className', () => {
			render(<Avatar name="Jane Doe" className="custom-avatar" />);
			expect(screen.getByRole('img')).toHaveClass('custom-avatar');
		});
	});

	describe('Image', () => {
		it('should render an image when src is provided', () => {
			const { container } = render(<Avatar src="/jane.png" name="Jane Doe" />);
			const img = container.querySelector('.avatar__image');
			expect(img).toBeInTheDocument();
			expect(img).toHaveAttribute('src', '/jane.png');
			expect(screen.queryByText('JD')).not.toBeInTheDocument();
		});

		it('should fall back to initials when the image fails', () => {
			const { container } = render(
				<Avatar src="/broken.png" name="Jane Doe" />,
			);
			const img = container.querySelector('.avatar__image');
			expect(img).toBeInTheDocument();

			fireEvent.error(img as HTMLImageElement);

			expect(screen.getByText('JD')).toBeInTheDocument();
			expect(container.querySelector('.avatar__image')).not.toBeInTheDocument();
		});
	});

	describe('Fallback', () => {
		it('should render custom fallback content', () => {
			render(<Avatar name="Jane Doe" fallback={<span>Custom</span>} />);
			expect(screen.getByText('Custom')).toBeInTheDocument();
			expect(screen.queryByText('JD')).not.toBeInTheDocument();
		});
	});

	describe('Variants', () => {
		it('should apply the size modifier', () => {
			render(<Avatar name="Jane Doe" size="xlarge" />);
			expect(screen.getByRole('img')).toHaveClass('avatar--xlarge');
		});

		it('should apply the shape modifier', () => {
			render(<Avatar name="Jane Doe" shape="square" />);
			expect(screen.getByRole('img')).toHaveClass('avatar--square');
		});

		it('should render a status dot', () => {
			const { container } = render(<Avatar name="Jane Doe" status="online" />);
			expect(
				container.querySelector('.avatar__status--online'),
			).toBeInTheDocument();
		});

		it('should not render a status dot by default', () => {
			const { container } = render(<Avatar name="Jane Doe" />);
			expect(
				container.querySelector('.avatar__status'),
			).not.toBeInTheDocument();
		});
	});
});
