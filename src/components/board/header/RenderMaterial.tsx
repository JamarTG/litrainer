import { FC } from "react";
import { Color } from "chess.js";
import { Materials } from "@/types/eval";
import { determineColorLeadingInMaterial } from "@/utils/material";
import { pieceLongFormWithoutKing } from "@/constants/piece";
import { PieceShortFormWithoutKing } from "@/types/chess";
import { typedEntries } from "@/utils/object";
import List from "@/components/common/List";
import { ICON_SIZES } from "@/constants/ui";
import MaterialIndicatorIcon from "./MaterialIndicatorIcon";

interface RenderMaterialProps {
  material: Materials;
  color: Color;
}

const RenderMaterial: FC<RenderMaterialProps> = ({ material, color }) => {
  const materialCount = determineColorLeadingInMaterial(material, color);
  const positionOrNegativeCount = materialCount > 0 ? "+" : "";
  const materialCountString = materialCount || "";
  const materialColorToRender = color === "b" ? material.b : material.w;

  const renderPieces = ([piece, count]: [PieceShortFormWithoutKing, number]) => {
    const weHavePiece = count > 0;
    const numberOfPiecesArray = Array.from({ length: count });

    return (
      weHavePiece && (
        <div key={piece} className="flex">
          <List
            items={numberOfPiecesArray}
            renderItem={(_, i) => (
              <MaterialIndicatorIcon key={i} piece={pieceLongFormWithoutKing[piece]} size={ICON_SIZES.SMALL} />
            )}
          />
        </div>
      )
    );
  };

  return (
    <div className="flex justify-center items-center ">
      <List items={typedEntries(materialColorToRender)} renderItem={renderPieces} />
      {positionOrNegativeCount}
      {materialCountString}
    </div>
  );
};

export default RenderMaterial;
