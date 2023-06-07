import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';

export const Navbar = () => (
  <AppBar component="nav" position="relative">
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        MUI
      </Typography>
      <Box display={{xs: 'none', sm: 'flex'}} gap={1}>
        <Link component={RouterLink} to="/">Home</Link>
        <Link component={RouterLink} to="/react-query">React Query</Link>
        <Link component={RouterLink} to="/react-router">React Router</Link>
        <Link component={RouterLink} to="/zustand">Zustand</Link>
      </Box>
    </Toolbar>
  </AppBar>
);
