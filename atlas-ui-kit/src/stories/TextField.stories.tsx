import type { Meta, StoryObj } from '@storybook/react';
import TextField from './../components/TextField/TextField';
import SearchIcon from './../icons/SearchIcon';
import Button from '../components/Button/Button';
import CartIcon from './../icons/CartIcon';
import ArrowDownIcon from './../icons/ArrowDownIcon';

const meta: Meta<typeof TextField> = {
	title: 'UI/TextField',
	component: TextField,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		leftIcon: { control: false },
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		status: { control: 'text' },
		errorCaption: { control: 'text' }
	}
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Input: Story = {
	args: {
		label: 'Введите почту',
		placeholder: 'example@gmail.com'
	}
};

export const InputError: Story = {
	args: {
		label: 'Введите почту',
		placeholder: 'example@gmail.com',
		status: 'error',
		errorCaption: 'мессадж ошибки'
	}
};

export const InputSuccess: Story = {
	args: {
		label: 'Введите почту',
		placeholder: 'example@gmail.com',
		status: 'success'
	}
};

export const Search: Story = {
	args: {
		leftIcon: <SearchIcon width={20} />,
		placeholder: 'Поиск',
		disabled: false,
		loading: false
	}
};

export const SearchWithButton: Story = {
	args: {
		leftIcon: <SearchIcon width={20} />,
		placeholder: 'Поиск',
		disabled: false,
		loading: false,
		buttonRight: <Button>Найти</Button>
	}
};

export const SearchWithBuy: Story = {
	args: {
		leftIcon: <SearchIcon width={20} />,
		placeholder: 'Поиск',
		disabled: false,
		loading: false,
		buttonRight: (
			<Button
				leftIcon={<CartIcon width={20} />}
				rightIcon={<ArrowDownIcon width={20} />}
			>
				Купить
			</Button>
		)
	}
};
