import { useMutation } from "@tanstack/react-query";
import {
  useInvalidateLocation,
  useInvalidateLocations,
} from "@/entities/location/location";
import { updateLocationAction } from "@/entities/location/location.server";
import { useAppSession } from "@/kernel/lib/next-auth/client";

export const useUpdateLocation = () => {
  const session = useAppSession();
  const invalidateLocation = useInvalidateLocation();
  const invalidateLocations = useInvalidateLocations();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateLocationAction,
    async onSuccess({ locationId, location }) {
      await invalidateLocation(locationId);
      await invalidateLocations({
        hobby: location.hobby,
      });
      await invalidateLocations({
        userId: location.userId,
        hobby: location.hobby,
      });
      if (location.userId !== session.data?.user.id)
        await invalidateLocations({
          userId: session.data?.user.id,
          hobby: location.hobby,
        });
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
