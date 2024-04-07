import { redirect } from "next/navigation";

import { getAppSessionServer } from "@/kernel/lib/next-auth/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/ui/card";
import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { PageTitle } from "@/shared/ui/page-title";

import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";

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
    <ContentWrapper>
      <Card className="w-full max-w-[600px] m-auto">
        <CardHeader>
          <PageTitle size="small">Last step</PageTitle>
          <CardDescription>
            Update your profile, this is how other users will see you on this
            site
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <UpdateProfileForm
            userId={session.user.id}
            newUser={true}
            callbackUrl={searchParams.callbackUrl}
          />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
