"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { compact } from "lodash-es";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { LogOut, Contact, LockKeyhole, MapPinned } from "lucide-react";

import { SwitchTheme } from "@/features/theme/switch-theme";
import { useSignOut } from "@/features/auth/use-sign-out";
import { SignInButton } from "@/features/auth/sign-in-button";

import {
  ProfileAvatar,
  getProfileDisplayName,
  getProfileDisplayRole,
  isAdmin,
} from "@/entities/user/profile";

type ItemNav = {
  link: string;
  title: string;
  icon: React.ReactElement;
};

export function Profile({ session }: { session: Session | null }) {
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  const user = session?.user;

  if (!user) {
    return <SignInButton />;
  }

  const navList: ItemNav[] = compact([
    {
      link: "/lk",
      title: "Personal page",
      icon: <Contact className="mr-2 h-4 w-4" />,
    },
    {
      link: "/lk",
      title: "My locations",
      icon: <MapPinned className="mr-2 h-4 w-4" />,
    },
    // {
    //   link: `/profile/${user?.id}`,
    //   title: "Профиль",
    //   icon: <User className="mr-2 h-4 w-4" />,
    // },
    isAdmin(user) && {
      link: "/api-doc",
      title: "Admin panel",
      icon: <LockKeyhole className="mr-2 h-4 w-4" />,
    },
  ]);

  const itemNavTemplate = ({ link, title, icon }: ItemNav) => {
    return (
      <DropdownMenuItem key={link} asChild>
        <Link href={link}>
          {icon}
          <span>{title}</span>
        </Link>
      </DropdownMenuItem>
    );
  };

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
        <DropdownMenuGroup>
          {navList.map((itemNav) => itemNavTemplate(itemNav))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4 text-red-700 dark:text-red-500" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
