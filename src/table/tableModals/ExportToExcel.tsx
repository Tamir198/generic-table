import { FC } from "react";
import GenericModal from "../../modal/GenericModal";

interface ExportToExcelProps {
  onClose: () => void;
}

export const ExportToExcel: FC<ExportToExcelProps> = ({ onClose }) => {
  return (
    <GenericModal open={true} onClose={onClose}>
      <div>
        <h1>Export your data into excel</h1>
        <h2>Do it its very nice</h2>
      </div>
    </GenericModal>
  );
};
