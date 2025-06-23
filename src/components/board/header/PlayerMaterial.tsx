import { FC } from "react";
import { Color } from "chess.js";
import { Material } from "@/types/eval";
import { pieceLongFormWithoutKing } from "@/constants/piece";
import { PieceShortFormWithoutKing } from "@/types/chess";
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

export interface MaterialScoreProps {
  score: number;
}

const MaterialScore: FC<MaterialScoreProps> = ({ score }) => {
  return (
    <div className="flex items-center justify-center text-xs">
      <span className="text-gray-600 dark:text-gray-300">{score > 0 && "+"}</span>
      <span className="text-gray-800 dark:text-gray-200">{score}</span>
    </div>
  );
};

const PlayerMaterial: FC<MaterialProps> = ({ playerMaterial, playerColor }) => {
  const score = usePlayerMaterial(playerColor);
  const material = Object.entries(playerMaterial) as [keyof Material, Material[keyof Material]][];

  return (
    <div className="flex justify-center items-center ">
      <List items={material} renderItem={renderPieceXTimes} />
      {score ? <MaterialScore score={score} /> : ""}
    </div>
  );
};

export default PlayerMaterial;
