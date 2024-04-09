"use client";

import { useState } from "react";
import { Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";

import { usePosition } from "@/shared/hooks/usePosition";
import { getLocalStorage } from "@/shared/hooks/useLocalStorage";
import { Hobby, SharedUser } from "@/kernel/domain/user";
import { getMapIcon } from "@/entities/location/location";
import { EditLocation } from "@/features/edit-location/edit-location";

export function MapAddLocationPoint({
  user,
  onSuccess,
}: {
  user?: SharedUser;
  onSuccess: () => void;
}) {
  const localHobby: Hobby | undefined = getLocalStorage("hobby", true);

  const { latitude, longitude } = usePosition();

  const [position, setPosition] = useState({
    latitude: latitude || 0,
    longitude: longitude || 0,
  });

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  return position.latitude !== 0 ? (
    <Marker
      position={[position.latitude, position.longitude]}
      icon={getMapIcon(localHobby)}
    >
      {!navigator?.maxTouchPoints && (
        <Tooltip direction="top" offset={[-15, -13]}>
          Click on this marker to select this position to create
          <br /> a new location, or click elsewhere on the map
          <br /> to select another location
        </Tooltip>
      )}
      <Popup>
        <EditLocation
          user={user}
          location={{ ...position, hobby: localHobby }}
          onSuccess={onSuccess}
        />
      </Popup>
    </Marker>
  ) : null;
}
