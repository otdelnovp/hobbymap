export type UserId = string;
export type Role = "OWNER" | "ADMIN" | "USER";
export type Hobby = "RCCAR" | "DRONE" | "RCPLANE";

export const ROLES: Record<Role, Role> = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  USER: "USER",
};

export const RoleDict: Record<Role, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  USER: "User",
};

export const HOBBY: Record<Hobby, Hobby> = {
  RCCAR: "RCCAR",
  DRONE: "DRONE",
  RCPLANE: "RCPLANE",
};

export const HobbyDict: Record<Hobby, string> = {
  RCCAR: "RC Car",
  DRONE: "FPV Drone",
  RCPLANE: "RC Airplane",
};

export type SharedUser = {
  id: UserId;
  email: string;
  emailVerified?: Date | null;
  // hashedPassword?: string | null;
  name?: string | null;
  image?: string | null;
  role: Role;
  hobby: Hobby | null;
  isDeleted?: boolean | null;
  instagram?: string | null;
  facebook?: string | null;
  telegram?: string | null;
};

export type SharedSession = {
  user: SharedUser;
  expires: string;
};
