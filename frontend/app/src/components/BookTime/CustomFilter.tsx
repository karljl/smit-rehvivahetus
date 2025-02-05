import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/et';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { getAllVehicleTypes, translateVehicleType } from '../../utils/utils.ts';
import { VehicleType } from '../../types/vehicleType.ts';
import { useTheme } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { config } from '../../../configs/config.ts';
import { dateTimeFormat } from '../../pages/BookTime.tsx';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { WorkShop } from '../../models/models.ts';

interface Props {
  fromDate: string;
  setFromDate: Dispatch<SetStateAction<string>>;
  untilDate: string;
  setUntilDate: Dispatch<SetStateAction<string>>;
  currentWorkshops: WorkShop[];
  setCurrentWorkshops: Dispatch<SetStateAction<WorkShop[]>>;
  currentVehicleType: VehicleType;
  setCurrentVehicleType: Dispatch<SetStateAction<VehicleType>>;
}

function CustomFormGroup(props: {
  children: ReactNode;
  title: string;
  width?: number;
}) {
  const theme = useTheme();

  return (
    <FormControl
      sx={{
        border: '1px solid rgba(255, 255, 255, 0.23)',
        borderRadius: 1,
        padding: theme.spacing(1, 2),
        width: props.width,
      }}
    >
      <FormLabel>{props.title}</FormLabel>
      {props.children}
    </FormControl>
  );
}

function CustomFilter(props: Props) {
  const theme = useTheme();

  function handleWorkshopChange(event: SelectChangeEvent<string[]>) {
    const { value } = event.target;
    props.setCurrentWorkshops(
      config.workshops.filter((workshop) => value.includes(workshop.name)),
    );
  }

  function handleVehicleTypeChange(event: SelectChangeEvent<HTMLInputElement>) {
    props.setCurrentVehicleType(event.target.value as VehicleType);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="et">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="stretch"
        gap={2}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          padding: { xs: theme.spacing(2, 0), md: theme.spacing(4, 0) },
        }}
      >
        <Stack justifyContent="space-between" gap={1}>
          <DatePicker
            disablePast
            label="Alates"
            value={dayjs(props.fromDate)}
            onChange={(value) =>
              value && props.setFromDate(value.format(dateTimeFormat))
            }
          />
          <DatePicker
            disablePast
            label="Kuni"
            value={dayjs(props.untilDate)}
            onChange={(value) =>
              value && props.setUntilDate(value.format(dateTimeFormat))
            }
          />
        </Stack>

        <CustomFormGroup title="Sõiduki tüüp">
          <RadioGroup>
            {getAllVehicleTypes().map((vehicle, index) => (
              <FormControlLabel
                label={translateVehicleType(vehicle)}
                key={index}
                control={
                  <Radio
                    value={vehicle}
                    checked={props.currentVehicleType === vehicle}
                    onChange={handleVehicleTypeChange}
                  />
                }
              />
            ))}
          </RadioGroup>
        </CustomFormGroup>

        <CustomFormGroup title="Töökojad" width={400}>
          <Select
            multiple
            value={props.currentWorkshops.map((workshop) => workshop.name)}
            onChange={handleWorkshopChange}
            input={<OutlinedInput label="Töökojad" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {config.workshops.map((workshop) => (
              <MenuItem key={workshop.name} value={workshop.name}>
                <Checkbox checked={props.currentWorkshops.includes(workshop)} />
                <ListItemText primary={workshop.name} />
              </MenuItem>
            ))}
          </Select>
        </CustomFormGroup>
      </Box>
    </LocalizationProvider>
  );
}

export default CustomFilter;
