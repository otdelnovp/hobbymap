import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { Actions } from "./_ui/actions";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { Profile } from "./_ui/profile";

export async function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public";
}) {
  const isProfile = variant !== "auth";

  const session = await getAppSessionServer();

  return (
    <Layout
      logo={<Logo />}
      nav={<MainNav />}
      actions={<Actions session={session} />}
      profile={isProfile && <Profile session={session} />}
    />
  );
}
