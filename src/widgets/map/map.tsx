"use client";

import { useEffect } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { LayersControl } from "react-leaflet/LayersControl";
import { LayerGroup } from "react-leaflet/LayerGroup";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";

import { usePosition } from "@/shared/hooks/usePosition";

function MapComponent({ children }: { children?: React.ReactNode }) {
  const map = useMap();
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    if (latitude && longitude && !error) {
      map.setView([latitude, longitude]);
    }
  }, [latitude, longitude, error, map]);

  return children;
}

export default function Map({
  children = null,
  zoom = 11,
}: {
  children?: React.ReactNode;
  zoom?: number;
}) {
  const { latitude, longitude } = usePosition();
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <LayersControl>
        <LayersControl.BaseLayer checked name="Google Map">
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.com/maps/vt?lyrs=m@189&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Map Satellite">
          <LayerGroup>
            <TileLayer
              attribution="Google Maps Satellite"
              url="https://www.google.com/maps/vt?lyrs=s@189&x={x}&y={y}&z={z}"
            />
            <TileLayer url="https://www.google.com/maps/vt?lyrs=s@189&x={x}&y={y}&z={z}" />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Open Street Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        {/* <LayersControl.BaseLayer name="Yandex Maps">
          <TileLayer
            attribution="Yandex Maps"
            url="http://vec{s}.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU"
          />
        </LayersControl.BaseLayer> */}
      </LayersControl>
      <MapComponent>{children}</MapComponent>
    </MapContainer>
  );
}
