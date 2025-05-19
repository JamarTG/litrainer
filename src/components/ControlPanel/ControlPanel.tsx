import { useContext } from "react";
import GameInfo from "../Game/GameInfo";
import PuzzleInfo from "../Puzzle/PuzzleInfo";
import { PuzzleContext } from "../../context/PuzzleContext";
import Navigation from "./Navigation";
import History from "../Puzzle/PuzzleHistory";
import EngineDepthControl from "./EngineDepthControl";
import { useDispatch } from "react-redux";
import { setClassification, setIsPuzzleSolved } from "../../pages/redux/slices/feedbackSlices";

interface ControlPanelProps {
  history: Record<number, string | null>;
  unhighlightLegalMoves: () => void;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({ unhighlightLegalMoves, history }) => {
  const { puzzle } = useContext(PuzzleContext);
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

          <PuzzleInfo
            puzzle={puzzle}
          />

          <History
            history={history}
          />

          <Navigation resetBoard={resetBoard} />
        </div>
      )}
    </div>
  );
};
export default PuzzleControlPanel;
