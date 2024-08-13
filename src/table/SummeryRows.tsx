import React from 'react';
import { SummeryRow } from '../types';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../constants/constants';

interface SummeryRowsProps {
  summary: SummeryRow[];
}

export const SummeryRows: React.FC<SummeryRowsProps> = ({ summary }) => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.SUMMERY_ROW_WRAPPER,
        borderRadius: 2,
        padding: 1,
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {summary.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            direction: 'row-reverse',
          }}
        >
          {Object.entries(item).map(([key, value]) => (
            <Typography sx={{ 'font-weight': 'bold' }} key={key}>
              {value}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
};
