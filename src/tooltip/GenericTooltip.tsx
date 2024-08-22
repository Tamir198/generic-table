import React from "react";
import { Tooltip, TooltipProps, Box, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GenericTooltip = ({
  title,
  children,
  placement = "top",
  ...props
}: GenericTooltipProps) => {
  return (
    <StyledTooltip
      title={<StyledTooltipContent>{title}</StyledTooltipContent>}
      placement={placement}
      arrow={true}
      {...props}
    >
      {children}
    </StyledTooltip>
  );
};

export interface GenericTooltipProps extends TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  placement?: "top" | "bottom" | "right" | "left";
}

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
