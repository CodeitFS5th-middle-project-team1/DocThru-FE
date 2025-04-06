import Button, { ButtonCategory } from '@/shared/components/button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    category: {
      control: 'select',
      options: Object.values(ButtonCategory),
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const button: Story = {
  args: {
    category: ButtonCategory.YES,
    onClick: () => {},
    children: 'Next.js',
  },
};
