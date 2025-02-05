import { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import CustomFilter from '../components/BookTime/CustomFilter.tsx';
import { VehicleType } from '../types/vehicleType.ts';
import dayjs from 'dayjs';
import qs from 'qs';
import { useTheme } from '@mui/material';
import { config } from '../../configs/config.ts';
import FormDialog from '../components/BookTime/FormDialog.tsx';
import { Row, Slot, WorkShop } from '../models/models.ts';
import BookingAlert from '../components/BookTime/BookingAlert.tsx';
import BookingTable from '../components/BookTime/BookingTable.tsx';
import { checkError } from '../utils/errorHandler.ts';
import WorkshopInfo from '../components/BookTime/WorkshopInfo.tsx';

export const dateTimeFormat = 'YYYY-MM-DD';

function BookTime() {
  const theme = useTheme();

  const [slots, setSlots] = useState<Array<Slot>>();
  const [loading, setLoading] = useState(true);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<Row>();
  const [alert, setAlert] = useState<{
    severity: 'success' | 'error';
    text: string;
  }>();

  // filter options
  const [fromDate, setFromDate] = useState<string>(
    dayjs().startOf('hour').add(1, 'hour').format(dateTimeFormat),
  );
  const [untilDate, setUntilDate] = useState<string>(
    dayjs().startOf('hour').add(1, 'week').format(dateTimeFormat),
  );
  const [currentWorkshops, setCurrentWorkshops] = useState<WorkShop[]>(
    config.workshops,
  );
  const [currentVehicleType, setCurrentVehicleType] =
    useState<VehicleType>('passenger_car');

  useEffect(() => {
    setLoading(true);
    const debounce = setTimeout(() => {
      axios
        .get(`${config.endpoint}/available-times`, {
          timeout: 3000,
          params: {
            from_date: fromDate,
            until_date: untilDate,
            workshop: currentWorkshops.map((workshop) =>
              workshop.name.split(' ').join('-').toLowerCase(),
            ),
            vehicle_type: currentVehicleType,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
        })
        .then((response) => response.status === 200 && setSlots(response.data))
        .catch((error) =>
          setAlert({ severity: 'error', text: checkError(error.status) }),
        )
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(debounce);
  }, [fromDate, untilDate, currentWorkshops, currentVehicleType]);

  function handleDialogOpen(row: Row | undefined) {
    if (!row) {
      return;
    }

    setCurrentRow({
      id: row.id,
      time: row.time,
      workshop: row.workshop,
      address: row.address,
      vehicleType: currentVehicleType,
    } as Row);

    setDialogIsOpen(true);
  }

  function handleDialogClose() {
    setCurrentRow(undefined);
    setDialogIsOpen(false);
  }

  return (
    <Stack margin={theme.spacing(1, 2)} position="relative">
      {alert && <BookingAlert alert={alert} setAlert={setAlert} />}

      <FormDialog
        currentRow={currentRow}
        isOpen={dialogIsOpen}
        handleClose={handleDialogClose}
        setAlert={setAlert}
      />

      <CustomFilter
        fromDate={fromDate}
        setFromDate={setFromDate}
        untilDate={untilDate}
        setUntilDate={setUntilDate}
        currentWorkshops={currentWorkshops}
        setCurrentWorkshops={setCurrentWorkshops}
        currentVehicleType={currentVehicleType}
        setCurrentVehicleType={setCurrentVehicleType}
      />

      <WorkshopInfo currentWorkshops={currentWorkshops} />

      <BookingTable
        currentWorkshops={currentWorkshops}
        slots={slots}
        loading={loading}
        handleDialogOpen={handleDialogOpen}
      />
    </Stack>
  );
}

export default BookTime;
