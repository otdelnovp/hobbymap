import type { Metadata } from 'next';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Typography from '@mui/material/Typography';

import { LocationType } from '@/helpers/locationHelper';
import { getServerSideData } from '@/instance/fetch';

import { LocationList } from '@/components/Location/LocationList';

export const metadata: Metadata = {
  title: 'Hobby Map: My locations',
};

export default async function Locations() {
  const session = await getServerSession(authOptions);

  const locations: LocationType[] = await getServerSideData({
    url: '/api/locations',
    cache: 'no-store',
  });

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
        My locations
      </Typography>
      <LocationList user={session?.user} locationList={locations} />
    </>
  );
}
