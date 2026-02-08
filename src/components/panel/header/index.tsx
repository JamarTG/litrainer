import PanelButtons from "./PanelButtons";
import StockfishDetails from "./StockfishDetails";

const PanelHeader = () => {
  return (
    <div className="relative">
      <StockfishDetails />
      <PanelButtons />
    </div>
  );
};

export default PanelHeader;
