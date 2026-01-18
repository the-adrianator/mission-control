import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Slider,
  Stack,
  Badge,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Mission } from '../types/mission';

const AGENCIES: Mission['agency'][] = ['NASA', 'ESA', 'SpaceX', 'CNSA', 'ISRO', 'Roscosmos'];
const STATUSES: Mission['status'][] = ['Success', 'Failure', 'Ongoing', 'Planned'];

interface FiltersPanelProps {
  variant: 'desktop' | 'mobile';
  open?: boolean;
  onClose?: () => void;
  agencies: string[];
  statuses: string[];
  yearRange: [number, number];
  searchQuery: string;
  defaultYearRange: [number, number];
  onAgenciesChange: (agencies: string[]) => void;
  onStatusesChange: (statuses: string[]) => void;
  onYearRangeChange: (range: [number, number]) => void;
  onSearchChange: (query: string) => void;
}

function FiltersPanel({
  variant,
  open = true,
  onClose,
  agencies,
  statuses,
  yearRange,
  searchQuery,
  defaultYearRange,
  onAgenciesChange,
  onStatusesChange,
  onYearRangeChange,
  onSearchChange,
}: FiltersPanelProps) {
  const activeFilterCount = agencies.length + statuses.length + (yearRange[0] !== defaultYearRange[0] || yearRange[1] !== defaultYearRange[1] ? 1 : 0) + (searchQuery.length > 0 ? 1 : 0);

  const handleAgencyToggle = (agency: string) => {
    if (agencies.includes(agency)) {
      onAgenciesChange(agencies.filter((a) => a !== agency));
    } else {
      onAgenciesChange([...agencies, agency]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (statuses.includes(status)) {
      onStatusesChange(statuses.filter((s) => s !== status));
    } else {
      onStatusesChange([...statuses, status]);
    }
  };

  const content = (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 3 }}>
        Filters
      </Typography>

      <Stack spacing={4}>
        {/* Search */}
        <FormControl>
          <TextField
            label="Search missions"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            placeholder="Mission name..."
          />
        </FormControl>

        {/* Agency filter */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Agency</FormLabel>
          <FormGroup>
            {AGENCIES.map((agency) => (
              <FormControlLabel
                key={agency}
                control={
                  <Checkbox
                    checked={agencies.includes(agency)}
                    onChange={() => handleAgencyToggle(agency)}
                    size="small"
                  />
                }
                label={agency}
              />
            ))}
          </FormGroup>
        </FormControl>

        {/* Status filter */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <FormGroup>
            {STATUSES.map((status) => (
              <FormControlLabel
                key={status}
                control={
                  <Checkbox
                    checked={statuses.includes(status)}
                    onChange={() => handleStatusToggle(status)}
                    size="small"
                  />
                }
                label={status}
              />
            ))}
          </FormGroup>
        </FormControl>

        {/* Year range filter */}
        <FormControl>
          <FormLabel component="legend" sx={{ mb: 2 }}>
            Year Range: {yearRange[0]} - {yearRange[1]}
          </FormLabel>
          <Slider
            value={yearRange}
            onChange={(_, newValue) => onYearRangeChange(newValue as [number, number])}
            min={defaultYearRange[0]}
            max={defaultYearRange[1]}
            valueLabelDisplay="auto"
            marks={[
              { value: defaultYearRange[0], label: defaultYearRange[0].toString() },
              { value: defaultYearRange[1], label: defaultYearRange[1].toString() },
            ]}
          />
        </FormControl>
      </Stack>
    </Box>
  );

  if (variant === 'mobile') {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 } },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onClose} aria-label="Close filters">
            <CloseIcon />
          </IconButton>
        </Box>
        {content}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 3,
      }}
    >
      {content}
    </Box>
  );
}

export default FiltersPanel;
