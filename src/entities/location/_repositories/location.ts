import { dbClient } from "@/shared/lib/db";
import { UserId } from "@/kernel/domain/user";
import { Location, LocationId } from "../_domain/types";

export class LocationRepository {
  async getLocationsByUserId(userId?: UserId): Promise<Location[]> {
    return dbClient.location.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            instagram: true,
            facebook: true,
            telegram: true,
          },
        },
      },
    });
  }

  async getLocationById(locationId: LocationId): Promise<Location> {
    return dbClient.location.findUniqueOrThrow({
      where: {
        id: locationId,
      },
    });
  }

  async createLocation(data: Omit<Location, "id" | "user">): Promise<Location> {
    return dbClient.location.create({
      data,
    });
  }

  async updateLocationById(
    locationId: LocationId,
    data: Partial<Omit<Location, "user">>,
  ): Promise<Location> {
    return dbClient.location.update({
      where: { id: locationId },
      data,
    });
  }
}

export const locationRepository = new LocationRepository();
