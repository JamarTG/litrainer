import { useState } from "react";
import Button from "@/components/shared/Button";
import GameInfoPopup from "@/features/game-info/ui/GameInfoPopup";
import PanelButtons from "./PanelButtons";
import StockfishDetails from "./EngineDetails";

const PanelHeader = () => {
  const [showMobileGameInfo, setShowMobileGameInfo] = useState(false);

  const toggleMobileGameInfo = () => {
    setShowMobileGameInfo((show) => !show);
  };

  return (
    <div className="relative p-2 md:pr-2">
      <div className="flex items-start justify-between gap-2">
        <StockfishDetails />

        <div className="md:hidden">
          <Button
            type="button"
            border
            aria-label="Game info"
            aria-haspopup="true"
            aria-expanded={showMobileGameInfo}
            onClick={toggleMobileGameInfo}
            className="h-8 rounded-md px-2.5 py-0 text-xs font-medium"
          >
            Game Info
          </Button>
        </div>
      </div>

      {showMobileGameInfo && (
        <div className="md:hidden mt-2">
          <GameInfoPopup showPopup={showMobileGameInfo} setShowPopup={setShowMobileGameInfo} inPanel />
        </div>
      )}

      <div className="hidden md:block mt-2">
        <PanelButtons />
      </div>
    </div>
  );
};

export default PanelHeader;
