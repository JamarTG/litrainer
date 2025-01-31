import { Fields } from "../types/form";

export const INITIAL_FORM_STATE: Fields = {
  username: "JamariTheGreat",
  maxNoGames: 10,
  // 1 Year Ago   
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  color: "both",
  gameTypes: ["bullet", "blitz", "rapid", "classical", "correspondence"],
  sort: "desc",
};
