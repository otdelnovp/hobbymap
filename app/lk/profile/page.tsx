import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return <main>Profile of {session?.user?.name}</main>;
}
