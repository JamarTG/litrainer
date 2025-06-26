import { useEffect } from "react";
import { Chess } from "chess.js";
import { calculateMaterialDifference } from "@/libs/trainer/material";
import { getFen, updateMaterials } from "@/redux/slices/board";
import { useDispatch, useSelector } from "react-redux";

export const useMaterialUpdate = (game: Chess) => {
  const dispatch = useDispatch();
  const fen = useSelector(getFen);

  useEffect(() => {
    const materialDifference = calculateMaterialDifference(game);
    dispatch(updateMaterials(materialDifference));
  }, [game, fen, dispatch]);
};
