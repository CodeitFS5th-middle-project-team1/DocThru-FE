import type { Meta, StoryObj } from '@storybook/react';
import ModalList from '@/shared/components/modal/index';

const meta = {
  title: 'Components/ModalList/ConfirmCancel',
  component: ModalList.ConfirmCancel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalList.ConfirmCancel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onConfirm: () => console.log('Confirm clicked'),
    onCancel: () => console.log('Cancel clicked'),
    children: '모달 내용',
    width: '327px',
    height: '187px',
  },
};
