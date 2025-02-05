declare module 'configs/config.js' {
  import { VehicleType } from './vehicleType.ts';
  export const config: {
    workshops: {
      name: string;
      address: string;
      vehicle_types: VehicleType[];
    }[];
  };
}
