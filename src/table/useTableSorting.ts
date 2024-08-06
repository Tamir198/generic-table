import { useMemo } from 'react';
import { SortDirections } from '../types';

interface UseTableSortingProps<T> {
  data: T[];
  sortColumn: string;
  sortDirection: SortDirections;
  shouldSort: boolean;
}

export function useTableSorting<T>({
  data,
  sortColumn,
  sortDirection,
  shouldSort,
}: UseTableSortingProps<T>) {
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

  return sortedData;
}
