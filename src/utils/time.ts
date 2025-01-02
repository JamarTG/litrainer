export const formatTime = (seconds: number): string => {
  if (seconds === 30) return "1/2";
  else if (seconds === 15) return "1/4";
  else if (seconds < 60) return `${seconds}`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) return `${minutes}`;
  return `${minutes}${formatTime(remainingSeconds).replace("0.", ".")}`;
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};