import { useNavigate, useLocation, useHref, Link as LinkRouter } from 'react-router-dom';

import { Layout } from '@/components/Layout';

import { Button, Link, Typography } from '@mui/material';

/**
 * Multiples routes examples
 * @see https://reactrouter.com/en/main/hooks/use-location
 * @see https://reactrouter.com/en/main/hooks/use-navigate
 * @see https://reactrouter.com/en/main/hooks/use-href
 * @returns JSX.Element
 */
export default function ReactRouterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const href = useHref({pathname: '/'});

  return (
    <Layout>
      <Typography variant='h4' textAlign="center">React Router</Typography>
      <Link href={href} textAlign="center">Home</Link>
      <Link component={LinkRouter} to="/">Home</Link>
      <Button onClick={() => navigate(-1)}>Voltar</Button>
      <Button onClick={() => navigate('/react-router?id=123')}>Search</Button>
      <Button onClick={() => navigate('/react-router', {state: {id: 123}})}>State</Button>
      <Button onClick={() => navigate('/react-router', {state: {}})}>Clean state</Button>
      <pre>
        {JSON.stringify(location, null, 2)}
      </pre>
    </Layout>
  );
}
