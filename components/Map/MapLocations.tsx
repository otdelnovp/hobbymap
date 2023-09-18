import dynamic from 'next/dynamic';
import { Loader } from '@/components/Loader/Loader';

import { User } from '@/helpers/authHelper';
import { LocationType } from '@/helpers/locationHelper';

import { MapPoint } from '@/components/Map/MapPoint';

const Map = dynamic(() => import('@/components/Map/Map'), {
  loading: () => <Loader />,
  ssr: false,
});

export const MapLocations = ({
  user,
  locationList,
}: {
  user: User;
  locationList: LocationType[];
}) => {
  console.log(locationList);
  return locationList ? (
    <Map>
      {locationList.map(locationItem => (
        <MapPoint locationItem={locationItem} />
      ))}
    </Map>
  ) : null;
};
