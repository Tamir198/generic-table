import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { GenericTable, GenericTableProps, TableMode } from './GenericTable';
import { TableColumn } from '../types';
import { Avatar } from '@mui/material';

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
    const data = mockData;

    const handleDeleteSelectedRows = (selectedRows: typeof mockData) => {
      alert('Check console');
      console.log('Those are the selected rows, do with them what you want ');
      console.log(selectedRows);
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
};

interface Dessert {
  id: number;
  name: string;
  calories: number | string;
  fat: number;
  carbs: number;
  protein: number;
  check?: string;
  avatar?: string;
  status?: 'success' | 'failed';
  component?: {
    columnId: string;
    content: React.ReactNode;
  };
}

const customCellsColumns: TableColumn<Dessert>[] = [
  {
    id: 'name',
    label: 'גם כותרת',
    isColumnPaintable: true,
  },
  {
    id: 'calories',
    label: 'כותרת',
    align: 'left',
    format: (value) => `${value} >-<`,
    isColumnPaintable: true,
  },
  { id: 'fat', label: 'Fat (g)', align: 'left' },
  { id: 'carbs', label: 'Carbs (g)', align: 'left' },
  {
    id: 'avatar',
    label: 'Avatar',
    renderCell: (_, row) => {
      return <button>Custom cell - data from the row {row.calories}</button>;
    },
    isColumnPaintable: false,
  },
];

const customCellsData = [
  {
    id: 1,
    name: 'יוגורט קפוא',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    status: 'success',
    component: {
      columnId: 'name',
      content: <p>Custom</p>,
    },
  },
  {
    id: 2,
    name: "סנדוויץ' גלידה",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    status: 'failed',
  },
  {
    id: 3,
    name: 'אקלר',
    calories: 262,
    fat: 16.0,
    carbs: 24,
    protein: 6.0,
    status: 'failed',
  },
  {
    id: 4,
    name: 'קפקייק',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
  },
  { id: 5, name: 'aa', calories: 'a356', fat: 16.0, carbs: 49, protein: 3.9 },
  { id: 6, name: 'bb', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  { id: 7, name: 'cc', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  { id: 8, name: 'dd', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  { id: 9, name: 'gg', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  { id: 10, name: 'ee', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  { id: 11, name: 'ff', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  {
    id: 12,
    name: 'Macaron',
    calories: 320,
    fat: 15.0,
    carbs: 32,
    protein: 5.0,
  },
  {
    id: 13,
    name: 'Brownie',
    calories: 350,
    fat: 20.0,
    carbs: 40,
    protein: 6.0,
  },
  {
    id: 14,
    name: 'Cheesecake',
    calories: 410,
    fat: 25.0,
    carbs: 35,
    protein: 8.0,
  },
  {
    id: 15,
    name: 'Tiramisu',
    calories: 450,
    fat: 22.0,
    carbs: 50,
    protein: 7.0,
  },
  {
    id: 16,
    name: 'Donut',
    calories: 450,
    fat: 25.0,
    carbs: 55,
    protein: 4.0,
  },
  {
    id: 17,
    name: 'Panna Cotta',
    calories: 330,
    fat: 18.0,
    carbs: 30,
    protein: 5.0,
  },
  {
    id: 18,
    name: 'Apple Pie',
    calories: 290,
    fat: 15.0,
    carbs: 40,
    protein: 3.0,
  },
  {
    id: 19,
    name: 'Mousse',
    calories: 380,
    fat: 22.0,
    carbs: 30,
    protein: 6.0,
  },
  {
    id: 20,
    name: 'Pavlova',
    calories: 360,
    fat: 18.0,
    carbs: 35,
    protein: 5.0,
  },
  {
    id: 21,
    name: 'Lemon Bar',
    calories: 300,
    fat: 12.0,
    carbs: 40,
    protein: 4.0,
  },
  {
    id: 22,
    name: 'Creme Brulee',
    calories: 420,
    fat: 23.0,
    carbs: 30,
    protein: 8.0,
  },
  {
    id: 23,
    name: 'Churros',
    calories: 400,
    fat: 20.0,
    carbs: 50,
    protein: 5.0,
  },
  {
    id: 24,
    name: 'Gelato',
    calories: 250,
    fat: 12.0,
    carbs: 30,
    protein: 5.0,
  },
  {
    id: 25,
    name: 'Custard',
    calories: 280,
    fat: 14.0,
    carbs: 25,
    protein: 6.0,
  },
  {
    id: 26,
    name: 'Fruit Tart',
    calories: 340,
    fat: 16.0,
    carbs: 40,
    protein: 4.0,
  },
  {
    id: 27,
    name: 'Almond Cake',
    calories: 380,
    fat: 20.0,
    carbs: 35,
    protein: 6.0,
  },
];

export const withCustomCells: Story = {
  render: (args: GenericTableProps<any>) => {
    const data = mockData;

    return (
      <GenericTable
        {...args}
        data={customCellsData}
        columns={customCellsColumns}
        tableMode={TableMode.Expanded}
        shouldSelectRows={false}
        summaryRows={[{ label: 'Total Rows', value: data.length.toString() }]}
      />
    );
  },
};
