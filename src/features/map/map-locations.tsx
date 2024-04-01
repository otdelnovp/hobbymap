"use client";

import { SharedUser } from "@/kernel/domain/user";
import { Location } from "@/entities/location/location";

import MapWrapper from "./_ui/map-wrapper";
import { MapPoint } from "./_ui/map-point";

export default function MapLocations({
  user,
  locations,
}: {
  user?: SharedUser;
  locations: Location[];
}) {
  return (
    <MapWrapper>
      {locations?.length
        ? locations.map((location) => (
            <MapPoint key={location.id} location={location} />
          ))
        : null}
    </MapWrapper>
  );
}
