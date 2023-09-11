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
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        // @ts-ignore
        token.accessToken = user.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return Promise.resolve({
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.id,
        },
      });
    },
  },
  // debug: process.env.NODE_ENV === 'development',
};
