import { useDispatch } from "react-redux";
import { nextPuzzle, prevPuzzle } from "../../redux/slices/puzzleSlices";
import { BiArrowBack, BiRefresh, BiRightArrowAlt } from "react-icons/bi";

const PuzzleNavigation = () => {
  const dispatch = useDispatch();

  return (
    <div
     className="w-full  flex sm:flex-row items-center justify-center sm:items-start"
    >

      <button
        onClick={() => dispatch(prevPuzzle())}
        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous Puzzle"
      >
        <BiArrowBack className="text-2xl sm:text-3xl" />
      </button>
      <button
        // onClick={retryPuzzle}
        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Retry Puzzle"
      >
        <BiRefresh className="text-2xl sm:text-3xl" />
      </button>
      <button
        onClick={() => dispatch(nextPuzzle())}
        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next Puzzle"
      >
        <BiRightArrowAlt className="text-2xl sm:text-3xl" />
      </button>
    </div>
  );
};

export default PuzzleNavigation;
