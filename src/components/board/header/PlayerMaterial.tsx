import { FC, useEffect, useState } from "react";
import { Color } from "chess.js";
import { Material } from "@/types/eval";
import { getRelativeMaterial } from "@/utils/material";
import { pieceLongFormWithoutKing } from "@/constants/piece";
import { PieceShortFormWithoutKing } from "@/types/chess";
import { typedEntries } from "@/utils/object";
import List from "@/components/common/List";
import { ICON_SIZES } from "@/constants/ui";
import MaterialPieceIcon from "./MaterialPieceIcon";
import { useSelector } from "react-redux";
import { getFen, getMaterials } from "@/redux/slices/board";

interface MaterialProps {
  playerMaterial: Material;
  playerColor: Color;
}

const renderPiece = ([piece, count]: [PieceShortFormWithoutKing, number]) => {
  if (count < 1) return;

  // used to render the pieces the amount of time needed
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

interface MaterialInfo {
  materialCount: number;
  upMaterialSign: string;
}

const PlayerMaterial: FC<MaterialProps> = ({ playerMaterial, playerColor }) => {
  const fen = useSelector(getFen);
  const materials = useSelector(getMaterials);

  const [materialInfo, setMaterialInfo] = useState<MaterialInfo | null>(null);

  useEffect(() => {
    setMaterialInfo(getRelativeMaterial(materials, playerColor));
  }, [fen, materials]);

  return (
    <div className="flex justify-center items-center ">
      <List items={typedEntries(playerMaterial)} renderItem={renderPiece} />
      {materialInfo?.upMaterialSign || ""}
      {materialInfo?.materialCount || ""}
    </div>
  );
};

export default PlayerMaterial;
