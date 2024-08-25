import { IconButton, TextField, styled } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

export const TableSearchRow = () => {
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
        InputProps={{
          endAdornment: (
            <IconButton type="submit">
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
