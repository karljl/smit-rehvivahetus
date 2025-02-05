import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Row, Slot, WorkShop } from '../../models/models.ts';
import NoRowsOverlay from './NoRowsOverlay.tsx';
import { config } from '../../../configs/config.ts';
import { convertDate } from '../../utils/utils.ts';
import { ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { useTheme } from '@mui/material';

interface BookingTableProps {
  slots: Slot[] | undefined;
  loading: boolean;
  currentWorkshops: WorkShop[];
  handleDialogOpen: (row: Row | undefined) => void;
}

function BookingTable({
  slots = [],
  loading,
  currentWorkshops,
  handleDialogOpen,
}: BookingTableProps) {
  const theme = useTheme();
  const workshops =
    currentWorkshops.length > 0 ? currentWorkshops : config.workshops;

  const columns: GridColDef[] = [
    {
      field: 'time',
      headerName: 'Aeg',
      type: 'string',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    ...workshops.map(
      (workshop) =>
        ({
          field: workshop.name,
          headerName: workshop.name,
          flex: 1,
          align: 'center',
          headerAlign: 'center',
          sortable: false,
          renderCell: (params: { value: ReactNode }) => params.value,
        }) as GridColDef,
    ),
  ];

  const slotMap = slots.reduce<Record<string, string[]>>((acc, slot) => {
    acc[slot.time] = acc[slot.time] || [];
    acc[slot.time].push(slot.workshop);
    return acc;
  }, {});

  const rows = Object.keys(slotMap).map((time) => ({
    id: time,
    time: convertDate(time),
    ...workshops.reduce(
      (acc, workshop) => {
        acc[workshop.name] = slotMap[time].includes(workshop.name) ? (
          <IconButton
            sx={{
              '&:hover': {
                background: theme.palette.success.main,
                color: theme.palette.grey[50],
              },
            }}
            color="success"
            className="table-button"
            size="small"
            onClick={() =>
              handleDialogOpen({
                id: time,
                time,
                workshop: workshop.name,
              } as Row)
            }
          >
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton
            color="error"
            className="table-button"
            size="small"
            disabled
          >
            <NotInterestedIcon />
          </IconButton>
        );
        return acc;
      },
      {} as Record<string, ReactNode>,
    ),
  }));

  return (
    <DataGrid
      rowSelection={false}
      disableColumnSelector
      disableColumnMenu
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 50 },
        },
      }}
      pageSizeOptions={[5, 25, 50]}
      loading={loading}
      slots={{ noRowsOverlay: NoRowsOverlay }}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'linear-progress',
        },
      }}
    />
  );
}

export default BookingTable;
