"use client";

import { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";

import { SwitchTheme } from "@/features/theme/switch-theme";
import { SignInButton } from "@/features/auth/sign-in-button";

import { ProfileNav } from "./profile-nav";

import {
  ProfileAvatar,
  getProfileDisplayName,
  getProfileDisplayRole,
  isAdmin,
} from "@/entities/user/profile";

export function Profile({ session }: { session: Session | null }) {
  const user = session?.user;

  if (!user) {
    return <SignInButton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8 !ml-6"
        >
          <ProfileAvatar profile={user} className="w-8 h-8" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>{getProfileDisplayName(user)}</p>
          {isAdmin(user) ? (
            <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
              {getProfileDisplayRole(user)}
            </p>
          ) : null}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <SwitchTheme />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ProfileNav user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
