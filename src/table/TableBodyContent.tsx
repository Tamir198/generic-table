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

  let contentWithStatus: React.ReactNode = cellContent;

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

    contentWithStatus = <span style={{ color }}>{cellContent}</span>;
  }

  if (
    isCustomCellAllowed &&
    row.component &&
    row.component.columnId === column.id
  ) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {contentWithStatus}
        <span style={{ marginLeft: '8px' }}>{row.component.content}</span>
      </div>
    );
  }

  return contentWithStatus;
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
