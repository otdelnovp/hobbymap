import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { GoogleButton } from '@/components/AuthProviders/GoogleButton';
import { VKButton } from '@/components/AuthProviders/VKButton';

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
            SignIn
          </Typography>
          <GoogleButton />
          <VKButton />
        </Box>
      </Paper>
    </Box>
  );
}