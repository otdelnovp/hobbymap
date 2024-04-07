"use client";

import { SharedUser } from "@/kernel/domain/user";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { Location } from "@/entities/location/location";

import { LocationForm } from "./_ui/location-form";
import { PageTitle } from "@/shared/ui/page-title";

export function EditLocation({
  user,
  location,
  onSuccess,
}: {
  user?: SharedUser;
  location?: Partial<Location>;
  onSuccess?: () => void;
}) {
  const session = useAppSession();
  const authorizedUser = user || session.data?.user;

  if (!authorizedUser) return null;

  return (
    <div className="min-w-72 mb-4">
      <PageTitle size="small">
        {location?.id ? "Edit" : "Add"} location
      </PageTitle>
      <LocationForm
        user={authorizedUser}
        location={location}
        onSuccess={onSuccess}
        submitText={location?.id ? "Save changes" : "Add location"}
      />
    </div>
  );
}
