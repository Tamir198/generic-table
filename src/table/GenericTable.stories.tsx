import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { GenericTable, GenericTableProps, TableMode } from './GenericTable';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Sam Brown', email: 'sam@example.com', status: 'Active' },
  {
    id: 4,
    name: 'Emily Johnson',
    email: 'emily@example.com',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Michael Lee',
    email: 'michael@example.com',
    status: 'Active',
  },
  { id: 6, name: 'Anna Taylor', email: 'anna@example.com', status: 'Inactive' },
];

const meta: Meta<typeof GenericTable> = {
  title: 'Components/GenericTable',
  component: GenericTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GenericTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: GenericTableProps<any>) => {
    const [data, setData] = useState(mockData);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleDeleteSelectedRows = () => {
      console.log('Selected Rows before deletion:', selectedRows);
      setData((prevData) => {
        const newData = prevData.filter((item) => !selectedRows.has(item.id));
        console.log('Data after deletion:', newData);
        return newData;
      });
      setSelectedRows(new Set());
    };

    return (
      <>
        <GenericTable
          {...args}
          data={data}
          tableMode={TableMode.Expanded}
          shouldSelectRows={true}
          onDeleteSelectedRows={handleDeleteSelectedRows}
        />
      </>
    );
  },
  args: {
    columns: [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'status', label: 'Status' },
    ],
  },
};

export const WithPagination: Story = {
  render: (args: GenericTableProps<any>) => {
    const data = mockData;

    return (
      <div>
        <GenericTable
          {...args}
          data={data}
          tableMode={TableMode.Pagination}
          summaryRows={[{ label: 'Total Rows', value: data.length.toString() }]}
          shouldSelectRows={false}
        />
      </div>
    );
  },
  args: {
    columns: [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'status', label: 'Status' },
    ],
  },
};

export const WithSummaryRows: Story = {
  render: (args: GenericTableProps<any>) => {
    const data = mockData;

    return (
      <GenericTable
        {...args}
        data={data}
        tableMode={TableMode.Expanded}
        shouldSelectRows={false}
        summaryRows={[{ label: 'Total Rows', value: data.length.toString() }]}
      />
    );
  },
  args: {
    columns: [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'status', label: 'Status' },
    ],
  },
};
