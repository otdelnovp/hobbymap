import { Location } from "@/entities/location/location";
import { SharedUser } from "@/kernel/domain/user";
import { getDateStr } from "@/shared/lib/date";
import { HobbyIcon } from "@/shared/icons/hobby-icon";

import { EditLocationButton } from "@/features/edit-location/edit-location-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

export const LocationListItem = ({
  location,
  user,
}: {
  location: Location;
  user: SharedUser;
}) => {
  return (
    <div className="w-full md:w-1/2 px-1.5 mb-3">
      <Card className="relative">
        <CardHeader className="p-3">
          <CardTitle className="text-lg pr-8">
            <HobbyIcon
              hobby={location.hobby}
              className="w-5 h-5 mr-2 inline-block align-[-0.25em]"
            />
            {location.title}
          </CardTitle>
          {location.description ? (
            <CardDescription>{location.description}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <p className="text-sm">
            <span className="text-muted-foreground pr-1">author:</span>
            {location.user?.name ?? location.user?.email}
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground pr-1">created date:</span>
            {getDateStr(location?.createdAt)}
          </p>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://maps.google.com?saddr=Current+Location&daddr=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              build a route &rarr;
            </a>
          </Button>
        </CardFooter>
        <EditLocationButton user={user} location={location} />
      </Card>
    </div>
  );
};
