import { config } from '../../configs/config.ts';

export function convertDate(dateString: string | undefined) {
  if (!dateString) {
    return;
  }

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function getAllVehicleTypes() {
  return [
    ...new Set(config.workshops.flatMap((workshop) => workshop.vehicle_types)),
  ];
}

export function translateVehicleType(vehicle_type: string | undefined) {
  if (!vehicle_type) {
    return;
  }

  const dictionary: Record<string, string> = {
    passenger_car: 'Sõiduauto',
    truck: 'Veoauto',
  };

  return dictionary[vehicle_type] || vehicle_type;
}
