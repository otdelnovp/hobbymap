import { useEffect, useState } from "react";
import { Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";

import { usePosition } from "@/shared/hooks/usePosition";
import { getLocalStorage } from "@/shared/hooks/useLocalStorage";
import { Hobby } from "@/kernel/domain/user";
import { getMapIcon } from "@/entities/location/location";

export function MapAddLocationPoint({ onSuccess }: { onSuccess: () => void }) {
  const localHobby: Hobby | undefined = getLocalStorage("hobby", true);

  const { latitude, longitude, error } = usePosition();

  const [position, setPosition] = useState({
    latitude: latitude || 0,
    longitude: longitude || 0,
  });

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  useEffect(() => {
    if (latitude && longitude && !error) {
      map.setView([latitude, longitude]);
    }
  }, [latitude, longitude, error, map]);

  return position.latitude !== 0 ? (
    <Marker
      position={[position.latitude, position.longitude]}
      icon={getMapIcon(localHobby)}
    >
      <Tooltip direction="top" offset={[-15, -13]}>
        Select this position for create new location
      </Tooltip>
      <Popup>
        <div className="w-96 h-48">Creation form</div>
      </Popup>
    </Marker>
  ) : null;
}
