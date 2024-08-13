import { Pagination, PaginationItem } from '@mui/material';
import { COLORS } from '../constants/constants';

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
            color: COLORS.TABLE_SECONDARY,
            '&:hover': {
              background: 'none',
            },
            '&.Mui-selected': {
              background: 'none',
              border: 'none',
            },
            '&.MuiPaginationItem-root': {
              background: 'none',
              border: 'none',
            },
            '&.Mui-disabled': {
              color: 'gray',
              background: 'none',
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
