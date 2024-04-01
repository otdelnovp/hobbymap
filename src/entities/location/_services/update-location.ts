import { SharedSession } from "@/kernel/domain/user";
import { AuthorizationError } from "@/shared/lib/errors";

import { locationRepository } from "../_repositories/location";
import { createLocationAbility } from "../_domain/ability";
import { Location, LocationId } from "../_domain/types";

type UpdateLocation = {
  locationId: LocationId;
  location: Partial<Omit<Location, "id" | "user">>;
  session: SharedSession;
};

export class UpdateLocationService {
  async exec({
    locationId,
    location,
    session,
  }: UpdateLocation): Promise<Location> {
    const locationAbility = createLocationAbility(session);

    if (!locationAbility.canEditLocation(location)) {
      throw new AuthorizationError();
    }

    return await locationRepository.updateLocationById(locationId, location);
  }
}

export const updateLocationService = new UpdateLocationService();
