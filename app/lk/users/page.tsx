import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';
import { isUserAdmin } from '@/helpers/authHelper';

export default async function Users() {
  const session = await getServerSession(authConfig);

  if (!isUserAdmin(session?.user)) return null;

  return <main>user list</main>;
}
