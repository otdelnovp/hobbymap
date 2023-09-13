import type { UserRole } from '@/helpers/authHelper';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      name: string;
      email: string;
      role?: UserRole;
      image?: string;
      createdAt?: string;
    };
    accessToken: string;
  }
}
