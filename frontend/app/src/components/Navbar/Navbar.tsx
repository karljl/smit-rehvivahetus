import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import logo from '/favicon.png';

import { useTheme } from '@mui/material';
import MenuItems from './MenuItems.tsx';
import SocialMediaContainer from './SocialMediaContainer.tsx';

function Navbar() {
  const theme = useTheme();

  return (
    <AppBar component="header" className="main-header" position="sticky" enableColorOnDark sx={{ background: theme.palette.primary.main, paddingTop: '6px', borderBottom: `2px solid ${theme.palette.primary.dark}` }}>
      <Toolbar sx={{ display: 'flex' }}>
        <Link href="/">
          <img src={logo} alt="Rehvivahetus" style={{ height: '3rem' }} />
        </Link>
        <MenuItems />
        <SocialMediaContainer />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
