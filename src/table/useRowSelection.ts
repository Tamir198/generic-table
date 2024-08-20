import { useState } from 'react';

interface Row {
  id: number;
}

interface UseRowSelectionProps<T extends Row> {
  data: T[];
  onDeleteSelectedRows?: (selectedRows: T[]) => void;
}

export function useRowSelection<T>({
  data,
  onDeleteSelectedRows,
}: UseRowSelectionProps<T>) {
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());

  const handleRowSelect = (id: number) => {
    setSelectedRowIds((prevSelectedRowIds) => {
      const newSelectedRowIds = new Set(prevSelectedRowIds);

      if (newSelectedRowIds.has(id)) {
        newSelectedRowIds.delete(id);
      } else {
        newSelectedRowIds.add(id);
      }
      return newSelectedRowIds;
    });
  };

  const handleSelectAllRows = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedRowIds(new Set(data.map((item) => item.id)));
    } else {
      setSelectedRowIds(new Set());
    }
  };

  const handleDeleteSelectedRows = () => {
    const selectedRows = data.filter((item) => selectedRowIds.has(item.id));
    onDeleteSelectedRows && onDeleteSelectedRows(selectedRows);
    setSelectedRowIds(new Set());
  };

  return {
    selectedRows: selectedRowIds,
    handleRowSelect,
    handleSelectAllRows,
    handleDeleteSelectedRows,
  };
}
