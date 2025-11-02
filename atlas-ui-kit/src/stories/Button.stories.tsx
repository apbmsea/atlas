import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button/Button';
import CartIcon from './../icons/CartIcon';
import ArrowDownIcon from './../icons/ArrowDownIcon';

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		children: { control: 'text' },
		leftIcon: { control: false },
		rightIcon: { control: false },
		loading: { control: 'boolean' },
		variant: { control: 'text' }
	}
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		variant: 'primary',
		children: 'Войти'
	}
};

export const DefaultSecondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Войти'
	}
};

export const DefaultLoading: Story = {
	args: {
		variant: 'secondary',
		children: 'Войти',
		loading: true
	}
};

export const Buy: Story = {
	args: {
		variant: 'primary',
		children: 'Купить',
		leftIcon: <CartIcon size={20} />,
		rightIcon: <ArrowDownIcon size={20} />
	}
};

export const ButSecondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Купить',
		leftIcon: <CartIcon size={20} />,
		rightIcon: <ArrowDownIcon size={20} />
	}
};

export const BuyLoading: Story = {
	args: {
		children: 'Купить',
		leftIcon: <CartIcon size={20} />,
		rightIcon: <ArrowDownIcon size={20} />,
		loading: true
	}
};
