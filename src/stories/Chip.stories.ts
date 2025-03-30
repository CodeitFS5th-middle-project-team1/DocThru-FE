import { Chip } from '@/shared/components/chip/chip';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const chip: Story = {
  args: {
    label: 'Next.js',
  },
  argTypes: {
    label: {
      options: [
        'Next.js',
        'Modern JS',
        'API',
        'Web',
        'Career',
        '공식문서',
        '블로그',
        '승인 대기',
        '신청 거절',
        '신청 승인',
        '챌린지 삭제',
      ],
      control: { type: 'select' },
    },
  },
};
