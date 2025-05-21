import { Fields } from "../types/form";

export const initialFormState: Fields = {
  username: "JamariTheGreat",
  maxNoGames: 10,
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  color: "both",
  gameTypes: ["bullet", "blitz", "rapid", "classical", "correspondence"],
  sort: "desc",
};

export const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
