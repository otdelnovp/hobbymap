import { Metadata } from "next";
import { ContentWrapper } from "@/shared/ui/content-wrapper";

export const metadata: Metadata = {
  title: "Add new location",
};

export default async function ProfilePage() {
  return (
    <ContentWrapper fullSize className="flex items-center justify-center">
      map for add location...
    </ContentWrapper>
  );
}
