import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Checkbox from '../components/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
	title: 'UI/Checkbox',
	component: Checkbox,
	argTypes: {
		disabled: { control: 'boolean' },
		variant: { control: 'radio', options: ['primary', 'secondary'] }
	}
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

const Template = (args: any) => {
	const [checked, setChecked] = React.useState(args.checked);
	return (
		<Checkbox
			{...args}
			checked={checked}
			onChange={e => setChecked(e.target.checked)}
		>
			{args.children}
		</Checkbox>
	);
};

export const Default: Story = {
	render: Template,
	args: {
		checked: false,
		disabled: false,
		variant: 'primary',
		children: 'Default'
	}
};

export const Checked: Story = {
	render: Template,
	args: {
		checked: true,
		disabled: false,
		variant: 'primary',
		children: 'Checked'
	}
};

export const Disabled: Story = {
	render: Template,
	args: {
		checked: false,
		disabled: true,
		variant: 'primary',
		children: 'Disabled'
	}
};

export const DisabledChecked: Story = {
	render: Template,
	args: {
		checked: true,
		disabled: true,
		variant: 'primary',
		children: 'Disabled + Checked'
	}
};

export const Secondary: Story = {
	render: Template,
	args: {
		checked: false,
		disabled: false,
		variant: 'secondary',
		children: 'Secondary Variant'
	}
};

export const SecondaryChecked: Story = {
	render: Template,
	args: {
		checked: true,
		disabled: false,
		variant: 'secondary',
		children: 'Secondary Checked'
	}
};

export const SecondaryDisabled: Story = {
	render: Template,
	args: {
		checked: false,
		disabled: true,
		variant: 'secondary',
		children: 'Secondary Disabled'
	}
};

export const SecondaryDisabledChecked: Story = {
	render: Template,
	args: {
		checked: true,
		disabled: true,
		variant: 'secondary',
		children: 'Secondary Disabled + Checked'
	}
};
