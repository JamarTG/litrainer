import Navigation from "./Navigation";
import MoveFeedback from "./MoveFeedback";
import ClassificationImage from "./ClassificationImage";
import { getPuzzle } from "@/redux/slices/puzzle";
import { useSelector } from "react-redux";
import ShowIf from "@/components/common/ShowIf";

const PanelBody = () => {
  const puzzle = useSelector(getPuzzle);

  return (
    <ShowIf condition={Boolean(puzzle.userMove && puzzle.opponentMove)}>
      <div className="flex flex-col flex-1 justify-start items-center md:justify-center p-4 gap-6 min-h-48 rounded-lg transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-4 w-full max-w-md border border-zinc-400 dark:border-zinc-700 rounded-md p-4 bg-zinc-200/75 dark:bg-zinc-800">
          <ClassificationImage />
          <MoveFeedback />
        </div>
        <div className="w-full max-w-md mt-4">
          <Navigation />
        </div>
      </div>
    </ShowIf>
  );
};

export default PanelBody;
