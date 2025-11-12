import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle from './../components/ThemeChanger/ThemeChanger';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};