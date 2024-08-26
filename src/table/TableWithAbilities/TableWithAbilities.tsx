import { FC, useState, useEffect } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { columns, data as originalData } from "./mockData";
import { TableFilters } from "../TableFilters/TableFilters.1";
import { TableSearchRow } from "./TableSearchRow";
import { TEXTS } from "../../constants/constants";

export interface TableWithAbilitiesProps {}

type Select = string | number | null;
const ROWS_PER_PAGE = 8 || TEXTS.INITIAL_PAGE_ROWS;

export const TableWithAbilities: FC<TableWithAbilitiesProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState(originalData);

  const [bailStatus, setBailStatus] = useState<Select>(null);
  const [bailType, setBailType] = useState<Select>(null);
  const [coinType, setCoinType] = useState<Select>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const filterData = () => {
    const startIndex = currentPage * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    let currentPageRows = filteredData.slice(startIndex, endIndex);
    let filtered = originalData;
    filtered = filtered.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
    });

    //TODO the selct should filter all the data available
    if (bailStatus || bailType || coinType) {
      //   filtered = filtered.slice(1);
      return filtered.filter((item) =>
        ["א", "ב", "ג"].some((letter) => item.name.includes(letter))
      );
      setFilteredData(filtered);
      return;
    }

    setFilteredData(filtered);
  };
  useEffect(() => {
    filterData();
  }, [searchQuery, bailStatus, bailType, coinType, currentPage]);

  const onBailStatusChange = (value: string | number) => {
    setBailStatus(value);
  };

  const onBailTypeChange = (value: string | number) => {
    setBailType(value);
  };

  const onCoinTypeChange = (value: string | number) => {
    setCoinType(value);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  return (
    <>
      <TableSearchRow
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleFilters={toggleFilters}
      />
      {showFilters && (
        <TableFilters
          onBailStatusChange={onBailStatusChange}
          onBailTypeChange={onBailTypeChange}
          onCoinTypeChange={onCoinTypeChange}
        />
      )}
      <GenericTable
        columns={columns}
        data={filteredData}
        onDeleteSelectedRows={() => {}}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={(page) => {
          handlePageChange(page);
        }}
        shouldSelectRows
        tableMode={TableMode.Pagination}
      />
    </>
  );
};
