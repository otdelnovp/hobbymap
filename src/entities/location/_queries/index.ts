import { useQueryClient } from "@tanstack/react-query";
import { UserId } from "@/kernel/domain/user";
import { getLocationsAction } from "../_actions/get-locations";
import { getLocationAction } from "../_actions/get-location";
import { Location, LocationId } from "../location";

const baseKey = "location";

export const getLocationsQuery = (userId?: UserId) => ({
  queryKey: [baseKey, "getLocationsByUserId", userId],
  queryFn: () => getLocationsAction({ userId }),
});

export const useInvalidateLocations = () => {
  const queryClient = useQueryClient();
  return (userId?: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getLocationsByUserId", userId],
    });
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
