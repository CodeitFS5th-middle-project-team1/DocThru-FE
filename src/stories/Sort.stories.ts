import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropDowns from '@/shared/components/dropdown';

const meta = {
  title: 'Components/DropDown',
  component: DropDowns.sort,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof DropDowns.sort>;

export default meta;

type Story = StoryObj<typeof meta>;

export const sort: Story = {
  args: {
    textSize: 'sm',
    variant: 'sort',
    handleChange: action('click'),
    options: [
      { value: '1', name: '승인 대기' },
      { value: '2', name: '신청 승인' },
      { value: '3', name: '신청 거절' },
      { value: '4', name: '신청 시간 빠른순' },
    ],
    value: '',
    defaultValue: '',
    placeholder: '',
  },
  argTypes: {
    textSize: {
      options: ['sm', 'lg'],
      control: { type: 'select' },
    },
  },
};
