import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { GenericTable, GenericTableProps, TableMode } from './GenericTable';
import { TableColumn } from '../types';
const mockColumns: TableColumn<{
  id: number;
  name: string;
  email: string;
  status: string;
}>[] = [
  { id: 'name', label: 'שם', isColumnPaintable: true },
  { id: 'email', label: 'אימייל' },
  { id: 'status', label: 'סטטוס' },
];

const mockData = [
  { id: 1, name: "ג'ון דו", email: 'john@example.com', status: 'פעיל' },
  { id: 2, name: "ג'ין סמית", email: 'jane@example.com', status: 'מוקפא' },
  { id: 3, name: 'סם בראון', email: 'sam@example.com', status: 'פעיל' },
  {
    id: 4,
    name: "אמי ג'ונסון",
    email: 'emily@example.com',
    status: 'מוקפא',
  },
  { id: 5, name: 'מייקל לי', email: 'michael@example.com', status: 'פעיל' },
  { id: 6, name: 'אנה טיילור', email: 'anna@example.com', status: 'מוקפא' },
  { id: 7, name: 'יוסי כהן', email: 'yossi@example.com', status: 'פעיל' },
  { id: 8, name: 'מיה לוי', email: 'miah@example.com', status: 'מוקפא' },
  { id: 9, name: 'דניאל ברק', email: 'daniel@example.com', status: 'פעיל' },
  { id: 10, name: 'נויה פרידמן', email: 'noa@example.com', status: 'מוקפא' },
  { id: 11, name: 'אורן גלעד', email: 'oren@example.com', status: 'פעיל' },
  { id: 12, name: 'איילה סלע', email: 'ayala@example.com', status: 'מוקפא' },
  { id: 13, name: 'תומר רז', email: 'tomer@example.com', status: 'פעיל' },
  { id: 14, name: 'מיה עוז', email: 'miah.oz@example.com', status: 'מוקפא' },
  { id: 15, name: 'עדי אבן', email: 'adi@example.com', status: 'פעיל' },
  {
    id: 16,
    name: 'מיה דיין',
    email: 'miah.dayan@example.com',
    status: 'מוקפא',
  },
  { id: 17, name: 'אביגיל בר', email: 'avigail@example.com', status: 'פעיל' },
  { id: 18, name: 'אלון ניר', email: 'alon@example.com', status: 'מוקפא' },
  { id: 19, name: 'יפעת שלם', email: 'yifat@example.com', status: 'פעיל' },
  { id: 20, name: 'גיא אלמוג', email: 'guy@example.com', status: 'מוקפא' },
  { id: 21, name: 'אורלי פרץ', email: 'orli@example.com', status: 'פעיל' },
  { id: 22, name: 'רוני דמרי', email: 'roni@example.com', status: 'מוקפא' },
  { id: 23, name: 'גלעד יוספי', email: 'gilad@example.com', status: 'פעיל' },
  { id: 24, name: 'נועה קיסר', email: 'noa.k@example.com', status: 'מוקפא' },
  { id: 25, name: 'יובל מזרחי', email: 'yuval@example.com', status: 'פעיל' },
  { id: 26, name: 'הדר קדם', email: 'hadar@example.com', status: 'מוקפא' },
  { id: 27, name: 'עומר שור', email: 'omer@example.com', status: 'פעיל' },
  { id: 28, name: 'מיטל רפאל', email: 'mital@example.com', status: 'מוקפא' },
  { id: 29, name: 'מאור ברזילי', email: 'maor@example.com', status: 'פעיל' },
  {
    id: 30,
    name: 'רוני לוי',
    email: 'roni.levi@example.com',
    status: 'מוקפא',
  },
  { id: 31, name: 'תמר אהרון', email: 'tamar@example.com', status: 'פעיל' },
  {
    id: 32,
    name: 'נמרוד גפן',
    email: 'nimrod@example.com',
    status: 'מוקפא',
  },
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
          columns={mockColumns}
          tableMode={TableMode.Expanded}
          shouldSelectRows={true}
          onDeleteSelectedRows={handleDeleteSelectedRows}
        />
      </>
    );
  },
  args: {
    columns: [
      { id: 'name', label: 'Name', isColumnPaintable: true },
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
          columns={mockColumns}
          tableMode={TableMode.Pagination}
          summaryRows={[{ label: 'Total Rows', value: data.length.toString() }]}
          shouldSelectRows={false}
        />
      </div>
    );
  },
  args: {
    columns: mockColumns,
  },
};

export const WithSummaryRows: Story = {
  render: (args: GenericTableProps<any>) => {
    const data = mockData;

    return (
      <GenericTable
        {...args}
        data={data}
        columns={mockColumns}
        tableMode={TableMode.Expanded}
        shouldSelectRows={false}
        summaryRows={[{ label: 'Total Rows', value: data.length.toString() }]}
      />
    );
  },
  args: {
    columns: mockColumns,
  },
};
