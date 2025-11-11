import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Radio from '../components/Radio/Radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  argTypes: {
    disabled: { control: 'boolean' },
    children: { control: 'text' }
  }
};
export default meta;

type Story = StoryObj<typeof Radio>;

const Template = (args: any) => {
  const [checked, setChecked] = React.useState(args.checked || false);
  return (
    <Radio
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: { checked: false, disabled: false, children: 'Default' }
};

export const Checked: Story = {
  render: Template,
  args: { checked: true, disabled: false, children: 'Checked' }
};

export const Disabled: Story = {
  render: Template,
  args: { checked: false, disabled: true, children: 'Disabled' }
};

export const DisabledChecked: Story = {
  render: Template,
  args: { checked: true, disabled: true, children: 'Disabled + Checked' }
};
