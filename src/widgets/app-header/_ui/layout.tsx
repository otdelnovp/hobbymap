import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/shared/ui/sheet";
import { Menu } from "lucide-react";

export function Layout({
  logo,
  nav,
  navSheet,
  actions,
  profile,
}: {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  navSheet?: React.ReactNode;
  actions?: React.ReactNode;
  profile?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="md:hidden mr-2 -ml-2.5">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="border-b pb-5 mb-5">
                <SheetClose asChild>{logo}</SheetClose>
              </SheetHeader>
              {navSheet}
            </SheetContent>
          </Sheet>
        </div>

        <div className="mr-4 hidden md:flex">{logo}</div>
        <div className="items-center flex-1 flex">
          <div className="hidden md:flex">{nav}</div>
          <div className="flex flex-1 items-center justify-end space-x-3 ">
            {actions}
            {profile}
          </div>
        </div>
      </div>
    </header>
  );
}
