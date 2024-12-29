import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "./utils/time";
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

export const BOARD_DIMENSIONS = {
  MAX_SIZE: 550,
  MIN_SIZE: 300,
  INITIAL_SIZE: 550,
};

export const DEFAULT_FORM_STATE = {
  username: "JamariTheGreat",
  maxNoGames: 10,
  startDate: "2023-01-01",
  endDate: "2023-12-31",
};

export const moveSquareStyles = {
  borderRadius: "50%",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
  transform: "scale(0.7)",
};

export const timeControlIcons: { [key: string]: string } = {
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

export const PIECEVALUE = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

export const INITIAL_INDEX_STATE = { x: 0, y: 0 };
