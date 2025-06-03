
import { BookOpen } from "lucide-react";
import { LichessURL } from "@/constants/urls";
import { Puzzle } from "@/types/puzzle";

interface OpeningToPracticeProps {
  positionOpening: Puzzle["positionOpening"];
}

const OpeningToPractice: React.FC<OpeningToPracticeProps> = ({ positionOpening }) => {
  return (
    <>
      {positionOpening ? (
        <a
          href={`${LichessURL.Openings}${positionOpening.eco}`}
          className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
          target="_blank"
          rel="noopener noreferrer"
          title={`Explore ${positionOpening.name}`}
        >
          <BookOpen size={20} />
          <span>Practice This Opening</span>
        </a>
      ) : null}
    </>
  );
};

export default OpeningToPractice;
