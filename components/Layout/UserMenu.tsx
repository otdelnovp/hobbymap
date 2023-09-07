'use client';

import { useState } from 'react';
import Link from 'next/link';

import { signOut, useSession } from 'next-auth/react';

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

const UserMenu = () => {
  const session = useSession();

  console.log(session);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return session?.data ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={session.data.user?.name} arrow disableInteractive>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={session.data.user?.name ?? undefined} src={session.data.user?.image ?? undefined} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-app-bar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
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
    <Button LinkComponent={Link} href="/api/auth/signin" variant="contained">
      SignIn
    </Button>
  );
};

export { UserMenu };
