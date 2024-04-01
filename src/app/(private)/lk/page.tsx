import { Metadata } from "next";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { PageTitle } from "@/shared/ui/page-title";
import { Profile } from "@/widgets/profile/profile";
import { Locations } from "@/widgets/location/locations";

export const metadata: Metadata = {
  title: "Personal page",
};

export default async function ProfilePage() {
  return (
    <ContentWrapper>
      <PageTitle>Personal page</PageTitle>
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-10">
        <div className="col-span-4 lg:col-span-3">
          <Profile />
        </div>
        <div className="col-span-4 lg:col-span-9">
          <Locations />
        </div>
      </div>
    </ContentWrapper>
  );
}
