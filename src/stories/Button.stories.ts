import Button, {
  BGColor,
  ButtonBorder,
  ButtonImg,
} from '@/shared/components/button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    border: {
      control: 'select',
      options: Object.values(ButtonBorder),
    },
    bgColor: {
      control: 'select',
      options: Object.values(BGColor),
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const chip: Story = {
  args: {
    border: ButtonBorder.RECTANGLE,
    bgColor: BGColor.RED,
    onClick: () => {},
    icon: ButtonImg.TRANSPARENT,
    onlyIcon: false,
    closeIcon: false,
    href: '',
    children: 'Next.js',
  },
};
