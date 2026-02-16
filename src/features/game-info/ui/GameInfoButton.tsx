import Button from "@/components/shared/Button";
import { ICON_SIZES } from "@/constants/icons";
import { BookOpen } from "lucide-react";
import { ReactNode } from "react";

interface GameInfoButtonProps {
  toggleGameInfoPopup: VoidFunction;
  showPopup: boolean;
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
  iconOverride?: ReactNode;
}

const GameInfoButton: React.FC<GameInfoButtonProps> = ({ toggleGameInfoPopup, showPopup, className, iconSize = ICON_SIZES.SMALL, showLabel = true, iconOverride }) => {
  return (
    <Button
      type="button"
      onClick={toggleGameInfoPopup}
      aria-haspopup="true"
      aria-expanded={showPopup}
      title="Check out the game from which this puzzle was fetched"
      className={className}
    >
      {iconOverride ?? <BookOpen size={iconSize} />} {showLabel ? "Game Info" : null}
    </Button>
  );
};

export default GameInfoButton;