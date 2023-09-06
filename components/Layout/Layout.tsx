import { Header } from '@/components/Layout/Header';
import Box from '@mui/material/Box';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          mt: ['48px', '56px', '64px'],
          p: 3,
        }}>
        {children}
      </Box>
    </>
  );
};
