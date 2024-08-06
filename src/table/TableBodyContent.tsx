import { TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import { TableColumn } from '../types';

interface TableBodyContentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  shouldSelectRows?: boolean;
  selectedRows?: Set<number>;
  onRowSelect?: (rowIndex: number) => void;
}

export function TableBodyContent<T>({
  columns,
  data,
  shouldSelectRows = false,
  selectedRows,
  onRowSelect,
}: TableBodyContentProps<T>) {
  return (
    <TableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {shouldSelectRows && (
            <TableCell padding='checkbox'>
              <Checkbox
                checked={selectedRows?.has(rowIndex) || false}
                onChange={() => onRowSelect && onRowSelect(rowIndex)}
              />
            </TableCell>
          )}
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
