import { WorkShop } from '../../models/models.ts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { translateVehicleType } from '../../utils/utils.ts';
import { config } from 'configs/config.js';
import { VehicleType } from '../../types/vehicleType.ts';

function WorkshopInfo(props: { currentWorkshops: WorkShop[] }) {
  const theme = useTheme();
  const workshops =
    props.currentWorkshops.length > 0
      ? props.currentWorkshops
      : config.workshops;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={2}
      justifyContent="space-evenly"
      alignItems="center"
      padding={{ xs: theme.spacing(4, 2), md: theme.spacing(2, 4) }}
    >
      {workshops.map((workshop: WorkShop, index: number) => (
        <Box key={index} textAlign="center">
          <Typography variant="h6">{workshop.name}</Typography>
          <Typography variant="body2">Aadress: {workshop.address}</Typography>
          <Typography variant="body2">
            Teenindatavad sõidukid:{' '}
            {workshop.vehicle_types
              .map((vehicle: VehicleType) => translateVehicleType(vehicle))
              .join(', ')}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default WorkshopInfo;
