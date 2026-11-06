interface PlanInput {
  totalPages: number;
  targetDays: number;
}

export function calculateFeasibility({ totalPages, targetDays }: PlanInput) {
  const boundedPages = Math.min(Math.max(totalPages, 1), 604); // Kept inside standard Quran pages boundary
  const days = Math.max(targetDays, 1);
  const pagesPerDay = boundedPages / days;

  let band: 'feasible' | 'ambitious' = 'feasible';
  if (pagesPerDay > 3) {
    band = 'ambitious'; // Steeper daily target requirement
  }

  return {
    pagesPerDay,
    band
  };
}
