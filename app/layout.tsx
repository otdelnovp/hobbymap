import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout/Layout';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

export const metadata: Metadata = {
  title: 'Hobby Map',
  description: 'Locations for your hobby',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
