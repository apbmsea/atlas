import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CheckboxGroup, { CheckboxGroupProps } from '../components/CheckboxGroup/CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'UI/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' }
  }
};
export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true },
  { label: 'Option 4', value: '4' }
];

export const Interactive: Story = {
  render: (args: CheckboxGroupProps) => {
    const [selected, setSelected] = React.useState<string[]>(['1']);
    return (
      <CheckboxGroup
        {...args}
        options={options}
        value={selected}
        onChange={setSelected}
      />
    );
  },
  args: {
    variant: 'primary',
    disabled: false
  }
};
