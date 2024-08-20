import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { GenericTable, GenericTableProps, TableMode } from './GenericTable';
import { TablePagination } from '@mui/material';

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
    const data = mockData;
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleRowSelect = (id: number) => {
      setSelectedRows((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    };

    const handleDeleteSelectedRows = () => {
      setData(data.filter((item) => !selectedRows.has(item.id)));
      setSelectedRows(new Set());
    };

    return (
      <>
        <GenericTable
          {...args}
          data={data}
          tableMode={TableMode.Expanded}
          shouldSelectRows
          onDeleteSelectedRows={handleDeleteSelectedRows}
          onRowSelect={handleRowSelect}
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

    const handleRowsPerPageChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <div>
        <GenericTable
          {...args}
          data={data}
          tableMode={TableMode.Pagination}
          summaryRows={[{ label: 'Total Rows', value: data.length.toString() }]}
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
        summaryRows={[
          { label: 'Total Rows', value: data.length.toString() },
          {
            label: 'Active Rows',
            value: data
              .filter((row) => row.status === 'Active')
              .length.toString(),
          },
        ]}
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
