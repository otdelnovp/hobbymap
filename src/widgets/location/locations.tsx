import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { PageTitle } from "@/shared/ui/page-title";
import { EditLocation } from "@/features/edit-location/edit-location";
import { LocationList } from "@/features/location-list/location-list";

export async function Locations() {
  const session = await getAppSessionServer();
  if (!session?.user) return null;

  return (
    <>
      <div className="float-right -mt-1">
        <EditLocation user={session.user} />
      </div>
      <PageTitle size="middle">My locations</PageTitle>
      <LocationList user={session.user} />
    </>
  );
}
