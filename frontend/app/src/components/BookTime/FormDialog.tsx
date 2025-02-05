import { Dispatch, FormEvent, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { convertDate, translateVehicleType } from '../../utils/utils.ts';
import { Row } from '../../models/models.ts';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { config } from '../../../configs/config.ts';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CustomAlert } from './BookingAlert.tsx';
import { checkError } from '../../utils/errorHandler.ts';

function FormDialog(props: {
  currentRow: Row | undefined;
  isOpen: boolean;
  handleClose: () => void;
  setAlert: Dispatch<SetStateAction<CustomAlert | undefined>>;
}) {
  const theme = useTheme();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contactInfo = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    if (props.currentRow) {
      axios
        .post(`${config.endpoint}/book-time`, {
          id: props.currentRow.id,
          workshop: props.currentRow.workshop,
          contact_info: JSON.stringify(contactInfo),
        })
        .then(
          (res) =>
            res.status === 200 &&
            props.setAlert({
              severity: 'success',
              text: 'Broneering kinnitatud. Kohtumiseni!',
            }),
        )
        .catch((error) =>
          props.setAlert({ severity: 'error', text: checkError(error.status) }),
        );
    }

    props.handleClose();
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            handleSubmit(event);
          },
        },
      }}
    >
      <DialogTitle textAlign="center">Broneering</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleClose}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          '&:hover': { background: 'none', color: theme.palette.primary.light },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: theme.spacing(2, 4),
        }}
      >
        <DialogContentText>
          Palun kontrolli, et broneeringu andmed on õiged:
        </DialogContentText>
        <Stack
          gap={2}
          padding={theme.spacing(1, 2)}
          border={`1px solid ${theme.palette.grey[700]}`}
          borderRadius={2}
        >
          <Typography variant="body1">
            Aeg: {convertDate(props.currentRow?.time)}
          </Typography>
          <Typography variant="body1">
            Koht: {props.currentRow?.workshop}
          </Typography>
          <Typography variant="body1">
            Sõiduki tüüp: {translateVehicleType(props.currentRow?.vehicleType)}
          </Typography>
        </Stack>
        <Divider />
        <DialogContentText>
          Aja broneerimiseks palun täida kõik väljad
        </DialogContentText>

        <Stack gap={1}>
          <TextField
            required
            id="first-name"
            name="first-name"
            label="Eesnimi"
          />
          <TextField
            required
            id="last-name"
            name="last-name"
            label="Perekonnanimi"
          />
          <TextField
            required
            id="registry-nr"
            name="registry-nr"
            label="Registreerimisnumber"
          />
          <TextField
            required
            id="email"
            name="email"
            type="email"
            label="E-mail"
          />
          <TextField required id="phone" name="phone" label="Telefon" />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: theme.spacing(2, 4),
        }}
      >
        <Button
          onClick={props.handleClose}
          variant="contained"
          sx={{
            flex: '1',
            padding: theme.spacing(1, 2),
            transition: 'none',
            background: theme.palette.primary.dark,
            '&:hover': { background: theme.palette.primary.main },
          }}
        >
          Tühista
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            flex: '1',
            padding: theme.spacing(1, 2),
            transition: 'none',
            background: '#004830',
            '&:hover': { background: '#3b7a57' },
          }}
        >
          Saada
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
