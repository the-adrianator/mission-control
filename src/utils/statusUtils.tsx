import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ScheduleIcon from '@mui/icons-material/Schedule';
import type { Mission } from '../types/mission';

export function getStatusIcon(status: Mission['status']) {
  switch (status) {
    case 'Success':
      return <CheckCircleIcon />;
    case 'Failure':
      return <CancelIcon />;
    case 'Ongoing':
      return <RadioButtonUncheckedIcon />;
    case 'Planned':
      return <ScheduleIcon />;
  }
}

export function getStatusColor(status: Mission['status']): 'success' | 'error' | 'warning' | 'default' {
  switch (status) {
    case 'Success':
      return 'success';
    case 'Failure':
      return 'error';
    case 'Ongoing':
      return 'warning';
    case 'Planned':
      return 'default';
    default:
      return 'default';
  }
}

export function StatusChip({ status }: { status: Mission['status'] }) {
  return (
    <Chip
      icon={getStatusIcon(status)}
      label={status}
      color={getStatusColor(status)}
      size="small"
      sx={{
        fontWeight: 500,
        '& .MuiChip-icon': {
          fontSize: '1rem',
        },
      }}
    />
  );
}
