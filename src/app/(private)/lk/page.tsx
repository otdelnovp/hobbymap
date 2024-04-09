import { Metadata } from "next";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { PageTitle } from "@/shared/ui/page-title";
import { Profile } from "@/widgets/profile/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const metadata: Metadata = {
  title: "Personal page",
};

export default async function ProfilePage() {
  return (
    <ContentWrapper>
      <PageTitle>Personal page</PageTitle>
      <div className="grid grid-cols-6 gap-10">
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <Profile />
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My friends</CardTitle>
            </CardHeader>
            <CardContent>list of my friends</CardContent>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
