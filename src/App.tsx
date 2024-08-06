import './App.css';
import { GenericTable } from './table/GenericTable';
import { TableColumn } from './types';
import { useState } from 'react';

function App() {
  interface Dessert {
    id: number;
    check?: string;
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  }

  const columns: TableColumn<Dessert>[] = [
    { id: 'name', label: 'Dessert (100g serving)' },
    {
      id: 'calories',
      label: 'Calories',
      align: 'right',
      format: (value) => `${value} kcal`,
    },
    { id: 'fat', label: 'Fat (g)', align: 'right' },
    { id: 'carbs', label: 'Carbs (g)', align: 'right' },
    {
      id: 'protein',
      label: 'Protein (g)',
      align: 'right',
      format: (value) => `Formatted -${value}`,
    },
  ];

  const [data, setData] = useState<Dessert[]>([
    {
      id: 1,
      name: 'Frozen yoghurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      id: 2,
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    {
      id: 3,
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 24,
      protein: 6.0,
    },
    {
      id: 4,
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    { id: 5, name: 'aa', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
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

  const handlePageChange = (newPage: number) => {
    console.log('Page changed to:', newPage);
  };

  const filterDesserts = (data: Dessert[], searchTerm: string): Dessert[] => {
    return data.filter((dessert) =>
      dessert.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDeleteSelectedRows = (selectedRows: Dessert[]) => {
    console.log(selectedRows);

    setData((prevData) =>
      prevData.filter((dessert) => !selectedRows.includes(dessert))
    );
  };

  const ROWS_PER_PAGE = [5, 10, 25];

  return (
    <>
      <GenericTable
        columns={columns}
        data={data}
        rowsPerPageOptions={ROWS_PER_PAGE}
        onPageChange={handlePageChange}
        filterFunction={filterDesserts}
        shouldSelectRows={true}
        shouldFilter={true}
        onDeleteSelectedRows={handleDeleteSelectedRows}
      />
    </>
  );
}

export default App;
