import { useQueryClient } from "@tanstack/react-query";
import { Hobby, UserId } from "@/kernel/domain/user";
import { getLocationsAction } from "../_actions/get-locations";
import { getLocationAction } from "../_actions/get-location";
import { LocationId } from "../location";

const baseKey = "location";

export const getLocationsQuery = (userId?: UserId, hobby?: Hobby) => ({
  queryKey: [baseKey, "getLocationsByUserId", userId, hobby],
  queryFn: () => getLocationsAction({ userId, hobby }),
});

export const useInvalidateLocations = () => {
  const queryClient = useQueryClient();
  return (userId?: UserId, hobby?: Hobby) => {
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getLocationsByUserId", userId, hobby],
    });
  };
};

export const getLocationQuery = (locationId: LocationId) => ({
  queryKey: [baseKey, "getLocationById", locationId],
  queryFn: () => getLocationAction({ locationId }),
});

export const useInvalidateLocation = () => {
  const queryClient = useQueryClient();
  return (locationId: LocationId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getLocationById", locationId],
    });
};
