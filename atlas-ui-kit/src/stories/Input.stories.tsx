import type { Meta, StoryObj } from '@storybook/react';
import InputCheckbox from '../components/Input/Input';

const meta: Meta<typeof InputCheckbox> = {
  title: 'UI/InputCheckbox',
  component: InputCheckbox,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['checkbox', 'radio'] },
    children: { control: 'text' },
    checked: { control: false }
  }
};

export default meta;
type Story = StoryObj<typeof InputCheckbox>;

export const Checkbox: Story = {
  args: {
    variant: 'checkbox',
    children: 'Череп',
    checked: true
  }
};

export const DisabledCheckbox: Story = {
  args: {
    variant: 'checkbox',
    children: 'Череп',
    disabled: true,
  }
};

export const DefaultRadio: Story = {
  args: {
    variant: 'radio',
    children: 'Череп',
    checked: false
  }
};

export const DisabledRadio: Story = {
  args: {
    variant: 'radio',
    children: 'Череп',
    disabled: true,
  }
};