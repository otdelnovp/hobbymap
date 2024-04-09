import Link from "next/link";
import { compact } from "lodash-es";
import { Contact, LockKeyhole, LogOut, MapPinned } from "lucide-react";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";

import { SharedUser } from "@/kernel/domain/user";
import { isAdmin } from "@/entities/user/profile";
import { useSignOut } from "@/features/auth/use-sign-out";

export function ProfileNav({ user }: { user: SharedUser }) {
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  type ItemNav = {
    link: string;
    title: string;
    icon: React.ReactElement;
  };

  const navList: ItemNav[] = compact([
    {
      link: "/lk",
      title: "Personal page",
      icon: <Contact className="mr-2 h-4 w-4" />,
    },
    {
      link: "/my-locations",
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
    <DropdownMenuGroup>
      {navList.map((itemNav) => itemNavTemplate(itemNav))}
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled={isLoadingSignOut} onClick={() => signOut()}>
        <LogOut className="mr-2 h-4 w-4 text-red-700 dark:text-red-500" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
