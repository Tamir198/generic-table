import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableColumn } from '../types';
import { useState } from 'react';
import { TablePagination, TextField } from '@mui/material';
import { TableBodyContent } from './TableBodyContent';
import { TableHeader } from './TableHeader';

interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  shouldPaginate?: boolean;
  rowsPerPageOptions?: number[];
  onPageChange?: (newPage: number) => void;
  shouldFilter?: boolean;
  filterFunction?: (data: T[], searchTerm: string) => T[];
}

export function GenericTable<T>({
  columns,
  data,
  shouldPaginate = true,
  rowsPerPageOptions = [5, 10, 25],
  onPageChange,
  shouldFilter = true,
  filterFunction,
}: GenericTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (
    event: React.MouseEvent | null,
    newPage: number
  ) => {
    setPage(newPage);
    onPageChange && onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData =
    shouldFilter && filterFunction ? filterFunction(data, searchTerm) : data;

  const paginatedData = shouldPaginate
    ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : filteredData;

  return (
    <TableContainer component={Paper}>
      {shouldFilter && (
        <TextField
          label='Search'
          variant='outlined'
          fullWidth
          margin='normal'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      )}
      <Table sx={{ minWidth: 650 }} aria-label='generic table'>
        <TableHeader columns={columns} />
        <TableBodyContent columns={columns} data={paginatedData} />
      </Table>
      {shouldPaginate && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
}
