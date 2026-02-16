import Button from "@/components/shared/Button";
import { ICON_SIZES } from "@/constants/icons";
import { Info } from "lucide-react";

interface GameInfoButtonProps {
  toggleGameInfoPopup: VoidFunction;
  showPopup: boolean;
  className?: string;
  iconSize?: number;
}

const GameInfoButton: React.FC<GameInfoButtonProps> = ({ toggleGameInfoPopup, showPopup, className, iconSize = ICON_SIZES.SMALL }) => {
  return (
    <Button
      type="button"
      onClick={toggleGameInfoPopup}
      aria-haspopup="true"
      aria-expanded={showPopup}
      title="Check out the game from which this puzzle was fetched"
      className={className}
    >
      <Info size={iconSize} /> Game Info
    </Button>
  );
};

export default GameInfoButton;