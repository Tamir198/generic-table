import {
  DateFilterOption,
  MultiOptionValue,
  OptionValue,
  TableColumn,
} from "../../types";

export interface Data {
  email: string;
  id: number;
  name: string;
  status: string;
  money?: string;
}

export const columns: TableColumn<Data>[] = [
  {
    id: "name",
    isColumnPaintable: true,
    label: "שם",
  },
  {
    id: "email",
    label: "אימייל",
  },
  {
    id: "status",
    label: "סטטוס",
  },
];
export const data: Data[] = [
  { email: "johnaaaexample.com", id: 1, name: "ג'ון דו", status: "פעיל" },
  { email: "jane@example.com", id: 2222, name: "ג'ין סמית", status: "מוקפא" },
  { email: "sam@example.com", id: 3, name: "סם בראון", status: "פעיל" },
  { email: "emily@example.com", id: 4, name: "אמי ג'ונסון", status: "מוקפא" },
  { email: "michael@example.com", id: 5, name: "מייקל לי", status: "פעיל" },
  { email: "anna@example.com", id: 6, name: "אנה טיילור", status: "מוקפא" },
  { email: "yossi@example.com", id: 7, name: "יוסי כהן", status: "פעיל" },
  { email: "miah@example.com", id: 8, name: "מיה לוי", status: "מוקפא" },
  { email: "daniel@example.com", id: 9, name: "דניאל ברק", status: "פעיל" },
  { email: "noa@example.com", id: 10, name: "נויה פרידמן", status: "מוקפא" },
  { email: "oren@example.com", id: 11, name: "אורן גלעד", status: "פעיל" },
  { email: "ayala@example.com", id: 12, name: "איילה סלע", status: "מוקפא" },
  { email: "tomer@example.com", id: 13, name: "תומר רז", status: "פעיל" },
  { email: "miah.oz@example.com", id: 14, name: "מיה עוז", status: "מוקפא" },
  { email: "adi@example.com", id: 15, name: "עדי אבן", status: "פעיל" },
  { email: "avigail@example.com", id: 17, name: "אביגיל בר", status: "פעיל" },
  { email: "alon@example.com", id: 18, name: "אלון ניר", status: "מוקפא" },
  { email: "yifat@example.com", id: 19, name: "יפעת שלם", status: "פעיל" },
  { email: "guy@example.com", id: 20, name: "גיא אלמוג", status: "מוקפא" },
  { email: "orli@example.com", id: 21, name: "אורלי פרץ", status: "פעיל" },
  { email: "roni@example.com", id: 22, name: "רוני דמרי", status: "מוקפא" },
  { email: "gilad@example.com", id: 23, name: "גלעד יוספי", status: "פעיל" },
  { email: "noa.k@example.com", id: 24, name: "נועה קיסר", status: "מוקפא" },
  { email: "yuval@example.com", id: 25, name: "יובל מזרחי", status: "פעיל" },
  { email: "hadar@example.com", id: 26, name: "הדר קדם", status: "מוקפא" },
  { email: "omer@example.com", id: 27, name: "עומר שור", status: "פעיל" },
  { email: "mital@example.com", id: 28, name: "מיטל רפאל", status: "מוקפא" },
  { email: "maor@example.com", id: 29, name: "מאור ברזילי", status: "פעיל" },
  { email: "roni.levi@example.com", id: 30, name: "רוני לוי", status: "מוקפא" },
  { email: "tamar@example.com", id: 31, name: "תמר אהרון", status: "פעיל" },
  { email: "nimrod@example.com", id: 32, name: "נמרוד גפן", status: "מוקפא" },
];

//MOCK DATA WITH DATE COLUMN
export interface DataWithDate extends Data {
  date: string;
  isFilterable?: boolean;
}

const getRandomDate = (startDate: Date, endDate: Date): Date => {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp =
    Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  return new Date(randomTimestamp);
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const startDate = new Date("2023-01-01");
const endDate = new Date("2024-12-31");

export const dataWithDate: DataWithDate[] = data.map((item) => ({
  ...item,
  isFilterable: true,
  date: formatDate(getRandomDate(startDate, endDate)),
}));

export function filterTableDataBySelects<T>(
  data: T[],
  filters: { [key in keyof T]?: string | number | Array<string | number> }
): T[] {
  return data.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof T];

      if (Array.isArray(filterValue)) {
        return filterValue.includes(item[key as keyof T]);
      }

      if (typeof filterValue === "string" || typeof filterValue === "number") {
        const itemValue = item[key as keyof T]?.toString().toLowerCase();
        return itemValue.includes(filterValue.toString().toLowerCase());
      }

      return true;
    });
  });
}

export const columnsWithDate: TableColumn<DataWithDate>[] = [
  {
    id: "name",
    isColumnPaintable: true,
    label: "שם",
    isFilterable: true,
    filterSelectOptions: ["ג", "6", "7", "8"],
    isColumMultySelectable: true,
  },
  {
    id: "email",
    label: "אימייל",
    isFilterable: true,
    filterSelectOptions: ["@", "6", "7", "8"],
  },
  {
    id: "status",
    label: "סטטוס",
    isFilterable: true,
    filterSelectOptions: ["מוקפא", "פעיל", "30", "40"],
  },
  {
    id: "date",
    label: "תאריך",
    isFilterable: true,
    dateFilterOption: DateFilterOption.BeforeDate,
    filterSelectOptions: ["9", "20", "30", "40"],
  },
];
