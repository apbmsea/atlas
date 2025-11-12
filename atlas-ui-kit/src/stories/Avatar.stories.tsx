import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '../components/Avatar/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'text',
    },
    image: {
      control: 'text',
    },
    isActive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const SmallIcon: Story = {
  args: {
    size: 'small',
    image: undefined,
    isActive: true,
  },
};

export const SmallImage: Story = {
  args: {
    size: 'small',
    image: 'https://s00.yaplakal.com/pics/pics_original/3/0/0/19991003.jpg',
    isActive: true,
  },
};

export const MediumIcon: Story = {
  args: {
    size: 'medium',
    image: undefined,
    isActive: true,
  },
};

export const MediumImage: Story = {
  args: {
    size: 'medium',
    image: 'https://s00.yaplakal.com/pics/pics_original/3/0/0/19991003.jpg',
    isActive: false,
  },
};

export const LargeIcon: Story = {
  args: {
    size: 'large',
    image: undefined,
    isActive: true,
  },
};

export const LargeImage: Story = {
  args: {
    size: 'large',
    image: 'https://s00.yaplakal.com/pics/pics_original/3/0/0/19991003.jpg ',
    isActive: true,
  },
};