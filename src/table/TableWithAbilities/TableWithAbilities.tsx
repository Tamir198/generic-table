import { FC, useState, useEffect } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { columns, data as originalData } from "./mockData";
import { TableFilters } from "../TableFilters/TableFilters.1";
import { TableSearchRow } from "./TableSearchRow";

export interface TableWithAbilitiesProps {}

export const TableWithAbilities: FC<TableWithAbilitiesProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [bailStatus, setBailStatus] = useState<string | number | null>(null);
  const [bailType, setBailType] = useState<string | number | null>(null);
  const [coinType, setCoinType] = useState<string | number | null>(null);
  const [filteredData, setFilteredData] = useState(originalData);

  const filterData = () => {
    let filtered = originalData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    //TODO - insert reall search functionality according to demand
    //TODO check why this is only working on first time the select is chagning
    if (bailStatus) {
      filtered = [...filtered.slice(1)];

      if (bailType) {
        filtered = [...filtered.slice(1)];
      }

      if (coinType) {
        filtered = [...filtered.slice(1)];
      }
    }
    setFilteredData(filtered);
  };
  useEffect(() => {
    filterData();
  }, [searchQuery, bailStatus, bailType, coinType]);

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
        onPageChange={(page) => {
          console.log(page);
        }}
        shouldSelectRows
        tableMode={TableMode.Pagination}
      />
    </>
  );
};
