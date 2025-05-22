import { useDispatch } from "react-redux";
import { nextPuzzle, prevPuzzle } from "../../redux/slices/puzzleSlices";
import { NAVIGATION_ICONS } from "../../constants/navigation";
import SubmitButtonWithModal from "../trainerForm/SubmitButtonWithModal";

const PuzzleNavigation = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ width: "90%" }}
        className="flex justify-center items-center pl-2  px-4 sm:px-0 p-2 border mx-auto rounded-lg  flex sm:flex-row items-center justify-center sm:items-start gap-4 ">
      
      <button
        onClick={() => dispatch(prevPuzzle())}
        className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
        aria-label="Previous Puzzle"
      >
        <span
          className="icon text-2xl"
          dangerouslySetInnerHTML={{ __html: NAVIGATION_ICONS.PREV }}
        />
      </button>

      <button
        // onClick={retryPuzzle}
        className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
        aria-label="Retry Puzzle"
      >
        <span
          className="icon text-2xl"
          dangerouslySetInnerHTML={{ __html: NAVIGATION_ICONS.RELOAD }}
        />
      </button>

      <button
        onClick={() => dispatch(nextPuzzle())}
        className="flex items-center justify-center p-2 rounded-lg  transition-colors duration-200"
        aria-label="Next Puzzle"
      >
        <span
          className="icon text-2xl"
          dangerouslySetInnerHTML={{ __html: NAVIGATION_ICONS.NEXT }}
        />
      </button>
      <div className="flex justify-center items-center gap-1">
        <small>New Session</small>
        <SubmitButtonWithModal/>
      </div>
      
    </div>
  );
};

export default PuzzleNavigation;
