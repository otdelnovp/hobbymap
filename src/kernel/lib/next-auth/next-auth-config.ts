import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { compact } from "lodash-es";
import { privateConfig } from "@/shared/config/private";
import { HOBBY, ROLES, SharedUser } from "@/kernel/domain/user";
import { createId } from "@/shared/lib/id";

const prismaAdapter = PrismaAdapter(dbClient);

const emailToken = privateConfig.TEST_EMAIL_TOKEN
  ? {
      generateVerificationToken: () => privateConfig.TEST_EMAIL_TOKEN ?? "",
      sendVerificationRequest: () =>
        console.log("we don't send emails in test mode"),
    }
  : {};

export const nextAuthConfig: AuthOptions = {
  adapter: {
    ...prismaAdapter,
    createUser: async (data) => {
      const ownerEmails = privateConfig.OWNER_EMAILS?.split(",") ?? [];
      const adminEmails = privateConfig.ADMIN_EMAILS?.split(",") ?? [];
      const role = ownerEmails.includes(data.email)
        ? ROLES.OWNER
        : adminEmails.includes(data.email)
          ? ROLES.ADMIN
          : ROLES.USER;
      const hobby = HOBBY.RCCAR;

      const user: SharedUser = {
        id: createId(),
        ...data,
        role,
        hobby,
      };

      return await dbClient.user.create({
        data: user,
      });
    },
  } as AuthOptions["adapter"],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
          hobby: user.hobby,
          instagram: user.instagram,
          facebook: user.facebook,
          telegram: user.telegram,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: compact([
    EmailProvider({
      ...emailToken,
      server: {
        host: privateConfig.EMAIL_SERVER_HOST,
        port: +privateConfig.EMAIL_SERVER_PORT,
        auth: {
          user: privateConfig.EMAIL_SERVER_USER,
          pass: privateConfig.EMAIL_SERVER_PASSWORD,
        },
      },
      from: privateConfig.EMAIL_FROM,
    }),
    privateConfig.GOOGLE_CLIENT_ID &&
      privateConfig.GOOGLE_SECRET &&
      GoogleProvider({
        clientId: privateConfig.GOOGLE_CLIENT_ID,
        clientSecret: privateConfig.GOOGLE_SECRET,
      }),
  ]),
};
