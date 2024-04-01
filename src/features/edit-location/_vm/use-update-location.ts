import { useMutation } from "@tanstack/react-query";
import { useInvalidateLocation } from "@/entities/location/location";
import { updateLocationAction } from "@/entities/location/location.server";
// import { useAppSession } from "@/kernel/lib/next-auth/client";

export const useUpdateLocation = () => {
  // const { update: updateSession } = useAppSession();
  const invalidateLocation = useInvalidateLocation();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateLocationAction,
    async onSuccess({ locationId }) {
      await invalidateLocation(locationId);
      // await updateSession({
      //   user: location,
      // });
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
