import InputList from '@/shared/components/input/index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/InputList/pwdConfirm',
  component: InputList.PasswordConfirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputList.PasswordConfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const dateInput: Story = {
  args: {
    name: '비밀인번호 확인',
    passwordField: 'password',
    placeholder: '비밀번호를 입력하시오',
  },
};
