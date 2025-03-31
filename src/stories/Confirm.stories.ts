import type { Meta, StoryObj } from '@storybook/react';
import ModalList from '@/shared/components/modal/index';

const meta = {
  title: 'Components/ModalList/Confirm',
  component: ModalList.Confirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalList.Confirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('onClose triggered'),
    onConfirm: () => console.log('onConfirm triggered'),
    children: '모달 내용',
    width: '540px',
    height: '250px',
  },
};
