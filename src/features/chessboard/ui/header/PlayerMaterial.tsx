import { FC } from "react";
import { Material } from "@/typing/interfaces";
import MaterialScore from "./MaterialScore";
import PieceDifference from "./PieceDifference";
import { PieceCount } from "@/typing/types";
import { PIECE_VALUE } from "@/constants/piece";

interface MaterialProps {
  playerMaterial: Material;
  opponentMaterial: Material;
}

const MATERIAL_KEYS: Array<keyof Material> = ["p", "n", "b", "r", "q"];

const getMaterialImbalance = (material: Material, opponentMaterial: Material): Material => {
  return {
    p: Math.max(material.p - opponentMaterial.p, 0),
    n: Math.max(material.n - opponentMaterial.n, 0),
    b: Math.max(material.b - opponentMaterial.b, 0),
    r: Math.max(material.r - opponentMaterial.r, 0),
    q: Math.max(material.q - opponentMaterial.q, 0)
  };
};

const getMaterialValue = (material: Material): number => {
  return MATERIAL_KEYS.reduce((total, pieceKey) => total + material[pieceKey] * PIECE_VALUE[pieceKey], 0);
};

const PlayerMaterial: FC<MaterialProps> = ({ playerMaterial, opponentMaterial }) => {
  const playerImbalance = getMaterialImbalance(playerMaterial, opponentMaterial);
  const opponentImbalance = getMaterialImbalance(opponentMaterial, playerMaterial);

  const materialScore = getMaterialValue(playerImbalance) - getMaterialValue(opponentImbalance);

  if (materialScore <= 0) return null;

  const pieceCounts = Object.entries(playerImbalance) as PieceCount[];

  return (
    <div className="flex justify-center items-center ">
      <PieceDifference pieceCounts={pieceCounts} />
      <MaterialScore score={materialScore} />
    </div>
  );
};

export default PlayerMaterial;
