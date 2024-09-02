import { IconButton, TextField, Typography, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FC } from "react";
import { TableDataDownloadButton } from "../TableDataDownloadButton";
import { ExcelFileType } from "../../types";
import { TEXTS } from "../../constants/constants";
import FilterIcon from "../../assets/FilterIcon";

interface TableSearchRowProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleFilters: () => void;
  onDataExport: (fileType: ExcelFileType) => void;
  data: object[];
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
        <Typography fontWeight={"800"}>{TEXTS.FILTER}</Typography>
        <FilterIcon />
      </IconButton>
      <StyledSearchBar
        placeholder={TEXTS.BAIL_SEARCH}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          endAdornment: <SearchIcon />,
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
