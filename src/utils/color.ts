import { COLORS } from "@/constants/player";
import { ColorLongForm } from "@/types/lichess";
import { Color } from "chess.js";

export const getLongColor = (color: Color): ColorLongForm => {
  return isWhitePlayerShort(color) ? COLORS.LONG.white : COLORS.LONG.black;
};

export const isWhitePlayerShort = (playerColor: Color): boolean => {
  return playerColor === COLORS.SHORT.white;
};
export const isWhitePlayerLong = (playerColor: ColorLongForm): boolean => {
  return playerColor === COLORS.LONG.white;
};

export const isWhiteOrientationLong = (orientation: ColorLongForm): boolean => {
  return orientation === COLORS.LONG.white;
};

export const isWhitePieceShort = (color: Color): boolean => {
  return color === COLORS.SHORT.white;
};
