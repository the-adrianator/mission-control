import { useMemo } from 'react';
import type { Mission } from '../types/mission';

export type SortOption = 'year-desc' | 'year-asc' | 'name-asc' | 'name-desc' | 'cost-desc' | 'cost-asc';

export interface FilterState {
  agencies: string[];
  statuses: string[];
  yearRange: [number, number];
  searchQuery: string;
}

export function useMissions(missions: Mission[], filters: FilterState, sortOption: SortOption) {
  const filteredAndSorted = useMemo(() => {
    let filtered = missions.filter((mission) => {
      // Agency filter
      if (filters.agencies.length > 0 && !filters.agencies.includes(mission.agency)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(mission.status)) {
        return false;
      }

      // Year range filter
      if (mission.year < filters.yearRange[0] || mission.year > filters.yearRange[1]) {
        return false;
      }

      // Search filter
      if (filters.searchQuery && !mission.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'cost-desc':
          return (b.cost ?? 0) - (a.cost ?? 0);
        case 'cost-asc':
          return (a.cost ?? 0) - (b.cost ?? 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [missions, filters, sortOption]);

  return filteredAndSorted;
}
