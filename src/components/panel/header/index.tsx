import StockfishDetails from "./components/StockfishDetails";
import PanelButtons from "./components/PanelButtons";

const PanelHeader = () => {
  return (
    <div className="relative bh-12 dark:text-zinc-400 flex items-center justify-between">
      <StockfishDetails />
      <PanelButtons />
    </div>
  );
};

export default PanelHeader;
