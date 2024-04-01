"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { LocationId, locationSchema } from "../location";
import { updateLocationService } from "../location.server";

const propsSchema = z.object({
  locationId: z.string(),
  location: locationSchema.partial(),
});

const resultSchema = z.object({
  location: locationSchema,
  locationId: z.string(),
});

export const updateLocationAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { location, locationId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const newLocation = await updateLocationService.exec({
    locationId,
    location,
    session,
  });

  return resultSchema.parseAsync({
    location: newLocation,
    locationId,
  });
};
