import InputList from '@/shared/components/input/index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/InputList/Pwd',
  component: InputList.Password,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputList.Password>;

export default meta;

type Story = StoryObj<typeof meta>;

export const dateInput: Story = {
  args: {
    name: '비밀번호',
    placeholder: '비밀번호를 입력하시오',
  },
};
