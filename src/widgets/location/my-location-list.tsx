import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { PageTitle } from "@/shared/ui/page-title";
import { EditLocationButton } from "@/features/edit-location/edit-location-button";
import { LocationList } from "@/features/location-list/location-list";

export async function MyLocationList() {
  const session = await getAppSessionServer();
  if (!session?.user) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle className="mr-2 mb-0">My locations</PageTitle>
        <EditLocationButton user={session.user} />
      </div>
      <LocationList user={session.user} />
    </>
  );
}
