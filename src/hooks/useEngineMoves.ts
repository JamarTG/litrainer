import { useEffect } from 'react';
import { Puzzle } from '../types/puzzle';
import { UciEngine } from '../engine/uciEngine';


interface UseEngineMovesParams {
  puzzle: Puzzle | null;
  engine: UciEngine | null;
  setBestMoves: (moves: any[]) => void;
}

const useEngineMoves = ({ puzzle, engine, setBestMoves }: UseEngineMovesParams) => {
  useEffect(() => {
    const getEngineMoves = async () => {
      if (puzzle) {
        setBestMoves([]);
        const bestMoves = await engine?.getBestMoves(puzzle.fen.current, 15);
        setBestMoves(bestMoves || []);
      }
    };
    getEngineMoves();
  }, [puzzle, engine, setBestMoves]);
};

export default useEngineMoves;