"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { SpinnerProp } from "@/shared/ui/spinner-prop";
import { getProfileQuery } from "@/entities/user/_queries";

import { ProfileForm } from "./_ui/profile-form";

export function UpdateProfileForm({
  userId,
  newUser,
  callbackUrl,
}: {
  userId: string;
  newUser?: boolean;
  callbackUrl?: string;
}) {
  const profileQuery = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });

  const router = useRouter();
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    } else {
      router.refresh();
    }
  };

  if (profileQuery.isPending) {
    return <SpinnerProp aria-label="Loading profile" />;
  }

  if (!profileQuery.data) {
    return <div>Failed to load profile, you may not have permissions</div>;
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data.profile}
      onSuccess={handleSuccess}
      submitText={newUser ? "Continue" : "Save changes"}
    />
  );
}
