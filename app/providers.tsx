'use client';

import { SessionProvider } from 'next-auth/react';
import { MuiProvider } from '@/components/MuiProvider/MuiProvider';

export const Providers = ({ session, children }: { session: any; children: React.ReactNode }) => {
  return (
    <MuiProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </MuiProvider>
  );
};
