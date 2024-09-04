import { FC, useState, useEffect } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { TableSearchRow } from "./TableSearchRow";
import { TEXTS } from "../../constants/constants";
import { ExcelFileType, TableColumn } from "../../types";
import { TableFilters } from "../TableFilters/TableFilters";
import { exportToExcel } from "../../services/dataExportService";
import { inferTypesFromObject } from "../../utils/inferTypesFromObject";
import { storageService } from "./storageService";

//TODO sync up storage service with the clear all button of the table
export interface TableWithAbilitiesProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

const ROWS_PER_PAGE = TEXTS.INITIAL_PAGE_ROWS;

export const TableWithAbilities: FC<TableWithAbilitiesProps<any>> = ({
  data,
  columns,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<object>({});

  useEffect(() => {
    const {
      searchQuery = "",
      showFilters = "false",
      currentPage = "0",
      filters = {},
    } = storageService.getSessionParams();

    setSearchQuery(searchQuery as string);
    setShowFilters(showFilters === "true");
    setCurrentPage(Number(currentPage));
    setSelectedFilters(filters);
  }, [data]);

  useEffect(() => {
    storageService.addSessionParams({
      searchQuery,
      showFilters,
      currentPage,
      filters: selectedFilters,
    });

    filterData();
  }, [searchQuery, showFilters, currentPage, selectedFilters]);

  const filterData = () => {
    let filtered = data;

    const startIndex = currentPage * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentPageRows = filtered.slice(startIndex, endIndex);

    if (searchQuery) {
      filtered = filtered.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    for (const [key, value] of Object.entries(selectedFilters)) {
      const column = columns.find((col) => col.id === key);
      if (column?.filterFunction) {
        filtered = column.filterFunction(filtered, value);
      }
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
    setSelectedFilters({});
    storageService.addSessionParams({
      searchQuery: "",
      showFilters: false,
      currentPage: 0,
      filters: {},
    });
    setFilteredData(data);
  };

  const handleExport = (fileType: ExcelFileType) => {
    if (fileType === ExcelFileType.FULL_FILE) {
      exportToExcel(data);
      return;
    }
    exportToExcel(filteredData);
  };

  const handleFilterChange = (newFilteredData: any[], filters: object) => {
    setFilteredData(newFilteredData);
    setSelectedFilters(filters);
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
          onFilterChange={handleFilterChange}
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
