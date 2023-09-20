import NextAuth from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import type { NextAuthOptions } from 'next-auth';

import prisma from '@/prisma';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import GoggleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token)
        return {
          ...session,
          user: token.user,
          accessToken: token.accessToken,
        };
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, accessToken: session.accessToken, user: session.user };
      }
      if (typeof user !== 'undefined') {
        return { ...token, user: user };
      }
      return token;
    },
  },
  // debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
