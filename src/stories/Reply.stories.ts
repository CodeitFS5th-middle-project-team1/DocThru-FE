import { Reply } from '@/shared/components/Reply';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Reply',
  component: Reply,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Reply>;

export default meta;

type Story = StoryObj<typeof meta>;

export const reply: Story = {
  args: {
    user: { nickName: 'sotry' },
    create: new Date(),
    content:
      '일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 -> 일반적으로 개발자는 개인이 갖고 있는 스킬셋에 대한 전문성이 있어야 커리어에서 유망하다고 여겨집니다. 라고 바꾸는게 더 자연스러운 말일 것 같아요',
  },
};
