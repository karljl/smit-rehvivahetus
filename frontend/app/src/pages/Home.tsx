import hero_image from '/hero-image.jpg';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useMediaQuery, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Feedback from '../components/Home/Feedback.tsx';
import TextSection from '../components/Home/TextSection.tsx';

function Home() {
  const theme = useTheme();
  const belowMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack gap={belowMd ? 0 : 4}>
      <Box
        component="img"
        src={hero_image}
        alt="RV - Parim rehvitöökoda kogu Euroopas"
      />

      <Container maxWidth={belowMd ? 'md' : 'lg'}>
        <Paper
          elevation={1}
          sx={{
            padding: belowMd ? theme.spacing(4) : theme.spacing(4, 8),
            borderRadius: 2,
            boxShadow: 'none',
          }}
        >
          <Typography variant="h1" marginBottom={4}>
            RV – sinu usaldusväärne partner rehvide vahetuses ja hoolduses
          </Typography>

          <TextSection />

          <Link href="broneeri-aeg">
            <Button
              variant="text"
              sx={{
                width: belowMd ? '100%' : 'unset',
                transition: 'none',
                padding: theme.spacing(2, 4),
                marginTop: 6,
                color: theme.palette.text.primary,
                background: '#004830',
                '&:hover': { background: '#3b7a57' },
              }}
            >
              <Typography variant="body1">Broneeri aeg kohe</Typography>
            </Button>
          </Link>
        </Paper>
      </Container>

      <Feedback />
    </Stack>
  );
}

export default Home;
