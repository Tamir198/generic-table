import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GenericTooltip } from "../tooltip/GenericTooltip";
import {
  Download as DownloadIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const TooltipContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MoreOptionTooltip = () => {
  return (
    <GenericTooltip
      title={
        <TooltipContent>
          <StyledIconButton aria-label="edit">
            <EditIcon />
          </StyledIconButton>
          <StyledIconButton aria-label="download">
            <DownloadIcon />
          </StyledIconButton>
        </TooltipContent>
      }
    >
      <StyledIconButton>
        <p style={{ fontSize: "16px", color: "white" }}>Hover me</p>
      </StyledIconButton>
    </GenericTooltip>
  );
};
