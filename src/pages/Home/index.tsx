import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import reactLogo from '@/assets/react.svg';
import { Layout } from '@/components/Layout';
import { fakeRequest } from '@/utils/fakeRequest';

/**
 * Home
 * @see https://react.dev/reference/react/useState
 * @see https://react.dev/reference/react/useEffect
 * @see https://react.dev/reference/react/useMemo
 * @see https://react.dev/reference/react/useCallback
 * @returns JSX.Element
 */
export const HomePage = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{success: boolean; message: string;}>();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
      enqueueSnackbar('React 🚀', {autoHideDuration: 3000});
      // adicionar count nas dependências
    }, []);

    useEffect(() => {
      async function getData() {
        const result = await fakeRequest(1000, { success: true, message: 'Olá mundo' });
        setData(result);
        setLoading(false);
      }

      getData();
    }, []);

    const btnStr = useMemo(() => {
      console.warn('useMemo');
      // return `Contador é ${count}`;
      return 'Contador é';
    }, []);

    const handleMultiplyBy = useCallback(() => {
      enqueueSnackbar(`Count * 10 = ${count * 10}`, {
        variant: 'info',
        autoHideDuration: 2000
      });
    }, [enqueueSnackbar]);

    return (
      <Layout>
        <Box sx={{ my: 4 }} display="flex" flexDirection="column" alignItems="center" gap={1}>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <Typography variant="h4" component="h1" gutterBottom>
            React
          </Typography>
          <Button variant="contained" onClick={() => setCount((count) => count + 1)}>
            {btnStr} {count}
          </Button>
          <Button variant="outlined" onClick={handleMultiplyBy}>
            Multiplique Contador por 10
          </Button>

          <br />
          <br />
          {loading ? <CircularProgress size={16} /> : <Typography>{data?.message}</Typography>}
        </Box>
      </Layout>
    );
  };
