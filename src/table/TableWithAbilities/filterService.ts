export const filterAllData = (
  data: object[],
  filters: Record<string, string | number | (string | number)[]>
) => {
  //TODO support dates type (to and from date, before and after)
  return data.filter((item) => {
    return Object.entries(filters).every(([key, filterValue]) => {
      const itemValue = item[key];

      if (Array.isArray(filterValue)) {
        return itemValue.includes(filterValue);
      }
      //TODO check that this function
      //is actually working on string and not array
      return itemValue === filterValue;
    });
  });
};
