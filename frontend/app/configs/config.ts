import { VehicleType } from '../src/types/vehicleType';

export const config = {
  endpoint: 'http://localhost:8000',
  workshops: [
    {
      name: 'London Tire Workshop',
      address: '1A Gunton Rd, London',
      vehicle_types: ['passenger_car'] as VehicleType[],
    },
    {
      name: 'Manchester Tire Workshop',
      address: '14 Bury New Rd, Manchester',
      vehicle_types: ['passenger_car', 'truck'] as VehicleType[],
    },
  ],
};
