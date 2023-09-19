'use client';

import { User } from '@/helpers/authHelper';
import { LocationType } from '@/helpers/locationHelper';

import MapWrapper from '@/components/Map/MapWrapper';
import { MapPoint } from '@/components/Map/MapPoint';

export default function MapLocations({
  user,
  locationList,
}: {
  user: User;
  locationList: LocationType[];
}) {
  return (
    <MapWrapper>
      {locationList?.length
        ? locationList.map(locationItem => <MapPoint locationItem={locationItem} />)
        : null}
    </MapWrapper>
  );
}
