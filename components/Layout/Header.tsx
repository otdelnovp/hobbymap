import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavigationIcon from '@mui/icons-material/Navigation';

import { Navigation } from './Navigation';

const navItems = [{ label: 'Home', href: '/' }];

const Header = () => {
  return (
    <AppBar component="nav" position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <NavigationIcon sx={{ color: '#444', mr: 1 }} />
        <Typography variant="h6" noWrap component="div" color="black">
          Hobby Map
        </Typography>
        <Navigation navLinks={navItems} />
      </Toolbar>
    </AppBar>
  );
};

export { Header };
