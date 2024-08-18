import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import GenericModal, { GenericModalProps } from './GenericModal';

export default {
  title: 'Components/GenericModal',
  component: GenericModal,
} as Meta;

const Template: Story<GenericModalProps> = (args) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
      setOpen(false);
  }

  return (
    <>
      <GenericModal {...args} open={open} onClose={handleClose}>
        <div>This is the modal content</div>
      </GenericModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
};
