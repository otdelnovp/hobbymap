import Link from "next/link";
import { LogOut } from "lucide-react";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";

import { SharedUser } from "@/kernel/domain/user";
import { useSignOut } from "@/features/auth/use-sign-out";

import { AppHeaderNavItem } from "../_domain/types";
import { profileNavList } from "../_constants";

export function ProfileNav({ user }: { user: SharedUser }) {
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  const itemNavTemplate = ({ link, title, icon }: AppHeaderNavItem) => {
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
    <DropdownMenuGroup>
      {profileNavList(user).map((itemNav) => itemNavTemplate(itemNav))}
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled={isLoadingSignOut} onClick={() => signOut()}>
        <LogOut className="mr-2 h-4 w-4 text-red-700 dark:text-red-500" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
