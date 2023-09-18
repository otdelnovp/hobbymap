import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

import { MapLocations } from '@/components/Map/MapLocations';

import { LocationType } from '@/helpers/locationHelper';
import { getServerSideData } from '@/instance/fetch';

export default async function Home() {
  const session = await getServerSession(authConfig);

  const locations: LocationType[] = await getServerSideData({
    url: '/api/locations',
    cache: 'no-store',
  });
  return <MapLocations user={session?.user} locationList={locations} />;
}
