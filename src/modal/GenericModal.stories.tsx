import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import GenericModal, { GenericModalProps } from "./GenericModal";

const meta: Meta<typeof GenericModal> = {
  title: "Components/GenericModal",
  component: GenericModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof GenericModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: GenericModalProps) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <GenericModal {...args} open={open} onClose={handleClose}>
          <>
            <h1>Some title in the modal</h1>
            <h2>This is the modal content</h2>
          </>
        </GenericModal>
      </>
    );
  },
  args: {},
};
