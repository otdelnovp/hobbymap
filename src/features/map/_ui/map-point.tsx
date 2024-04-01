"use client";

import { Marker, Tooltip, Popup } from "react-leaflet";

import { Location } from "@/entities/location/_domain/types";
import { getDateStr } from "@/shared/lib/date";
import { Button } from "@/shared/ui/button";
import { getProfileDisplayHobbyIcon } from "@/entities/user/profile";

export const MapPoint = ({ location }: { location: Location }) => {
  return location.latitude && location.longitude ? (
    <Marker
      position={[location.latitude, location.longitude]}
      key={location.id}
    >
      <Tooltip direction="top" offset={[-15, -13]}>
        {location.title}
      </Tooltip>
      <Popup>
        <div className="w-25">
          <h3 className="font-semibold mb-1">
            {getProfileDisplayHobbyIcon(location.hobby, {
              className: "w-5 h-5 mr-2 inline-block align-[-0.3em]",
            })}
            {location.title}
          </h3>
          {location.description ? (
            <div className="text-muted-foreground text-xs">
              {location.description}
            </div>
          ) : null}
          <div className="text-sm mt-2">
            <span className="text-muted-foreground pr-1">author:</span>
            {location.user?.name ?? location.user?.email}
          </div>
          <div className="text-sm mb-2.5">
            <span className="text-muted-foreground pr-1">created:</span>
            {getDateStr(location?.createdAt)}
          </div>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://maps.google.com?saddr=Current+Location&daddr=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-dark"
            >
              build a route &rarr;
            </a>
          </Button>
        </div>
      </Popup>
    </Marker>
  ) : null;
};
