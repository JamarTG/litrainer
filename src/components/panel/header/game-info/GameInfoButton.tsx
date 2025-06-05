import { ICON_SIZES } from "@/constants/ui";
import { Info } from "lucide-react";

interface GameInfoButtonProps {
  toggleGameInfoPopup: VoidFunction;
  showPopup: boolean;
}

const GameInfoButton: React.FC<GameInfoButtonProps> = ({ toggleGameInfoPopup, showPopup }) => {
  return (
    <button
      type="button"
      className="inline-flex gap-1 items-center focus:outline-none"
      onClick={toggleGameInfoPopup}
      aria-haspopup="true"
      aria-expanded={showPopup}
      title="Get Additional Game Info"
    >
      <Info size={ICON_SIZES.MEDIUM} />
    </button>
  );
};

export default GameInfoButton;
