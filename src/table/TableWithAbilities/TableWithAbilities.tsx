import { FC, useState, useEffect } from 'react';
import { GenericTable, TableMode } from '../GenericTable';
import { columns, data as originalData } from './mockData';
import { TableSearchRow } from './TableSearchRow';
import { TEXTS } from '../../constants/constants';
import { ExcelFileType, SelectOptions } from '../../types';
import { getQueryParams, setQueryParams } from './queryParamsService';
import { TableFilters } from '../TableFilters/TableFilters';
import { exportToExcel } from '../../services/dataExportService';

export interface TableWithAbilitiesProps {}

const ROWS_PER_PAGE = TEXTS.INITIAL_PAGE_ROWS;

export const TableWithAbilities: FC<TableWithAbilitiesProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState(originalData);
  const [bailStatus, setBailStatus] = useState<SelectOptions>(null);
  const [bailType, setBailType] = useState<SelectOptions>(null);
  const [coinType, setCoinType] = useState<SelectOptions>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const {
      searchQuery,
      showFilters,
      bailStatus,
      bailType,
      coinType,
      currentPage,
    } = getQueryParams();

    setSearchQuery(searchQuery);
    setShowFilters(showFilters);
    setBailStatus(bailStatus);
    setBailType(bailType);
    setCoinType(coinType);
    setCurrentPage(currentPage);
  }, []);

  useEffect(() => {
    setQueryParams(
      searchQuery,
      showFilters,
      bailStatus,
      bailType,
      coinType,
      currentPage
    );
    filterData();
  }, [searchQuery, showFilters, bailStatus, bailType, coinType, currentPage]);

  const filterData = () => {
    let filtered = originalData;

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

    if (bailStatus) {
      filtered = filtered.filter((item) =>
        ['א'].some((letter) => item.name.includes(letter))
      );
    }

    if (bailType) {
      filtered = filtered.filter((item) =>
        ['ב'].some((letter) => item.name.includes(letter))
      );
    }

    if (coinType) {
      filtered = filtered.filter((item) =>
        ['ג'].some((letter) => item.name.includes(letter))
      );
    }

    setFilteredData(filtered);
  };

  const onBailStatusChange = (value: string | number) => {
    if (value === TEXTS.ALL_TYPES) {
      setBailStatus(null);
    } else {
      setBailStatus(value);
    }
  };

  const onBailTypeChange = (values: string[]) => {
    if (values.includes(TEXTS.ALL_TYPES) || values.length == 0) {
      setBailType(null);
    } else {
      setBailType(values);
    }
  };

  const onCoinTypeChange = (values: string[]) => {
    if (values.includes(TEXTS.ALL_TYPES) || values.length == 0) {
      setCoinType(null);
    } else {
      setCoinType(values);
    }
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setBailStatus(null);
    setBailType(null);
    setCoinType(null);
    setCurrentPage(0);
    setFilteredData(originalData);
  };

  const handleExport = (fileType: ExcelFileType) => {
    if (fileType == ExcelFileType.FULL_FILE) {
      exportToExcel(originalData);
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
      />
      {showFilters && (
        <TableFilters
          onBailStatusChange={onBailStatusChange}
          onBailTypeChange={onBailTypeChange}
          onCoinTypeChange={onCoinTypeChange}
          clearFilters={clearFilters}
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
