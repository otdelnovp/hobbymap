'use client';

import { useState } from 'react';
import Link from 'next/link';

import { signOut } from 'next-auth/react';
import type { User } from '@/helpers/authHelper';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const settings = ['Profile', 'My locations'];

const UserMenu = ({ user }: { user: User }) => {
  console.log(user);

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
        {settings.map(setting => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
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
