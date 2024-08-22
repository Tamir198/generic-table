import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Download as DownloadIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { GenericTooltip } from "../tooltip/GenericTooltip";
import { TEXTS } from "../constants/constants";
import { MoreOptions } from "./MoreOptions";

interface MoreOptionTooltipProps {
  onEdit: () => void;
  onDownload: () => void;
}

export const MoreOptionTooltip: React.FC<MoreOptionTooltipProps> = ({
  onEdit,
  onDownload,
}) => {
  return (
    <GenericTooltip
      title={
        <TooltipContent>
          <TooltipRow>
            <StyledTypography>{TEXTS.EXTEND_BAIL}</StyledTypography>
            <StyledIconButton aria-label="edit" onClick={onEdit}>
              <EditIcon />
            </StyledIconButton>
          </TooltipRow>
          <TooltipRow>
            <StyledTypography>{TEXTS.DOWNLOAD_BAIL}</StyledTypography>
            <StyledIconButton aria-label="download" onClick={onDownload}>
              <DownloadIcon />
            </StyledIconButton>
          </TooltipRow>
        </TooltipContent>
      }
    >
      <p
        style={{
          fontSize: "16px",
          color: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MoreOptions />
      </p>
    </GenericTooltip>
  );
};

const TooltipRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const TooltipContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#353535",
  textAlign: "right",
  fontFamily: "Sans",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16px",
}));
