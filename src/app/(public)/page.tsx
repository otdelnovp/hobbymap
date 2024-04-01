import dynamic from "next/dynamic";

import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { SpinnerProp } from "@/shared/ui/spinner-prop";
import { Location, getLocationsQuery } from "@/entities/location/location";

const MapLocations = dynamic(() => import("@/features/map/map-locations"), {
  loading: () => <SpinnerProp />,
  ssr: false,
});
export default async function Home() {
  const session = await getAppSessionServer();

  const locations = await getLocationsQuery(session?.user.id).queryFn();

  return (
    <ContentWrapper fullSize={true}>
      <MapLocations user={session?.user} locations={locations.locations} />
    </ContentWrapper>
  );
}
