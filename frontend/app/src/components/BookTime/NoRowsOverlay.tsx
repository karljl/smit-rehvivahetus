import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function NoRowsOverlay() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h3">Päringule vastavaid aegu ei leitud</Typography>
    </Box>
  );
}

export default NoRowsOverlay;
