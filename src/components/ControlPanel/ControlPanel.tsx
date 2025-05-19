import GameInfo from "../Game/GameInfo";
import PuzzleInfo from "../Puzzle/PuzzleInfo";
import Navigation from "./Navigation";
import EngineDepthControl from "./EngineDepthControl";
import { useDispatch, useSelector } from "react-redux";
import { setClassification, setIsPuzzleSolved } from "../../pages/redux/slices/feedbackSlices";
import { RootState } from "../../pages/redux/store";

interface ControlPanelProps {
  unhighlightLegalMoves: () => void;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({ unhighlightLegalMoves }) => {

  const {puzzles, currentIndex} = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex]
  const isDataAvailable = puzzle !== null;
  const dispatch = useDispatch();

  const resetBoard = (changePuzzle: () => void) => {
    changePuzzle();
    dispatch(setClassification(null));
    dispatch(setIsPuzzleSolved(false));
    unhighlightLegalMoves();
    
  };

  return (
    <div className="w-96 ">
      <EngineDepthControl />

      {isDataAvailable && (
        <div className="flex flex-col items-center gap-5 w-full m-5">
          <GameInfo />
          <PuzzleInfo/>
          <Navigation resetBoard={resetBoard} />
        </div>
      )}
    </div>
  );
};
export default PuzzleControlPanel;
