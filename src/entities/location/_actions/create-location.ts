"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { locationSchema } from "../location";
import { createLocationService } from "../location.server";

const propsSchema = z.object({
  userId: z.string(),
  location: locationSchema,
});

const resultSchema = z.object({
  location: locationSchema,
});

export const createLocationAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId, location } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const newLocation = await createLocationService.exec({
    session,
    location: { ...location, userId },
  });

  return resultSchema.parseAsync({
    location: newLocation,
  });
};
