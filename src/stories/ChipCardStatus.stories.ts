import { ChipCardStatus } from '@/shared/components/chip/ChipCardStatus';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Chip',
  component: ChipCardStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChipCardStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const chipCardStatus: Story = {
  args: {
    status: 'full',
  },
  argTypes: {
    status: {
      options: ['full', 'done', ''],
      control: { type: 'select' },
    },
  },
};
