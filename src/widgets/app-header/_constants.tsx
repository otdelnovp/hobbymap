import { compact } from "lodash-es";
import { Contact, LockKeyhole, MapPinned, PlusCircle } from "lucide-react";

import { SharedUser } from "@/kernel/domain/user";
import { isAdmin } from "@/entities/user/profile";
import { AppHeaderNavItem } from "./_domain/types";

export const mainNavList = (): AppHeaderNavItem[] => [
  { link: "/", title: "Map" },
  { link: "/about", title: "About" },
  {
    link: "/add-location",
    title: "Add location",
    icon: <PlusCircle className="w-4 h-4 mr-1" />,
  },
];

export const profileNavList = (user: SharedUser): AppHeaderNavItem[] =>
  compact([
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
