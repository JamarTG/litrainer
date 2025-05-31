import { Fields, GameType } from "../types/form";

export const TimeControls = ["bullet", "blitz", "rapid", "classical", "correspondence"] as GameType[];

export const initialFormState: Fields = {
  username: "",
  maxNoGames: 10,
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  color: "both",
  gameTypes: TimeControls,
  sort: "desc"
};
