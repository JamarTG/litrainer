import { useState } from "react";
import Button from "@/components/shared/Button";
import PanelButtons from "./PanelButtons";
import StockfishDetails from "./EngineDetails";

const PanelHeader = () => {
  const [isActionsExpanded, setIsActionsExpanded] = useState(false);

  const toggleActions = () => {
    setIsActionsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <div className="relative p-2 pr-12 md:pr-2">
      <StockfishDetails />

      <div className="absolute top-2 right-2 md:hidden">
        <Button
          border
          onClick={toggleActions}
          aria-expanded={isActionsExpanded}
          aria-label={isActionsExpanded ? "Hide actions" : "Show actions"}
          title={isActionsExpanded ? "Hide panel actions" : "Show panel actions"}
          className="h-9 w-9 rounded-full px-0 py-0"
        >
          <span aria-hidden className="inline-flex h-full w-full items-center justify-center text-lg font-semibold text-[var(--color-fg)] leading-none">
            {isActionsExpanded ? "▴" : "▾"}
          </span>
        </Button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 md:overflow-visible md:transition-none ${
          isActionsExpanded ? "max-h-56 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
        } md:max-h-none md:opacity-100 md:pointer-events-auto md:mt-2`}
      >
        <p className="md:hidden text-xs text-[var(--color-muted)] mb-2">Session, game info, and settings actions</p>
        <PanelButtons />
      </div>
    </div>
  );
};

export default PanelHeader;
