import { Dispatch, SetStateAction, useEffect } from 'react';
import { Puzzle } from '../types/puzzle';
import { UciEngine } from '../engine/uciEngine';
import { BestMove } from '../types/move';


interface UseEngineMovesParams {
  puzzle: Puzzle | null;
  engine: UciEngine | null;
  setBestMoves: Dispatch<SetStateAction<BestMove[] | null>>;
}

const useEngineMoves = ({ puzzle, engine, setBestMoves }: UseEngineMovesParams) => {
  useEffect(() => {
    const getEngineMoves = async () => {
      if (puzzle) {
        setBestMoves([]);
        const bestMoves_ = await engine?.getBestMoves(puzzle.fen.current, 15);
        console.log(bestMoves_)
        setBestMoves(bestMoves_ || []);
      }
    };
    getEngineMoves();
  }, [puzzle, engine, setBestMoves]);
};

export default useEngineMoves;