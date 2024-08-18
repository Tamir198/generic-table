import React from "react";
import { Modal, Box, IconButton, ModalProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const GenericModal = ({
  open,
  onClose,
  disableCloseOnOutsideClick = true,
  children,
  width,
  height,
  ...props
}: GenericModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      hideBackdrop={disableCloseOnOutsideClick}
      {...props}
    >
      <StyledModalBox width={width} height={height}>
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
  width?: string;
  height?: string;
}

// TODO get the colors from the theme
const StyledModalBox = styled(Box)<{ width?: string; height?: string }>(({ theme, width, height }) => ({
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
  width: width || "589px",
  height: height || "402px",
    '@media (max-width: 430px)': {
      width:  "275px",
      height:  "374px",
      padding: "15px" 
    },
}));

// TODO apply color on the icon modal from theme
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 8,
  top: 8,
}));

export default GenericModal;
