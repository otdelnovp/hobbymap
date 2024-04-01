import { RoleDict } from "@/kernel/domain/user";
import { Profile } from "../_domain/types";

export const getProfileDisplayRole = (profile: Profile) =>
  profile ? RoleDict[profile.role as keyof typeof RoleDict] : "User";
