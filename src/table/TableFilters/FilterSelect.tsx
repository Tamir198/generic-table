import { useState } from "react";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { FC } from "react";

interface FilterSelectProps {
  title: string;
  options: (string | number)[];
  onFilter: (value: string | number) => void;
}

export const FilterSelect: FC<FilterSelectProps> = ({
  title,
  options,
  onFilter,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | number>("");

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onFilter(value);
  };

  return (
    <StyledFilterSelect>
      <StyledTitle>{title}</StyledTitle>
      <StyledSelect
        labelId="select-label"
        id="select"
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          {title}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFilterSelect>
  );
};

const StyledTitle = styled(Typography)({});

const StyledFilterSelect = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "44px",
  alignItems: "flex-end",
  justifyContent: "center",
});

const StyledSelect = styled(Select)({
  "& .MuiSelect-icon": {
    right: "unset",
    left: "8px",
  },
});
