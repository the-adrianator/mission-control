import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavourites } from '../useFavourites';

const STORAGE_KEY = 'mission-favourites';

describe('useFavourites', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('loads favourites from localStorage on mount', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['mission-1', 'mission-2']));
    
    const { result } = renderHook(() => useFavourites());
    
    expect(result.current.isFavourite('mission-1')).toBe(true);
    expect(result.current.isFavourite('mission-2')).toBe(true);
    expect(result.current.isFavourite('mission-3')).toBe(false);
  });

  it('saves favourites to localStorage when toggled', () => {
    const { result } = renderHook(() => useFavourites());
    
    act(() => {
      result.current.toggleFavourite('mission-1');
    });
    
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toContain('mission-1');
  });

  it('toggles favourite state', () => {
    const { result } = renderHook(() => useFavourites());
    
    expect(result.current.isFavourite('mission-1')).toBe(false);
    
    act(() => {
      result.current.toggleFavourite('mission-1');
    });
    
    expect(result.current.isFavourite('mission-1')).toBe(true);
    
    act(() => {
      result.current.toggleFavourite('mission-1');
    });
    
    expect(result.current.isFavourite('mission-1')).toBe(false);
  });

  it('handles multiple favourites', () => {
    const { result } = renderHook(() => useFavourites());
    
    act(() => {
      result.current.toggleFavourite('mission-1');
      result.current.toggleFavourite('mission-2');
      result.current.toggleFavourite('mission-3');
    });
    
    expect(result.current.isFavourite('mission-1')).toBe(true);
    expect(result.current.isFavourite('mission-2')).toBe(true);
    expect(result.current.isFavourite('mission-3')).toBe(true);
    
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(3);
  });
});
