import { IconButton, TextField, styled } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { FC } from "react";

interface TableSearchRowProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export const TableSearchRow: FC<TableSearchRowProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <StyledRow>
      <IconButton>
        <DownloadIcon />
      </IconButton>
      <IconButton>
        <FilterListIcon />
      </IconButton>
      <StyledSearchBar
        placeholder="חיפוש ערבות"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" onClick={onSearchSubmit}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </StyledRow>
  );
};

const StyledRow = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
});

const StyledSearchBar = styled(TextField)({
  "& .MuiInputBase-root": {
    direction: "rtl",
  },
});
