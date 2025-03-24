import { Chip } from '@/shared/components/chip';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'chip',
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
    label: 'chip',
    onClick: () => {},
  },
};
