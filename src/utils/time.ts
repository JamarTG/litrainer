import { Fields } from "../types/form";

export const convertTimeToString = (seconds: number): string => {
  if (seconds === 30) return "1/2";
  else if (seconds === 15) return "1/4";
  else if (seconds < 60) return `${seconds}`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) return `${minutes}`;
  return `${minutes}${convertTimeToString(remainingSeconds).replace("0.", ".")}`;
};


export const convertDateToReadableFormat = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getDefaultDate = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
};


export const toTimestamps = (
  startDate: Fields["startDate"],
  endDate: Fields["endDate"]
) => {
  const since = new Date(startDate).getTime().toString();
  const until = new Date(endDate).getTime().toString();
  return { since, until };
};