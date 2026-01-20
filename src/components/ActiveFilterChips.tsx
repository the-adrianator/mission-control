import React from 'react';
import { Box, Chip, Button, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface ActiveFilterChipsProps {
  agencies: string[];
  statuses: string[];
  yearRange: [number, number];
  searchQuery: string;
  favouritesOnly: boolean;
  defaultYearRange: [number, number];
  onRemoveAgency: (agency: string) => void;
  onRemoveStatus: (status: string) => void;
  onClearYearRange: () => void;
  onClearSearch: () => void;
  onClearFavouritesOnly: () => void;
  onClearAll: () => void;
}

function ActiveFilterChips({
  agencies,
  statuses,
  yearRange,
  searchQuery,
  favouritesOnly,
  defaultYearRange,
  onRemoveAgency,
  onRemoveStatus,
  onClearYearRange,
  onClearSearch,
  onClearFavouritesOnly,
  onClearAll,
}: ActiveFilterChipsProps) {
  // Year filter is active if range differs from default (not just if both ends match)
  const hasYearFilter = yearRange[0] !== defaultYearRange[0] || yearRange[1] !== defaultYearRange[1];
  const hasAnyFilters = agencies.length > 0 || statuses.length > 0 || hasYearFilter || searchQuery.length > 0 || favouritesOnly;

  if (!hasAnyFilters) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5, fontWeight: 500 }}>
          Active filters:
        </Typography>
        {agencies.map((agency) => (
          <Chip
            key={agency}
            label={`Agency: ${agency}`}
            onDelete={() => onRemoveAgency(agency)}
            size="small"
            deleteIcon={<ClearIcon fontSize="small" />}
            sx={{
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
          />
        ))}
        {statuses.map((status) => (
          <Chip
            key={status}
            label={`Status: ${status}`}
            onDelete={() => onRemoveStatus(status)}
            size="small"
            deleteIcon={<ClearIcon fontSize="small" />}
            sx={{
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
          />
        ))}
        {hasYearFilter && (
          <Chip
            label={`Year: ${yearRange[0]}-${yearRange[1]}`}
            onDelete={onClearYearRange}
            size="small"
            deleteIcon={<ClearIcon fontSize="small" />}
            sx={{
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
          />
        )}
        {searchQuery && (
          <Chip
            label={`Search: "${searchQuery}"`}
            onDelete={onClearSearch}
            size="small"
            deleteIcon={<ClearIcon fontSize="small" />}
            sx={{
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
          />
        )}
        {favouritesOnly && (
          <Chip
            label="Favourites only"
            onDelete={onClearFavouritesOnly}
            size="small"
            deleteIcon={<ClearIcon fontSize="small" />}
            sx={{
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
          />
        )}
        <Button
          size="small"
          onClick={onClearAll}
          startIcon={<ClearIcon />}
          sx={{
            ml: 'auto',
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          Clear all
        </Button>
      </Stack>
    </Box>
  );
}

export default ActiveFilterChips;
