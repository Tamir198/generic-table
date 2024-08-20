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
import { COLORS, TEXTS } from '../constants/constants';
import * as XLSX from 'xlsx';
import { SummeryRows } from './SummeryRows';

export enum TableMode {
  Pagination = 'pagination',
  Expanded = 'expanded',
}

export interface GenericTableProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  tableMode?: TableMode;
  rowsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  filterFunction?: (data: T[], searchTerm: string) => T[];
  shouldSort?: boolean;
  shouldSelectRows?: boolean;
  onDeleteSelectedRows?: (selectedRows: T[]) => void;
  summaryRows?: SummeryRow[];
}

export function GenericTable<T extends { id: number }>({
  columns,
  data,
  tableMode = TableMode.Expanded,
  shouldSort,
  shouldSelectRows,
  onDeleteSelectedRows,
  summaryRows,
  ...props
}: GenericTableProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { sortedData, handleSort, sortColumn, sortDirection } =
    useTableSorting<T>({
      data: data,
      shouldSort: shouldSort ?? true,
    });

  const initialRowsPerPage =
    tableMode === TableMode.Expanded
      ? TEXTS.INITIAL_COLLAPSED_PAGE_ROWS
      : props.rowsPerPage || TEXTS.INITIAL_PAGE_ROWS;

  const {
    page = TEXTS.INITIAL_TABLE_PAGE,
    rowsPerPage = props.rowsPerPage || TEXTS.INITIAL_PAGE_ROWS,
    handleChangePage,
    paginatedData,
  } = useTablePagination<T>({
    initialPage: TEXTS.INITIAL_TABLE_PAGE,
    rowsPerPage: initialRowsPerPage,
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

  console.log(paginatedData());
  let displayData: T[] = [];

  if (tableMode === TableMode.Pagination) {
    displayData = paginatedData();
  } else if (tableMode === TableMode.Expanded && !isExpanded) {
    displayData = paginatedData();
  } else {
    displayData = sortedData;
  }

  const exportToExcel = (fileName = 'data', sheetName = 'Sheet1') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <TableContainer component={Paper} {...props}>
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
      <Table sx={{ minWidth: 320 }}>
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
        />
      </Table>
      {tableMode === TableMode.Expanded && (
        <Button
          size='small'
          variant='text'
          sx={{
            marginTop: 2,
            marginBottom: 2,
            color: COLORS.BUTTON_PRIMARY,
            outline: 'none',
            display: 'block',
            fontWeight: 700,
            margin: '0 auto',
            border: 'none',
            '&.MuiButton-text': {
              outline: 'none',
            },
            '&.MuiButtonBase-root :hover': {
              'background-color': 'red',
            },
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? TEXTS.SHOW_LESS : TEXTS.SHOW_MORE}
        </Button>
      )}
      {tableMode === TableMode.Pagination && (
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
