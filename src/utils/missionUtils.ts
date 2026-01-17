import type { Mission } from '../types/mission';

// Safe fallback for optional cost field
export function formatCost(cost: number | undefined): string {
  return cost !== undefined ? `$${cost.toLocaleString()}M` : 'Not listed';
}

// Safe fallback for crew array
export function formatCrew(crew: string[]): string {
  return crew.length > 0 ? crew.join(', ') : 'No crew listed';
}
