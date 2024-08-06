import './App.css';
import { GenericTable } from './table/GenericTable';
import { TableColumn } from './types';

function App() {
  interface Dessert {
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

  const data: Dessert[] = [
    {
      name: 'Frozen yoghurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  ];

  return (
    <>
      <GenericTable columns={columns} data={data} />
    </>
  );
}

export default App;
