import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { convertDate } from '../utils.ts';


type VehicleType = 'truck' | 'passenger_car';

interface Slot {
  id: string;
  workshop: string;
  address: string;
  vehicle_types: VehicleType[];
  time: string;
}

const columns: GridColDef[] = [
  { field: 'time', headerName: 'Aeg', valueGetter: (value: string) => convertDate(value) }
]

function BookTime() {
  const [slots, setSlots] = useState<Array<Slot>>();
  useEffect(() => {
    axios.get('http://localhost:8000/available-times')
      .then((response) => setSlots(response.data));
  }, []);

  return (
    <DataGrid rows={slots} columns={columns} />
  );
}

export default BookTime;
