import { GameType, Fields } from "@/types/lichess";

export const TIME_CONTROLS = ["bullet", "blitz", "rapid", "classical", "correspondence"] as GameType[];

export const INITIAL_TRAINER_FORM_STATE: Fields = {
  username: "",
  maxNoGames: 10,
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  color: "both",
  gameTypes: TIME_CONTROLS,
  sort: "desc"
};
