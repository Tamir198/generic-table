export interface TableColumn<T> {
  id: keyof T;
  label: string;
  align?: 'left' | 'right' | 'center';
  format?: (value: T[keyof T]) => React.ReactNode;
  renderCell?: (value: React.ReactNode, row: T) => React.ReactNode;
}

export enum SortDirections {
  ASC = 'asc',
  DESC = 'desc',
}
