import { Profile } from "@/entities/user/profile";
import { UserId, Hobby } from "@/kernel/domain/user";

export type LocationId = string;

export type Location = {
  id: LocationId;
  title: string;
  description?: string | null;
  hobby: Hobby;
  latitude: number;
  longitude: number;
  userId: UserId;
  user?: Partial<Profile>;
  createdAt?: Date;
};
