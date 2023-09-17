'use client';

import { SessionProvider } from 'next-auth/react';
import { MuiProvider } from '@/components/MuiProvider/MuiProvider';

export const Providers = ({ session, children }: { session: any; children: React.ReactNode }) => {
  return (
    <SessionProvider session={session}>
      <MuiProvider>{children}</MuiProvider>
    </SessionProvider>
  );
};
