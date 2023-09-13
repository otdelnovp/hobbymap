import type { UserRole, UserHobby } from '@/helpers/authHelper';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      name: string;
      email: string;
      image?: string;
      role?: UserRole;
      hobby?: UserHobby;
      createdAt?: string;
    };
    accessToken: string;
  }
}
