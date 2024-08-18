import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

//TODO get the colors from the theme
const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'inline-flex',
  padding: '40px 60px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
  background: '#FFF',
  boxShadow: '0px 10.207px 61.241px 0px rgba(0, 0, 0, 0.05)',
  border: 'none'
}));

//TODO apply color on the icon modal from theme
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 8,
  top: 8,
}));

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, children, ...props }) => {
  return (
    <Modal open={open} onClose={onClose} {...props}>
      <StyledModalBox>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <StyledIconButton onClick={onClose} sx={{ position: 'absolute', left: 8, top: 8 }}>
            <CloseIcon />
          </StyledIconButton>
        </Box>
        {children}
      </StyledModalBox>
    </Modal>
  );
};

export default GenericModal;
