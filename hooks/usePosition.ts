import { useState, useEffect } from 'react';
import { setLocalStorage } from './useLocalStorage';

type Coord = {
  latitude: number;
  longitude: number;
};

export const usePosition = () => {
  const [position, setPosition] = useState<Coord>();

  const [error, setError] = useState<null | string>(null);

  const onChange = ({ coords }: { coords: GeolocationCoordinates }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setLocalStorage('geolocation', [coords.latitude, coords.longitude]);
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not allowed');
      return;
    }
    geo.getCurrentPosition(onChange, onError);
  }, []);

  return { ...position, error };
};
