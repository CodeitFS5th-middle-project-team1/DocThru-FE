import type { Meta, StoryObj } from '@storybook/react';
import Popup from '@/shared/components/popup/popup';

const meta = {
  title: 'Components/Popup',
  component: Popup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Popup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithNotifications: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Popup closed'),
    notifications: [
      { message: '새로운 메시지가 도착했습니다.', date: '2023-03-15' },
      { message: '업데이트가 완료되었습니다.', date: '2023-03-14' },
      { message: '예약이 확정되었습니다.', date: '2023-03-13' },
      { message: '예약이 확정되었습니다.', date: '2023-03-12' },
      { message: '예약이 확정되었습니다.', date: '2023-03-12' },
      { message: '예약이 확정되었습니다.', date: '2023-03-12' },
      { message: '예약이 확정되었습니다.', date: '2023-03-12' },
    ],
  },
};

export const Empty: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Popup closed'),
    notifications: [],
  },
};
