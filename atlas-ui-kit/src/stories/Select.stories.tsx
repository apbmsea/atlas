import type { Meta, StoryObj } from '@storybook/react';
import Select from './../components/Select/Select';
import ZoomIcon from './../icons/ZoomIcon';

const meta: Meta<typeof Select> = {
	title: 'UI/Select',
	component: Select,
	tags: ['autodocs'],
	argTypes: {
		leftIcon: { control: false },
		options: { control: 'select' },
		defaultValue: { control: 'text' },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' }
	}
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Selector: Story = {
	args: {
		leftIcon: <ZoomIcon width={20}/>,
		options: [
			{ value: 'default', label: 'default' },
			{ value: 'hover', label: 'hover' },
			{ value: 'focus', label: 'focus' },
			{ value: 'disabled', label: 'disabled' }
		],
		placeholder: 'Выберите состояние'
	}
};

export const SelectorDisabled: Story = {
	args: {
		leftIcon: <ZoomIcon width={20}/>,
		options: [
			{ value: 'default', label: 'default' },
			{ value: 'hover', label: 'hover' },
			{ value: 'focus', label: 'focus' },
			{ value: 'disabled', label: 'disabled' }
		],
		placeholder: 'Выберите состояние',
		disabled: true
	}
};

export const SelectorWithoutPlaceholder: Story = {
	args: {
		leftIcon: <ZoomIcon width={20}/>,
		options: [
			{ value: 'default', label: 'default' },
			{ value: 'hover', label: 'hover' },
			{ value: 'focus', label: 'focus' },
			{ value: 'disabled', label: 'disabled' }
		],
		placeholder: '',
		disabled: false
	}
};

export const SelectorWithDefaultValue: Story = {
	args: {
		leftIcon: <ZoomIcon width={20}/>,
		options: [
			{ value: 'default', label: 'default' },
			{ value: 'hover', label: 'hover' },
			{ value: 'focus', label: 'focus' },
			{ value: 'disabled', label: 'disabled' }
		],
		placeholder: '',
		defaultValue: "hover",
		disabled: false
	}
};