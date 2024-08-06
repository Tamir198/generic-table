import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
} from '@mui/material';
import { TableColumn } from '../types';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (property: string) => void;
  shouldSort: boolean;
  shouldSelectRows?: boolean;
  onSelectAllRows?: (checked: boolean) => void;
}

export function TableHeader<T>({
  columns,
  sortColumn,
  sortDirection,
  handleSort,
  shouldSort,
  shouldSelectRows = false,
  onSelectAllRows,
}: TableHeaderProps<T>) {
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectAllRows) {
      onSelectAllRows(event.target.checked);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {shouldSelectRows && (
          <TableCell padding='checkbox'>
            <Checkbox
              onChange={handleSelectAll}
              // Here, you'll need a way to determine if all rows are selected
            />
          </TableCell>
        )}
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
