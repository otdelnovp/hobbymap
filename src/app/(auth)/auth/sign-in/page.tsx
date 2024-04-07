import React from "react";
import { Suspense } from "react";

import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { SpinnerProp } from "@/shared/icons/spinner-prop";

import { SignInForm } from "@/features/auth/sign-in-form.server";

import AuthenticationError from "./_error";
import { PageTitle } from "@/shared/ui/page-title";

export default function AuthenticationPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  return (
    <>
      <AuthenticationError error={searchParams?.error} />
      <ContentWrapper>
        <Card className="w-full max-w-[350px] m-auto">
          <CardHeader className="flex flex-col text-center pb-2">
            <PageTitle size="small">Sign in</PageTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Suspense fallback={<SpinnerProp />}>
              <SignInForm />
            </Suspense>
          </CardContent>
        </Card>
      </ContentWrapper>
    </>
  );
}
