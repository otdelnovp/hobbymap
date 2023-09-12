'use client';
import { useCallback, useState } from 'react';
import Link from 'next/link';

import { signOut } from 'next-auth/react';
import { isUserAdmin, type User } from '@/helpers/authHelper';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import SettingsIcon from '@mui/icons-material/Settings';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const UserMenu = ({ user }: { user: User }) => {
  console.log(user);

  const getUserMenu = useCallback(
    (user: User) => {
      let options = [
        { icon: <SettingsIcon />, label: 'Profile', href: '/lk/profile' },
        { icon: <PlaceIcon />, label: 'My locations', href: '/lk/locations' },
      ];
      if (isUserAdmin(user)) {
        options.push({ icon: <PeopleIcon />, label: 'Users', href: '/lk/users' });
      }
      return options;
    },
    [user],
  );

  const [anchorElUserMenu, setAnchorElUserMenu] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserMenu(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUserMenu(null);
  };

  return user ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={user.name} arrow disableInteractive>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.name ?? undefined} src={user.image ?? undefined} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-app-bar"
        anchorEl={anchorElUserMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUserMenu)}
        onClose={handleCloseUserMenu}>
        {getUserMenu(user).map(menuItem => (
          <MenuItem key={menuItem.href} component={Link} href={menuItem.href} onClick={handleCloseUserMenu}>
            {menuItem.icon ? <ListItemIcon>{menuItem.icon}</ListItemIcon> : null}
            <Typography textAlign="center">{menuItem.label}</Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <ListItemIcon>
            <ExitToAppIcon color={'secondary'} />
          </ListItemIcon>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Button LinkComponent={Link} href="/signin" variant="outlined" size="small">
      SignIn
    </Button>
  );
};

export { UserMenu };
