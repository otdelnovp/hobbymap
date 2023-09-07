import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavigationIcon from '@mui/icons-material/Navigation';

import { NavMenu } from './NavMenu';
import { UserMenu } from './UserMenu';

import { authConfig } from '@/configs/auth';

const Header = async () => {
  const session = await getServerSession(authConfig);

  return (
    <AppBar position="fixed" sx={{ zIndex: 999 }}>
      <Toolbar>
        <NavigationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          href="/"
          sx={{
            mr: 3,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}>
          Hobby Map
        </Typography>

        <NavMenu />

        <UserMenu user={session?.user} />
      </Toolbar>
    </AppBar>
  );
};

export { Header };
