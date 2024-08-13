export interface TableColumn<T> {
  id: keyof T;
  label: string;
  align?: 'left' | 'right' | 'center';
  format?: (value: T[keyof T]) => React.ReactNode;
  renderCell?: (value: React.ReactNode, row: T) => React.ReactNode;
  isColumnPaintable?: boolean;
}

export enum SortDirections {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SummeryRow {
  label: string;
  value: string | number;
}
