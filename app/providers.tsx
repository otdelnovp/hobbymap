'use client';

import { SessionProvider } from 'next-auth/react';
import { MuiProvider } from '@/components/MuiProvider/MuiProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiProvider>
      <SessionProvider>{children}</SessionProvider>
    </MuiProvider>
  );
};
