import { isAdmin } from "@/entities/user/profile";
import { SharedSession, UserId } from "@/kernel/domain/user";
import { Location } from "./types";

export const createLocationAbility = (session: SharedSession | null) => ({
  canGetLocation: () => true,
  canGetLocations: (userId?: UserId) =>
    !userId ||
    (userId && session?.user.id === userId) ||
    isAdmin(session?.user),
  canEditLocation: (location: Partial<Location>) =>
    !location.id ||
    (location.id && location.userId === session?.user.id) ||
    isAdmin(session?.user),
});
