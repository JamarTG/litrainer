import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
// export type { GameState } from '../slices/gameSlices';
// export type { PuzzleState } from '../slices/puzzleSlices';

export const useAppDispatch = () => useDispatch<AppDispatch>();
