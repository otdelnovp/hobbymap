import Link from "next/link";
import { Plus } from "lucide-react";

import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { PageTitle } from "@/shared/ui/page-title";
import { Button } from "@/shared/ui/button";

import { LocationList } from "@/features/location-list/location-list";
// import { EditLocationButton } from "@/features/edit-location/edit-location-button";

export async function MyLocationList() {
  const session = await getAppSessionServer();
  if (!session?.user) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle className="mr-2 mb-0">My locations</PageTitle>
        <Button variant="outline" asChild>
          <Link href="/add-location">
            <Plus className="mr-1.5 h-5 w-5" />
            Add location
          </Link>
        </Button>
        {/* <EditLocationButton user={session.user} /> */}
      </div>
      <LocationList user={session.user} />
    </>
  );
}
