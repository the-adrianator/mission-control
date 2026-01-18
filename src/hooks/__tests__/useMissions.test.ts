import { describe, it, expect } from 'vitest';
import { useMissions, type FilterState, type SortOption } from '../useMissions';
import type { Mission } from '../../types/mission';
import { renderHook } from '@testing-library/react';

const mockMissions: Mission[] = [
  {
    id: 'mission-1',
    name: 'Apollo 11',
    year: 1969,
    agency: 'NASA',
    status: 'Success',
    missionType: 'Lunar',
    crew: ['Neil Armstrong'],
    description: 'First moon landing',
    launchDate: '1969-07-16',
    cost: 355,
  },
  {
    id: 'mission-2',
    name: 'Voyager 1',
    year: 1977,
    agency: 'NASA',
    status: 'Success',
    missionType: 'Deep Space',
    crew: [],
    description: 'Space probe',
    launchDate: '1977-09-05',
    cost: 865,
  },
  {
    id: 'mission-3',
    name: 'Mars Rover',
    year: 2020,
    agency: 'ESA',
    status: 'Ongoing',
    missionType: 'Mars',
    crew: [],
    description: 'Mars exploration',
    launchDate: '2020-07-30',
  },
];

describe('useMissions', () => {
  const defaultFilters: FilterState = {
    agencies: [],
    statuses: [],
    yearRange: [1960, 2030],
    searchQuery: '',
    favouritesOnly: false,
  };
  const defaultSort: SortOption = 'year-desc';
  const emptyFavourites = new Set<string>();

  it('filters by agency', () => {
    const filters: FilterState = { ...defaultFilters, agencies: ['NASA'] };
    const { result } = renderHook(() => useMissions(mockMissions, filters, defaultSort, emptyFavourites));
    
    expect(result.current).toHaveLength(2);
    expect(result.current.every((m) => m.agency === 'NASA')).toBe(true);
  });

  it('combines multiple filters with AND logic', () => {
    const filters: FilterState = {
      ...defaultFilters,
      agencies: ['NASA'],
      statuses: ['Success'],
      yearRange: [1960, 1980],
    };
    const { result } = renderHook(() => useMissions(mockMissions, filters, defaultSort, emptyFavourites));
    
    expect(result.current).toHaveLength(2);
    expect(result.current.every((m) => m.agency === 'NASA' && m.status === 'Success')).toBe(true);
  });

  it('filters by search query', () => {
    const filters: FilterState = { ...defaultFilters, searchQuery: 'Mars' };
    const { result } = renderHook(() => useMissions(mockMissions, filters, defaultSort, emptyFavourites));
    
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Mars Rover');
  });

  it('filters by favourites only', () => {
    const filters: FilterState = { ...defaultFilters, favouritesOnly: true };
    const favourites = new Set(['mission-1', 'mission-3']);
    const { result } = renderHook(() => useMissions(mockMissions, filters, defaultSort, favourites));
    
    expect(result.current).toHaveLength(2);
    expect(result.current.map((m) => m.id)).toEqual(['mission-3', 'mission-1']);
  });

  it('sorts by year descending (default)', () => {
    const { result } = renderHook(() => useMissions(mockMissions, defaultFilters, 'year-desc', emptyFavourites));
    
    expect(result.current[0].year).toBe(2020);
    expect(result.current[result.current.length - 1].year).toBe(1969);
  });

  it('sorts by name ascending', () => {
    const { result } = renderHook(() => useMissions(mockMissions, defaultFilters, 'name-asc', emptyFavourites));
    
    expect(result.current[0].name).toBe('Apollo 11');
    expect(result.current[result.current.length - 1].name).toBe('Voyager 1');
  });
});
