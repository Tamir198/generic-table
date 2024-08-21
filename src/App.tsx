import { Avatar, TextField } from '@mui/material';
import './App.css';
import { GenericTable, TableMode } from './table/GenericTable';
import { TableColumn } from './types';
import { useState } from 'react';
import ReactSVG from '../src/assets/react.svg';

function App() {

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

  const columns: TableColumn<Dessert>[] = [
    {
      id: 'name',
      label: 'קינוח',
      isColumnPaintable: true,
    },
    {
      id: 'calories',
      label: 'קלוריות',
      align: 'left',
      format: (value) => ` קלוריות ${value}`,
      isColumnPaintable: true,
    },
    { id: 'fat', label: 'שומן', align: 'left' },
    { id: 'carbs', label: 'פחמימה', align: 'left' },
    {
      id: 'protein',
      label: 'חלבון',
      align: 'left',
      format: (value) => `${value}שלום  `,
      isColumnPaintable: true,
    },
    {
      id: 'avatar',
      label: 'אייקון',
      renderCell: (_, row) => {
        if (row.name.startsWith('A') || row.name.startsWith('C')) {
          return <Avatar alt={row.name} src={ReactSVG}></Avatar>;
        } else if (row.name.startsWith('d') || row.name.startsWith('b')) {
          return <a href='https://www.google.co.uk/'>{row.name}</a>;
        } else if (row.name.startsWith('g')) {
          return (
            <button onClick={() => alert('Row data :' + JSON.stringify(row))}>
              {row.carbs}
            </button>
          );
        } else {
          return 'NO AVATAR';
        }
      },
      isColumnPaintable: false,
    },
  ];

  const [data, setData] = useState<Dessert[]>([
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
  ]);

  const summeryRows = [
    { label: 'aaaa', value: 50 },
    { label: 'bbb', value: 80 },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    console.log('Page changed to:', newPage);
  };

  const filterDesserts = (data: Dessert[], searchTerm: string): Dessert[] => {
    return data.filter((dessert) =>
      dessert.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = filterDesserts(data, searchTerm);

  const handleDeleteSelectedRows = (selectedRows: Dessert[]) => {
    console.log(selectedRows);
    setData((prevData) =>
      prevData.filter((dessert) => !selectedRows.includes(dessert))
    );
  };

  return (
    <>
      <TextField
        label='Search Desserts'
        variant='outlined'
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        margin='normal'
      />
      <GenericTable
        columns={columns}
        data={filteredData}
        onPageChange={handlePageChange}
        onDeleteSelectedRows={handleDeleteSelectedRows}
        shouldSelectRows={true}
        tableMode={TableMode.Pagination}
        summaryRows={summeryRows}
        shouldDisplayRowMoreOption={true}
      />
    </>
  );
}

export default App;
