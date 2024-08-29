import { FC, useState } from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Typography,
  styled,
} from '@mui/material';
import { TEXTS } from '../../constants/constants';
import { ExcelFileType } from '../../types';

interface ExportToExcelProps {
  exportFile: (fileType: ExcelFileType) => void;
}

export const ExportToExcel: FC<ExportToExcelProps> = ({ exportFile }) => {
  const [exportType, setExportType] = useState(ExcelFileType.PARTIAL);

  return (
    <StyledBox>
      <Box>
        <StyledTypographyTitle>
          {TEXTS.EXPORT_TO_EXCEL_TITLE}
        </StyledTypographyTitle>
        <StyledTypographyBody>
          {TEXTS.EXPORT_TO_EXCEL_EXPLANATION}
        </StyledTypographyBody>
      </Box>

      <RadioGroup
        value={exportType}
        onChange={(e) => {
          setExportType(e.target.value as ExcelFileType);
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '16px',
        }}
      >
        <StyledFormControlLabel
          value={ExcelFileType.PARTIAL}
          control={<Radio />}
          label={TEXTS.EXPORT_BY_FILTERS}
        />
        <StyledFormControlLabel
          value={ExcelFileType.FULL_FILE}
          control={<Radio />}
          label={TEXTS.EXPORT_FULL_FILE}
        />
      </RadioGroup>
      <StyledButton
        variant='contained'
        color='primary'
        onClick={() => exportFile(exportType)}
      >
        {TEXTS.DOWNLOAD_FILE}
      </StyledButton>
    </StyledBox>
  );
};

const StyledBox = styled(Box)({
  display: 'flex',
  width: 604,
  padding: '40px 60px',
  gap: '40px',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const StyledTypographyTitle = styled(Typography)({
  color: '#353535',
  fontFamily: 'MZTF-Sans',
  fontSize: '24px',
  lineHeight: 'normal',
  textAlign: 'center',
  gap: '15px',
  fontWeight: 'bolder',
});

const StyledTypographyBody = styled(Typography)({
  color: '#353535',
  textAlign: 'center',
  fontFamily: 'MZTF-Sans',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '20px',
  width: '80%',
  margintop: '16px',
  fontfamily: 'MZTF-Sans',
  fontsize: '16px',
});

const StyledButton = styled(Button)({
  borderRadius: '50px',
  background: '#0D819A',
});

const StyledFormControlLabel = styled(FormControlLabel)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  background: '#F6F6F8',
  color: '#0D819A',
  direction: 'rtl',
  height: '32px',
  borderRadius: '8px',
});
