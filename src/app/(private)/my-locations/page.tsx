import { Metadata } from "next";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { MyLocationList } from "@/widgets/location/my-location-list";

export const metadata: Metadata = {
  title: "My locations",
};

export default async function MyLocationsPage() {
  return (
    <ContentWrapper>
      <MyLocationList />
    </ContentWrapper>
  );
}
