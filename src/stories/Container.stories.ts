import { Container } from '@/shared/components/container/Container';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const container: Story = {
  args: {
    originUrl: '/',
    deadLine: '2025-03-28',
    currentParticipants: 5,
    maxParticipants: 15,
    onClick: () => {},
  },
};
