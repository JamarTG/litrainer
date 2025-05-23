export const convertTimeToString = (seconds: number): string => {
  if (seconds === 30) return "1/2";
  else if (seconds === 15) return "1/4";
  else if (seconds < 60) return `${seconds}`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) return `${minutes}`;
  return `${minutes}${convertTimeToString(remainingSeconds).replace("0.", ".")}`;
};


export const formatTimeControl = (initial: number, increment: number): string => {
  if (initial >= 86400 && increment === 0) {
    const days = (initial / 86400).toFixed(1).replace(/\.0$/, '');
    return `${days}d/move`;
  }

  if (initial >= 3600) {
    const hours = (initial / 3600).toFixed(1).replace(/\.0$/, '');
    return `${hours}h+${increment}`;
  }

  if (initial >= 60) {
    const minutes = (initial / 60).toFixed(1).replace(/\.0$/, '');
    return `${minutes}+${increment}`;
  }

  return `${initial}s+${increment}`;
};
