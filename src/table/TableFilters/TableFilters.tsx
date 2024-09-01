import { FC } from 'react';
import { TEXTS } from '../../constants/constants';
import { FilterSelect } from './FilterSelect';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { MultiOptionValue, OptionValue, TableColumn } from '../../types';

interface TableFiltersProps {
  onBailStatusChange: (value: OptionValue) => void;
  onBailTypeChange: (value: MultiOptionValue) => void;
  onCoinTypeChange: (value: MultiOptionValue) => void;
  clearFilters: () => void;
  columns: TableColumn<object>[];
}

export const TableFilters: FC<TableFiltersProps> = ({
  onBailStatusChange,
  onBailTypeChange,
  onCoinTypeChange,
  clearFilters,
  columns,
}) => {
  const clearAllFilters = () => {
    clearFilters();
  };

  const isDateColumn = (column: TableColumn<object>): boolean => {
    return Object.values(column).some((value) => {
      return typeof value === 'string' && value.toLowerCase().includes('date');
    });
  };

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

      {columns.map((column) => {
        if (!column.isFilterable) return;

        if (isDateColumn(column)) {
          return (
            <div key={JSON.stringify(column)}>
              <p>From day</p>
              <p>To day</p>
            </div>
          );
        } else {
          return (
            <FilterSelect
              key={JSON.stringify(column)}
              title={'title'}
              options={[
                `${TEXTS.OPTION}`,
                `${TEXTS.OPTION}`,
                `${TEXTS.OPTION}`,
              ]}
              isMultiSelect={true}
              onFilter={(value) => {
                console.log(` selected:`, value);
              }}
            />
          );
        }
      })}

      <StyledClearAll onClick={clearAllFilters}>
        {TEXTS.CLEAN_ALL}
      </StyledClearAll>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
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
