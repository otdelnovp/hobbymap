import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
    accessToken: string;
  }
}
