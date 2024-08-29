import { Box, Button } from '@mui/material';
import { TEXTS } from '../../constants/constants';
import { FilterSelect } from './FilterSelect';
import { styled } from '@mui/system';

export const TableFilters = () => {
  //TODO accept 2 functions from outside :
  // Clear all filters (reset table data)
  // Function that filters by field (by the selected select item )
  const clearFilteres = () => {};

  return (
    <StyledContainer>
      <FilterSelect
        title={TEXTS.BAIL_STATUS}
        options={[TEXTS.BAIL_STATUS, 2, 3]}
        onFilter={(value) => {
          alert('Test if filter orking' + value);
        }}
        isMultiSelect={true}
      />
      <FilterSelect
        title={TEXTS.BAIL_TYPE}
        options={[TEXTS.BAIL_TYPE, 2, 3]}
        onFilter={(value) => {
          alert('Test if filter orking' + value);
        }}
      />
      <FilterSelect
        title={TEXTS.COIN_TYPE}
        options={[TEXTS.COIN_TYPE, 2, 3]}
        onFilter={(value) => {
          alert('Test if filter orking' + value);
        }}
      />

      {/* TODO insert the from and to  date component that avital is building

      */}
      <StyledClearAll onClick={clearFilteres}>{TEXTS.CLEAN_ALL}</StyledClearAll>
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
});
