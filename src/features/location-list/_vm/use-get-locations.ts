import { useMutation } from "@tanstack/react-query";
import { getLocationsAction } from "@/entities/location/location.server";
import { useInvalidateLocations } from "@/entities/location/_queries/get-locations-query";

export const useGetLocations = () => {
  const invalidateLocations = useInvalidateLocations();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: getLocationsAction,
    async onSuccess({ locations }, { userId }) {
      await invalidateLocations({ userId });
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
