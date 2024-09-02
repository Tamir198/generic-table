import { FC } from "react";
import { TEXTS } from "../../constants/constants";
import { FilterSelect } from "./FilterSelect";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { MultiOptionValue, OptionValue, TableColumn } from "../../types";

interface TableFiltersProps {
  clearFilters: () => void;
  columns: TableColumn<object>[];
  data: object[];
}

export const TableFilters: FC<TableFiltersProps> = ({
  clearFilters,
  columns,
  data,
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
        const { filterFunction } = column;
        console.log(filterFunction);
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
              title={"title"}
              options={[
                `${TEXTS.OPTION}`,
                `${TEXTS.OPTION}`,
                `${TEXTS.OPTION}`,
              ]}
              isMultiSelect={true}
              onFilter={(value) => {
                const newData = filterFunction(data, value);
                console.log(` selected:`, newData);
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
