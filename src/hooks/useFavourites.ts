import { useState, useEffect } from 'react';

const STORAGE_KEY = 'mission-favourites';

function loadFavouritesFromStorage(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const ids = JSON.parse(stored) as string[];
      return new Set(ids);
    }
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error);
  }
  return new Set();
}

export function useFavourites() {
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(loadFavouritesFromStorage);

  // Save to localStorage whenever favourites change
  useEffect(() => {
    try {
      const idsArray = Array.from(favouriteIds);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(idsArray));
    } catch (error) {
      console.error('Failed to save favourites to localStorage:', error);
    }
  }, [favouriteIds]);

  const toggleFavourite = (missionId: string) => {
    setFavouriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(missionId)) {
        next.delete(missionId);
      } else {
        next.add(missionId);
      }
      return next;
    });
  };

  const isFavourite = (missionId: string) => {
    return favouriteIds.has(missionId);
  };

  return {
    favouriteIds,
    toggleFavourite,
    isFavourite,
  };
}
