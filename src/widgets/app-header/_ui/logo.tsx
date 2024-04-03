import Link from "next/link";
import { LogoIcon } from "@/shared/icons/logo-icon";

export function Logo() {
  return (
    <Link className="flex items-center space-x-2 mr-10" href="/">
      <LogoIcon className="h-8 w-8" />
      <span className="font-bold inline-block">Hobby Map</span>
    </Link>
  );
}
