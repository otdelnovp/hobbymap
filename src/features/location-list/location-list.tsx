"use client";

import { useQuery } from "@tanstack/react-query";
import { getLocationsQuery } from "@/entities/location/location";
import { getLocalStorage } from "@/shared/hooks/useLocalStorage";

import { Hobby, SharedUser } from "@/kernel/domain/user";

import { LocationListItem } from "./_ui/locations-list-item";
import { LocationListSkeleton } from "./_ui/locations-list-skeleton";

export function LocationList({ user }: { user: SharedUser }) {
  const localHobby: Hobby | undefined = getLocalStorage("hobby", true);

  const locationsQuery = useQuery({
    ...getLocationsQuery(user.id, localHobby),
    retry: 0,
  });

  if (locationsQuery.isFetching || locationsQuery.isPending) {
    return <LocationListSkeleton />;
  }

  if (!locationsQuery.data) {
    return <div>Failed to load locations, you may not have permissions</div>;
  }

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
