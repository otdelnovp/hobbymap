// @ts-nocheck

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import GoggleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';

import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma';
import { PrismaClient } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_SECRET!,
    // }),
    // Credentials({
    //   credentials: {
    //     email: { label: 'email', type: 'email', required: true },
    //     password: { label: 'password', type: 'password', required: true },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) return null;

    //     const currentUser = users.find(user => user.email === credentials.email)

    //     if (currentUser && currentUser.password === credentials.password) {
    //       const { password, ...userWithoutPass } = currentUser;

    //       return userWithoutPass as User;
    //     }

    //     return null
    //   }
    // })
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: token.user,
        apiToken: token.apiToken,
        accessToken: token.accessToken,
      };
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, accessToken: session.accessToken, user: session.user };
      }
      if (typeof user !== 'undefined') {
        return { ...token, user: user as JWT };
      }
      return token;
    },
  },
  // debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
