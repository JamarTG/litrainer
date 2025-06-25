import { Fields } from "@/types/lichess";

export const INITIAL_TRAINER_FORM_STATE: Fields = {
  username: "",
  maxNoGames: 10,
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  color: "both",
  gameTypes: ["bullet", "blitz", "rapid", "classical", "correspondence"],
  sort: "desc"
};

export const DAYS_OF_THE_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const MONTHS_OF_THE_YEAR = [
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
  "December"
] as const;
