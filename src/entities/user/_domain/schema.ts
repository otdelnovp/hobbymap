import { HOBBY, ROLES } from "@/kernel/domain/user";
import { z } from "zod";

export const profileSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  role: z.nativeEnum(ROLES),
  hobby: z.nativeEnum(HOBBY).optional(),
  instagram: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
  telegram: z.string().nullable().optional(),
});
