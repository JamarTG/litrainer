import { FC } from "react";
import PieceIcon from "./PieceIcons";
import { Color } from "chess.js";
import { Materials } from "../../../types/eval";
import { determineColorLeadingInMaterial } from "../../../utils/chess/material";
import { pieceLongFormWithoutKing, PieceShortFormWithoutKing } from "../../../constants/piece";
import { typedEntries } from "../../../utils/object";

interface RenderMaterialProps {
  material: Materials;
  color: Color;
}

const PIECE_ICON_SIZE = 18;

const RenderMaterial: FC<RenderMaterialProps> = ({ material, color }) => {
  let materialCount = determineColorLeadingInMaterial(material, color);

  const renderPieces = ([piece, count]: [PieceShortFormWithoutKing, number]) => {
    const weHavePiece = count > 0;
    const numberOfPiecesArray = Array.from({ length: count });
    return (
      weHavePiece && (
        <div key={piece} className="flex">
          {numberOfPiecesArray.map((_, i) => (
            <PieceIcon key={i} piece={pieceLongFormWithoutKing[piece]} size={PIECE_ICON_SIZE} />
          ))}
        </div>
      )
    );
  };

  const positionOrNegativeCount = materialCount > 0 ? "+" : "";
  const materialCountString = materialCount || "";
  const materialColorToRender = color === "b" ? material.b : material.w;

  return (
    <div className="flex justify-center items-center ">
      {typedEntries(materialColorToRender).map(renderPieces)}
      {positionOrNegativeCount}
      {materialCountString}
    </div>
  );
};

export default RenderMaterial;
