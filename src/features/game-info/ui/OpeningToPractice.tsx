import { BookOpen } from "lucide-react";
import { LICHESS_URLS } from "@/constants/urls";
import { Puzzle } from "@/typing/interfaces";
import { ICON_SIZES } from "@/constants/icons";
import { Fragment } from "react/jsx-runtime";

interface OpeningToPracticeProps {
  positionOpening: Puzzle["positionOpening"];
}

const OpeningToPractice: React.FC<OpeningToPracticeProps> = ({ positionOpening }) => {
  return (
    <Fragment>
      {positionOpening ? (
        <a
          href={`${LICHESS_URLS.Openings}${positionOpening.eco}`}
          className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
          target="_blank"
          rel="noopener noreferrer"
          title={`Explore ${positionOpening.name}`}
        >
          <BookOpen size={ICON_SIZES.SMALL} />
          <span>Practice This Opening</span>
        </a>
      ) : null}
    </Fragment>
  );
};

export default OpeningToPractice;