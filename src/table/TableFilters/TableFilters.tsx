import { FC } from "react";
import { TEXTS } from "../../constants/constants";
import { FilterSelect } from "./FilterSelect";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { MultiOptionValue, OptionValue, TableColumn } from "../../types";
import { setQueryParams } from "../TableWithAbilities/queryParamsService";

interface TableFiltersProps {
  clearFilters: () => void;
  columns: TableColumn<object>[];
  data: object[];
  onFilterChange: (filteredData: object[]) => void;
}

export const TableFilters: FC<TableFiltersProps> = ({
  clearFilters,
  columns,
  data,
  onFilterChange,
}) => {
  const clearAllFilters = () => {
    clearFilters();
  };

  const isDateColumn = (column: TableColumn<object>): boolean => {
    return Object.values(column).some((value) => {
      return typeof value === "string" && value.toLowerCase().includes("date");
    });
  };

  return (
    <StyledContainer>
      {columns.map((column) => {
        const { filterFunction, isFilterable, id } = column;
        if (!isFilterable) return;

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
              title={"title"}
              options={[`${id}`, `${TEXTS.OPTION}`, `${TEXTS.OPTION}`]}
              isMultiSelect={true}
              onFilter={(value) => {
                const newData = filterFunction(data, value);
                onFilterChange(newData);
                setQueryParams({ [`${id}`]: value });
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
