import { Card } from '@/shared/components/card/Card';
import { DocumentType, FieldType } from '@/types';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/card',
  component: Card,
  argTypes: {
    DocumentType: {
      control: 'select',
      options: Object.values(DocumentType),
    },
    FieldType: {
      control: 'select',
      options: Object.values(FieldType),
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const card: Story = {
  args: {
    id: '1',
    role: 'base',
    status: 'completed',
    title: 'Next.js - App Router: Routing Fundamentals',
    DocumentType: DocumentType.OFFICIAL,
    FieldType: FieldType.NEXTJS,
    deadLine: '2025-03-28',
    currentParticipants: 15,
    maxParticipants: 15,
    onClick: () => console.log('clicked!'),
  },
};
