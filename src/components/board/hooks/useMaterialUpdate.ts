import { useEffect } from "react";
import { Chess } from "chess.js";
import { calculateMaterialDifference } from "@/libs/trainer/material";
import { updateMaterials } from "@/redux/slices/board";
import { useDispatch } from "react-redux";

export const useMaterialUpdate = (game: Chess, fen: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const materialDifference = calculateMaterialDifference(game);
    dispatch(updateMaterials(materialDifference));
  }, [game, fen, dispatch]);
};
