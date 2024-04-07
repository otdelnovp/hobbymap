import dynamic from "next/dynamic";
import { Metadata } from "next";

import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { SpinnerProp } from "@/shared/icons/spinner-prop";

const MapAddLocation = dynamic(
  () => import("@/features/map-add-location/map-add-location"),
  {
    loading: () => <SpinnerProp />,
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "Add new location",
};

export default async function ProfilePage() {
  const session = await getAppSessionServer();
  return (
    <ContentWrapper fullSize>
      <MapAddLocation user={session?.user} />
    </ContentWrapper>
  );
}
