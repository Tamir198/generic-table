import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableColumn } from '../types';
import { TablePagination, TextField } from '@mui/material';
import { TableBodyContent } from './TableBodyContent';
import { TableHeader } from './TableHeader';
import { useTablePagination } from './useTablePagination';
import { useTableSorting } from './useTableSorting';
import { TEXTS } from '../constants/constants';

interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  shouldPaginate?: boolean;
  rowsPerPageOptions?: number[];
  onPageChange?: (newPage: number) => void;
  shouldFilter?: boolean;
  filterFunction?: (data: T[], searchTerm: string) => T[];
  shouldSort?: boolean;
}

export function GenericTable<T>({
  columns,
  data,
  shouldPaginate = true,
  rowsPerPageOptions = TEXTS.DEFAULT_ROWS_PER_PAGE_OPTION,
  onPageChange,
  shouldFilter = true,
  filterFunction,
  shouldSort = true,
}: GenericTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredData =
    shouldFilter && filterFunction ? filterFunction(data, searchTerm) : data;

  const { sortedData, handleSort, sortColumn, sortDirection } =
    useTableSorting<T>({
      data: filteredData,
      shouldSort,
    });

  const {
    page = TEXTS.INITIAL_TABLE_PAGE,
    rowsPerPage = TEXTS.INITIAL_PAGE_ROWS,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedData,
  } = useTablePagination<T>({
    initialPage: TEXTS.INITIAL_TABLE_PAGE,
    initialRowsPerPage: TEXTS.INITIAL_PAGE_ROWS,
    data: sortedData,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleChangePage(null, 0);
  };

  return (
    <TableContainer component={Paper}>
      {shouldFilter && (
        <TextField
          label={TEXTS.SEARCH_LABEL}
          variant='outlined'
          fullWidth
          margin='normal'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      )}
      <Table sx={{ minWidth: 650 }} aria-label='generic table'>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onRequestSort={(property: string) => handleSort(property)}
          shouldSort={shouldSort}
        />
        <TableBodyContent columns={columns} data={paginatedData()} />
      </Table>
      {shouldPaginate && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => {
            handleChangePage(event, newPage);
            onPageChange && onPageChange(newPage);
          }}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
}
