export const formatDate = (date: Date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const formatTime = (seconds: number): string => {
  if (seconds === 30) return "1/2";
  else if (seconds === 15) return "1/4";
  else if (seconds < 60) return `${seconds}`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) return `${minutes}`;
  return `${minutes}${formatTime(remainingSeconds).replace("0.", ".")}`;
};