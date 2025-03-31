import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropDowns from '@/shared/components/dropdown';

const meta = {
  title: 'Components/DropDown',
  component: DropDowns.basic,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof DropDowns.basic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const basic: Story = {
  args: {
    handleChange: action('click'),
    options: [
      { value: '1', name: 'Next.js' },
      { value: '2', name: 'API' },
      { value: '3', name: 'Career' },
      { value: '4', name: 'Modern JS ' },
      { value: '5', name: 'Web' },
    ],
    value: '',
    defaultValue: '',
    placeholder: 'cartegory',
  },
};
