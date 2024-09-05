export const filterAllData = (
  data: object[],
  filters: Record<string, string | number | (string | number)[]>
) => {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, filterValue]) => {
      const itemValue = item[key];

      console.log({ key, filterValue, item });

      if (Array.isArray(filterValue)) {
        return itemValue.includes(filterValue);
      }
      //TODO check that this function
      //is actually working on string and not array
      return itemValue === filterValue;
    });
  });
};
