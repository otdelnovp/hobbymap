import { profileSchema } from "@/entities/user/profile";
import { HOBBY } from "@/kernel/domain/user";
import { z } from "zod";

export const locationSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  hobby: z.nativeEnum(HOBBY),
  latitude: z.number(),
  longitude: z.number(),
  userId: z.string(),
  createdAt: z.date().optional(),
  user: profileSchema.partial().optional(),
});
