import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

import Typography from '@mui/material/Typography';

import { getServerSideData } from '@/instance/fetch';
import { type User, isUserAdmin } from '@/helpers/authHelper';

import { UserList } from '@/components/User/UserList';

export default async function Users() {
  const session = await getServerSession(authConfig);
  if (!isUserAdmin(session?.user)) return null;

  const users: User[] = await getServerSideData({ url: '/api/users', cache: 'no-store' });

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ px: 2 }}>
        User list
      </Typography>
      <UserList user={session?.user} userList={users} />
    </>
  );
}
