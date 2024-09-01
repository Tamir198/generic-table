import { FC } from 'react';
import { TEXTS } from '../../constants/constants';
import { FilterSelect } from './FilterSelect';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { MultiOptionValue, OptionValue } from '../../types';

interface TableFiltersProps {
  onBailStatusChange: (value: OptionValue) => void;
  onBailTypeChange: (value: MultiOptionValue) => void;
  onCoinTypeChange: (value: MultiOptionValue) => void;
  clearFilters: () => void;
  columnTypes: Record<string, string>;
}

export const TableFilters: FC<TableFiltersProps> = ({
  onBailStatusChange,
  onBailTypeChange,
  onCoinTypeChange,
  clearFilters,
  columnTypes,
}) => {
  const clearAllFilters = () => {
    clearFilters();
  };

  console.log('Column Types:', columnTypes);
  const isDateColumFound = (columnTypes: Record<string, string>): boolean => {
    const dateKeywords = ['from', 'to', 'start', 'end'];
    return Object.keys(columnTypes).some((key) => {
      const type = columnTypes[key];
      return (
        type === 'date' ||
        dateKeywords.some((keyword) => key.toLowerCase().includes(keyword))
      );
    });
  };

  console.log({ isDateColumFound: isDateColumFound(columnTypes) });

  return (
    <StyledContainer>
      <FilterSelect
        title={TEXTS.BAIL_STATUS}
        options={[TEXTS.ALL_TYPES, TEXTS.ACTIVE_BAIL, TEXTS.NON_ACTIVE_BAIL]}
        onFilter={(value) => {
          if (typeof value === 'string' || typeof value === 'number') {
            onBailStatusChange(value);
          }
        }}
      />
      <FilterSelect
        title={TEXTS.BAIL_TYPE}
        options={[TEXTS.ALL_TYPES, TEXTS.TYPE_ONE_BAIL, TEXTS.TYPE_TWO_BAIL]}
        onFilter={(value) => {
          if (Array.isArray(value)) {
            onBailTypeChange(value);
          }
        }}
        isMultiSelect={true}
      />
      <FilterSelect
        title={TEXTS.COIN_TYPE}
        options={[
          TEXTS.ALL_TYPES,
          TEXTS.FORIEN_COIN,
          TEXTS.LOCAL_COIN,
          TEXTS.MONETARY,
          TEXTS.FORMAL,
        ]}
        onFilter={(value) => {
          if (Array.isArray(value)) {
            onCoinTypeChange(value);
          }
        }}
        isMultiSelect={true}
      />
      {isDateColumFound(columnTypes) && (
        <div>
          {/* TODO: Insert the from and to date component */}
          <p>From day</p>
          <p>To day</p>
        </div>
      )}

      <StyledClearAll onClick={clearAllFilters}>
        {TEXTS.CLEAN_ALL}
      </StyledClearAll>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  display: 'flex',
  direction: 'rtl',
});

const StyledClearAll = styled(Button)({
  color: '#0D819A',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  marginTop: '15px',
  marginRight: '15px',
});
