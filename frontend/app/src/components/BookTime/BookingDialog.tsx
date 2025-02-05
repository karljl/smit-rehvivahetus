import FormDialog from './FormDialog.tsx';
import { Row } from '../../models/models.ts';
import { Dispatch, SetStateAction } from 'react';

interface BookingDialogProps {
  currentRow: Row | undefined;
  dialogIsOpen: boolean;
  handleDialogClose: () => void;
  setAlert: Dispatch<SetStateAction<'success' | 'error' | undefined>>;
}

function BookingDialog(props: BookingDialogProps) {
  return (
    <FormDialog
      currentRow={props.currentRow}
      isOpen={props.dialogIsOpen}
      handleClose={props.handleDialogClose}
      setAlert={props.setAlert}
    />
  );
}

export default BookingDialog;
