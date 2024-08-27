import { Meta, StoryObj } from "@storybook/react";
import {
  TableWithAbilities,
  TableWithAbilitiesProps,
} from "./TableWithAbilities";

const meta: Meta<TableWithAbilitiesProps> = {
  title: "Components/TableWithAbilities",
  component: TableWithAbilities,
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
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<TableWithAbilitiesProps> = {
  render: (args) => <TableWithAbilities {...args} />,
};
