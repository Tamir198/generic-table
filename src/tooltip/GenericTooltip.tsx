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

const StyledTooltip = styled(Tooltip)({});

const StyledTooltipContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "white",
});
