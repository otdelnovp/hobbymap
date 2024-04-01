"use server";

import { z } from "zod";
import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { locationSchema } from "../_domain/schema";
import { getLocationsService } from "../_services/get-locations";

const propsSchema = z.object({
  userId: z.string().optional(),
});

const resultSchema = z.object({
  locations: locationSchema.required().array(),
});

export const getLocationsAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionServer();

  const locations = await getLocationsService.exec({
    userId,
    session,
  });

  return resultSchema.parseAsync({
    locations,
  });
};
