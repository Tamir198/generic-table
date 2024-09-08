import { DateFilterOption } from "../../types";
import { storageService } from "./storageService";

export const filterAllData = (
  data: object[],
  filters: Record<string, string | number | (string | number)[]>,
  dateFilterOption?: DateFilterOption
) => {
  return data.filter((item) => {
    if (dateFilterOption) {
      const params = storageService.getSessionParams();
      const dates = params.tableFilters.filters.dates;
      const itemDateStr = item["date"] as string;
      const itemDate = parseDate(itemDateStr);

      const startDate = params?.tableFilters?.filters?.date?.startDate;
      console.log({ startDate: startDate });

      switch (dateFilterOption) {
        case DateFilterOption.BeforeDate:
          // console.log(item.date);
          // if (!checkIfBefore(itemDate, filterDate)) {
          //   return false;
          // }
          break;
        case DateFilterOption.AfterDate:
          // console.log(item.date);
          // if (!checkIfAfter(itemDate, filterDate)) {
          //   return false;
          // }
          break;
        //TODO handle between date scenario
        default:
          break;
      }
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

const checkIfBefore = (itemDate: Date, filterDate: Date): boolean => {
  return itemDate < filterDate;
};

const checkIfAfter = (itemDate: Date, filterDate: Date): boolean => {
  return itemDate > filterDate;
};

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};
