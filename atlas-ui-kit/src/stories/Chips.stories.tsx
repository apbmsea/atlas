import type { Meta, StoryObj } from '@storybook/react';
import Chip from '../components/Chips/Chip';

const meta: Meta<typeof Chip> = {
  title: 'UI/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'], },
    disabled: { control: 'boolean', },
    children: { control: 'text', },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const DefaultSmall: Story = {
  args: {
    children: 'Голова',
    size: 'small',
    onRemove: () => alert('Удалено'),
  },
};

export const HoverSmall: Story = {
  args: {
    children: 'Голова',
    size: 'small',
    onRemove: () => alert('Удалено'),
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const DisabledSmall: Story = {
  args: {
    children: 'Голова',
    size: 'small',
    disabled: true,
  },
};

export const DefaultMedium: Story = {
  args: {
    children: 'Голова',
    size: 'medium',
    onRemove: () => alert('Удалено'),
  },
};

export const HoverMedium: Story = {
  args: {
    children: 'Голова',
    size: 'medium',
    onRemove: () => alert('Удалено'),
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const DisabledMedium: Story = {
  args: {
    children: 'Голова',
    size: 'medium',
    disabled: true,
  },
};

export const DefaultLarge: Story = {
  args: {
    children: 'Голова',
    size: 'large',
    onRemove: () => alert('Удалено'),
  },
};

export const HoverLarge: Story = {
  args: {
    children: 'Голова',
    size: 'large',
    onRemove: () => alert('Удалено'),
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const DisabledLarge: Story = {
  args: {
    children: 'Голова',
    size: 'large',
    disabled: true,
  },
};