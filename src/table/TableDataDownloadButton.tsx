import { useState, MouseEvent } from 'react';
import { TableCell, Menu, MenuItem, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { FC } from 'react';
import GenericModal from '../modal/GenericModal';
import { ExportToExcel } from './modalContent/ExportToExcel';
import { ExcelFileType } from '../types';

enum ModalOption {
  EXPORT_TO_CSV,
  EXPORT_TO_EXCEL,
}

interface TableDataDownloadButtonProps {
  onDataExport: (filetype: ExcelFileType) => void;
}
export const TableDataDownloadButton: FC<TableDataDownloadButtonProps> = ({
  onDataExport,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<ModalOption | null>(
    null
  );

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: ModalOption) => {
    setSelectedOption(option);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setSelectedOption(null);
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case ModalOption.EXPORT_TO_CSV:
        return (
          <>
            <h1>Export your data into CSV</h1>
            <h2>It's the new cool kid on the block</h2>
          </>
        );
      case ModalOption.EXPORT_TO_EXCEL:
        return (
          <ExportToExcel
            exportFile={(fileType) => {
              onDataExport(fileType);
            }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <TableCell>
      <IconButton onClick={handleClick}>
        <FileDownloadIcon />
      </IconButton>
      {/* TODO replace this with generic menu from shared components */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleOptionClick(ModalOption.EXPORT_TO_CSV)}>
          Export to CSV
        </MenuItem>
        <MenuItem
          onClick={() => handleOptionClick(ModalOption.EXPORT_TO_EXCEL)}
        >
          Export to Excel
        </MenuItem>
      </Menu>

      {selectedOption !== null && (
        <GenericModal
          width='604px'
          height='367px'
          onClose={handleCloseModal}
          open={true}
        >
          {renderModalContent()}
        </GenericModal>
      )}
    </TableCell>
  );
};
