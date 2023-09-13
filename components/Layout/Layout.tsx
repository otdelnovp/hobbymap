import Box from '@mui/material/Box';

import { Header } from '@/components/Layout/Header';
import { HobbySelect } from '../HobbySelect/HobbySelect';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
      <HobbySelect />
    </>
  );
};

export { Layout };
