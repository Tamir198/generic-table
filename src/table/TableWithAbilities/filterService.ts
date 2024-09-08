import { DateFilterOption } from "../../types";

export const filterAllData = (
  data: object[],
  filters: Record<string, string | number | (string | number)[]>,
  dateFilterOption?: DateFilterOption
) => {
  return data.filter((item) => {
    if (dateFilterOption) {
      console.log(dateFilterOption);
    }

    return Object.entries(filters).every(([key, filterValue]) => {
      const itemValue = item[key];

      if (Array.isArray(filterValue)) {
        return itemValue.includes(filterValue);
      }
      return itemValue === filterValue;
    });
  });
};
