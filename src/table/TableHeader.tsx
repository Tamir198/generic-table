import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { TableColumn, SortDirections } from '../types';
import { COLORS } from '../constants/constants';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortColumn: string;
  sortDirection: SortDirections;
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
  shouldSelectRows = true,
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
            <Checkbox onChange={handleSelectAll} />
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            sx={{ direction: 'rtl', textAlign: 'right' }}
            key={column.id.toString()}
            sortDirection={
              shouldSort && sortColumn === column.id ? sortDirection : false
            }
          >
            {shouldSort ? (
              <TableSortLabel
                active={sortColumn === column.id}
                direction={
                  sortColumn === column.id ? sortDirection : SortDirections.ASC
                }
                onClick={() => handleSort(column.id)}
              >
                <Typography sx={{ color: COLORS.TABLE_HEADER }}>
                  {column.label}
                </Typography>
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
