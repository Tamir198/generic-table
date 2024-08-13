import { Pagination, PaginationItem } from '@mui/material';

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
          {...item}
          sx={{
            '&.Mui-selected': {
              background: 'white',
              border: 'none',
            },
          }}
        />
      )}
      siblingCount={1}
      boundaryCount={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    />
  );
}
