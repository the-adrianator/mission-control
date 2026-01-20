import React, { useState, useMemo } from 'react';
import { Box, Container, Button, Badge, useMediaQuery, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FiltersPanel from './FiltersPanel';
import MissionsTable from './MissionsTable';
import MissionCards from './MissionCards';
import ResultsHeader from './ResultsHeader';
import ActiveFilterChips from './ActiveFilterChips';
import MissionDetail from './MissionDetail';
import EmptyState from './EmptyState';
import { useMissions, type FilterState, type SortOption } from '../hooks/useMissions';
import { useFavourites } from '../hooks/useFavourites';
import type { Mission } from '../types/mission';

interface ExplorerPageProps {
  missions: Mission[];
}

// Default year range covering all missions in dataset
const DEFAULT_YEAR_RANGE: [number, number] = [1961, 2028];

function ExplorerPage({ missions }: ExplorerPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('year-desc');
  const { favouriteIds, toggleFavourite, isFavourite } = useFavourites();

  const [filters, setFilters] = useState<FilterState>({
    agencies: [],
    statuses: [],
    yearRange: DEFAULT_YEAR_RANGE,
    searchQuery: '',
    favouritesOnly: false,
  });

  const filteredMissions = useMissions(missions, filters, sortOption, favouriteIds);

  // Count active filters for badge display (year range counts as 1 if modified)
  const activeFilterCount = useMemo(() => {
    return (
      filters.agencies.length +
      filters.statuses.length +
      (filters.yearRange[0] !== DEFAULT_YEAR_RANGE[0] || filters.yearRange[1] !== DEFAULT_YEAR_RANGE[1] ? 1 : 0) +
      (filters.searchQuery.length > 0 ? 1 : 0) +
      (filters.favouritesOnly ? 1 : 0)
    );
  }, [filters]);

  // Reset all filters and sort to default state
  const handleClearAll = () => {
    setFilters({
      agencies: [],
      statuses: [],
      yearRange: DEFAULT_YEAR_RANGE,
      searchQuery: '',
      favouritesOnly: false,
    });
    setSortOption('year-desc');
  };

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  // Returns -1 if selected mission is not in current filtered results
  const selectedMissionIndex = useMemo(() => {
    if (!selectedMission) return -1;
    return filteredMissions.findIndex((m) => m.id === selectedMission.id);
  }, [selectedMission, filteredMissions]);

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
  };

  const handleCloseDetail = () => {
    setSelectedMission(null);
  };

  const handlePrevious = () => {
    if (selectedMissionIndex > 0) {
      setSelectedMission(filteredMissions[selectedMissionIndex - 1]);
    }
  };

  const handleNext = () => {
    if (selectedMissionIndex < filteredMissions.length - 1) {
      setSelectedMission(filteredMissions[selectedMissionIndex + 1]);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Filters section */}
        {isMobile ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Badge badgeContent={activeFilterCount} color="primary">
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setFiltersOpen(true)}
                >
                  Filters
                </Button>
              </Badge>
            </Box>
            <FiltersPanel
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              variant="mobile"
              agencies={filters.agencies}
              statuses={filters.statuses}
              yearRange={filters.yearRange}
              searchQuery={filters.searchQuery}
              favouritesOnly={filters.favouritesOnly}
              defaultYearRange={DEFAULT_YEAR_RANGE}
              onAgenciesChange={(agencies) => setFilters({ ...filters, agencies })}
              onStatusesChange={(statuses) => setFilters({ ...filters, statuses })}
              onYearRangeChange={(yearRange) => setFilters({ ...filters, yearRange })}
              onSearchChange={(searchQuery) => setFilters({ ...filters, searchQuery })}
              onFavouritesOnlyChange={(favouritesOnly) => setFilters({ ...filters, favouritesOnly })}
            />
          </>
        ) : (
          <Box
            sx={{
              width: { md: 280 },
              flexShrink: 0,
            }}
          >
            <FiltersPanel
              variant="desktop"
              agencies={filters.agencies}
              statuses={filters.statuses}
              yearRange={filters.yearRange}
              searchQuery={filters.searchQuery}
              favouritesOnly={filters.favouritesOnly}
              defaultYearRange={DEFAULT_YEAR_RANGE}
              onAgenciesChange={(agencies) => setFilters({ ...filters, agencies })}
              onStatusesChange={(statuses) => setFilters({ ...filters, statuses })}
              onYearRangeChange={(yearRange) => setFilters({ ...filters, yearRange })}
              onSearchChange={(searchQuery) => setFilters({ ...filters, searchQuery })}
              onFavouritesOnlyChange={(favouritesOnly) => setFilters({ ...filters, favouritesOnly })}
            />
          </Box>
        )}

        {/* Results section */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: { xs: 2, md: 4 }, // Reduced padding on mobile for better space utilisation
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
            }}
          >
            <ResultsHeader
              showingCount={filteredMissions.length}
              totalCount={missions.length}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
            <ActiveFilterChips
              agencies={filters.agencies}
              statuses={filters.statuses}
              yearRange={filters.yearRange}
              searchQuery={filters.searchQuery}
              favouritesOnly={filters.favouritesOnly}
              defaultYearRange={DEFAULT_YEAR_RANGE}
              onRemoveAgency={(agency) => setFilters({ ...filters, agencies: filters.agencies.filter((a) => a !== agency) })}
              onRemoveStatus={(status) => setFilters({ ...filters, statuses: filters.statuses.filter((s) => s !== status) })}
              onClearYearRange={() => setFilters({ ...filters, yearRange: DEFAULT_YEAR_RANGE })}
              onClearSearch={() => setFilters({ ...filters, searchQuery: '' })}
              onClearFavouritesOnly={() => setFilters({ ...filters, favouritesOnly: false })}
              onClearAll={handleClearAll}
            />
            {filteredMissions.length === 0 ? (
              <EmptyState onClearFilters={handleClearAll} isFavouritesOnly={filters.favouritesOnly} />
            ) : (
              <>
                {isMobile ? (
                  <MissionCards missions={filteredMissions} onMissionClick={handleMissionClick} isFavourite={isFavourite} onToggleFavourite={toggleFavourite} />
                ) : (
                  <MissionsTable missions={filteredMissions} onMissionClick={handleMissionClick} isFavourite={isFavourite} onToggleFavourite={toggleFavourite} />
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <MissionDetail
        mission={selectedMission}
        open={selectedMission !== null}
        onClose={handleCloseDetail}
        variant={isMobile ? 'mobile' : 'desktop'}
        missions={filteredMissions}
        currentIndex={selectedMissionIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isFavourite={isFavourite}
        onToggleFavourite={toggleFavourite}
      />
    </Container>
  );
}

export default ExplorerPage;