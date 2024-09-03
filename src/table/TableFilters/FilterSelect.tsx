import { useState } from "react";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { FC } from "react";
import { TEXTS } from "../../constants/constants";

type OptionValue = string | number;
type MultiOptionValue = OptionValue[];

interface FilterSelectProps {
  title: string;
  options: OptionValue[];
  onFilter: (value: OptionValue | MultiOptionValue) => void;
  isMultiSelect?: boolean;
}

export const FilterSelect: FC<FilterSelectProps> = ({
  title,
  options,
  onFilter,
  isMultiSelect = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<
    MultiOptionValue | OptionValue
  >(isMultiSelect ? [] : "");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as OptionValue | MultiOptionValue;
    setSelectedValue(value);
    onFilter(value);
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 225,
        width: 250,
      },
    },
  };

  const renderSelectedValue = (selected: unknown) => {
    if (!isMultiSelect) {
      if (!selected) {
        return TEXTS.ALL_TYPES;
      }
      return selected as string;
    }

    if (Array.isArray(selected)) {
      if (selected.length === 0) return TEXTS.ALL_TYPES;
      if (selected.length === 1) return selected[0];
      return `נבחרו ${selected.length} ערכים`;
    }
  };

  return (
    <StyledFilterSelect>
      <StyledTitle>{title}</StyledTitle>
      <StyledSelect
        multiple={isMultiSelect}
        labelId="select-label"
        id="select"
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        renderValue={renderSelectedValue}
        MenuProps={menuProps}
      >
        <MenuItem value="" disabled>
          {title}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {isMultiSelect && (
              <Checkbox
                checked={(selectedValue as MultiOptionValue).includes(option)}
              />
            )}
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFilterSelect>
  );
};

const StyledTitle = styled(Typography)({
  width: "100%",
});

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
