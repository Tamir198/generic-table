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
              border: 'none',
              outline: 'none',
            },
            '&.Mui-selected': {
              background: 'none',
              border: 'none',
              outline: 'none',
            },
            '&.MuiPaginationItem-root': {
              background: 'none',
              border: 'none',
              outline: 'none',
              direction: 'ltr',
            },
            '&.Mui-disabled': {
              color: 'gray',
              background: 'none',
              border: 'none',
            },
            '&.Mui-selected:hover': {
              background: 'none',
              border: 'none',
              outline: 'none',
            },
          }}
        />
      )}
      siblingCount={1}
      boundaryCount={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        direction: 'rtl',
      }}
    />
  );
}
