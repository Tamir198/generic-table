import { FC } from 'react';
import { TEXTS } from '../../constants/constants';
import { FilterSelect } from './FilterSelect';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

interface TableFiltersProps {
  onBailStatusChange: (value: string | number) => void;
  onBailTypeChange: (value: string | number) => void;
  onCoinTypeChange: (value: string | number) => void;
  clearFilters: () => void;
}

export const TableFilters: FC<TableFiltersProps> = ({
  onBailStatusChange,
  onBailTypeChange,
  onCoinTypeChange,
  clearFilters,
}) => {
  const clearAllFilters = () => {
    clearFilters();
  };

  return (
    <StyledContainer>
      <FilterSelect
        title={TEXTS.BAIL_STATUS}
        options={[TEXTS.ALL_TYPES, TEXTS.ACTIVE_BAIL, TEXTS.NON_ACTIVE_BAIL]}
        onFilter={(value) => {
          onBailStatusChange(value);
        }}
      />
      <FilterSelect
        title={TEXTS.BAIL_TYPE}
        options={[TEXTS.ALL_TYPES, TEXTS.TYPE_ONE_BAIL, TEXTS.TYPE_TWO_BAIL]}
        onFilter={(value) => {
          onBailTypeChange(value);
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
          TEXTS.FORMAL,
          TEXTS.FORMAL,
        ]}
        onFilter={(value) => {
          onCoinTypeChange(value);
        }}
        isMultiSelect={true}
      />

      <p>From day</p>
      <p>To day</p>

      {/* TODO: Insert the from and to date component */}
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
