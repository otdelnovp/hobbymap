import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

import Typography from '@mui/material/Typography';

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <Typography component="h1" variant="h3" sx={{ px: 2 }}>
      Profile of {session?.user?.name}
    </Typography>
  );
}
