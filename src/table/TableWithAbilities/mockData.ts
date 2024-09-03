import { TableColumn } from "../../types";

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
  { email: "john@example.com", id: 1, name: "ג'ון דו", status: "פעיל" },
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

export const dataWithDate: DataWithDate[] = data.map((item) => ({
  ...item,
  isFilterable: true,
  date: new Date().toLocaleDateString("he-IL"),
}));

export const columnsWithDate: TableColumn<DataWithDate>[] = [
  {
    id: "name",
    isColumnPaintable: true,
    label: "שם",
    isFilterable: true,
    filterFunction: (data, _) => data.filter((item) => item.name.includes("א")),
    filterSelectOptions: ["1", "2", "3", "4"],
  },
  {
    id: "email",
    label: "אימייל",
    isFilterable: true,
    filterFunction: (data, _) => data.filter((item) => item.name.includes("ב")),
    filterSelectOptions: ["5", "6", "7", "8"],
  },
  {
    id: "status",
    label: "סטטוס",
    isFilterable: true,
    filterFunction: (data, filterValue) => {
      const filterSet = new Set(filterValue);
      return data.filter((item) => filterSet.has(item.status));
    },
    filterSelectOptions: ["9", "20", "30", "40"],
  },
  {
    id: "date",
    label: "תאריך",
    isFilterable: true,
    filterFunction: (data, filterValue) =>
      data.filter((item) => item.name.includes(filterValue)),
    filterSelectOptions: ["9", "20", "30", "40"],
  },
];
