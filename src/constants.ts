import formatDate from "./utils/date/formatDate";
export const STARTINGPOSFEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const DEFAULT_VOLUME = 0.9;

export const INITIAL_FORM_STATE = {
  username: "JamariTheGreat",
  maxNoGames: 10,
  startDate: formatDate(new Date(Date.now() - 55 * 24 * 60 * 60 * 1000)),
  endDate: formatDate(new Date()),
};

export const API_BASE_URL = "https://lichess.org/api/";

export const customBoardStyles = {
  borderRadius: "5px",
  boxShadow: "0 15px 15px rgba(0,0,0,0.3)",
  position: "relative" as const,
};

export const boardDimensions = {
  MAX_SIZE: 500,  
  MIN_SIZE: 200,
  INITIAL_SIZE: 500
}

export const INITIAL_INDEX_STATE = { x: 0, y: 0 };
