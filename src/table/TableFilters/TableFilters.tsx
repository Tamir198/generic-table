import { FC, useState } from "react";
import { TEXTS } from "../../constants/constants";
import { FilterSelect } from "./FilterSelect";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { TableColumn } from "../../types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { Dayjs } from "dayjs";
import { filterAllData } from "../TableWithAbilities/filterService";

interface TableFiltersProps {
  clearFilters: () => void;
  columns: TableColumn<object>[];
  data: object[];
  onFilterChange: (filteredData: object[], filters: object) => void;
  selectedFilters: object;
}

export const TableFilters: FC<TableFiltersProps> = ({
  clearFilters,
  columns,
  data,
  onFilterChange,
  selectedFilters,
}) => {
  const [isDefaultState, setisDefaultState] = useState(false);
  const clearAllFilters = () => {
    clearFilters();
    setisDefaultState(!isDefaultState);
  };

  const isDateColumn = (column: TableColumn<object>): boolean => {
    return Object.values(column).some((value) => {
      return typeof value === "string" && value.toLowerCase().includes("date");
    });
  };

  return (
    <StyledContainer>
      {columns.map((column) => {
        const { isFilterable, isColumMultySelectable, id } = column;
        if (!isFilterable) return null;

        if (isDateColumn(column)) {
          return (
            <div key={JSON.stringify(column)}>
              {/* TODO avital add your date pickers in here */}
              <LocalizationProvider
                key={JSON.stringify(column) + isDefaultState}
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  onChange={(value) => {
                    onFilterChange(data, { [id]: value });
                  }}
                  label="מתאריך"
                />
                <DatePicker
                  onChange={(value) => {
                    onFilterChange(data, { [id]: value });
                  }}
                  label="עד תאריך"
                />
              </LocalizationProvider>
              <p>From day</p>
              <p>To day</p>
            </div>
          );
        } else {
          return (
            <FilterSelect
              key={JSON.stringify(column) + isDefaultState}
              title={id}
              options={column.filterSelectOptions}
              isMultiSelect={isColumMultySelectable}
              selectedOptionsFromStorage={selectedFilters[column.id]}
              onFilter={(value) => {
                onFilterChange(data, { [id]: value });
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
  display: "flex",
  flexWrap: "wrap",
  direction: "rtl",
});

const StyledClearAll = styled(Button)({
  color: "#0D819A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginTop: "15px",
  marginRight: "15px",
});
