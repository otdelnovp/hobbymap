import { useMutation } from "@tanstack/react-query";
import { updateHobbyAction } from "../_actions/update-hobby";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { useInvalidateProfile } from "@/entities/user/_queries";

export const useUpdateHobby = () => {
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateHobbyAction,
    async onSuccess({ profile }, { userId }) {
      await invalidateProfile(userId);
      await updateSession({
        user: profile,
      });
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
