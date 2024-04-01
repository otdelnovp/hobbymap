"use client";

import { useEffect } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { LayersControl } from "react-leaflet/LayersControl";
import { LayerGroup } from "react-leaflet/LayerGroup";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";

import { usePosition } from "@/shared/hooks/usePosition";
import { getLocalStorage } from "@/shared/hooks/useLocalStorage";

function Map({ children }: { children?: React.ReactNode }) {
  const map = useMap();
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    if (latitude && longitude && !error) {
      map.setView([latitude, longitude]);
    }
  }, [latitude, longitude, error, map]);

  return children;
}

export default function MapWrapper({
  children = null,
}: {
  children?: React.ReactNode;
}) {
  return (
    <MapContainer
      center={getLocalStorage("geolocation") || [59.93863, 30.31413]}
      zoom={11}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <LayersControl>
        <LayersControl.BaseLayer checked name="Google Map">
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Map Satellite">
          <LayerGroup>
            <TileLayer
              attribution="Google Maps Satellite"
              url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
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
      <Map>{children}</Map>
    </MapContainer>
  );
}
