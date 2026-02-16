import PanelButtons from "./PanelButtons";
import StockfishDetails from "./EngineDetails";

const PanelHeader = () => {
  return (
    <div className="relative p-2">
      <StockfishDetails />

      <div className="mt-2 md:hidden">
        <PanelButtons iconOnly />
      </div>

      <div className="hidden md:block mt-2">
        <PanelButtons />
      </div>
    </div>
  );
};

export default PanelHeader;
