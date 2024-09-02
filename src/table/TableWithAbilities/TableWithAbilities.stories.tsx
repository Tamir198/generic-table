import { Meta, StoryObj } from "@storybook/react";
import {
  TableWithAbilities,
  TableWithAbilitiesProps,
} from "./TableWithAbilities";
import { columns, columnsWithDate, data, dataWithDate } from "./mockData";

type DataType = (typeof data)[0];
type DataWithDateType = (typeof dataWithDate)[number];

const meta: Meta<TableWithAbilitiesProps<DataType>> = {
  title: "Components/TableWithAbilities",
  component: TableWithAbilities,
  tags: ["autodocs"],
  args: {
    columns,
    data,
  },
};

export default meta;

export const WithQueryParams: StoryObj<TableWithAbilitiesProps<DataType>> = {
  render: (args) => <TableWithAbilities {...args} />,
  parameters: {
    query: {
      searchQuery: "א",
      showFilters: "true",
      bailStatus: "status1",
      bailType: "type1",
      coinType: "coin1",
      currentPage: "1",
    },
  },
};

export const WithoutQueryParams: StoryObj<TableWithAbilitiesProps<DataType>> = {
  render: (args) => <TableWithAbilities {...args} />,
  parameters: {
    query: {},
  },
};

export const AutoGeneratingSelects: StoryObj<
  TableWithAbilitiesProps<DataWithDateType>
> = {
  render: (args) => <TableWithAbilities {...args} />,
  args: {
    columns: columnsWithDate,
    data: dataWithDate,
  },
  parameters: {
    query: {},
  },
};
