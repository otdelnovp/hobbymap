import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Typography from '@mui/material/Typography';

import { getServerSideData } from '@/instance/fetch';
import { type User, isUserAdmin } from '@/helpers/authHelper';

import { UserList } from '@/components/User/UserList';

export const metadata: Metadata = {
  title: 'Hobby Map: User list',
};

export default async function Users() {
  const session = await getServerSession(authOptions);
  if (!isUserAdmin(session?.user)) return null;

  const users: User[] = await getServerSideData({ url: '/api/users', cache: 'no-store' });

  return (
    <>
      <Typography component="h1" variant="h3">
        User list
      </Typography>
      <UserList user={session?.user} userList={users} />
    </>
  );
}
