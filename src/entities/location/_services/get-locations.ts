import { Hobby, SharedSession, UserId } from "@/kernel/domain/user";
import { AuthorizationError } from "@/shared/lib/errors";

import { locationRepository } from "../_repositories/location";
import { createLocationAbility } from "../_domain/ability";
import { Location } from "../_domain/types";

type GetLocations = {
  userId?: UserId;
  hobby?: Hobby;
  session: SharedSession | null;
};

export class GetLocationsService {
  async exec({ userId, hobby, session }: GetLocations): Promise<Location[]> {
    const locationAbility = createLocationAbility(session);

    if (!locationAbility.canGetLocations(userId)) {
      throw new AuthorizationError();
    }

    return await locationRepository.getLocationsByUserId(
      userId || session?.user.id,
      hobby,
    );
  }
}

export const getLocationsService = new GetLocationsService();
