import React from "react";
import { Tooltip, TooltipProps, Box, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface GenericTooltipProps extends TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
}

export const GenericTooltip = ({
  title,
  children,
  ...props
}: GenericTooltipProps) => {
  return (
    <StyledTooltip
      placement="top"
      title={<StyledTooltipContent>{title}</StyledTooltipContent>}
      arrow={true}
      {...props}
    >
      {children}
    </StyledTooltip>
  );
};

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
    fontSize: 11,
  },
}));

const StyledTooltipContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
