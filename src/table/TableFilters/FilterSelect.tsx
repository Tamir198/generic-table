import { useEffect, useState } from 'react';
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { FC } from 'react';
import { TEXTS } from '../../constants/constants';

type OptionValue = string | number | (string | number)[];

interface FilterSelectProps {
  title: string;
  options: (string | number)[];
  onFilter: (value: OptionValue) => void;
  isMultiSelect?: boolean;
}

export const FilterSelect: FC<FilterSelectProps> = ({
  title,
  options,
  onFilter,
  isMultiSelect = true,
}) => {
  const [selectedValue, setSelectedValue] = useState<OptionValue>(
    isMultiSelect ? [] : ''
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onFilter(value);
  };

  const renderSelectedValue = (selected: unknown) => {
    if (isMultiSelect && Array.isArray(selected)) {
      if (selected.length == 0) return TEXTS.ALL_TYPES;
      if (selected.length == 1) return selected[0];
      return `נבחרו ${selected.length} ערכים`;
    }
    return selected as string;
  };

  return (
    <StyledFilterSelect>
      <StyledTitle>{title}</StyledTitle>
      <StyledSelect
        multiple={isMultiSelect}
        labelId='select-label'
        id='select'
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        renderValue={renderSelectedValue}
      >
        <MenuItem value='' disabled>
          {title}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {isMultiSelect && (
              <Checkbox
                checked={
                  (selectedValue as (string | number)[]).indexOf(option) > -1
                }
              />
            )}
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFilterSelect>
  );
};

const StyledTitle = styled(Typography)({});

const StyledFilterSelect = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '44px',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

const StyledSelect = styled(Select)({
  '& .MuiSelect-icon': {
    right: 'unset',
    left: '8px',
  },
});
