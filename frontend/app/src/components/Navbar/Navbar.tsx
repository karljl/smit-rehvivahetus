import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import logo from '/favicon.png';

import { useMediaQuery, useTheme } from '@mui/material';
import MenuItems from './MenuItems.tsx';
import SocialMediaContainer from './SocialMediaContainer.tsx';
import Box from '@mui/material/Box';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import IconButton from '@mui/material/IconButton';
import DrawerMenu from './DrawerMenu.tsx';
import { useState } from 'react';

function Navbar() {
  const theme = useTheme();
  const belowMd = useMediaQuery(theme.breakpoints.down('md'));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar
      component="header"
      className="main-header"
      position="sticky"
      enableColorOnDark
      sx={{
        background: theme.palette.primary.main,
        paddingTop: '6px',
        borderBottom: `2px solid ${theme.palette.primary.dark}`,
      }}
    >
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/">
          <Box
            component="img"
            src={logo}
            alt="Rehvivahetus"
            style={{ height: '3rem' }}
          />
        </Link>

        {belowMd ? (
          <IconButton
            className="menu-button"
            aria-label="Open menu"
            size="large"
            onClick={() => setIsDrawerOpen(true)}
            edge="start"
            sx={{
              display: 'block',
              marginLeft: 'auto',
              paddingX: 0,
              '&:hover': {
                background: 'transparent',
                color: theme.palette.grey[500],
              },
            }}
          >
            <MenuOutlinedIcon fontSize="large" />
          </IconButton>
        ) : (
          <Box
            className="main-navigation"
            component="nav"
            gap="2rem"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flex="1"
          >
            <MenuItems />
            <SocialMediaContainer />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
