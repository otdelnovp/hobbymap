import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: 'Hobby Map: About',
};

export default function About() {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ my: 5, pt: 4, pb: 3, px: 4 }}>
        <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
          About
        </Typography>
        <p>This is helper to find for your hobby locations</p>
        <p>
          If you like it, you can{' '}
          <a href="https://www.buymeacoffee.com/otdelnov" target="_blank" rel="noopener noreferrer">
            buy me a coffee
          </a>
        </p>
      </Paper>
    </Container>
  );
}
