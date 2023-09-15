import type { Metadata } from 'next';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export const metadata: Metadata = {
  title: 'Hobby Map: Personal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ my: 5, pt: 4, pb: 3, px: 4 }}>{children}</Paper>
    </Container>
  );
}
