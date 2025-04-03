import { TextBox } from '@/shared/components/TextBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/TextBox',
  component: TextBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const textbox: Story = {
  args: {},
};
