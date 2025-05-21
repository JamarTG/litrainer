import { useDispatch } from "react-redux";
import { nextPuzzle, prevPuzzle } from "../../redux/slices/puzzleSlices";
import { NAVIGATION_ICONS } from "../../constants/navigation";

const PuzzleNavigation = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full md:w-[400px] flex justify-between gap-2 py-2 px-4 rounded-xl">
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
    </div>
  );
};

export default PuzzleNavigation;