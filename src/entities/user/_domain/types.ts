import { Hobby, Role, UserId } from "@/kernel/domain/user";

export type Profile = {
  id?: UserId;
  email: string;
  name?: string | null;
  image?: string | null;
  role?: Role;
  hobby?: Hobby | null;
  isDeleted?: boolean | null;
  instagram?: string | null;
  facebook?: string | null;
  telegram?: string | null;
};
