export const filterAllData = (
  data: object[],
  filters: Record<string, string | number | (string | number)[]>
) => {
  return data.filter((item) => {
    console.log(item);

    return Object.entries(filters).every(([key, filterValue]) => {
      const itemValue = item[key];

      if (Array.isArray(filterValue)) {
        return itemValue.includes(filterValue);
      }
      return itemValue === filterValue;
    });
  });
};
