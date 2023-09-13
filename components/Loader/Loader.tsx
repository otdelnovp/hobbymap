import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export interface ILoaderProps {
  color?: 'primary' | 'secondary' | 'inherit' | undefined;
}

export const Loader = ({ color }: ILoaderProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 2,
      }}>
      <CircularProgress variant={'indeterminate'} disableShrink color={color} />
    </Box>
  );
};
