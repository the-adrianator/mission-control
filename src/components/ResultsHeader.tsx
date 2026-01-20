import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Stack } from '@mui/material';
import type { SortOption } from '../hooks/useMissions';

interface ResultsHeaderProps {
  showingCount: number;
  totalCount: number;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function ResultsHeader({ showingCount, totalCount, sortOption, onSortChange }: ResultsHeaderProps) {
  return (
    <Box sx={{ mb: 3, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="body1" sx={{ flex: 1, fontWeight: 500 }}>
          Showing <strong>{showingCount}</strong> of <strong>{totalCount}</strong> missions
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortOption}
            label="Sort by"
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            sx={{
              borderRadius: 2,
            }}
          >
          <MenuItem value="year-desc">Year (newest first)</MenuItem>
          <MenuItem value="year-asc">Year (oldest first)</MenuItem>
          <MenuItem value="name-asc">Name (A-Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z-A)</MenuItem>
          <MenuItem value="cost-desc">Cost (highest)</MenuItem>
          <MenuItem value="cost-asc">Cost (lowest)</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}

export default ResultsHeader;
