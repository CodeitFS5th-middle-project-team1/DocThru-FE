import type { Meta, StoryObj } from '@storybook/react';
import ModalList from '@/shared/components/modal/index';

const meta = {
  title: 'Components/ModalList/Navigate',
  component: ModalList.Navigate,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalList.Navigate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onNavigate: () => console.log('Navigate clicked'),
    navigateUrl: '', // URL이 없으면 onNavigate 호출됨
    children: '로그인이 필요한 서비스입니다.',
    width: '327px',
    height: '206px',
    text: '로그인하러 가기',
  },
};

export const WithUrl: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    navigateUrl: 'https://example.com/login',
    children: '로그인 페이지로 이동합니다.',
    width: '327px',
    height: '206px',
    text: '로그인하러 가기',
  },
};
