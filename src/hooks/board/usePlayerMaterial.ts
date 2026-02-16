import { getMaterials } from "@/state/slices/board";
import { getRelativeMaterial } from "@/shared/lib";
import { Color } from "chess.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const usePlayerMaterial = (playerColor: Color) => {
  const [materialInfo, setMaterialInfo] = useState<number | null>(null);
  const materials = useSelector(getMaterials);

  useEffect(() => {
    setMaterialInfo(getRelativeMaterial(materials, playerColor));
  }, [materials, playerColor]);

  return materialInfo;
};

export default usePlayerMaterial;
