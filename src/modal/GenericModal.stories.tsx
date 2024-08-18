import  { useState } from 'react';
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
        <h1>Some title in the modal</h1>
        <h2>This is the modal content</h2>
        <p>Test test test </p>
        <p>Test test test </p>
      </GenericModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
};
