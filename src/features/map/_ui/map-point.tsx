"use client";

import { Marker, Tooltip, Popup } from "react-leaflet";

import { Location } from "@/entities/location/_domain/types";
import { getDateStr } from "@/shared/lib/date";
import { Button } from "@/shared/ui/button";
import { HobbyIcon } from "@/shared/icons/hobby-icon";
import { getMapIcon } from "../_vm/get-map-icon";

export const MapPoint = ({ location }: { location: Location }) => {
  return location.latitude && location.longitude ? (
    <Marker
      position={[location.latitude, location.longitude]}
      key={location.id}
      icon={getMapIcon(location.hobby)}
    >
      <Tooltip direction="top" offset={[-15, -13]}>
        {location.title}
      </Tooltip>
      <Popup>
        <div className="w-[300px]">
          <h3 className="font-semibold mb-1">
            <HobbyIcon
              hobby={location.hobby}
              className="w-5 h-5 mr-2 inline-block align-[-0.3em]"
            />
            {location.title}
          </h3>
          {location.description ? (
            <div className="text-muted-foreground text-xs">
              {location.description}
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
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
            <div className="text-right">
              <div className="text-xs">
                <span className="text-muted-foreground pr-1">author:</span>
                {location.user?.name ?? location.user?.email}
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground pr-1">created:</span>
                {getDateStr(location?.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null;
};
