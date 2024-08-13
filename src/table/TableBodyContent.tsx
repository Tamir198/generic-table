import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableColumn } from '../types';
import { Checkbox } from '@mui/material';

interface TableBodyContentProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  shouldSelectRows: boolean;
  selectedRows: Set<number>;
  onRowSelect: (id: number) => void;
  isCustomCellAllowed?: boolean;
  isColumnPaintable?: boolean;
}

function getCellContent<T extends { [key: string]: any }>(
  column: TableColumn<T>,
  value: T[keyof T],
  row: T,
  isCustomCellAllowed: boolean
): React.ReactNode {
  const baseContent = column.format ? column.format(value) : value;
  const cellContent = column.renderCell
    ? column.renderCell(value, row)
    : baseContent;

  if (isCustomCellAllowed && row.component) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {ensureReactNode(cellContent)}
        <span style={{ marginLeft: '8px' }}>{row.component}</span>
      </div>
    );
  }

  if (column.isColumnPaintable && row.status) {
    const status = row.status as string;
    let color = '';

    switch (status) {
      case 'success':
        color = 'green';
        break;
      case 'failed':
        color = 'red';
        break;
      default:
        color = 'blue';
    }

    return <span style={{ color }}>{ensureReactNode(cellContent)}</span>;
  }

  return ensureReactNode(cellContent);
}

function ensureReactNode(value: any): React.ReactNode {
  if (React.isValidElement(value)) {
    return value;
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }

  if (value === null || value === undefined) {
    return null;
  }

  return null;
}

export function TableBodyContent<T extends { id: number }>({
  columns,
  data,
  shouldSelectRows,
  selectedRows,
  onRowSelect,
  isCustomCellAllowed = true,
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
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={String(column.id)} align={column.align}>
                {getCellContent(column, value, row, isCustomCellAllowed)}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
