import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableColumn } from '../types';
import { TablePagination, TextField, Button } from '@mui/material';
import { TableBodyContent } from './TableBodyContent';
import { TableHeader } from './TableHeader';
import { useTablePagination } from './useTablePagination';
import { useTableSorting } from './useTableSorting';
import { useRowSelection } from './useRowSelection';
import { TEXTS } from '../constants/constants';
import { useState } from 'react';

interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  shouldPaginate?: boolean;
  rowsPerPageOptions?: number[];
  onPageChange?: (newPage: number) => void;
  shouldFilter?: boolean;
  filterFunction?: (data: T[], searchTerm: string) => T[];
  shouldSort?: boolean;
  shouldSelectRows?: boolean;
  onDeleteSelectedRows?: (selectedRows: T[]) => void;
  isCustomCellAllowed?: boolean;
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
  shouldSelectRows = true,
  onDeleteSelectedRows,
  isCustomCellAllowed = true,
}: GenericTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

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

  const {
    selectedRows,
    handleRowSelect,
    handleSelectAllRows,
    handleDeleteSelectedRows,
  } = useRowSelection<T>({
    data: paginatedData(),
    onDeleteSelectedRows,
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
      {shouldSelectRows && (
        <Button
          variant='contained'
          color='secondary'
          onClick={handleDeleteSelectedRows}
          disabled={selectedRows.size === 0}
        >
          {TEXTS.DELETE_SELECTED}
        </Button>
      )}
      <Table sx={{ minWidth: 650 }} aria-label='generic table'>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={(property: string) => handleSort(property)}
          shouldSort={shouldSort}
          shouldSelectRows={shouldSelectRows}
          onSelectAllRows={(selectAll) => handleSelectAllRows(selectAll)}
        />
        <TableBodyContent
          columns={columns}
          data={paginatedData()}
          shouldSelectRows={shouldSelectRows}
          selectedRows={selectedRows}
          onRowSelect={(id) => handleRowSelect(id)}
          isCustomCellAllowed={isCustomCellAllowed}
        />
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
