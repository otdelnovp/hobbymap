import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "./useLocalStorage";

type Coord = {
  latitude: number;
  longitude: number;
};

export const defaultPosition: Coord = {
  latitude: 59.93863,
  longitude: 30.31413,
}; // SPb with love :)

export const usePosition = () => {
  const savedLocation = getLocalStorage("geolocation") || defaultPosition;

  const [position, setPosition] = useState<Coord>(savedLocation);

  const [error, setError] = useState<null | string>(null);

  const onChange = ({ coords }: { coords: GeolocationCoordinates }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setLocalStorage("geolocation", {
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not allowed");
      return;
    }
    geo.getCurrentPosition(onChange, onError);
  }, []);

  return { ...position, error };
};
