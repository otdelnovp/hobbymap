import { useQueryClient } from "@tanstack/react-query";
import { Hobby, UserId } from "@/kernel/domain/user";
import { getLocationsAction } from "../_actions/get-locations";

const baseKey = "location";

export const getLocationsQuery = ({
  userId,
  hobby,
}: {
  userId?: UserId;
  hobby?: Hobby;
}) => ({
  queryKey: [baseKey, "getLocationsByUserId", userId, hobby],
  queryFn: () => getLocationsAction({ userId, hobby }),
});

export const useInvalidateLocations = () => {
  const queryClient = useQueryClient();
  return ({ userId, hobby }: { userId?: UserId; hobby?: Hobby }) => {
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getLocationsByUserId", userId, hobby],
    });
  };
};
