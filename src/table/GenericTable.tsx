import { useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { SummeryRow, TableColumn } from "../types";
import { Button } from "@mui/material";
import { TablePagination } from "./TablePagination";
import { TableBodyContent } from "./TableBodyContent";
import { TableHeader } from "./TableHeader";
import { useTablePagination } from "./useTablePagination";
import { useTableSorting } from "./useTableSorting";
import { useRowSelection } from "./useRowSelection";
import { COLORS, TEXTS } from "../constants/constants";
import { SummeryRows } from "./SummeryRows";

export enum TableMode {
  Pagination = "pagination",
  Expanded = "expanded",
}

export interface GenericTableProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  tableMode?: TableMode;
  rowsPerPage?: number;
  shouldSort?: boolean;
  shouldSelectRows?: boolean;
  onDeleteSelectedRows?: (selectedRows: T[]) => void;
  summaryRows?: SummeryRow[];
  onPageChange?: (newPage: number) => void;
  shouldDisplayFullTable?: boolean;
  shouldDisplayRowMoreOption?: boolean;
  direction?: string;
  bodyCellsBordercolor?: string;
  headerBrdercolor?: string;
}

export function GenericTable<T extends { id: number }>({
  columns,
  data,
  tableMode = TableMode.Expanded,
  shouldSort,
  shouldSelectRows,
  onDeleteSelectedRows,
  summaryRows,
  direction = "rtl",
  onPageChange,
  shouldDisplayFullTable = false,
  shouldDisplayRowMoreOption,
  bodyCellsBordercolor,
  headerBrdercolor,
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
    onPageChange,
  });

  const {
    selectedRows,
    handleRowSelect,
    handleSelectAllRows,
    handleDeleteSelectedRows,
  } = useRowSelection<T>({
    data: tableMode === TableMode.Pagination ? paginatedData() : sortedData,
    onDeleteSelectedRows: onDeleteSelectedRows,
  });

  let displayData: T[] = [];

  if (shouldDisplayFullTable) {
    displayData = sortedData;
  } else if (tableMode === TableMode.Pagination) {
    displayData = paginatedData(); //todo remove this check
  } else if (tableMode === TableMode.Expanded && !isExpanded) {
    displayData = paginatedData();
  } else {
    displayData = sortedData;
  }

  return (
    <TableContainer
      sx={{ textAlign: "center" }}
      dir={direction}
      component={Paper}
      {...props}
    >
      {shouldSelectRows && (
        <Button
          variant="contained"
          color="secondary"
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
          shouldDisplayRowMoreOption={shouldDisplayRowMoreOption}
          bordercolor={headerBrdercolor}
        />
        <TableBodyContent
          columns={columns}
          data={displayData}
          shouldSelectRows={shouldSelectRows ?? true}
          selectedRows={selectedRows}
          onRowSelect={(id) => handleRowSelect(id)}
          shouldDisplayRowMoreOption={shouldDisplayRowMoreOption}
          bordercolor={bodyCellsBordercolor}
        />
      </Table>
      {tableMode === TableMode.Expanded && !shouldDisplayFullTable && (
        <Button
          size="small"
          variant="text"
          sx={{
            marginTop: 2,
            marginBottom: 2,
            color: COLORS.BUTTON_PRIMARY,
            outline: "none",
            display: "block",
            fontWeight: 700,
            margin: "0 auto",
            border: "none",
            "&.MuiButton-text": {
              outline: "none",
            },
            "&.MuiButtonBase-root :hover": {
              backgroundColor: "red",
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
