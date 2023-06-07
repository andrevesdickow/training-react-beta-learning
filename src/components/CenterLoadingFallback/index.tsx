import { Box, CircularProgress } from '@mui/material';

export const CenterLoadingFallback = () => (
  <Box sx={{ display: 'grid', placeContent: 'center', transform: 'translateY(50vh)' }}>
    <CircularProgress color="primary" />
  </Box>
);
