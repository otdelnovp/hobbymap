import { SharedSession } from "@/kernel/domain/user";
import { AuthorizationError } from "@/shared/lib/errors";

import { locationRepository } from "../_repositories/location";
import { createLocationAbility } from "../_domain/ability";
import { Location } from "../_domain/types";

type CreateLocation = {
  location: Omit<Location, "id">;
  session: SharedSession;
};

export class CreateLocationService {
  async exec({ location, session }: CreateLocation): Promise<Location> {
    const locationAbility = createLocationAbility(session);

    if (!locationAbility.canEditLocation(location)) {
      throw new AuthorizationError();
    }

    return await locationRepository.createLocation(location);
  }
}

export const createLocationService = new CreateLocationService();
