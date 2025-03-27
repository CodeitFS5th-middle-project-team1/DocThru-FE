import InputList from '@/shared/components/input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/InputList/Text',
  component: InputList.Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputList.Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const input: Story = {
  args: {
    name: '무엇을쓸까요',
    placeholder: '굿모닝',
  },
};
