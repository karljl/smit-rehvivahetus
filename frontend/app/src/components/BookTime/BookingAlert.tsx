import { Dispatch, SetStateAction, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface CustomAlert {
  severity: 'success' | 'error';
  text: string;
}

interface BookingAlertProps {
  alert: CustomAlert | undefined;
  setAlert: Dispatch<SetStateAction<CustomAlert | undefined>>;
}

function BookingAlert({ alert, setAlert }: BookingAlertProps) {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(undefined);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  if (!alert) return null;

  return (
    <Slide in={!!alert} direction="down">
      <Alert
        severity={alert.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setAlert(undefined)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alert.text}
      </Alert>
    </Slide>
  );
}

export default BookingAlert;
