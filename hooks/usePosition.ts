import { useState, useEffect } from 'react';
export const usePosition = () => {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [error, setError] = useState<null | string>(null);

  const onChange = ({ coords }: { coords: any }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: any) => {
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
