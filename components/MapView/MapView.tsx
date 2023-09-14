'use client';

import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
// import { useMap } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  console.log(11111, navigator.geolocation);
  return (
    <MapContainer center={[59.93863, 30.31413]} zoom={11} style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
