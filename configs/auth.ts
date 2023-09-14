// @ts-nocheck
import type { AuthOptions, User } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma';

// import Credentials from 'next-auth/providers/credentials';
// import { users } from '@/data/users';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
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
    async jwt({ token, user, trigger, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.user = user;
      }
      if (trigger === 'update') {
        token.accessToken = session.accessToken;
        token.user = session.user;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  // debug: process.env.NODE_ENV === 'development',
};
