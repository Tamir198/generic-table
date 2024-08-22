import { FC } from "react";
import { GenericTable, TableMode } from "../GenericTable";
import { columns, data } from "./mockData";
import { TableFilters } from "../TableFilters/TableFilters.1";
import { TableSearchRow } from "./TableSearchRow";

export interface TableWithAbilitiesProps {}

export const TableWithAbilities: FC<TableWithAbilitiesProps> = () => {
  return (
    <>
      <TableSearchRow />
      <TableFilters />
      <GenericTable
        columns={columns}
        data={data}
        onDeleteSelectedRows={() => {}}
        shouldSelectRows
        tableMode={TableMode.Pagination}
      />
    </>
  );
};
