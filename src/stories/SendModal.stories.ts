import type { Meta, StoryObj } from '@storybook/react';
import ModalList from '@/shared/components/modal/index';

const meta = {
  title: 'Components/ModalList/Send',
  component: ModalList.Send,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalList.Send>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onSend: (content: string) => console.log('Content sent:', content),
    title: '글 작성',
    initialContent: '',
    placeholder: '내용을 입력해주세요',
    width: '496px',
    height: '423px',
  },
};
