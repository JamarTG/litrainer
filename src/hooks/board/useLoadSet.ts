import { getPieceSet } from "@/state/slices/piece-set";
import { isPieceSetAvailable, loadPieceSetCSS } from "@/utils/theme-loaders/piece-theme-loader";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useLoadSet = () => {
  const pieceSet = useSelector(getPieceSet);

  useEffect(() => {
    if (!isPieceSetAvailable(pieceSet)) {
      console.warn(`Piece set ${pieceSet} is not available.`);
      return;
    }

    loadPieceSetCSS(pieceSet).catch((err) => {
      console.error(`Failed to load theme CSS for ${pieceSet}:`, err);
    });
  }, [pieceSet]);
};

export default useLoadSet;
