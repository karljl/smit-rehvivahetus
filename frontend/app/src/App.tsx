import Stack from '@mui/material/Stack';
import Router from './components/Router.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <Container maxWidth="xl">
      <Paper elevation={1}>
        <Stack minHeight="100vh">
          <Navbar />
          <Router />
        </Stack>
      </Paper>
      <Footer />
    </Container>
  );
}

export default App;
