import { ContentWrapper } from "@/shared/ui/content-wrapper";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { PageTitle } from "@/shared/ui/page-title";
import { MailCheck } from "lucide-react";

export default function VerifyRequestPage() {
  return (
    <ContentWrapper>
      <Card className="w-full max-w-[350px] m-auto py-10">
        <CardHeader className="flex flex-col text-center pb-2">
          <PageTitle size="small" className="flex items-center justify-center">
            <MailCheck className="w-6 h-6 mr-2" />
            Check your email
          </PageTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="px-0 text-center text-sm text-muted-foreground">
            A login link has been sent
            <br /> to your email address.
          </p>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
