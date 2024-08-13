import { useState } from 'react';

interface UseTablePaginationParams<T> {
  initialPage?: number;
  initialRowsPerPage?: number;
  data: T[];
}

export function useTablePagination<T>({
  initialPage,
  initialRowsPerPage,
  data,
}: UseTablePaginationParams<T>) {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent | null,
    newPage: number
  ) => {
    setPage(newPage);
  };


  const paginatedData = () => {
    if (page === undefined || rowsPerPage === undefined) {
      return data;
    }
    const startIndex = page * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    paginatedData,
  };
}
