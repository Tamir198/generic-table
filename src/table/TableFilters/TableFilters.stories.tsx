// src/stories/TableFilters.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { TableFilters } from './TableFilters';

const meta: Meta<typeof TableFilters> = {
  title: 'Components/TableFilters',
  component: TableFilters,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TableFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <TableFilters {...args} />,
  args: {},
};
