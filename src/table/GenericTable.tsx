import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableColumn } from '../types';

interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

export function GenericTable<T>({ columns, data }: GenericTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='generic table'>
        <TableHeader columns={columns} />
        <TableBodyContent columns={columns} data={data} />
      </Table>
    </TableContainer>
  );
}

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
}

function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id.toString()} align={column.align || 'left'}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface TableBodyContentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

function TableBodyContent<T>({ columns, data }: TableBodyContentProps<T>) {
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
