import type { Meta, StoryObj } from '@storybook/react';
import Switch from '../components/Switch/Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    children: 'Переключатель',
  },
};

export const Checked: Story = {
  args: {
    children: 'Переключатель',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Переключатель',
    disabled: true,
    checked: false,
  },
};