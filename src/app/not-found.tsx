import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HobbyMap - 404 Page not found",
};
export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[420px] py-5">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl">404</CardTitle>
          <CardDescription>Page not found</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href="/">&larr; Back to main page</Link>
        </CardContent>
      </Card>
    </div>
  );
}
