import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableColumn } from '../types';
import { TablePagination, Button } from '@mui/material';
import { TableBodyContent } from './TableBodyContent';
import { TableHeader } from './TableHeader';
import { useTablePagination } from './useTablePagination';
import { useTableSorting } from './useTableSorting';
import { useRowSelection } from './useRowSelection';
import { TEXTS } from '../constants/constants';

interface GenericTableProps<T extends { id: number }> {
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

export function GenericTable<T extends { id: number }>({
  columns,
  data,
  shouldPaginate,
  rowsPerPageOptions,
  onPageChange,
  shouldSort,
  shouldSelectRows,
  onDeleteSelectedRows,
  isCustomCellAllowed,
  ...props
}: GenericTableProps<T>) {
  const { sortedData, handleSort, sortColumn, sortDirection } =
    useTableSorting<T>({
      data: data,
      shouldSort: shouldSort ?? true,
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
    onDeleteSelectedRows: onDeleteSelectedRows,
  });

  return (
    <TableContainer component={Paper}>
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
          shouldSort={shouldSort ?? true}
          shouldSelectRows={shouldSelectRows ?? true}
          onSelectAllRows={(selectAll) => handleSelectAllRows(selectAll)}
        />
        <TableBodyContent
          columns={columns}
          data={paginatedData()}
          shouldSelectRows={shouldSelectRows ?? true}
          selectedRows={selectedRows}
          onRowSelect={(id) => handleRowSelect(id)}
          isCustomCellAllowed={isCustomCellAllowed ?? true}
        />
      </Table>
      {shouldPaginate && (
        <TablePagination
          rowsPerPageOptions={
            rowsPerPageOptions ?? TEXTS.DEFAULT_ROWS_PER_PAGE_OPTION
          }
          component='div'
          count={data.length}
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
