import hero_image from '/hero-image.jpg';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useMediaQuery, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import FeedbackScroll from '../components/FeedbackScroll.tsx';

function Home() {
  const theme = useTheme();
  const belowLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Stack gap={belowLg ? 0 : 4}>
      <img src={hero_image} alt="RV - Parim rehvitöökoda kogu Euroopas" />
      <Container maxWidth={belowLg? 'md' : 'lg'}>
        <Paper elevation={1} sx={{ padding: belowLg ? theme.spacing(4, 8) : theme.spacing(8, 16), borderRadius: 2, boxShadow: 'none' }}>
          <Typography variant="h1" marginBottom={4}>RV – sinu usaldusväärne partner rehvide vahetuses ja hoolduses</Typography>

          <Stack gap={1}>
            <Typography variant="body1">Ohutu sõit algab õigest rehvivalikust.</Typography>
            <Typography variant="body1">Meie kogenud meeskond hoolitseb selle eest, et su auto püsiks kindlalt teel iga ilmaga.</Typography>
            <Typography variant="body1">Töötame kiirelt ja professionaalselt, et ükski tähtis sõit ei jääks sõitmata.</Typography>
            <Typography variant="body1">Pakume laias valikus rehve sõidu- ja veoautodele.</Typography>
            <Typography variant="body1">Olgu su sihtpunkt lähedal või kaugel – alusta teekonda õigete rehvidega!</Typography>
          </Stack>

          <Link href="broneeri-aeg">
            <Button variant="text" sx={{ padding: theme.spacing(2, 4), marginTop: 4, color: theme.palette.text.primary, background: '#179435', '&:hover': { background: '#005c47' }, transition: 'none' }}>
              <Typography variant="body1">Broneeri aeg kohe</Typography>
            </Button>
          </Link>
        </Paper>
      </Container>

      <Paper elevation={3} sx={{ padding: theme.spacing(8, 1) }}>
        <Typography variant="h2" marginBottom={4} textAlign="center">Kliendid räägivad:</Typography>
        <Container maxWidth={belowLg? 'md' : 'lg'}>
          <FeedbackScroll />
        </Container>
      </Paper>
    </Stack>
  );
}

export default Home;
