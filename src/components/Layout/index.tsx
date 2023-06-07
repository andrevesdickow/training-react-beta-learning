import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { Navbar } from '@/components/Navbar';

type LayoutProps = {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Navbar />

    <Box sx={{ height: 'calc(100vh - 64px)', display: 'grid', placeContent: 'center' }}>
      {children}
    </Box>

    <Outlet />
  </>
);
