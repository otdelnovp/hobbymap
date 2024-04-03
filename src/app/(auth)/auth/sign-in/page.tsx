import { SignInForm } from "@/features/auth/sign-in-form.server";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import React from "react";
import { Suspense } from "react";
import { SpinnerProp } from "@/shared/icons/spinner-prop";
import AuthenticationError from "./_error";

export default function AuthenticationPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  return (
    <>
      {" "}
      <AuthenticationError error={searchParams?.error} />
      <div className="container relative flex-col items-center justify-center self-center pt-24">
        <Card className="max-w-[350px] mx-auto">
          <CardHeader className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Suspense fallback={<SpinnerProp />}>
              <SignInForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
