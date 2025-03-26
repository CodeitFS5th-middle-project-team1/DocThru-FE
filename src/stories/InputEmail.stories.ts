import InputList from '@/shared/components/input/index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/InputList/Email',
  component: InputList.Email,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputList.Email>;

export default meta;

type Story = StoryObj<typeof meta>;

export const emailInput: Story = {
  args: {
    name: 'email',
    placeholder: '이메일을 입력하세요',
  },
};
