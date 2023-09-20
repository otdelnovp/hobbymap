import { DefaultSession } from 'next-auth';
import type { User } from '@/helpers/authHelper';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User & DefaultSession['user'];
    accessToken: string;
    idToken?: string;
  }
}
