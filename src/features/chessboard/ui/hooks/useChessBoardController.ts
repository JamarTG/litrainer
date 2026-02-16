import { useCallback, useMemo, useState } from "react";
import { Square, Chess } from "chess.js";
import { PuzzleStatus } from "@/state/slices/feedback";
import { ColorLongForm, ColorShortForm } from "@/typing/enums";
import { isPromotionMove, buildDestsMap, createMovableConfig, getDefaultMovableConfig } from "@/utils/board";
import { PromotionMoveObject } from "../overlay/PromotionDialog";

interface UseChessBoardControllerArgs {
  game: Chess;
  playerColorLongForm: ColorLongForm;
  puzzleStatus: PuzzleStatus;
  handleMoveAttempt: (from: Square, to: Square, promotionPiece: string) => void;
}

export const useChessBoardController = ({
  game,
  playerColorLongForm,
  puzzleStatus,
  handleMoveAttempt
}: UseChessBoardControllerArgs) => {
  const [promotionMoveObject, setPromotionMoveObject] = useState<PromotionMoveObject | null>(null);

  const movable = useMemo(() => {
    if (puzzleStatus === "solved") return getDefaultMovableConfig();

    const moves = game.moves({ verbose: true });
    const dests = buildDestsMap(moves);

    return createMovableConfig(dests, playerColorLongForm);
  }, [game, playerColorLongForm, puzzleStatus]);

  const onMove = useCallback(
    (from: string, to: string) => {
      const fromSquare = from as Square;
      const toSquare = to as Square;

      if (isPromotionMove(game, fromSquare, toSquare)) {
        const movingPiece = game.get(fromSquare);
        const color = movingPiece?.color === ColorShortForm.WHITE ? ColorLongForm.WHITE : ColorLongForm.BLACK;

        setPromotionMoveObject({
          from: fromSquare,
          to: toSquare,
          color
        });
        return;
      }

      handleMoveAttempt(fromSquare, toSquare, "");
    },
    [game, handleMoveAttempt]
  );

  const handlePromotion = useCallback(
    (promotionPiece: string) => {
      if (!promotionMoveObject) return;

      const { from, to } = promotionMoveObject;
      handleMoveAttempt(from, to, promotionPiece);
      setPromotionMoveObject(null);
    },
    [promotionMoveObject, handleMoveAttempt]
  );

  const handlePromotionCancel = useCallback(() => {
    setPromotionMoveObject(null);
  }, []);

  return {
    movable,
    onMove,
    promotionMoveObject,
    handlePromotion,
    handlePromotionCancel
  };
};