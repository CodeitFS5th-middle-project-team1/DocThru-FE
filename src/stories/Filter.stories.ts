import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropDowns from '@/shared/components/dropdown';

const meta = {
  title: 'Components/DropDown',
  component: DropDowns.filter,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof DropDowns.filter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const filter: Story = {
  args: {
    textSize: 'sm',
    handleChange: action('click'),
    options: [],
  },
  argTypes: {
    textSize: {
      options: ['sm', 'lg'],
      control: { type: 'select' },
    },
  },
};
