import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { LocationType } from '@/helpers/locationHelper';
import { getServerSideData } from '@/instance/fetch';

import dynamic from 'next/dynamic';
import { Loader } from '@/components/Loader/Loader';

const MapLocations = dynamic(() => import('@/components/Map/MapLocations'), {
  loading: () => <Loader />,
  ssr: false,
});

export default async function Home() {
  const session = await getServerSession(authOptions);

  const locations: LocationType[] = await getServerSideData({
    url: '/api/locations',
    cache: 'no-store',
  });

  return <MapLocations user={session?.user} locationList={locations} />;
}
