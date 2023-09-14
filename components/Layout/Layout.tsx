import Box from '@mui/material/Box';

import { Header } from '@/components/Layout/Header';
import { HobbySelect } from '../HobbySelect/HobbySelect';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: 'relative',
          bgcolor: 'background.default',
          mt: ['48px', '56px', '64px'],
        }}>
        {children}
      </Box>
      <HobbySelect />
    </Box>
  );
};

export { Layout };
