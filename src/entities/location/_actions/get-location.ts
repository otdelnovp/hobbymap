"use server";
import { z } from "zod";
import { getLocationService } from "../_services/get-location";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { locationSchema } from "../_domain/schema";

const propsSchema = z.object({
  locationId: z.string(),
});

const resultSchema = z.object({
  location: locationSchema,
});

export const getLocationAction = async (props: z.infer<typeof propsSchema>) => {
  const { locationId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const location = await getLocationService.exec({
    session,
    locationId,
  });

  return resultSchema.parseAsync({
    location,
  });
};
