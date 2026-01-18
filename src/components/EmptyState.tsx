import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

interface EmptyStateProps {
  onClearFilters?: () => void;
  isFavouritesOnly?: boolean;
}

function EmptyState({ onClearFilters, isFavouritesOnly }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
      }}
    >
      <RocketLaunchIcon sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
      <Typography variant="h3" component="h2" gutterBottom>
        {isFavouritesOnly ? 'No favourite missions yet' : 'No missions found'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {isFavouritesOnly
          ? 'Start exploring missions and add them to your favourites to see them here.'
          : 'Try adjusting your filters or search query to find missions.'}
      </Typography>
      {onClearFilters && (
        <Button variant="outlined" onClick={onClearFilters}>
          Clear all filters
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
