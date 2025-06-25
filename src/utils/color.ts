import { Color } from "chess.js";
import { ColorLongForm, ColorShortForm } from "./enums";

export const getLongColor = (color: Color): ColorLongForm => {
  return isWhitePlayerShort(color) ? ColorLongForm.WHITE : ColorLongForm.BLACK;
};

export const isWhitePlayerShort = (playerColor: Color): boolean => {
  return playerColor === ColorShortForm.WHITE;
};
export const isWhitePlayerLong = (playerColor: ColorLongForm): boolean => {
  return playerColor === ColorLongForm.WHITE;
};

export const isWhiteOrientationLong = (orientation: ColorLongForm): boolean => {
  return orientation === ColorLongForm.WHITE;
};

export const isWhitePieceShort = (color: Color): boolean => {
  return color === ColorShortForm.WHITE;
};
