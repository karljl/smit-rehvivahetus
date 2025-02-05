import { VehicleType } from '../types/vehicleType.ts';

interface Base {
  id: string;
  workshop: string;
  address: string;
  time: string;
}

export interface Slot extends Base {
  vehicle_types: VehicleType[];
}

export interface Row extends Base {
  vehicleType: string;
}

export interface WorkShop {
  name: string;
  address: string;
  vehicle_types: VehicleType[];
}
