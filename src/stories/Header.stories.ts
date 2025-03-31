import Header from '@/shared/components/layout/Header';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isLogin: { control: 'boolean' }, // Storybook UI에서 체크박스로 조작 가능
    role: { control: 'text' }, // 텍스트 입력 가능
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogin: action('로그인 버튼 클릭'),
    onLogout: action('로그아웃 버튼 클릭'),
    isLogin: null,
    role: '',
  },
};

export const LogInMember: Story = {
  args: {
    isLogin: 'asdas',
    role: 'member',
    onLogin: action('로그인 버튼 클릭'),
    onLogout: action('로그아웃 버튼 클릭'),
  },
};

export const LogInAdmin: Story = {
  args: {
    isLogin: 'asdasd',
    role: 'admin',
    onLogin: action('로그인 버튼 클릭'),
    onLogout: action('로그아웃 버튼 클릭'),
  },
};
