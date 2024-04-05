import { useMutation } from "@tanstack/react-query";
import { useInvalidateLocations } from "@/entities/location/location";
import { updateLocationAction } from "@/entities/location/location.server";
import { useAppSession } from "@/kernel/lib/next-auth/client";

export const useUpdateLocation = () => {
  const session = useAppSession();
  const invalidateLocations = useInvalidateLocations();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateLocationAction,
    async onSuccess({ locationId, location }) {
      await invalidateLocations(session.data?.user.id, location.hobby);
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
