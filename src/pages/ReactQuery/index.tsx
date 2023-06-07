import { Link as LinkRouter } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

import { Layout } from '@/components/Layout';

export const ReactQueryPage = () => {
  return (
    <Layout>
      <Typography variant='h4' textAlign="center">React Query</Typography>
      <Link component={LinkRouter} to="/react-query/people" textAlign="center">Pessoas</Link>
      <Link component={LinkRouter} to="/react-query/posts" textAlign="center">Posts</Link>
    </Layout>
  );
};
