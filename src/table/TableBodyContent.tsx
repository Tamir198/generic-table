import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableColumn } from '../types';
import { Checkbox } from '@mui/material';

interface TableBodyContentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  shouldSelectRows: boolean;
  selectedRows: Set<number>;
  onRowSelect: (id: number) => void;
}

export function TableBodyContent<T>({
  columns,
  data,
  shouldSelectRows,
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
                checked={selectedRows.has(row.id)}
                onChange={() => onRowSelect(row.id)}
              />
            </TableCell>
          )}
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={String(column.id)} align={column.align}>
                {column.renderCell
                  ? column.renderCell(value, row)
                  : column.format
                    ? column.format(value)
                    : value}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
