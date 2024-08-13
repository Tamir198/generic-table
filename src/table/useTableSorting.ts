import { useMemo, useState } from 'react';
import { SortDirections } from '../types';

interface UseTableSortingProps<T> {
  data: T[];
  shouldSort: boolean;
}

export function useTableSorting<T>({
  data,
  shouldSort,
}: UseTableSortingProps<T>) {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<SortDirections>(
    SortDirections.ASC
  );  

  const sortedData = useMemo(() => {
    if (!shouldSort || !sortColumn) return data;

    const sortOrder = sortDirection === SortDirections.ASC ? 1 : -1;

    const compareValues = (a: T, b: T) => {
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];
      if (aValue < bValue) return -1 * sortOrder;
      if (aValue > bValue) return 1 * sortOrder;
      return 0;
    };

    return [...data].sort(compareValues);
  }, [data, sortColumn, sortDirection, shouldSort]);

  const handleSort = (property: string) => {
    const isAscending =
      sortColumn === property && sortDirection === SortDirections.ASC;
    setSortColumn(property);
    setSortDirection(isAscending ? SortDirections.DESC : SortDirections.ASC);
  };

  return { sortedData, handleSort, sortColumn, sortDirection };
}
