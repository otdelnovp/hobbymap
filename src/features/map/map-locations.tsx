"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import MapWrapper from "./_ui/map-wrapper";
import { MapPoint } from "./_ui/map-point";

import { SharedUser } from "@/kernel/domain/user";
import { Location, getLocationsQuery } from "@/entities/location/location";
import { Hobby } from "@/kernel/domain/user";
import { getLocalStorage } from "@/shared/hooks/useLocalStorage";

export default function MapLocations({ user }: { user?: SharedUser }) {
  const localHobby: Hobby | undefined = getLocalStorage("hobby", true);

  const locationsQuery = useQuery({
    ...getLocationsQuery(user?.id, localHobby),
    retry: 0,
  });

  useEffect(() => {
    locationsQuery.refetch();
  }, [localHobby]);

  if (
    !locationsQuery.data &&
    !(locationsQuery.isFetching || locationsQuery.isPending)
  ) {
    return <div>Failed to load profile, you may not have permissions</div>;
  }

  return (
    <MapWrapper>
      {!(locationsQuery.isFetching || locationsQuery.isPending) &&
      locationsQuery.data?.locations.length
        ? locationsQuery.data.locations.map((location: Location) => (
            <MapPoint key={location.id} location={location} />
          ))
        : null}
    </MapWrapper>
  );
}
