import { FC, useMemo, useState } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { columns, data as originalData } from "./mockData";
import { TableFilters } from "../TableFilters/TableFilters.1";
import { TableSearchRow } from "./TableSearchRow";

export interface TableWithAbilitiesProps {}

export const TableWithAbilities: FC<TableWithAbilitiesProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  type FilterValue = string | number | null;

  const filteredData = useMemo(() => {
    return originalData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, originalData]);

  const onSelectChanged = (value: FilterValue) => {
    console.log("Filter value:", value);
    return filteredData;
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
          onBailStatusChange={onSelectChanged}
          onBailTypeChange={onSelectChanged}
          onCoinTypeChange={onSelectChanged}
        />
      )}
      <GenericTable
        columns={columns}
        data={filteredData}
        onDeleteSelectedRows={() => {}}
        onPageChange={(page) => {
          //page will be (curentTablePage -1) because arrays start with 0 not 1
          //And we want to search per page
          console.log(page);
        }}
        shouldSelectRows
        tableMode={TableMode.Pagination}
      />
    </>
  );
};
