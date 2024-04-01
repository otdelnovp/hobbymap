import { Metadata } from "next";
import { AppHeader } from "@/widgets/app-header/app-header";

export const metadata: Metadata = {
  title: "Auth",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader variant="auth" />
      {children}
    </>
  );
}
