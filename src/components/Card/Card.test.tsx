import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Card, {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from './Card';

describe('Card Component', () => {
	describe('Rendering', () => {
		it('should render with default props', () => {
			render(<Card data-testid="card">Content</Card>);
			const card = screen.getByTestId('card');
			expect(card).toBeInTheDocument();
			expect(card).toHaveClass('card', 'card--elevated', 'card--medium');
		});

		it('should render children content', () => {
			render(<Card>Hello Card</Card>);
			expect(screen.getByText('Hello Card')).toBeInTheDocument();
		});

		it('should render with custom className', () => {
			render(
				<Card className="custom-class" data-testid="card">
					Card
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('custom-class');
		});

		it('should forward HTML attributes', () => {
			render(
				<Card aria-label="Summary" data-testid="card">
					Card
				</Card>,
			);
			const card = screen.getByTestId('card');
			expect(card).toHaveAttribute('aria-label', 'Summary');
		});
	});

	describe('Variants', () => {
		it('should render elevated variant', () => {
			render(
				<Card variant="elevated" data-testid="card">
					Elevated
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--elevated');
		});

		it('should render outlined variant', () => {
			render(
				<Card variant="outlined" data-testid="card">
					Outlined
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--outlined');
		});

		it('should render filled variant', () => {
			render(
				<Card variant="filled" data-testid="card">
					Filled
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--filled');
		});
	});

	describe('Padding', () => {
		it('should render none padding', () => {
			render(
				<Card padding="none" data-testid="card">
					None
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--none');
		});

		it('should render small padding', () => {
			render(
				<Card padding="small" data-testid="card">
					Small
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--small');
		});

		it('should render medium padding (default)', () => {
			render(
				<Card padding="medium" data-testid="card">
					Medium
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--medium');
		});

		it('should render large padding', () => {
			render(
				<Card padding="large" data-testid="card">
					Large
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--large');
		});
	});

	describe('Interactive', () => {
		it('should add interactive class when interactive', () => {
			render(
				<Card interactive data-testid="card">
					Interactive
				</Card>,
			);
			expect(screen.getByTestId('card')).toHaveClass('card--interactive');
		});

		it('should not be interactive by default', () => {
			render(<Card data-testid="card">Normal</Card>);
			expect(screen.getByTestId('card')).not.toHaveClass('card--interactive');
		});

		it('should call onClick when clicked', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();
			render(
				<Card interactive onClick={handleClick} data-testid="card">
					Clickable
				</Card>,
			);
			await user.click(screen.getByTestId('card'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Subcomponents', () => {
		it('should render CardHeader with the correct class', () => {
			render(
				<CardHeader data-testid="header">
					<CardTitle>Title</CardTitle>
				</CardHeader>,
			);
			expect(screen.getByTestId('header')).toHaveClass('card__header');
		});

		it('should render CardTitle as a level 3 heading', () => {
			render(<CardTitle>Heading</CardTitle>);
			const heading = screen.getByRole('heading', {
				name: 'Heading',
				level: 3,
			});
			expect(heading).toHaveClass('card__title');
		});

		it('should render CardDescription as a paragraph', () => {
			render(<CardDescription>Description text</CardDescription>);
			const description = screen.getByText('Description text');
			expect(description.tagName).toBe('P');
			expect(description).toHaveClass('card__description');
		});

		it('should render CardContent with the correct class', () => {
			render(<CardContent data-testid="content">Body</CardContent>);
			expect(screen.getByTestId('content')).toHaveClass('card__content');
		});

		it('should render CardFooter with the correct class', () => {
			render(<CardFooter data-testid="footer">Footer</CardFooter>);
			expect(screen.getByTestId('footer')).toHaveClass('card__footer');
		});

		it('should support custom className on subcomponents', () => {
			render(
				<CardContent className="custom" data-testid="content">
					Body
				</CardContent>,
			);
			expect(screen.getByTestId('content')).toHaveClass(
				'card__content',
				'custom',
			);
		});
	});

	describe('Composition', () => {
		it('should render a full card composition', () => {
			render(
				<Card variant="outlined" padding="large">
					<CardHeader>
						<CardTitle>Profile</CardTitle>
						<CardDescription>Update your details</CardDescription>
					</CardHeader>
					<CardContent>Main content</CardContent>
					<CardFooter>Footer actions</CardFooter>
				</Card>,
			);

			expect(
				screen.getByRole('heading', { name: 'Profile' }),
			).toBeInTheDocument();
			expect(screen.getByText('Update your details')).toBeInTheDocument();
			expect(screen.getByText('Main content')).toBeInTheDocument();
			expect(screen.getByText('Footer actions')).toBeInTheDocument();
		});
	});
});
