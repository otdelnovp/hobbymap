import { SharedSession, UserId, ROLES, SharedUser } from "@/kernel/domain/user";

export const isOwner = (user?: SharedUser) => user?.role === ROLES.OWNER;

export const isAdmin = (user?: SharedUser) =>
  user?.role === ROLES.OWNER || user?.role === ROLES.ADMIN;

export const isUser = (user?: SharedUser) => user?.role === ROLES.USER;

export const createUserAbility = (session: SharedSession) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId || isAdmin(session?.user),
});

export const createProfileAbility = (session: SharedSession) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId || isAdmin(session?.user),
});
