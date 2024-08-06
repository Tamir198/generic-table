import { useState } from 'react';

interface UseRowSelectionProps<T> {
  data: T[];
  onDeleteSelectedRows?: (selectedRows: T[]) => void;
}

export function useRowSelection<T>({
  data,
  onDeleteSelectedRows,
}: UseRowSelectionProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelect = (rowIndex: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(rowIndex)) {
        newSelectedRows.delete(rowIndex);
      } else {
        newSelectedRows.add(rowIndex);
      }
      return newSelectedRows;
    });
  };

  const handleSelectAllRows = (checked: boolean) => {
    const newSelectedRows = new Set<number>();
    if (checked) {
      data.forEach((_, index) => newSelectedRows.add(index));
    }
    setSelectedRows(newSelectedRows);
  };

  const handleDeleteSelectedRows = () => {
    if (onDeleteSelectedRows) {
      const rowsToDelete = Array.from(selectedRows).map((index) => data[index]);
      onDeleteSelectedRows(rowsToDelete);
      setSelectedRows(new Set());
    }
  };

  return {
    selectedRows,
    handleRowSelect,
    handleSelectAllRows,
    handleDeleteSelectedRows,
  };
}
