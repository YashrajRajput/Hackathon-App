// utils/timer.ts
export function formatTimeRemaining(ms: number): string {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysMs = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysMs / (60 * 60 * 1000));
  const hoursMs = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursMs / (60 * 1000));
  return `${days}d ${hours}h ${minutes}m`;
}
