import { useEffect } from "react";
import { Chess } from "chess.js";
import { calculateMaterialDifference } from "@/utils/material";
import { updateMaterials } from "@/redux/slices/board";
import { useDispatch } from "react-redux";

export const useMaterialEffect = (game: Chess, fen: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const newMaterialDiff = calculateMaterialDifference(game);
    dispatch(updateMaterials(newMaterialDiff));
  }, [game, fen]);
};
