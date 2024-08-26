import { Meta, StoryObj } from "@storybook/react";
import {
  TableWithAbilities,
  TableWithAbilitiesProps,
} from "./TableWithAbilities";

const meta: Meta<TableWithAbilitiesProps> = {
  title: "Components/TableWithAbilities",
  component: TableWithAbilities,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<TableWithAbilitiesProps> = {
  render: (args) => <TableWithAbilities {...args} />,
};
