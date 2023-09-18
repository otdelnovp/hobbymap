import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map(c => [c.name, c.value]),
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works
  const session = await originalGetServerSession(req, res, authConfig);
  return session;
};
