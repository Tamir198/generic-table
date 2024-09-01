// src/stories/TableFilters.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { TableFilters } from './TableFilters';
import { OptionValue, MultiOptionValue } from '../../types';

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
} satisfies Meta<typeof TableFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockOnBailStatusChange = (value: OptionValue) =>
  console.log('Bail Status Changed:', value);
const mockOnBailTypeChange = (value: MultiOptionValue) =>
  console.log('Bail Type Changed:', value);
const mockOnCoinTypeChange = (value: MultiOptionValue) =>
  console.log('Coin Type Changed:', value);
const mockClearFilters = () => console.log('Filters Cleared');
const mockColumnTypes = {
  name: 'string',
  age: 'number',
  dateOfBirth: 'date',
};

export const Default: Story = {
  render: (args) => <TableFilters {...args} />,
  args: {
    onBailStatusChange: mockOnBailStatusChange,
    onBailTypeChange: mockOnBailTypeChange,
    onCoinTypeChange: mockOnCoinTypeChange,
    clearFilters: mockClearFilters,
    columnTypes: mockColumnTypes,
  },
};
