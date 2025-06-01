import { ColorLongForm } from "../../types/player";

const BASE_PIECE_THEMES_URL = "./../../../../public/themes/pieces/";

export const constructPromotionPieceURL = (pieceSet:string, color: ColorLongForm) => {
  return BASE_PIECE_THEMES_URL + `${pieceSet}/${color[0]}R.svg`;
};

