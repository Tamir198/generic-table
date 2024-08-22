import { IconButton } from "@mui/material";
import { GenericTooltip } from "../tooltip/GenericTooltip";

export const MoreOptionTooltip = () => {
  <GenericTooltip
    title={
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
    }
  >
    <IconButton>
      <p style={{ fontSize: "16px", color: "white" }}>Hover me</p>
    </IconButton>
  </GenericTooltip>;
};
