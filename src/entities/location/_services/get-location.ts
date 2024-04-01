import { SharedSession } from "@/kernel/domain/user";
import { AuthorizationError } from "@/shared/lib/errors";

import { locationRepository } from "../_repositories/location";
import { createLocationAbility } from "../_domain/ability";
import { Location, LocationId } from "../_domain/types";

type GetLocation = {
  locationId: LocationId;
  session: SharedSession | null;
};

export class GetLocationService {
  async exec({ locationId, session }: GetLocation): Promise<Location> {
    const locationAbility = createLocationAbility(session);

    if (!locationAbility.canGetLocation()) {
      throw new AuthorizationError();
    }

    return await locationRepository.getLocationById(locationId);
  }
}

export const getLocationService = new GetLocationService();
