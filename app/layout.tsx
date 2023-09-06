import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/app/providers';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hobby Map',
  description: 'Locations for your hobby',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
