import { FC } from "react";
import PieceIcon from "./PieceIcons";
import { Color } from "chess.js";
import { Materials } from "@/types/eval";
import { determineColorLeadingInMaterial } from "@/utils/material";
import { pieceLongFormWithoutKing } from "@/constants/piece";
import { PieceShortFormWithoutKing } from "@/types/piece";
import { typedEntries } from "@/utils/object";
import List from "@/components/common/List";

interface RenderMaterialProps {
  material: Materials;
  color: Color;
}

const PIECE_ICON_SIZE = 18;

const RenderMaterial: FC<RenderMaterialProps> = ({ material, color }) => {
  const materialCount = determineColorLeadingInMaterial(material, color);

  const renderPieces = ([piece, count]: [PieceShortFormWithoutKing, number]) => {
    const weHavePiece = count > 0;
    const numberOfPiecesArray = Array.from({ length: count });

    return (
      weHavePiece && (
        <div key={piece} className="flex">
          <List
            items={numberOfPiecesArray}
            renderItem={(_, i) => <PieceIcon key={i} piece={pieceLongFormWithoutKing[piece]} size={PIECE_ICON_SIZE} />}
          />
        </div>
      )
    );
  };

  const positionOrNegativeCount = materialCount > 0 ? "+" : "";
  const materialCountString = materialCount || "";
  const materialColorToRender = color === "b" ? material.b : material.w;

  return (
    <div className="flex justify-center items-center ">
      <List items={typedEntries(materialColorToRender)} renderItem={renderPieces} />
      {positionOrNegativeCount}
      {materialCountString}
    </div>
  );
};

export default RenderMaterial;
