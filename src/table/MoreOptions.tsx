import { useState, MouseEvent } from "react";
import { TableCell, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FC } from "react";
import { ExportToExcel } from "./tableModals/ExportToExcel";
export const MoreOptions: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: string) => {
    if (option === "Option 1") {
      setIsModalOpen(true);
    }
    handleClose();
  };

  return (
    <TableCell>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleOptionClick("Option 1")}>
          Option 1
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick("Option 2")}>
          Option 2
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick("Option 3")}>
          Option 3
        </MenuItem>
      </Menu>

      {isModalOpen && <ExportToExcel onClose={() => setIsModalOpen(false)} />}
    </TableCell>
  );
};
