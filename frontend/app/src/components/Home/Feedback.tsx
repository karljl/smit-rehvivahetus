import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FeedbackScroll from './FeedbackScroll.tsx';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';

function Feedback() {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{ padding: { xs: theme.spacing(2, 1), lg: theme.spacing(8, 1) } }}
    >
      <Typography variant="h2" marginBottom={4} textAlign="center">
        Kliendid räägivad:
      </Typography>
      <Container maxWidth="lg">
        <FeedbackScroll />
      </Container>
    </Paper>
  );
}

export default Feedback;
