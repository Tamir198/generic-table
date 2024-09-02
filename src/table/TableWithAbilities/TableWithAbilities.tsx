import { FC, useState, useEffect } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { TableColumn } from "./mockData";
import { TableSearchRow } from "./TableSearchRow";
import { TEXTS } from "../../constants/constants";
import { ExcelFileType } from "../../types";
import { getQueryParams, setQueryParams } from "./queryParamsService";
import { TableFilters } from "../TableFilters/TableFilters";
import { exportToExcel } from "../../services/dataExportService";
import { inferTypesFromObject } from "../../utils/inferTypesFromObject";

export interface TableWithAbilitiesProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

const ROWS_PER_PAGE = TEXTS.INITIAL_PAGE_ROWS;

export const TableWithAbilities: FC<TableWithAbilitiesProps<any>> = ({
  data,
  columns,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const { searchQuery, showFilters, currentPage } = getQueryParams();

    setSearchQuery(searchQuery);
    setShowFilters(showFilters);
    setCurrentPage(currentPage);
  }, [filteredData]);

  useEffect(() => {
    setQueryParams(searchQuery, showFilters, currentPage);
    filterData();
  }, [searchQuery, showFilters, currentPage]);

  const filterData = () => {
    let filtered = data;

    const startIndex = currentPage * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentPageRows = filtered.slice(startIndex, endIndex);

    const filteredCurrentPageRows = currentPageRows.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setCurrentPage(0);
    setFilteredData(data);
  };

  const handleExport = (fileType: ExcelFileType) => {
    if (fileType == ExcelFileType.FULL_FILE) {
      exportToExcel(data);
      return;
    }
    exportToExcel(filteredData);
  };

  return (
    <>
      <TableSearchRow
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleFilters={toggleFilters}
        onDataExport={handleExport}
        data={filteredData}
      />
      {showFilters && (
        <TableFilters
          clearFilters={clearFilters}
          columnTypes={inferTypesFromObject(filteredData[0])}
          columns={columns}
          data={filteredData}
          onFilterChange={setFilteredData}
        />
      )}

      <GenericTable
        columns={columns}
        data={filteredData}
        onDeleteSelectedRows={() => {}}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={handlePageChange}
        shouldSelectRows
        tableMode={TableMode.Pagination}
      />
    </>
  );
};
