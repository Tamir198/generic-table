import React from "react";
import { Modal, Box, IconButton, ModalProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const GenericModal = ({
  open,
  onClose,
  disableCloseOnOutsideClick = true,
  children,
  ...props
}:GenericModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      hideBackdrop={disableCloseOnOutsideClick}
      {...props}
    >
      <StyledModalBox>
        <Box>
          <StyledIconButton onClick={onClose}>
            <CloseIcon />
          </StyledIconButton>
        </Box>
        {children}
      </StyledModalBox>
    </Modal>
  );
};

type OmittedModalProps = Omit<ModalProps, "open" | "onClose" | "hideBackdrop">;

export interface GenericModalProps extends OmittedModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  disableCloseOnOutsideClick?: boolean;
}

//TODO get the colors from the theme
const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "inline-flex",
  padding: "40px 60px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  background: "#FFF",
  boxShadow: "0px 10.207px 61.241px 0px rgba(0, 0, 0, 0.05)",
  outline: "none",
}));

//TODO apply color on the icon modal from theme
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 8,
  top: 8,
}));

export default GenericModal;
