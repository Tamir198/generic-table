import { FC, useState } from "react";
import { TEXTS } from "../../constants/constants";
import { FilterSelect } from "./FilterSelect";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { DateFilterOption, TableColumn } from "../../types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

interface TableFiltersProps {
  clearFilters: () => void;
  columns: TableColumn<object>[];
  data: object[];
  onFilterChange: (
    filteredData: object[],
    filters: object,
    dateFilterOption?: DateFilterOption
  ) => void;
  selectedFilters: object;
}

export const TableFilters: FC<TableFiltersProps> = ({
  clearFilters,
  columns,
  data,
  onFilterChange,
  selectedFilters,
}) => {
  const [isDefaultState, setIsDefaultState] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const clearAllFilters = () => {
    clearFilters();
    setIsDefaultState(!isDefaultState);
    setStartDate(null);
    setEndDate(null);
  };

  const isDateColumn = (column: TableColumn<object>): boolean => {
    return Object.values(column).some((value) => {
      return typeof value === "string" && value.toLowerCase().includes("date");
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <StyledContainer>
      {columns.map((column) => {
        const { isFilterable, isColumMultySelectable, id } = column;
        if (!isFilterable) return null;

        if (isDateColumn(column)) {
          return (
            <div key={JSON.stringify(column)}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate ? dayjs(startDate) : null}
                  onChange={(date) => {
                    const nativeDate = date ? date.toDate() : null;
                    const formattedStartDate = formatDate(nativeDate);
                    console.log({ formattedStartDate });

                    setStartDate(formattedStartDate);
                    onFilterChange(
                      data,
                      { [id]: { startDate: nativeDate, endDate } },
                      DateFilterOption.AfterDate
                    );
                  }}
                  label="מתאריך"
                />
                <DatePicker
                  value={endDate ? dayjs(endDate) : null}
                  onChange={(date) => {
                    const nativeDate = date ? date.toDate() : null;
                    const formattedEndDate = formatDate(nativeDate);
                    console.log({ formattedEndDate });
                    setEndDate(formattedEndDate);
                    onFilterChange(
                      data,
                      { [id]: { startDate, endDate: nativeDate } },
                      DateFilterOption.BeforeDate
                    );
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
