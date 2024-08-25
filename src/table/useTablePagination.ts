import { useState } from "react";

interface UseTablePaginationParams<T> {
  initialPage?: number;
  rowsPerPage?: number;
  data: T[];
  onPageChange?: (newPage: number) => void;
}

export function useTablePagination<T>({
  initialPage,
  rowsPerPage = 5,
  data,
  onPageChange,
}: UseTablePaginationParams<T>) {
  const [page, setPage] = useState(initialPage);

  const handleChangePage = (
    event: React.MouseEvent | null,
    newPage: number
  ) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
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
