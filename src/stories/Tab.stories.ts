import { Tab, TabActive, TextPosition } from '@/shared/components/tab/Tab';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  argTypes: {
    position: {
      control: 'select',
      options: Object.values(TextPosition),
    },
    isActive: {
      control: 'select',
      options: Object.values(TabActive),
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const chip: Story = {
  args: {
    position: TextPosition.MIDDLE,
    isActive: TabActive.ON,
    onClick: () => {},
    children: '참여중인 챌린지',
  },
};
