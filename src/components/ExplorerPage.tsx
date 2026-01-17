import React, { useState } from 'react';
import { Box, Container, Button, useMediaQuery, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FiltersPanel from './FiltersPanel';
import type { Mission } from '../types/mission';

interface ExplorerPageProps {
  missions: Mission[];
}

function ExplorerPage({ missions }: ExplorerPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Filters section */}
        {isMobile ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFiltersOpen(true)}
              >
                Filters
              </Button>
            </Box>
            <FiltersPanel
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              variant="mobile"
            />
          </>
        ) : (
          <Box
            sx={{
              width: { md: 280 },
              flexShrink: 0,
            }}
          >
            <FiltersPanel variant="desktop" />
          </Box>
        )}

        {/* Results section */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 3,
              borderRadius: 1,
            }}
          >
            {/* Results content will be added in Stage 3 */}
            <Box sx={{ color: 'text.secondary' }}>Results area (placeholder)</Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ExplorerPage;
