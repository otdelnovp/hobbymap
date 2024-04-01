import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { PersonalCard } from "./_ui/personal-card";

export async function Profile() {
  const session = await getAppSessionServer();
  if (!session?.user) return null;

  return <PersonalCard session={session} />;
}
