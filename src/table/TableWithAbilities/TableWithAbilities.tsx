import { FC, useState, useEffect } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { TableSearchRow } from "./TableSearchRow";
import { TEXTS } from "../../constants/constants";
import { ExcelFileType, TableColumn, TableFiltersState } from "../../types";
import { TableFilters } from "../TableFilters/TableFilters";
import { exportToExcel } from "../../services/dataExportService";
import { inferTypesFromObject } from "../../utils/inferTypesFromObject";
import { storageService } from "./storageService";
import { filterAllData } from "./filterService";

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
    const sessionData = storageService.getSessionParams() as {
      tableFilters?: TableFiltersState;
    };

    if (sessionData?.tableFilters) {
      const {
        searchQuery = "",
        showFilters = false,
        currentPage = 0,
        filters = {},
      } = sessionData.tableFilters;

      setSearchQuery(searchQuery);
      setShowFilters(showFilters);
      setCurrentPage(currentPage);

      setSelectedFilters(filters);
    }
  }, []);

  useEffect(() => {
    const updatedFilters = { ...selectedFilters };

    storageService.addSessionParams({
      tableFilters: {
        searchQuery,
        showFilters,
        currentPage,
        filters: updatedFilters,
      },
    });

    const newData = filterAllData(data, updatedFilters);
    setFilteredData(newData);
  }, [searchQuery, showFilters, currentPage, selectedFilters, data]);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFilters({});
    setCurrentPage(0);
    setFilteredData(data);

    storageService.addSessionParams({
      tableFilters: {
        searchQuery: "",
        showFilters: false,
        currentPage: 0,
        filters: {},
      },
    });
  };

  const handleExport = (fileType: ExcelFileType) => {
    if (fileType === ExcelFileType.FULL_FILE) {
      exportToExcel(data);
    } else {
      exportToExcel(filteredData);
    }
  };

  const handleFilterChange = (newFilteredData: any[], filters: object) => {
    setFilteredData(newFilteredData);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      ...filters,
    }));
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
          selectedFilters={selectedFilters}
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
