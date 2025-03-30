import InputList from '@/shared/components/input/index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/InputList/Date',
  component: InputList.Date,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputList.Date>;

export default meta;

type Story = StoryObj<typeof meta>;

export const dateInput: Story = {
  args: {
    name: 'birthDate',
    placeholder: '생일을 선택하세요',
  },
};
