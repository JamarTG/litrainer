import { FC } from "react";
import { Color } from "chess.js";
import { Material } from "@/types/eval";
import { pieceLongFormWithoutKing } from "@/constants/piece";
import { PieceShortFormWithoutKing } from "@/types/chess";
import { typedEntries } from "@/utils/object";
import List from "@/components/common/List";
import { ICON_SIZES } from "@/constants/icons";
import MaterialPieceIcon from "./MaterialPieceIcon";
import usePlayerMaterial from "../hooks/usePlayerMaterial";

interface MaterialProps {
  playerMaterial: Material;
  playerColor: Color;
}

const renderPieceXTimes = ([piece, count]: [PieceShortFormWithoutKing, number]) => {
  if (count < 1) return;

  const pieceFrequencyArray = Array.from({ length: count });

  return (
    <div key={piece} className="flex">
      <List
        items={pieceFrequencyArray}
        renderItem={(_, i) => (
          <MaterialPieceIcon key={i} piece={pieceLongFormWithoutKing[piece]} size={ICON_SIZES.SMALL} />
        )}
      />
    </div>
  );
};

export interface MaterialInfo {
  materialScore: number;
  plusSign: string;
}

const renderMaterialScore = ({ materialScore, plusSign }: MaterialInfo) => {
  return `${materialScore || ""} ${plusSign || ""} `;
};

const PlayerMaterial: FC<MaterialProps> = ({ playerMaterial, playerColor }) => {
  const materialInfo = usePlayerMaterial(playerColor);
  const material = typedEntries(playerMaterial);
  return (
    <div className="flex justify-center items-center ">
      <List items={material} renderItem={renderPieceXTimes} />
      {materialInfo && renderMaterialScore(materialInfo)}
    </div>
  );
};

export default PlayerMaterial;
