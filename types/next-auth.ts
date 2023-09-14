import type { User } from '@/helpers/authHelper';
// import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    // user: DefaultSession['user'] & User;
    user: User;
    accessToken: string;
  }
}
