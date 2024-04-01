"use client";

import { useQuery } from "@tanstack/react-query";
import { getLocationsQuery } from "@/entities/location/location";

import { SharedUser } from "@/kernel/domain/user";
import { LocationListItem } from "./_ui/locations-list-item";

export function LocationList({ user }: { user: SharedUser }) {
  const locationsQuery = useQuery({
    ...getLocationsQuery(user.id),
    retry: 0,
  });

  if (locationsQuery.isPending) {
    return <div aria-label="Loading locations">Loading locations...</div>;
  }

  if (!locationsQuery.data) {
    return <div>Failed to load locations, you may not have permissions</div>;
  }

  console.log(locationsQuery.data.locations);

  return (
    <div className="flex flex-wrap items-stretch -mx-1.5">
      {locationsQuery.data.locations.map((locationItem) => (
        <LocationListItem
          key={locationItem.id}
          location={locationItem}
          user={user}
        />
      ))}
    </div>
  );
}
