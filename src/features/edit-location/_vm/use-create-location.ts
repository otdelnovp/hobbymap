import { useMutation } from "@tanstack/react-query";
import { useInvalidateLocation } from "@/entities/location/location";
import { createLocationAction } from "@/entities/location/location.server";

export const useCreateLocation = () => {
  const invalidateLocation = useInvalidateLocation();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLocationAction,
    async onSuccess({ location }, { userId }) {
      await invalidateLocation(userId);
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
