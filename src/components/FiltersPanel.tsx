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
  favouritesOnly: boolean;
  defaultYearRange: [number, number];
  onAgenciesChange: (agencies: string[]) => void;
  onStatusesChange: (statuses: string[]) => void;
  onYearRangeChange: (range: [number, number]) => void;
  onSearchChange: (query: string) => void;
  onFavouritesOnlyChange: (favouritesOnly: boolean) => void;
}

function FiltersPanel({
  variant,
  open = true,
  onClose,
  agencies,
  statuses,
  yearRange,
  searchQuery,
  favouritesOnly,
  defaultYearRange,
  onAgenciesChange,
  onStatusesChange,
  onYearRangeChange,
  onSearchChange,
  onFavouritesOnlyChange,
}: FiltersPanelProps) {
  // Count active filters for badge (year range counts as 1 if modified from default)
  const activeFilterCount = agencies.length + statuses.length + (yearRange[0] !== defaultYearRange[0] || yearRange[1] !== defaultYearRange[1] ? 1 : 0) + (searchQuery.length > 0 ? 1 : 0) + (favouritesOnly ? 1 : 0);

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
    <Box sx={{ p: 1 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 3 }}>
        Filters
      </Typography>

      <Stack spacing={3.5}>
        {/* Search */}
        <FormControl>
          <TextField
            label="Search missions"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            placeholder="Mission name..."
            fullWidth
          />
        </FormControl>

        {/* Favourites only filter */}
        <FormControl component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                checked={favouritesOnly}
                onChange={(e) => onFavouritesOnlyChange(e.target.checked)}
                size="small"
              />
            }
            label="Favourites only"
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
        {/* Horizontal padding provides space for slider thumb at edges */}
        <FormControl sx={{ px: 2 }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500 }}>
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
            sx={{
              '& .MuiSlider-thumb': {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 0 8px rgba(26, 77, 140, 0.16)',
                },
              },
              '& .MuiSlider-track': {
                height: 4,
              },
              '& .MuiSlider-rail': {
                height: 4,
              },
            }}
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
        borderRadius: 2,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      }}
    >
      {content}
    </Box>
  );
}

export default FiltersPanel;
