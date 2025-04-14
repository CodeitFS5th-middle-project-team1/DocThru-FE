import InputList from '@/shared/components/input/index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/InputList/Search',
  component: InputList.Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputList.Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const dateInput: Story = {
  args: {
    name: '검색',
    onSearch: () => {},
    placeholder: '검색하시오',
  },
};
