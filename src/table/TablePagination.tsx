import { Pagination, PaginationItem } from "@mui/material";
import { COLORS } from "../constants/constants";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface TablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

export function TablePagination({
  count,
  page,
  rowsPerPage,
  handleChangePage,
}: TablePaginationProps) {
  return (
    <Pagination
      count={Math.ceil(count / rowsPerPage)}
      page={page + 1}
      onChange={(event, newPage) => {
        handleChangePage(event, newPage - 1);
      }}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowForward, next: ArrowBack }}
          {...item}
          sx={{
            color: COLORS.TABLE_SECONDARY,
            "&.Mui-selected": {
              border: "none",
              outline: "none",
              fontWeight: "bold",
            },
            "&.MuiPaginationItem-root": {
              background: "none",
              outline: "none",
              direction: "rtl",
            },
            "&.Mui-disabled": {
              color: "gray",
            },
            "&.Mui-selected:hover": {
              background: "none",
              border: "none",
              outline: "none",
            },
          }}
        />
      )}
      siblingCount={1}
      boundaryCount={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        direction: "rtl",
      }}
    />
  );
}
