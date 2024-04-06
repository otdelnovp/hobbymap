"use client";

import { useQuery } from "@tanstack/react-query";
import { Location, getLocationsQuery } from "@/entities/location/location";
import { getLocalStorage } from "@/shared/hooks/useLocalStorage";

import { SharedUser, Hobby } from "@/kernel/domain/user";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";

import Map from "../../widgets/map/map";
import { MapPoint } from "./_ui/map-point";

export default function MapLocations({ user }: { user?: SharedUser }) {
  const localHobby: Hobby | undefined = getLocalStorage("hobby", true);

  const locationsQuery = useQuery({
    ...getLocationsQuery(user?.id, localHobby),
    retry: 0,
  });

  if (!locationsQuery.data && !locationsQuery.isPending) {
    return <div>Failed to load profile, you may not have permissions</div>;
  }

  return (
    <>
      <Map>
        {!locationsQuery.isPending && locationsQuery.data?.locations.length
          ? locationsQuery.data.locations.map((location: Location) => (
              <MapPoint key={location.id} location={location} />
            ))
          : null}
      </Map>
      <FullPageSpinner isLoading={locationsQuery.isPending} />
    </>
  );
}
