import { FC, useMemo, useState } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { columns, data as originalData } from "./mockData";
import { TableFilters } from "../TableFilters/TableFilters.1";
import { TableSearchRow } from "./TableSearchRow";

export interface TableWithAbilitiesProps {}

export const TableWithAbilities: FC<TableWithAbilitiesProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return originalData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, originalData]);

  return (
    <>
      <TableSearchRow
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <TableFilters />
      <GenericTable
        columns={columns}
        data={filteredData}
        onDeleteSelectedRows={() => {}}
        shouldSelectRows
        tableMode={TableMode.Pagination}
      />
    </>
  );
};
