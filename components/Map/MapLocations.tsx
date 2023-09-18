import dynamic from 'next/dynamic';
import { Loader } from '@/components/Loader/Loader';

import { User } from '@/helpers/authHelper';
import { LocationType } from '@/helpers/locationHelper';

import { MapPoint } from '@/components/Map/MapPoint';

const MapContainer = dynamic(() => import('@/components/Map/MapContainer'), {
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
  return locationList ? (
    <MapContainer>
      {locationList.map(locationItem => (
        <MapPoint locationItem={locationItem} />
      ))}
    </MapContainer>
  ) : null;
};
