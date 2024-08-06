import { TableBody, TableRow, TableCell } from '@mui/material';
import { TableColumn } from '../types';

interface TableBodyContentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

export function TableBodyContent<T>({
  columns,
  data,
}: TableBodyContentProps<T>) {
  return (
    <TableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column, columnIndex) => {
            const value = row[column.id];
            return (
              <TableCell key={columnIndex} align={column.align || 'left'}>
                {column.format
                  ? column.format(value)
                  : (value as React.ReactNode)}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
