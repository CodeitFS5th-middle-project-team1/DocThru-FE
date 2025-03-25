import { Chip } from '@/shared/components/chip/chip';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/chip',
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
};
