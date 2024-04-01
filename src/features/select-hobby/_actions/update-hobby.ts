"use server";

import { z } from "zod";
import { profileSchema } from "@/entities/user/profile";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { updateProfileService } from "@/entities/user/profile.server";
import { HOBBY } from "@/kernel/domain/user";

const propsSchema = z.object({
  userId: z.string(),
  hobby: z.nativeEnum(HOBBY),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateHobbyAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId, hobby } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await updateProfileService.exec({
    session,
    data: { hobby },
    userId,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
