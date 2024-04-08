import { useQueryClient } from "@tanstack/react-query";
import { getLocationAction } from "../_actions/get-location";
import { LocationId } from "../location";

const baseKey = "location";

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
