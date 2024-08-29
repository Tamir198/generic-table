import { IconButton, TextField, styled } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { FC } from 'react';
import { MoreOptions } from '../MoreOptions';
import { TableDataDownloadButton } from '../TableDataDownloadButton';
import { ExcelFileType } from '../../types';

interface TableSearchRowProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleFilters: () => void;
  onDataExport: (fileType: ExcelFileType) => void;
}

export const TableSearchRow: FC<TableSearchRowProps> = ({
  searchQuery,
  onSearchChange,
  onToggleFilters,
  onDataExport,
}) => {
  return (
    <StyledRow>
      <TableDataDownloadButton onDataExport={onDataExport} />
      <IconButton onClick={onToggleFilters}>
        <FilterListIcon />
      </IconButton>
      <StyledSearchBar
        placeholder='חיפוש ערבות'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <MoreOptions />
    </StyledRow>
  );
};

const StyledRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
});

const StyledSearchBar = styled(TextField)({
  '& .MuiInputBase-root': {
    direction: 'rtl',
  },
});
