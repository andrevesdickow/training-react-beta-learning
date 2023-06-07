import { Error as ErrorIcon } from '@mui/icons-material';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';

export const ErrorPage = () => {
  return (
    <Layout>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <ErrorIcon color='error' /> Página não encontrada
      </Box>
    </Layout>
  );
};
