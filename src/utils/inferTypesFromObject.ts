export const inferTypesFromObject = <T extends Record<string, any>>(
  data: T
): Record<keyof T, string> => {
  const columnTypes: Record<keyof T, string> = {} as Record<keyof T, string>;

  const getType = (value: any): string => {
    if (value instanceof Date) {
      return 'date';
    } else if (Array.isArray(value)) {
      return 'array';
    } else if (value === null) {
      return 'null';
    } else {
      return typeof value;
    }
  };

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      columnTypes[key as keyof T] = getType(data[key]);
    }
  }

  return columnTypes;
};
