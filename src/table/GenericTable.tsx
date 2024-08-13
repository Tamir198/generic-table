import { useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { SummeryRow, TableColumn } from '../types';
import { Button } from '@mui/material';
import { TablePagination } from './TablePagination';
import { TableBodyContent } from './TableBodyContent';
import { TableHeader } from './TableHeader';
import { useTablePagination } from './useTablePagination';
import { useTableSorting } from './useTableSorting';
import { useRowSelection } from './useRowSelection';
import { TEXTS } from '../constants/constants';
import * as XLSX from 'xlsx';
import { SummeryRows } from './SummeryRows';

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
  expandable?: boolean;
  summaryRows?: SummeryRow[];
}

export function GenericTable<T extends { id: number }>({
  columns,
  data,
  shouldPaginate,
  shouldSort,
  onPageChange,
  shouldSelectRows,
  onDeleteSelectedRows,
  isCustomCellAllowed,
  expandable = true,
  summaryRows,
  ...props
}: GenericTableProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { sortedData, handleSort, sortColumn, sortDirection } =
    useTableSorting<T>({
      data: data,
      shouldSort: shouldSort ?? true,
    });

  const {
    page = TEXTS.INITIAL_TABLE_PAGE,
    rowsPerPage = TEXTS.INITIAL_PAGE_ROWS,
    handleChangePage,
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

  if (shouldPaginate && expandable) {
    throw new Error(
      "Cannot use both 'shouldPaginate' and 'expandable' options at the same time."
    );
  }

  const displayData = isExpanded ? sortedData : paginatedData();

  const exportToExcel = (fileName = 'data', sheetName = 'Sheet1') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

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
          data={displayData}
          shouldSelectRows={shouldSelectRows ?? true}
          selectedRows={selectedRows}
          onRowSelect={(id) => handleRowSelect(id)}
          isCustomCellAllowed={isCustomCellAllowed ?? true}
        />
      </Table>
      {expandable && (
        <Button
          variant='contained'
          color={isExpanded ? 'secondary' : 'primary'}
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ margin: 2 }}
        >
          {isExpanded ? TEXTS.SHOW_LESS : TEXTS.SHOW_MORE}
        </Button>
      )}
      {shouldPaginate && (
        <TablePagination
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
        />
      )}
      {summaryRows && <SummeryRows summary={summaryRows} />}
    </TableContainer>
  );
}
