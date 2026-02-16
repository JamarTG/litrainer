import PanelButtons from "./PanelButtons";
import StockfishDetails from "./EngineDetails";

const PanelHeader = () => {
  return (
    <div className="relative p-2">
      <StockfishDetails />
      <PanelButtons />
    </div>
  );
};

export default PanelHeader;
