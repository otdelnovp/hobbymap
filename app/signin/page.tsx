import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { GoogleButton } from '@/components/AuthProviders/GoogleButton';
import { FacebookButton } from '@/components/AuthProviders/FacebookButton';

export const metadata: Metadata = {
  title: 'Hobby Map: Sign in',
};

export default async function Signin() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
            Sign in
          </Typography>
          <GoogleButton />
          <FacebookButton />
        </Box>
      </Paper>
    </Box>
  );
}
