// src/stories/MoreOptionTooltip.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MoreOptionTooltip } from "./MoreOptionTooltip";
import { TEXTS } from "../constants/constants";
import { MoreOptions } from "./MoreOptions";

const meta: Meta<typeof MoreOptionTooltip> = {
  title: "Components/Tooltip",
  component: MoreOptionTooltip,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onEdit: { action: "edit clicked" },
    onDownload: { action: "download clicked" },
  },
} satisfies Meta<typeof MoreOptionTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div>
      <MoreOptionTooltip
        onEdit={() => {
          alert("Trigger edit click");
        }}
        onDownload={() => {
          alert("Trigger download function");
        }}
      />
    </div>
  ),
  args: {
    onEdit: () => alert("Trigger edit click"),
    onDownload: () => alert("Trigger download function"),
  },
};
