import { SheetClose } from "@/shared/ui/sheet";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function MainNav({ sheet }: { sheet?: boolean }) {
  type ItemNav = {
    link: string;
    title: string;
    icon?: React.ReactElement;
  };

  const navList: ItemNav[] = [
    { link: "/", title: "Map" },
    { link: "/about", title: "About" },
    {
      link: "/add-location",
      title: "Add location",
      icon: <PlusCircle className="w-4 h-4 mr-1" />,
    },
  ];

  const itemNavTemplate = ({ link, title, icon }: ItemNav) => {
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
      {navList.map((itemNav) => itemNavTemplate(itemNav))}
    </nav>
  );
}
