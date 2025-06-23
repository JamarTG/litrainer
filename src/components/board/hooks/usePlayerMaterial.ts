import { getFen, getMaterials } from "@/redux/slices/board";
import { getRelativeMaterial } from "@/libs/trainer/material";
import { Color } from "chess.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MaterialInfo } from "../header/PlayerMaterial";

const usePlayerMaterial = (playerColor: Color) => {
  const [materialInfo, setMaterialInfo] = useState<MaterialInfo | null>(null);
  const fen = useSelector(getFen);
  const materials = useSelector(getMaterials);

  useEffect(() => {
    setMaterialInfo(getRelativeMaterial(materials, playerColor));
  }, [fen, materials]);

  return materialInfo;
};

export default usePlayerMaterial;
