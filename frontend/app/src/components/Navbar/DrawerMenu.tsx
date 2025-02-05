import { Dispatch, SetStateAction } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import CloseIcon from '@mui/icons-material/Close';

import MenuItems from './MenuItems.tsx';
import SocialMediaContainer from './SocialMediaContainer.tsx';

function DrawerMenu(props: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const belowMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      anchor="right"
      sx={{ zIndex: '9000' }}
      open={belowMd && props.isDrawerOpen}
      onClose={() => props.setIsDrawerOpen(false)}
    >
      <IconButton
        onClick={() => props.setIsDrawerOpen(false)}
        size="large"
        sx={{
          alignSelf: 'flex-end',
          paddingRight: '2rem',
          paddingTop: '1.9rem',
          '&:hover': { background: 'none', color: theme.palette.primary.main },
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <Stack
        gap={4}
        sx={{
          flexGrow: 1,
          background: theme.palette.background.paper,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          marginBottom: 2,
        }}
      >
        <MenuItems column />
        <SocialMediaContainer />
      </Stack>
    </Drawer>
  );
}

export default DrawerMenu;
