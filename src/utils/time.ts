export const formatTimeControl = (initial: number, increment: number): string => {
  if (initial >= 86400 && increment === 0) {
    const days = (initial / 86400).toFixed(1).replace(/\.0$/, "");
    return `${days}d/move`;
  }

  if (initial >= 3600) {
    const hours = (initial / 3600).toFixed(1).replace(/\.0$/, "");
    return `${hours}h+${increment}`;
  }

  if (initial >= 60) {
    const minutes = (initial / 60).toFixed(1).replace(/\.0$/, "");
    return `${minutes}+${increment}`;
  }

  return `${initial}s+${increment}`;
};
