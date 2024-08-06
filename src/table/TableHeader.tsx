import { TableHead, TableRow, TableCell } from '@mui/material';
import { TableColumn } from '../types';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
}

export function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id.toString()} align={column.align || 'left'}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
