'use client';

import { useEffect } from 'react';

import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { useMap } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';

import { usePosition } from '@/hooks/usePosition';
import { getLocalStorage } from '@/hooks/useLocalStorage';

function Map({ children }: { children?: React.ReactNode }) {
  const map = useMap();
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    if (latitude && longitude && !error) {
      map.setView([latitude, longitude]);
    }
  }, [latitude, longitude]);

  return children;
}

export default function MapWrapper({ children = null }: { children?: React.ReactNode }) {
  return (
    <MapContainer
      center={getLocalStorage('geolocation') || [59.93863, 30.31413]}
      zoom={11}
      style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Map>{children}</Map>
    </MapContainer>
  );
}
