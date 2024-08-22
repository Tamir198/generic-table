// src/stories/MoreOptionTooltip.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { MoreOptionTooltip } from "./MoreOptionTooltip";
import { GenericTooltip } from "../tooltip/GenericTooltip";

const meta: Meta<typeof MoreOptionTooltip> = {
  title: "Components/GenericTooltip",
  component: MoreOptionTooltip,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MoreOptionTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <GenericTooltip title="Title">
        <p style={{ display: "flex", justifyContent: "center" }}>Hover me</p>
      </GenericTooltip>
    </div>
  ),
  args: {
    onEdit: () => alert("Trigger edit click"),
    onDownload: () => alert("Trigger download function"),
  },
};
