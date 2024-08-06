import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { TableColumn } from '../types';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onRequestSort: (property: string) => void;
  shouldSort: boolean;
}

export function TableHeader<T>({
  columns,
  sortColumn,
  sortDirection,
  onRequestSort,
  shouldSort,
}: TableHeaderProps<T>) {
  const handleSort = (property: string) => {
    if (shouldSort) {
      onRequestSort(property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id.toString()}
            align={column.align || 'left'}
            sortDirection={
              shouldSort && sortColumn === column.id ? sortDirection : false
            }
          >
            {shouldSort ? (
              <TableSortLabel
                active={sortColumn === column.id}
                direction={sortColumn === column.id ? sortDirection : 'asc'}
                onClick={() => handleSort(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
