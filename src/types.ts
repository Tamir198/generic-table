export interface TableColumn<T> {
  id: keyof T;
  label: string;
  align?: 'left' | 'right' | 'center';
  format?: (value: T[keyof T]) => React.ReactNode;
  renderCell?: (value: React.ReactNode, row: T) => React.ReactNode;
  isColumnPaintable?: boolean;
  isFilterable?: boolean;
}

export interface SummeryRow {
  label: string;
  value: string | number;
}

export type SelectOptions = string | number | null;

export enum SortDirections {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ExcelFileType {
  PARTIAL = 'partial',
  FULL_FILE = 'full file',
}

export type OptionValue = string | number;
export type MultiOptionValue = OptionValue[];
