import { redirect } from "next/navigation";
import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { Separator } from "@/shared/ui/separator";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { PageTitle } from "@/shared/ui/page-title";

export default async function NewUserPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getAppSessionServer();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <ContentWrapper className="max-w-[600px]">
      <div>
        <PageTitle size="middle">Last step</PageTitle>
        <p className="text-sm text-muted-foreground">
          Update your profile, this is how other users will see you on this site
        </p>
      </div>
      <Separator className="my-6" />
      <UpdateProfileForm
        userId={session.user.id}
        newUser={true}
        callbackUrl={searchParams.callbackUrl}
      />
    </ContentWrapper>
  );
}
