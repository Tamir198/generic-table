import { useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { TEXTS } from "../../constants/constants";

export const ExportToExcel = () => {
  const [exportType, setExportType] = useState("filtered");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" component="h2">
        {TEXTS.EXPORT_TO_EXCEL_TITLE}
      </Typography>
      <Typography variant="body1">
        {TEXTS.EXPORT_TO_EXCEL_EXPLANATION}
      </Typography>
      <RadioGroup
        value={exportType}
        onChange={(e) => setExportType(e.target.value)}
      >
        <FormControlLabel
          value="filtered"
          control={<Radio />}
          label={TEXTS.EXPORT_BY_FILTERS}
        />
        <FormControlLabel
          value="full"
          control={<Radio />}
          label={TEXTS.EXPORT_FULL_FILE}
        />
      </RadioGroup>
      <Button variant="contained" color="primary">
        {TEXTS.DOWNLOAD_FILE}
      </Button>
    </Box>
  );
};
