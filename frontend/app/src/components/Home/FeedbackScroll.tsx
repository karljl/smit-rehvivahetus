import { feedbacks } from '../../../data/feedbacks.ts';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/material';

function FeedbackScroll() {
  const theme = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + feedbacks.length) % feedbacks.length,
    );
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={goPrev}>
        <ArrowBack />
      </IconButton>

      <Card
        sx={{
          minHeight: 256,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '1',
          flexDirection: 'column',
          gap: 2,
          padding: { xs: theme.spacing(1, 2), md: theme.spacing(6, 12) },
        }}
      >
        <Rating readOnly value={feedbacks[currentIndex].stars} />
        <Typography variant="body1">{feedbacks[currentIndex].text}</Typography>
        <Typography variant="body2" marginTop={1}>
          {feedbacks[currentIndex].name}
        </Typography>
      </Card>

      <IconButton onClick={goNext}>
        <ArrowForward />
      </IconButton>
    </Box>
  );
}

export default FeedbackScroll;
