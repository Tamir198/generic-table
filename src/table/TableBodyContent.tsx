import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { TableColumn } from '../types';

interface TableBodyContentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  shouldSelectRows?: boolean;
  selectedRows: Set<number>;
  onRowSelect: (id: number) => void;
}

export function TableBodyContent<T>({
  columns,
  data,
  shouldSelectRows = true,
  selectedRows,
  onRowSelect,
}: TableBodyContentProps<T>) {
  return (
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          {shouldSelectRows && (
            <TableCell padding='checkbox'>
              <Checkbox
                checked={selectedRows.has(row.id)}
                onChange={() => onRowSelect(row.id)}
              />
            </TableCell>
          )}
          {columns.map((column) => (
            <TableCell key={column.id} align={column.align}>
              {column.format ? column.format(row[column.id]) : row[column.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
