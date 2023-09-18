import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Hobby Map',
  description: 'Locations for your hobby',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
