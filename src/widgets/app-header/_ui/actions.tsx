import { Session } from "next-auth";

import { ToggleTheme } from "@/features/theme/toggle-theme";
import { SelectHobbyDialog } from "@/features/select-hobby/select-hobby-dialog";
import { SelectHobby } from "@/features/select-hobby/select-hobby";

export function Actions({ session }: { session: Session | null }) {
  return (
    <>
      <SelectHobbyDialog session={session} />
      <SelectHobby session={session} />
      {!session?.user && <ToggleTheme />}
    </>
  );
}
