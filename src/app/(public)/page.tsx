import dynamic from "next/dynamic";

import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { SpinnerProp } from "@/shared/icons/spinner-prop";

const MapLocations = dynamic(
  () => import("@/features/map-location-list/map-locations"),
  {
    loading: () => <SpinnerProp />,
    ssr: false,
  },
);

export default async function Home() {
  const session = await getAppSessionServer();

  return (
    <ContentWrapper fullSize={true}>
      <MapLocations user={session?.user} />
    </ContentWrapper>
  );
}
