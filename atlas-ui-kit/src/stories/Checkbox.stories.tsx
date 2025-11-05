import type { Meta, StoryObj } from '@storybook/react';
import InputCheckbox from '../components/Checkbox/Checkbox';

const meta: Meta<typeof InputCheckbox> = {
  title: 'UI/InputCheckbox',
  component: InputCheckbox,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['checkbox', 'radio'] },
    children: { control: 'text' },
    checked: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof InputCheckbox>;

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    children: 'Череп',
    checked: true
  }
};

export const DisabledCheckbox: Story = {
  args: {
    type: 'checkbox',
    children: 'Череп',
    disabled: true,
  }
};

export const DefaultRadio: Story = {
  args: {
    type: 'radio',
    children: 'Череп',
    checked: false,
  }
};

export const DisabledRadio: Story = {
  args: {
    type: 'radio',
    children: 'Череп',
    disabled: true,
  }
};