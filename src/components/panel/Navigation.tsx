import { useDispatch } from "react-redux";
import { nextPuzzle, prevPuzzle} from "../../redux/slices/puzzle";
import { setIsPuzzleSolved } from "../../redux/slices/feedback";

const navButtons = [
  {
    label: "Previous",
    aria: "Previous Puzzle",
    action: prevPuzzle,
  },
  {
    label: "Next",
    aria: "Next Puzzle",
    action: nextPuzzle,
  },
];

const PuzzleNavigation = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4">
      {navButtons.map((btn) => (
        <button
          key={btn.aria}
          onClick={() => {
            dispatch(setIsPuzzleSolved(false));
            dispatch(btn.action!());
          }}
          className={`
            rounded-xl font-semibold text-base sm:text-lg
            bg-blue-500 text-white
            hover:bg-blue-600
            active:scale-95 active:ring-2 active:ring-purple-300
            transition
            w-24 h-14 sm:w-24 sm:h-12
            m-1
          `}
          aria-label={btn.aria}
          type="button"
          style={{
            outline: "none",
            letterSpacing: "0.03em",
          }}
        >
          <span className="flex items-center justify-center h-full">{btn.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PuzzleNavigation;
