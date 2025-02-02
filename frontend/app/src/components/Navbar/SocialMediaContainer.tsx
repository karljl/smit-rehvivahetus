import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function SocialMediaContainer() {
  const navigate = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <IconButton
        onClick={() => navigate('https://www.instagram.com')}
        sx={{ '&:hover': { color: '#9eadbd', background: 'none' } }}
        size="medium">
        <InstagramIcon fontSize="medium" />
      </IconButton>
      <IconButton
        onClick={() => navigate('https://www.facebook.com')}
        sx={{ '&:hover': { color: '#9eadbd', background: 'none' } }}
        size="medium">
        <FacebookIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
}

export default SocialMediaContainer;
