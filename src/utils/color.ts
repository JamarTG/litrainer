import { PLAYER_COLORS } from "@/constants/player";
import { ColorLongForm } from "@/types/lichess";
import { Color } from "chess.js";

export const getLongColor = (color: Color): ColorLongForm => {
  return color === PLAYER_COLORS.SHORT.white ? PLAYER_COLORS.LONG.white : PLAYER_COLORS.LONG.black;
};

export const isWhitePlayerShort = (playerColor: Color): boolean => {
  return playerColor === PLAYER_COLORS.SHORT.white;
};
export const isWhitePlayerLong = (playerColor: ColorLongForm): boolean => {
  return playerColor === PLAYER_COLORS.LONG.white;
};

export const isWhiteOrientationLong = (orientation: ColorLongForm): boolean => {
  return orientation === PLAYER_COLORS.LONG.white;
};

export const isWhitePieceShort = (color: Color): boolean => {
  return color === PLAYER_COLORS.SHORT.white;
};
