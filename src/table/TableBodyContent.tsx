import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableColumn } from '../types';
import { Box, Checkbox } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface TableBodyContentProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  shouldSelectRows: boolean;
  selectedRows: Set<number>;
  onRowSelect: (id: number) => void;
  isCustomCellAllowed?: boolean;
  isColumnPaintable?: boolean;
  shouldDisplayRowMoreOption?: boolean;
}

function getCellContent<T extends { [key: string]: any }>(
  column: TableColumn<T>,
  value: T[keyof T],
  row: T
): React.ReactNode {
  const baseContent = column.format ? column.format(value) : value;
  const cellContent = column.renderCell
    ? column.renderCell(value, row)
    : baseContent;

  const statusColors: { [key: string]: string } = {
    success: 'green',
    failed: 'red',
    default: '',
  };

  const statusColor =
    column.isColumnPaintable && row.status
      ? statusColors[row.status as string] || statusColors.default
      : undefined;

  let contentWithStatus: React.ReactNode = cellContent;

  if (statusColor) {
    contentWithStatus = (
      <span style={{ color: statusColor }}>{cellContent}</span>
    );
  }

  if (row.component && row.component.columnId === column.id) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {contentWithStatus}
        <span style={{ marginLeft: '8px', textAlign: 'center' }}>
          {row.component.content}
        </span>
      </Box>
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
  shouldDisplayRowMoreOption
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
              <TableCell
                sx={{ textAlign: 'right' }}
                key={String(column.id)}
                align={column.align}
              >
                {getCellContent(column, value, row)}
              </TableCell>
            );
          })}

          {shouldDisplayRowMoreOption && <TableCell onClick={() => alert('do something')}>
              <MoreVertIcon/>
            </TableCell>}
        </TableRow>
      ))}
    </TableBody>
  );
}
