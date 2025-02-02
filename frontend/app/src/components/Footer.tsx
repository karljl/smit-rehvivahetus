import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();

  return (
    <Stack
      component="footer"
      className="footer"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
      }}>
      <Typography
        variant="body1"
        className="copyright-container"
        fontSize={12}
        sx={{ paddingTop: 0.5, marginY: 1 }}
      >
        © {new Date().getFullYear()} - Karl Johann Lattikas
      </Typography>
    </Stack>
  );
}

export default Footer;
