import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import RadioGroup, { RadioGroupProps } from '../components/RadioGroup/RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  argTypes: {
    disabled: { control: 'boolean' }
  }
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true }
];

export const Interactive: Story = {
  render: (args: RadioGroupProps) => {
    const [selected, setSelected] = React.useState<string>('1');
    return (
      <RadioGroup
        {...args}
        options={options}
        value={selected}
        onChange={setSelected}
      />
    );
  },
  args: {
    disabled: false
  }
};

export const Disabled: Story = {
  render: (args: RadioGroupProps) => {
    const [selected, setSelected] = React.useState<string>('1');
    return (
      <RadioGroup
        {...args}
        options={options}
        value={selected}
        onChange={setSelected}
        disabled
      />
    );
  },
  args: {}
};
