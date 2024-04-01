import { useMutation } from "@tanstack/react-query";
import { useInvalidateLocations } from "@/entities/location/location";
import { createLocationAction } from "@/entities/location/location.server";
import { useAppSession } from "@/kernel/lib/next-auth/client";

export const useCreateLocation = () => {
  const session = useAppSession();
  const invalidateLocations = useInvalidateLocations();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLocationAction,
    async onSuccess({ location }, { userId }) {
      await invalidateLocations(session.data?.user.id);
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
