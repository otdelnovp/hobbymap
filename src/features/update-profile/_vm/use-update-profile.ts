import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../_actions/update-profile";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { useInvalidateProfile } from "@/entities/user/_queries";

export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    async onSuccess({ profile }, { userId }) {
      console.log(55555, userId);
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
