import { SheetClose } from "@/shared/ui/sheet";
import Link from "next/link";

export function MainNav({ sheet }: { sheet?: boolean }) {
  type ItemNav = {
    link: string;
    title: string;
  };

  const navList: ItemNav[] = [
    { link: "/", title: "Map" },
    { link: "/about", title: "About" },
  ];

  const itemNavTemplate = ({ link, title }: ItemNav) => {
    const itemLink = (
      <Link
        key={link}
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href={link}
      >
        {title}
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
      {navList.map((itemNav) => itemNavTemplate(itemNav))}
    </nav>
  );
}
