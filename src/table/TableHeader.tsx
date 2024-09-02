import {
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  TableCell as MuiTableCell,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TableColumn, SortDirections } from "../types";
import { COLORS } from "../constants/constants";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortColumn: string;
  sortDirection: SortDirections;
  handleSort: (property: string) => void;
  shouldSort: boolean;
  shouldSelectRows?: boolean;
  onSelectAllRows?: (checked: boolean) => void;
  shouldDisplayRowMoreOption?: boolean;
  bordercolor?: string;
}

export function TableHeader<T>({
  columns,
  sortColumn,
  sortDirection,
  handleSort,
  shouldSort,
  shouldSelectRows = true,
  shouldDisplayRowMoreOption,
  bordercolor = "#DCDCDC",
}: TableHeaderProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {shouldSelectRows && (
          <StyledTableCell padding="checkbox" bordercolor={bordercolor} />
        )}
        {columns.map((column) => (
          <StyledTableCell
            key={column.id.toString()}
            bordercolor={bordercolor}
            sortDirection={
              shouldSort && sortColumn === column.id ? sortDirection : false
            }
          >
            {shouldSort ? (
              <TableSortLabel
                active={sortColumn === column.id}
                direction={
                  sortColumn === column.id ? sortDirection : SortDirections.ASC
                }
                onClick={() => handleSort(column.id)}
              >
                <Typography sx={{ color: COLORS.TABLE_HEADER }}>
                  {column.label}
                </Typography>
              </TableSortLabel>
            ) : (
              column.label
            )}
          </StyledTableCell>
        ))}

        {shouldDisplayRowMoreOption && (
          <StyledTableCell bordercolor={bordercolor} />
        )}
      </TableRow>
    </TableHead>
  );
}

const StyledTableCell = styled(MuiTableCell)<{ bordercolor?: string }>(
  ({ bordercolor = "#DCDCDC" }) => ({
    direction: "rtl",
    textAlign: "right",
    borderBottom: `1px solid ${bordercolor}`,
  })
);
