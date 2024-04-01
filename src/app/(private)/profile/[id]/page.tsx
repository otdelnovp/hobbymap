import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { Separator } from "@/shared/ui/separator";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { PageTitle } from "@/shared/ui/page-title";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <ContentWrapper className="max-w-[600px]">
      <PageTitle>Профиль</PageTitle>
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update user profile, this is how other users will see him on this site
        </p>
      </div>
      <Separator />
      <UpdateProfileForm userId={params.id} />
    </ContentWrapper>
  );
}
