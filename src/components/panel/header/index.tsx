import StockfishDetails from "./components/StockfishDetails";
import PanelButtons from "./components/PanelButtons";

const PanelHeader = () => {
  return (
    <div className="relative">
      <StockfishDetails />
      <PanelButtons />
    </div>
  );
};

export default PanelHeader;
