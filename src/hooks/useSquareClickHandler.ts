import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chess, Move, Square } from "chess.js";
import { RootState } from "../redux/store";
import { getHighlightedLegalMoves } from "../utils/style";
import { useMoveHandler } from "./useMoveHandler";
import { setMoveSquares, setSourceSquare } from "../redux/slices/boardSlices";

export const useSquareClickHandler = (game: Chess) => {
  const dispatch = useDispatch();
  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);
  const sourceSquare = useSelector((state: RootState) => state.board.sourceSquare);
  const { handleMoveAttempt } = useMoveHandler(game);

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      if (isPuzzleSolved) return;
      const highlightedSquaresStyles = getHighlightedLegalMoves(legalMoves);
      dispatch(setMoveSquares(highlightedSquaresStyles));
    },
    [dispatch, isPuzzleSolved]
  );

  const unhighlightLegalMoves = useCallback(() => {
    dispatch(setMoveSquares({}));
  }, [dispatch]);

  const handleSquareClick = (srcSquare: Square) => {
    if (isPuzzleSolved) return;
    const piece = game.get(srcSquare);

    if (!!piece && piece.color === game.turn()) {
      dispatch(setSourceSquare(srcSquare));
      highlightLegalMoves(game.moves({ square: srcSquare, verbose: true }));
      return;
    }

    handleMoveAttempt(sourceSquare!, srcSquare);
    unhighlightLegalMoves();
  };

  return {
    handleSquareClick,
    highlightLegalMoves,
    unhighlightLegalMoves,
  };
};
