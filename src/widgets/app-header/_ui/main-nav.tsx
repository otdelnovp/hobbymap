import Link from "next/link";

import { SheetClose } from "@/shared/ui/sheet";
import { AppHeaderNavItem } from "../_domain/types";
import { mainNavList } from "../_constants";

export function MainNav({ sheet }: { sheet?: boolean }) {
  const itemNavTemplate = ({ link, title, icon }: AppHeaderNavItem) => {
    const itemLink = (
      <Link
        key={link}
        className="flex items-center justify-center transition-colors hover:text-foreground/80 text-foreground/60"
        href={link}
      >
        {icon}
        <span>{title}</span>
      </Link>
    );
    return sheet ? (
      <SheetClose key={link} asChild>
        {itemLink}
      </SheetClose>
    ) : (
      itemLink
    );
  };

  return (
    <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
      {mainNavList().map((itemNav) => itemNavTemplate(itemNav))}
    </nav>
  );
}
