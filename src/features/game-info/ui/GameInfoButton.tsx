import Button from "@/components/shared/Button";
import { ICON_SIZES } from "@/constants/icons";
import { Info } from "lucide-react";

interface GameInfoButtonProps {
  toggleGameInfoPopup: VoidFunction;
  showPopup: boolean;
}

const GameInfoButton: React.FC<GameInfoButtonProps> = ({ toggleGameInfoPopup, showPopup }) => {
  return (
    <Button
      type="button"
      onClick={toggleGameInfoPopup}
      aria-haspopup="true"
      aria-expanded={showPopup}
      title="Check out the game from which this puzzle was fetched"
    >
      <Info size={ICON_SIZES.SMALL} /> REFERENCE GAME
    </Button>
  );
};

export default GameInfoButton;