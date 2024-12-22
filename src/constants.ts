import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";
import formatDate from "./utils/formatDate";
export const STARTINGPOSFEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const DEFAULT_VOLUME = 0.9;
export const PIECE_ICONS = {
  n: faChessKnight,
  b: faChessBishop,
  r: faChessRook,
  q: faChessQueen,
  k: faChessKing,
  p: faChessPawn,
};
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
  MIN_SIZE: 300,
  INITIAL_SIZE: 400,
};

export const moveSquareStyles = {
  borderRadius: "50%",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
  transform: "scale(0.7)",
};

export const perfIcons: { [key: string]: string } = {
  bullet: "&#xe032;",
  blitz: "&#xe02f;",
  rapid: "&#xe002;",
  correspondence: "&#xe019;",
  classical: "&#xe00a;",
};

export const SOUND_ACTIONS = {
  MOVE: "move",
  CAPTURE: "capture",
  CHECK: "check",
  CASTLE: "castle",
  PROMOTION: "promotion",
  START: "start",
  END: "end",
};

export const INITIAL_INDEX_STATE = { x: 0, y: 0 };
