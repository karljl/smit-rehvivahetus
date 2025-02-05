import Typography from '@mui/material/Typography';
import { heroText } from '../../../data/heroText.ts';
import Stack from '@mui/material/Stack';

function TextSection() {
  return (
    <Stack gap={1}>
      {heroText.map((text) => (
        <Typography variant="body1">{text}</Typography>
      ))}
    </Stack>
  );
}

export default TextSection;
