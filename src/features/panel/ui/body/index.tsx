import NavigatePuzzle from "./NavigatePuzzle";
import ClassificationText from "./ClassificationText";
import ClassificationImage from "./ClassificationImage";
import { getPuzzle } from "@/state/slices/puzzle";
import { useSelector } from "react-redux";
import { NewSessionTriggerButton } from "@/features/training-session";

const PanelBody = () => {
  const puzzle = useSelector(getPuzzle);

  if (!puzzle) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center p-4 gap-6 min-h-48 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No puzzle data available :(</p>
        <NewSessionTriggerButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 justify-start items-center md:justify-center p-4 gap-6 min-h-48 rounded-lg">
      <div className="flex items-stretch gap-3 w-full max-w-md min-h-[120px] border border-[var(--color-border)] rounded-md p-4 bg-[var(--color-surface)]/90">
        <ClassificationImage />
        <ClassificationText />
      </div>
      <div className="w-full max-w-md mt-4 min-h-[48px] flex items-center">
        <NavigatePuzzle />
      </div>
    </div>
  );
};

export default PanelBody;
